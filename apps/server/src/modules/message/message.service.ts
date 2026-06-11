import { AppError } from "../../utils/app-error.js";
import { findMembership, findRoomById } from "../room/room.repository.js";
import { createMessage, findRoomMessages } from "./message.repository.js";

export const sendMessageService = async (
  userId: string,
  roomId: string,
  content: string,
) => {
  const room = await findRoomById(roomId);
  // Check if the room exists
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  const membership = await findMembership(roomId, userId);
  // Check if the user is a member of the room
  if (!membership) {
    throw new AppError("You are not a member of this room", 403);
  }

  return await createMessage(roomId, userId, content.trim());
};

export const getMessagesService = async (userId: string, roomId: string) => {
  const room = await findRoomById(roomId);
  // Check if the room exists
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  const membership = await findMembership(roomId, userId);
  // Check if the user is a member of the room
  if (!membership) {
    throw new AppError(
      "Access denied. You are not a member of this room.",
      403,
    );
  }

  return await findRoomMessages(roomId);
};
