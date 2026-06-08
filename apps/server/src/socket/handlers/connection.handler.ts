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
        await broadcastRoomPresence(activeRoomId);
      }
    }
    console.log(`User ${userId} disconnected from socket ${socket.id}`);
  });
};
