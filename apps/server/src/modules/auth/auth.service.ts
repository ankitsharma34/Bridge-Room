import { AppError } from "../../utils/app-error.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import { hashToken } from "../../utils/token-hash.js";
import { AUTH_MESSAGES } from "./auth.constants.js";
import {
  createUser,
  deleteRefreshToken,
  findRefreshToken,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  saveRefreshToken,
} from "./auth.repository.js";
import type { LoginUserInput, RegisterUserInput } from "./auth.types.js";

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserInput) => {
  const isEmailExists = await findUserByEmail(email);
  if (isEmailExists) {
    throw new AppError(AUTH_MESSAGES.EMAIL_EXISTS, 409);
  }

  const isUsernameExists = await findUserByUsername(username);
  if (isUsernameExists) {
    throw new AppError(AUTH_MESSAGES.USERNAME_EXISTS, 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    username,
    email,
    password: passwordHash,
  });

  return user;
};

export const loginUser = async ({ email, password }: LoginUserInput) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_EXISTS, 404);
  }
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(AUTH_MESSAGES.USER_PASSWORD_NOT_MATCH, 401);
  }

  return user;
};

export const createAuthTokens = async (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  const hashedRefreshToken = hashToken(refreshToken);
  await saveRefreshToken({ token: hashedRefreshToken, userId });

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const hashedToken = hashToken(refreshToken);

  // check token exists in db
  const storedToken = await findRefreshToken(hashedToken);
  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  // check expiry
  if (storedToken.expiresAt < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  // generate new access token
  return generateAccessToken(payload.userId);
};

export const logoutUser = async (refreshToken: string) => {
  const hashedToken = hashToken(refreshToken);
  await deleteRefreshToken(hashedToken);
};

export const getCurrentUser = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
