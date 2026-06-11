import { getIO } from "../socket.js";
import { SERVER_EVENTS } from "../events/socket.events.js";
import { getTypingUsers } from "../services/typing.service.js";

export const broadcastTyping = async (roomId: string) => {
  const users = await getTypingUsers(roomId);

  const io = getIO();
  io.to(roomId).emit(SERVER_EVENTS.TYPING_UPDATED, {
    roomId,
    users,
    count: users.length,
  });
};
