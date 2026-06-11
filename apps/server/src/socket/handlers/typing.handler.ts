import { CLIENT_EVENTS, SERVER_EVENTS } from "../events/socket.events.js";
import { addTypingUser, removeTypingUser } from "../services/typing.service.js";
import { getActiveRoom } from "../services/active-room.service.js";
import { broadcastTyping } from "../utils/broadcast-typing.js";
import type { AuthenticatedSocket } from "../types/socket.types.js";

export const typingHandler = (socket: AuthenticatedSocket) => {
  socket.on(CLIENT_EVENTS.TYPING_START, async () => {
    try {
      const roomId = await getActiveRoom(socket.userId!);
      if (!roomId) return;

      await addTypingUser(roomId, socket.userId!);
      await broadcastTyping(roomId);
    } catch (error) {
      socket.emit(
        SERVER_EVENTS.ERROR,
        error instanceof Error
          ? error.message
          : "Failed to update typing status",
      );
    }
  });

  socket.on(CLIENT_EVENTS.TYPING_STOP, async () => {
    try {
      const roomId = await getActiveRoom(socket.userId!);
      if (!roomId) return;

      await removeTypingUser(roomId, socket.userId!);
      await broadcastTyping(roomId);
    } catch (error) {
      socket.emit(
        SERVER_EVENTS.ERROR,
        error instanceof Error
          ? error.message
          : "Failed to update typing status",
      );
    }
  });
};
