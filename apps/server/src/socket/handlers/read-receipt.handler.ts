import {
  findMembership,
  findRoomById,
} from "../../modules/room/room.repository.js";
import {
  findMessageById,
  updateLastReadMessageId,
} from "../../modules/message/message.repository.js";
import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import type { AuthenticatedSocket } from "../types/socket.types.js";

export const readReceiptHandler = (socket: AuthenticatedSocket) => {
  socket.on(
    CLIENT_EVENTS.MESSAGE_READ,
    async ({ roomId, messageId }: { roomId: string; messageId: string }) => {
      try {
        // Validate room
        const room = await findRoomById(roomId);
        if (!room) {
          socket.emit(SERVER_EVENTS.ERROR, "Room not found");
          return;
        }

        // Validate membership
        const membership = await findMembership(roomId, socket.userId!);
        if (!membership) {
          socket.emit(SERVER_EVENTS.ERROR, "Not a member");
          return;
        }

        // Validate message
        const message = await findMessageById(messageId);
        if (!message) {
          socket.emit(SERVER_EVENTS.ERROR, "Message not found");
          return;
        }

        if (message.roomId !== roomId) {
          socket.emit(SERVER_EVENTS.ERROR, "Invalid message");
          return;
        }

        // Update DB
        await updateLastReadMessageId(roomId, socket.userId!, messageId);

        // Broadcast to room
        socket.to(roomId).emit(SERVER_EVENTS.MESSAGE_READ, {
          roomId,
          messageId,
          userId: socket.userId,
        });
      } catch (error) {
        socket.emit(
          SERVER_EVENTS.ERROR,
          error instanceof Error
            ? error.message
            : "Failed to mark message as read",
        );
      }
    },
  );
};
