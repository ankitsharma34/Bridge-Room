import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  getRoomById,
  getRoomMembers,
  postCreateRoom,
  postJoinRoom,
  postLeaveRoom,
} from "./room.controller.js";

const router = Router();
router.post("/create", authMiddleware, postCreateRoom);
router.post("/join", authMiddleware, postJoinRoom);
router.post("/leave", authMiddleware, postLeaveRoom);

router.get("/:roomId", authMiddleware, getRoomById);
router.get("/:roomId/members", authMiddleware, getRoomMembers);

export default router;
