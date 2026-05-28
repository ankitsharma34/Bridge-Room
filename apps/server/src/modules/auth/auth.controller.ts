import type { Request, Response } from "express";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { loginUser, registerUser } from "./auth.service.js";
import { AUTH_MESSAGES } from "./auth.constants.js";

export const postRegister = async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    await registerUser(body);
    return res.status(201).json({
      success: true,
      message: AUTH_MESSAGES.USER_CREATED,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    await loginUser(body);
    return res.status(201).json({ success: true, message: "User logged in." });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
