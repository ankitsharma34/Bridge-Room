import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  getMyRooms,
  getRoomById,
  getRoomMembers,
  patchUpdateRoom,
  postCreateRoom,
  postJoinRoom,
  postLeaveRoom,
} from "./room.controller.js";

const router = Router();
router.post("/create", authMiddleware, postCreateRoom);
router.post("/join", authMiddleware, postJoinRoom);
router.post("/leave", authMiddleware, postLeaveRoom);

router.get("/my-rooms", authMiddleware, getMyRooms); // keep static route before dynamic route
router.get("/:roomId", authMiddleware, getRoomById);
router.get("/:roomId/members", authMiddleware, getRoomMembers);

router.patch("/:roomId", authMiddleware, patchUpdateRoom);
export default router;
