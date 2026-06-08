import { getIO } from "../socket.js";
import { SERVER_EVENTS } from "../events/socket.events.js";

export const broadcastMemberJoinedRoom = (
  roomId: string,
  user: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  },
) => {
  const io = getIO();

  io.to(roomId).emit(SERVER_EVENTS.MEMBER_JOINED_ROOM, {
    roomId,
    user,
    joinedAt: new Date(),
  });
};

export const broadcastMemberLeftRoom = (
  roomId: string,
  user: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  },
) => {
  const io = getIO();

  io.to(roomId).emit(SERVER_EVENTS.MEMBER_LEFT_ROOM, {
    roomId,
    user,
    leftAt: new Date(),
  });
};
