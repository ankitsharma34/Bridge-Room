import { getIO } from "../socket.js";
import { SERVER_EVENTS } from "../events/socket.events.js";

export const broadcastMessageUpdated = (roomId: string, message: unknown) => {
  const io = getIO();

  io.to(roomId).emit(SERVER_EVENTS.MESSAGE_UPDATED, message);
};
