import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

import { connectionHandler } from "./handlers/connection.handler.js";
import { socketAuthMiddleware } from "./middleware/socket-auth.middleware.js";

let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", connectionHandler);

  console.log("Socket.IO initialized");
};

export const getIO = () => io;
