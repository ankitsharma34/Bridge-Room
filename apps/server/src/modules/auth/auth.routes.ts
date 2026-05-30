import { Router } from "express";
import {
  getMe,
  postLogin,
  postLogout,
  postRefresh,
  postRegister,
} from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.post("/refresh", postRefresh);
authRouter.post("/logout", postLogout);
authRouter.get("/me", authMiddleware, getMe);

export default authRouter;
