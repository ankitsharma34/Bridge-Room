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

export const findRoomMessages = async (
  roomId: string,
  cursor?: string,
  limit = 50,
) => {
  return prisma.message.findMany({
    where: {
      roomId,
    },
    take: limit,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      roomId: true,
      createdAt: true,
      updatedAt: true,
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

export const findMessageById = (messageId: string) => {
  return prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });
};

export const updateMessage = (messageId: string, content: string) => {
  return prisma.message.update({
    where: {
      id: messageId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      roomId: true,
      createdAt: true,
      updatedAt: true,
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

export const deleteMessage = (messageId: string) => {
  return prisma.message.delete({
    where: {
      id: messageId,
    },
  });
};

export const updateLastReadMessageId = (
  userId: string,
  roomId: string,
  messageId: string,
) => {
  return prisma.roomMember.update({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },

    data: {
      lastReadMessageId: messageId,
      lastReadAt: new Date(),
    },
  });
};

export const createMessageDelivery = (messageId: string, userId: string) => {
  return prisma.messageDelivery.upsert({
    where: {
      messageId_userId: {
        messageId,
        userId,
      },
    },

    create: {
      messageId,
      userId,
    },

    update: {},
  });
};
