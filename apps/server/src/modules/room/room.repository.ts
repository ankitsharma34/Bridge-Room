import { prisma } from "../../prisma/prisma.js";
import type { CreateRoomPayload } from "./room.types.js";

export const findRoomByCode = (code: string) => {
  return prisma.room.findUnique({
    where: { code },
  });
};

export const createRoom = (data: CreateRoomPayload, code: string) => {
  return prisma.room.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      ownerId: data.ownerId,
      code,
      members: {
        create: {
          userId: data.ownerId,
        },
      },
    },

    include: {
      members: true,
    },
  });
};

export const findMembership = (roomId: string, userId: string) => {
  return prisma.roomMember.findUnique({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },
  });
};

export const joinRoom = (roomId: string, userId: string) => {
  return prisma.roomMember.create({
    data: {
      roomId,
      userId,
    },
  });
};

export const leaveRoom = (roomId: string, userId: string) => {
  return prisma.roomMember.delete({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },
  });
};
