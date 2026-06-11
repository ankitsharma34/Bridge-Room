import { prisma } from "../../prisma/prisma.js";

export const createMessage = (
  roomId: string,
  senderId: string,
  content: string,
) => {
  return prisma.message.create({
    data: {
      roomId,
      senderId,
      content,
    },
    select: {
      id: true,
      content: true,
      roomId: true,
      createdAt: true,

      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          isVerified: true,
        },
      },
    },
  });
};
