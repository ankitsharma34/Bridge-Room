import type { Socket } from "socket.io";
import { AuthenticatedSocket } from "../types/socket.types.js";

export const connectionHandler = (socket: AuthenticatedSocket) => {
  console.log(`User ${socket.userId} connected with socket ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected from socket ${socket.id}`);
  });
};
