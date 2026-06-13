import { prisma } from "../../prisma/prisma.js";
import type {
  CreateRoomPayload,
  membershipInput,
  UpdateRoomInput,
} from "./room.types.js";

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

export const findRoomById = (roomId: string) => {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
};

export const findUserById = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const findMemberCountById = (roomId: string) => {
  return prisma.roomMember.count({
    where: {
      roomId,
    },
  });
};

export const findRoomMember = (roomId: string) => {
  return prisma.roomMember.findMany({
    where: { roomId },
    include: { user: true },
  });
};

export const findUserRooms = (userId: string) => {
  return prisma.room.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
      members: {
        where: {
          userId,
        },
        select: {
          lastReadAt: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const countUnreadMessages = async (
  roomId: string,
  membership: membershipInput,
) => {
  return await prisma.message.count({
    where: {
      roomId,
      ...(membership?.lastReadAt && {
        createdAt: {
          gt: membership.lastReadAt,
        },
      }),
    },
  });
};

export const updateRoom = ({ roomId, name, description }: UpdateRoomInput) => {
  return prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
    },
  });
};

export const deleteRoomMember = (roomId: string, memberId: string) => {
  return prisma.roomMember.delete({
    where: {
      roomId_userId: {
        roomId,
        userId: memberId,
      },
    },
  });
};

export const deleteRoom = (roomId: string) => {
  return prisma.room.delete({
    where: {
      id: roomId,
    },
  });
};
