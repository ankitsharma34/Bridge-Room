import { Request, Response } from "express";
import {
  getMessagesQuerySchema,
  getRoomMessagesSchema,
  patchMessageBodySchema,
  patchMessageParamsSchema,
} from "./message.schema.js";
import {
  deleteMessageService,
  getMessagesService,
  updateMessageService,
} from "./message.service.js";
import { broadcastMessageDeleted } from "../../socket/utils/broadcast-message-deleted.js";

export const getRoomMessages = async (req: Request, res: Response) => {
  const { roomId } = getRoomMessagesSchema.parse(req.params);
  const { cursor } = getMessagesQuerySchema.parse(req.query);

  const result = await getMessagesService(req.user!.userId, roomId, cursor);

  res.status(200).json({
    success: true,
    ...result,
  });
};

export const patchMessage = async (req: Request, res: Response) => {
  const { messageId } = patchMessageParamsSchema.parse(req.params);
  const { content } = patchMessageBodySchema.parse(req.body);

  const updatedMessage = await updateMessageService(
    req.user!.userId,
    messageId,
    content,
  );

  res.status(200).json({
    success: true,
    message: "Message updated successfully",
    data: updatedMessage,
  });
};

export const deleteMessageController = async (req: Request, res: Response) => {
  const { messageId } = patchMessageParamsSchema.parse(req.params);

  const deletedMessage = await deleteMessageService(
    req.user!.userId,
    messageId,
  );

  broadcastMessageDeleted(deletedMessage.roomId, deletedMessage.id);

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
};
