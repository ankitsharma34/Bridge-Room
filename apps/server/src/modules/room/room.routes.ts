import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { postCreateRoom, postJoinRoom } from "./room.controller.js";

const router = Router();
router.post("/create", authMiddleware, postCreateRoom);
router.post("/join", authMiddleware, postJoinRoom);
export default router;
