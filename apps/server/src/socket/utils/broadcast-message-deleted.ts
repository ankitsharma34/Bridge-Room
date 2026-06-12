import { getIO } from "../socket.js";
import { SERVER_EVENTS } from "../events/socket.events.js";

export const broadcastMessageDeleted = (roomId: string, messageId: string) => {
  const io = getIO();

  io.to(roomId).emit(SERVER_EVENTS.MESSAGE_DELETED, {
    messageId,
  });
};
