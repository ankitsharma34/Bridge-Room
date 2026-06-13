import { broadcastMessageUpdated } from "../../socket/utils/broadcast-message-updated.js";
import { AppError } from "../../utils/app-error.js";
import { findMembership, findRoomById } from "../room/room.repository.js";
import {
  createMessage,
  deleteMessage,
  findMessageById,
  findRoomMessages,
  updateLastReadMessageId,
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

export const getMessagesService = async (
  userId: string,
  roomId: string,
  cursor?: string,
) => {
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

  const messages = await findRoomMessages(roomId, cursor);

  const nextCursor =
    messages.length === 50 ? (messages[messages.length - 1]?.id ?? null) : null;

  return {
    messages,
    nextCursor,
  };
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

export const deleteMessageService = async (
  userId: string,
  messageId: string,
) => {
  const message = await findMessageById(messageId);
  if (!message) {
    throw new AppError("Message not found", 404);
  }
  // Only the sender of the message can delete it
  if (message.senderId !== userId) {
    throw new AppError("You can only delete your own messages", 403);
  }

  return await deleteMessage(messageId);
};

export const readReceiptService = async (
  userId: string,
  roomId: string,
  messageId: string,
) => {
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

  const message = await findMessageById(messageId);
  // Check if the message exists
  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.roomId !== roomId) {
    throw new AppError("Message does not belong to this room", 400);
  }

  await updateLastReadMessageId(userId, roomId, messageId);

  return { roomId, messageId };
};
