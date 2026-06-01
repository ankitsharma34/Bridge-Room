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
