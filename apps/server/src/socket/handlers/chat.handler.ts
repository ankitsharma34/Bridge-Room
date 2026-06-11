import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import { sendMessageService } from "../../modules/message/message.service.js";
import type { AuthenticatedSocket } from "../types/socket.types.js";
import { getIO } from "../socket.js";

export const chatHandler = (socket: AuthenticatedSocket) => {
  socket.on(CLIENT_EVENTS.MESSAGE_SEND, async ({ roomId, content }) => {
    try {
      const message = await sendMessageService(socket.userId!, roomId, content);

      const io = getIO();
      io.to(roomId).emit(SERVER_EVENTS.MESSAGE_RECEIVED, message);
    } catch (error) {
      socket.emit(
        SERVER_EVENTS.ERROR,
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  });
};
