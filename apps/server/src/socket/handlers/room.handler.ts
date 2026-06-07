import {
  findMembership,
  findRoomById,
} from "../../modules/room/room.repository.js";
import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import {
  clearActiveRoom,
  getActiveRoom,
  setActiveRoom,
} from "../services/active-room.service.js";
import {
  addUserToRoomPresence,
  removeUserFromRoomPresence,
} from "../services/room-presence.service.js";
import { AuthenticatedSocket } from "../types/socket.types.js";

export const roomHandler = (socket: AuthenticatedSocket) => {
  socket.on(CLIENT_EVENTS.ACTIVE_ROOM_JOIN, async (roomId: string) => {
    // 1. Validate room exists
    const room = await findRoomById(roomId);
    if (!room) {
      socket.emit(SERVER_EVENTS.ERROR, "Room not found");
      return;
    }
    // 2. Validate user is a member of the room
    const membership = await findMembership(roomId, socket.userId!);
    if (!membership) {
      socket.emit(SERVER_EVENTS.ERROR, "You are not a member of this room");
      return;
    }
    // 3. Get previous active room
    const previousRoomId = await getActiveRoom(socket.userId!);
    if (previousRoomId === roomId) {
      return;
    }
    if (previousRoomId) {
      // 4. exists?? Leave previous room
      //   Remove User From Previous Room Presence
      await removeUserFromRoomPresence(previousRoomId, socket.userId!);
      socket.leave(previousRoomId);
    }
    // 5. set active room in Redis
    await setActiveRoom(socket.userId!, roomId);
    // Add User To New Room Presence
    await addUserToRoomPresence(roomId, socket.userId!);

    socket.join(roomId);
    socket.emit(SERVER_EVENTS.ACTIVE_ROOM_JOINED, roomId);
  });

  socket.on(CLIENT_EVENTS.ACTIVE_ROOM_LEAVE, async () => {
    // 1. Get active room
    const roomId = await getActiveRoom(socket.userId!);
    if (roomId) {
      // 2. Leave room and clear active room in Redis
      //   Remove User From Room Presence
      await removeUserFromRoomPresence(roomId, socket.userId!);
      socket.leave(roomId);
      await clearActiveRoom(socket.userId!);
    }
    socket.emit(SERVER_EVENTS.ACTIVE_ROOM_LEFT, roomId);
  });
};
