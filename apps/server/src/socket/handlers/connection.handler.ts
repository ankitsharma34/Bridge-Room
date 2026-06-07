import {
  markUserOnline,
  markUserOffline,
} from "../services/presence.service.js";

import type { AuthenticatedSocket } from "../types/socket.types.js";

export const connectionHandler = async (socket: AuthenticatedSocket) => {
  const userId = socket.userId!;
  await markUserOnline(userId, socket.id);

  console.log(`User ${userId} connected with socket ${socket.id}`);

  socket.on("disconnect", async () => {
    await markUserOffline(userId, socket.id);
    console.log(`User ${userId} disconnected from socket ${socket.id}`);
  });
};
