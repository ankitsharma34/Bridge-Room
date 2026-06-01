import type { Request, Response } from "express";
import { createRoomSchema } from "./room.schema.js";
import { createRoomService } from "./room.services.js";

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
