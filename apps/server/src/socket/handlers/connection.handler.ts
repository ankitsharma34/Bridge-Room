import type { Socket } from "socket.io";

export const connectionHandler = (socket: Socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
};
