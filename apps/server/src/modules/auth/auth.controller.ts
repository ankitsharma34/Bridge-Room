import type { Request, Response } from "express";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "./auth.schema.js";
import {
  createAuthTokens,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./auth.service.js";
import { AUTH_MESSAGES, REFRESH_TOKEN_AGE } from "./auth.constants.js";
import { env } from "../../config/env.js";

export const postRegister = async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const user = await registerUser(body);

  const { refreshToken, accessToken } = await createAuthTokens(user.id);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_AGE,
  });
  return res.status(201).json({
    success: true,
    message: AUTH_MESSAGES.USER_CREATED,
    accessToken,
  });
};

export const postLogin = async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const user = await loginUser(body);

  const { refreshToken, accessToken } = await createAuthTokens(user.id);
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_AGE,
  });

  return res
    .status(200)
    .json({ success: true, message: "User logged in.", accessToken });
};

export const postRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const accessToken = await refreshAccessToken(refreshToken);

  return res.status(200).json({
    success: true,
    accessToken: accessToken,
  });
};

export const postLogout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      await logoutUser(refreshToken);
    }

    res.clearCookie("refresh_token");

    return res.status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user!.userId);
  return res.json({
    success: true,
    user,
  });
};
