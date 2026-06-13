import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import {
  findMessageById,
  createMessageDelivery,
} from "../../modules/message/message.repository.js";
import type { AuthenticatedSocket } from "../types/socket.types.js";

export const deliveryHandler = (socket: AuthenticatedSocket) => {
  socket.on(CLIENT_EVENTS.MESSAGE_DELIVERED, async (messageId: string) => {
    try {
      const message = await findMessageById(messageId);
      if (!message) {
        return;
      }

      await createMessageDelivery(messageId, socket.userId!);

      socket.to(message.roomId).emit(SERVER_EVENTS.MESSAGE_DELIVERED, {
        messageId,
        userId: socket.userId,
      });
    } catch (error) {
      socket.emit(SERVER_EVENTS.ERROR, "Failed to mark delivered");
    }
  });
};
