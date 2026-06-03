import { AppError } from "../../utils/app-error.js";
import {
  createRoom,
  findMemberCountById,
  findMembership,
  findRoomByCode,
  findRoomById,
  findRoomMember,
  findUserById,
  findUserRooms,
  joinRoom,
  leaveRoom,
  updateRoom,
} from "./room.repository.js";
import { CreateRoomInput, UpdateRoomInput } from "./room.types.js";
import { generateRoomCode } from "./room.utils.js";

export const createRoomService = async (
  ownerId: string,
  data: CreateRoomInput,
) => {
  let code = generateRoomCode();
  while (await findRoomByCode(code)) {
    // wait until a unique room code is generated
    code = generateRoomCode();
  }

  const room = await createRoom(
    {
      name: data.name,
      ownerId,
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
    },
    code,
  );

  return room;
};

export const joinRoomService = async (userId: string, code: string) => {
  const room = await findRoomByCode(code);
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  const membership = await findMembership(room.id, userId);
  if (membership) {
    throw new AppError("Already joined this room", 403);
  }

  await joinRoom(room.id, userId);
  return room;
};

export const leaveRoomService = async (userId: string, code: string) => {
  const room = await findRoomByCode(code);
  // Check room exists
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  // Is user a member of this room?
  const membership = await findMembership(room.id, userId);
  if (!membership) {
    throw new AppError("You are not a member of this room.", 403);
  }

  // Is user the room owner?
  if (userId === room.ownerId) {
    throw new AppError("Room owner cannot leave. Delete room instead.", 405);
  }

  // leave room
  await leaveRoom(room.id, userId);
  return room;
};

export const getRoomByIdService = async (userId: string, roomId: string) => {
  // Room exists?
  const room = await findRoomById(roomId);
  if (!room) {
    throw new AppError("Room not found", 404);
  }
  // Is user a member?
  const membership = await findMembership(roomId, userId);
  if (!membership) {
    throw new AppError("You are not a member. Access denied", 403);
  }

  // fetch owner detail
  const owner = await findUserById(room.ownerId);
  // fetch number of members
  const memberCount = await findMemberCountById(roomId);

  return {
    id: room.id,
    code: room.code,
    name: room.name,
    description: room.description,
    owner: {
      id: owner!.id,
      username: owner!.username,
      avatarUrl: owner!.avatarUrl,
    },
    memberCount,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };
};

export const getRoomMembersService = async (userId: string, roomId: string) => {
  const room = await findRoomById(roomId);
  // Room exists?
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  // Is requester a member?
  const membership = await findMembership(roomId, userId);
  if (!membership) {
    throw new AppError("Access denied. You are not a member", 403);
  }

  // Fetch all RoomMembers
  const roomMembers = await findRoomMember(roomId);

  return {
    memberCount: roomMembers.length,
    members: roomMembers.map((member) => ({
      id: member.user.id,
      username: member.user.username,
      avatarUrl: member.user.avatarUrl,
      isVerified: member.user.isVerified,
      role: member.userId === room.ownerId ? "OWNER" : "MEMBER",
      joinedAt: member.joinedAt,
    })),
  };
};

export const getMyRoomsService = async (userId: string) => {
  const allRooms = await findUserRooms(userId);

  return {
    totalRooms: allRooms.length,

    rooms: allRooms.map((room) => ({
      id: room.id,
      code: room.code,
      name: room.name,
      description: room.description,
      role: room.ownerId === userId ? "OWNER" : "MEMBER",
      memberCount: room._count.members,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    })),
  };
};

export const updateRoomService = async (
  userId: string,
  { roomId, name, description }: UpdateRoomInput,
) => {
  // Find Room By Id
  const room = await findRoomById(roomId);
  // Room Exists?
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  // Is Owner?
  if (room.ownerId !== userId) {
    throw new AppError("You are now allowed to edit the room detail.", 403);
  }

  const updatedRoom = await updateRoom({ roomId, name, description });

  return updatedRoom;
};
