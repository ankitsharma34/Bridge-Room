import type { Request, Response } from "express";
import {
  createRoomSchema,
  joinRoomSchema,
  leaveRoomSchema,
} from "./room.schema.js";
import {
  createRoomService,
  joinRoomService,
  leaveRoomService,
} from "./room.services.js";
import { ZodError } from "zod";

export const postCreateRoom = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const postJoinRoom = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const postLeaveRoom = async (req: Request, res: Response) => {
  try {
    // validate room id
    const body = leaveRoomSchema.parse(req.body);
    const room = await leaveRoomService(req.user!.userId, body.code);

    return res.status(200).json({
      success: true,
      message: "Room left successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
