import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  deleteMessageController,
  getRoomMessages,
  patchMessage,
} from "./message.controller.js";

const router = Router();

router.get("/room/:roomId", authMiddleware, getRoomMessages);
router.patch("/:messageId", authMiddleware, patchMessage);
router.delete("/:messageId", authMiddleware, deleteMessageController);

export default router;
