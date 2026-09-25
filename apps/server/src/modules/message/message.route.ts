import { Router as createRouter, type Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  deleteMessageController,
  getRoomMessages,
  patchMessage,
  postReadReceipt,
} from "./message.controller.js";

const router: Router = createRouter();

router.get("/rooms/:roomId", authMiddleware, getRoomMessages);
router.post("/rooms/:roomId/read", authMiddleware, postReadReceipt);
router.patch("/:messageId", authMiddleware, patchMessage);
router.delete("/:messageId", authMiddleware, deleteMessageController);

export default router;
