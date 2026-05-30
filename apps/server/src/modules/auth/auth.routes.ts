import { Router } from "express";
import { postLogin, postRefresh, postRegister } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.post("/refresh", postRefresh);

export default authRouter;
