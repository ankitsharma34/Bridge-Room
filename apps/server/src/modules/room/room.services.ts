import {
  createRoom,
  findMembership,
  findRoomByCode,
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
    throw new Error("Room not found");
  }

  const membership = await findMembership(room.id, userId);
  if (membership) {
    throw new Error("Already joined this room");
  }

  await joinRoom(room.id, userId);
  return room;
};

export const leaveRoomService = async (userId: string, code: string) => {
  const room = await findRoomByCode(code);
  // Check room exists
  if (!room) {
    throw new Error("Room not found");
  }

  // Is user a member of this room?
  const membership = await findMembership(room.id, userId);
  if (!membership) {
    throw new Error("You are not a member of this room.");
  }

  // Is user the room owner?
  if (userId === room.ownerId) {
    throw new Error("Room owner cannot leave. Delete room instead.");
  }

  // leave room
  await leaveRoom(room.id, userId);
  return room;
};
