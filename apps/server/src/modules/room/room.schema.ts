import { z } from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Room name must be at least 3 characters")
    .max(50, "Room name must be at most 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters")
    .optional(),
});

export const joinRoomSchema = z.object({
  code: z
    .string()
    .trim()
    .min(8, { message: "Incorrect Room Code" })
    .max(8, { message: "Incorrect Room Code" })
    .transform((value) => value.toUpperCase()),
});

export const leaveRoomSchema = joinRoomSchema;

export const getRoomByIdSchema = z.object({
  roomId: z.cuid2({
    message: "Invalid Room ID.",
  }),
});

export const updateRoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Room name must be at least 3 characters")
    .max(50, "Room name must be at most 50 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters")
    .optional(),
});
