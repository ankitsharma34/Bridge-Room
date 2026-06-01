import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  postCreateRoom,
  postJoinRoom,
  postLeaveRoom,
} from "./room.controller.js";

const router = Router();
router.post("/create", authMiddleware, postCreateRoom);
router.post("/join", authMiddleware, postJoinRoom);
router.post("/leave", authMiddleware, postLeaveRoom);
export default router;
