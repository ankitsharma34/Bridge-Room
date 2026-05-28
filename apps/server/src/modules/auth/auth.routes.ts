import { Router } from "express";
import { postRegister } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", postRegister);

export default authRouter;
