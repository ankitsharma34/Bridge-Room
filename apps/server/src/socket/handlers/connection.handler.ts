import { findUserById } from "../../modules/room/room.repository.js";
import { SERVER_EVENTS } from "../events/socket.events.js";
import {
  clearActiveRoom,
  getActiveRoom,
} from "../services/active-room.service.js";
import {
  markUserOnline,
  markUserOffline,
} from "../services/presence.service.js";
import { removeUserFromRoomPresence } from "../services/room-presence.service.js";

import type { AuthenticatedSocket } from "../types/socket.types.js";
import { broadcastMemberLeftRoom } from "../utils/broadcast-room-member.js";
import { broadcastRoomPresence } from "../utils/broadcast-room-presence.js";
import { roomHandler } from "./room.handler.js";

export const connectionHandler = async (socket: AuthenticatedSocket) => {
  const userId = socket.userId!;
  await markUserOnline(userId, socket.id);

  console.log(`User ${userId} connected with socket ${socket.id}`);

  roomHandler(socket);

  socket.on("disconnect", async () => {
    const remainingSockets = await markUserOffline(userId, socket.id);
    if (remainingSockets === 0) {
      // User is completely offline, clear their active room
      const activeRoomId = await getActiveRoom(userId);
      if (activeRoomId) {
        // Remove User From Room Presence
        await removeUserFromRoomPresence(activeRoomId, userId);
        await clearActiveRoom(userId);
        socket.leave(activeRoomId);
        // Broadcast to other members that user has left
        const user = await findUserById(userId);
        if (!user) {
          socket.emit(SERVER_EVENTS.ERROR, "User not found");
          return;
        }
        broadcastMemberLeftRoom(activeRoomId, {
          id: user.id,
          username: user.username,
          avatarUrl: user.avatarUrl,
        });
        // Broadcast updated room presence to remaining members
        await broadcastRoomPresence(activeRoomId);
      }
    }
    console.log(`User ${userId} disconnected from socket ${socket.id}`);
  });
};
