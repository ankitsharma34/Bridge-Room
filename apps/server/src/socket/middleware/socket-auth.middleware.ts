import type { ExtendedError } from "socket.io";
import type { AuthenticatedSocket } from "../types/socket.types.js";
import { verifyAccessToken } from "../../utils/jwt.js";
import { AppError } from "../../utils/app-error.js";

export const socketAuthMiddleware = (
  socket: AuthenticatedSocket,
  next: (err?: ExtendedError) => void,
) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new AppError("Authentication required", 403));
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return next(new AppError("Invalid token", 403));
  }
  socket.userId = payload.userId;

  next();
};
