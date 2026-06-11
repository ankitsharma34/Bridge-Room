import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getRoomMessages } from "./message.controller.js";

const router = Router();

router.get("/room/:roomId", authMiddleware, getRoomMessages);

export default router;
