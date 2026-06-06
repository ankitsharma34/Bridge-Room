import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { connectionHandler } from "./handlers/connection.handler.js";
import { socketAuthMiddleware } from "./middleware/socket-auth.middleware.js";

interface SocketServer extends Server {}

const io: SocketServer = new Server({
  cors: {
    origin: "*",
  },
});

export const initializeSocket = (httpServer: HttpServer): void => {
  io.attach(httpServer);

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    connectionHandler(socket);
  });

  console.log("Socket.io initialized");
};

export const getSocketIO = () => io;
