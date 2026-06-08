import { getIO } from "../socket.js";
import { SERVER_EVENTS } from "../events/socket.events.js";
import {
  getRoomPresence,
  getRoomPresenceCount,
} from "../services/room-presence.service.js";

export const broadcastRoomPresence = async (roomId: string) => {
  const activeUsers = await getRoomPresence(roomId);
  const count = await getRoomPresenceCount(roomId);

  const io = getIO();

  io.to(roomId).emit(SERVER_EVENTS.ROOM_PRESENCE_UPDATED, {
    roomId,
    activeUsers,
    count,
  });
};
