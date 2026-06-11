import { broadcastMessageUpdated } from "../../socket/utils/broadcast-message-updated.js";
import { AppError } from "../../utils/app-error.js";
import { findMembership, findRoomById } from "../room/room.repository.js";
import {
  createMessage,
  findMessageById,
  findRoomMessages,
  updateMessage,
} from "./message.repository.js";

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

export const updateMessageService = async (
  userId: string,
  messageId: string,
  content: string,
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.senderId !== userId) {
    throw new AppError("You can only edit your own messages", 403);
  }

  const updatedMessage = await updateMessage(messageId, content.trim());
  // Broadcast the updated message to all users in the room
  broadcastMessageUpdated(updatedMessage.roomId, updatedMessage);
  return updatedMessage;
};
