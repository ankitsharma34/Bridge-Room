import { z } from "zod";

export const getRoomMessagesSchema = z.object({
  roomId: z.cuid2({
    message: "Invalid Room ID.",
  }),
});
