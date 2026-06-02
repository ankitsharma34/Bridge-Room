import type { Request, Response } from "express";
import {
  createRoomSchema,
  getRoomByIdSchema,
  joinRoomSchema,
  leaveRoomSchema,
} from "./room.schema.js";
import {
  createRoomService,
  getRoomByIdService,
  joinRoomService,
  leaveRoomService,
} from "./room.services.js";
import { ZodError } from "zod";

export const postCreateRoom = async (req: Request, res: Response) => {
  const body = createRoomSchema.parse(req.body);
  const room = await createRoomService(req.user!.userId, body);
  return res.status(201).json({
    success: true,
    room: {
      id: room.id,
      code: room.code,
      name: room.name,
      description: room.description,
    },
  });
};

export const postJoinRoom = async (req: Request, res: Response) => {
  const body = joinRoomSchema.parse(req.body);
  const room = await joinRoomService(req.user!.userId, body.code);

  return res.status(200).json({
    success: true,
    room: {
      id: room.id,
      code: room.code,
      name: room.name,
      description: room.description,
    },
  });
};

export const postLeaveRoom = async (req: Request, res: Response) => {
  // validate room id
  const body = leaveRoomSchema.parse(req.body);
  const room = await leaveRoomService(req.user!.userId, body.code);

  return res.status(200).json({
    success: true,
    message: "Room left successfully",
  });
};

export const getRoomById = async (req: Request, res: Response) => {
  const { roomId } = getRoomByIdSchema.parse(req.params);

  const room = await getRoomByIdService(req.user!.userId, roomId);

  return res
    .status(200)
    .json({ success: true, message: "Room detail fetched", room });
};
