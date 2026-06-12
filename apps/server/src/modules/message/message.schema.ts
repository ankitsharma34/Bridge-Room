import { z } from "zod";

export const getRoomMessagesSchema = z.object({
  roomId: z.cuid2({
    message: "Invalid Room ID.",
  }),
});

export const getMessagesQuerySchema = z.object({
  cursor: z.string().optional(),
});

export const patchMessageParamsSchema = z.object({
  messageId: z.cuid2({
    message: "Invalid Message ID.",
  }),
});

export const patchMessageBodySchema = z.object({
  content: z.string().trim().min(1, {
    message: "Message cannot be empty.",
  }),
});
