import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import { sendMessageService } from "../../modules/message/message.service.js";
import type { AuthenticatedSocket } from "../types/socket.types.js";
import { getIO } from "../socket.js";
import {
  sendMessagePayloadSchema,
  type SendMessageAcknowledge,
} from "../types/message.types.js";

export const chatHandler = (socket: AuthenticatedSocket) => {
  socket.on(
    CLIENT_EVENTS.MESSAGE_SEND,
    async (payload: unknown, acknowledge?: SendMessageAcknowledge) => {
      try {
        const { roomId, content } = sendMessagePayloadSchema.parse(payload);
        const message = await sendMessageService(
          socket.userId!,
          roomId,
          content,
        );

        const io = getIO();
        io.to(roomId).emit(SERVER_EVENTS.MESSAGE_RECEIVED, message);
        acknowledge?.({ success: true, message });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to send message";

        acknowledge?.({ success: false, error: message });
        socket.emit(SERVER_EVENTS.ERROR, message);
      }
    },
  );
};
