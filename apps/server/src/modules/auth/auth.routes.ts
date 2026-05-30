import { Router } from "express";
import {
  postLogin,
  postLogout,
  postRefresh,
  postRegister,
} from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.post("/refresh", postRefresh);
authRouter.post("/logout", postLogout);

export default authRouter;
