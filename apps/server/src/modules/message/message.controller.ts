import { Request, Response } from "express";
import {
  getRoomMessagesSchema,
  patchMessageBodySchema,
  patchMessageParamsSchema,
} from "./message.schema.js";
import { getMessagesService, updateMessageService } from "./message.service.js";

export const getRoomMessages = async (req: Request, res: Response) => {
  const { roomId } = getRoomMessagesSchema.parse(req.params);

  const messages = await getMessagesService(req.user!.userId, roomId);

  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
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
