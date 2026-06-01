import z from "zod";
import { createRoomSchema } from "./room.schema.js";

export interface CreateRoomPayload {
  name: string;
  description?: string;
  ownerId: string;
}
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
