import { Request, Response } from "express";
import { getRoomMessagesSchema } from "./message.schema.js";
import { getMessagesService } from "./message.service.js";

export const getRoomMessages = async (req: Request, res: Response) => {
  const { roomId } = getRoomMessagesSchema.parse(req.params);

  const messages = await getMessagesService(req.user!.userId, roomId);

  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
};
