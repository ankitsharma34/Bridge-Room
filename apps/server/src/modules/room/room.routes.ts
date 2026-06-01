import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { postCreateRoom } from "./room.controller.js";

const router = Router();
router.post("/create", authMiddleware, postCreateRoom);
export default router;
