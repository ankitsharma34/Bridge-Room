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
  findRefreshToken,
  findUserByEmail,
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
    throw new Error(AUTH_MESSAGES.EMAIL_EXISTS);
  }

  const isUsernameExists = await findUserByUsername(username);
  if (isUsernameExists) {
    throw new Error(AUTH_MESSAGES.USERNAME_EXISTS);
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
    throw new Error(AUTH_MESSAGES.USER_NOT_EXISTS);
  }
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error(AUTH_MESSAGES.USER_PASSWORD_NOT_MATCH);
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
    throw new Error("Invalid refresh token");
  }

  // check expiry
  if (storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  // generate new access token
  return generateAccessToken(payload.userId);
};
