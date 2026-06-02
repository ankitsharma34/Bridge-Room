import z from "zod";
import { createRoomSchema, joinRoomSchema } from "./room.schema.js";

export interface CreateRoomPayload {
  name: string;
  description?: string;
  ownerId: string;
}
export type CreateRoomInput = z.infer<typeof createRoomSchema>;

// join room
export interface JoinRoomPayload {
  roomId: string;
  userId: string;
}
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
