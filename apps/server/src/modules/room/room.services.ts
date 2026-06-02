import { AppError } from "../../utils/app-error.js";
import {
  createRoom,
  findMemberCountById,
  findMembership,
  findRoomByCode,
  findRoomById,
  findUserById,
  joinRoom,
  leaveRoom,
} from "./room.repository.js";
import { CreateRoomInput } from "./room.types.js";
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
