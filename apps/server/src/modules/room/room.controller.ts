import type { Request, Response } from "express";
import {
  createRoomSchema,
  getRoomByIdSchema,
  joinRoomSchema,
  leaveRoomSchema,
  removeMemberSchema,
  updateRoomSchema,
} from "./room.schema.js";
import {
  createRoomService,
  getMyRoomsService,
  getRoomByIdService,
  getRoomMembersService,
  joinRoomService,
  leaveRoomService,
  removeMemberService,
  updateRoomService,
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

export const getRoomMembers = async (req: Request, res: Response) => {
  // Validate roomId
  const { roomId } = getRoomByIdSchema.parse(req.params);

  const serviceDTO = await getRoomMembersService(req.user!.userId, roomId);

  return res.status(200).json({
    success: true,
    roomId,
    memberCount: serviceDTO.memberCount,
    members: serviceDTO.members,
  });
};

export const getMyRooms = async (req: Request, res: Response) => {
  const allRooms = await getMyRoomsService(req.user!.userId);
  return res.status(200).json({ success: true, ...allRooms });
};

export const patchUpdateRoom = async (req: Request, res: Response) => {
  // Validate Params
  const { roomId } = getRoomByIdSchema.parse(req.params);
  // Validate Body
  const body = updateRoomSchema.parse(req.body);

  const room = await updateRoomService(req.user!.userId, {
    roomId,
    name: body.name,
    description: body.description,
  });

  return res
    .status(200)
    .json({ success: true, message: "Room updated successfully", room });
};

export const deleteRemoveMember = async (req: Request, res: Response) => {
  // Validate roomId
  const { roomId, memberId } = removeMemberSchema.parse(req.params);

  const member = await removeMemberService(req.user!.userId, roomId, memberId);

  return res
    .status(200)
    .json({ success: true, message: "Member removed successfully", member });
};
