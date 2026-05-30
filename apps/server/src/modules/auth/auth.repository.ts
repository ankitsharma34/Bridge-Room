import { prisma } from "../../prisma/prisma.js";
import { REFRESH_TOKEN_AGE } from "./auth.constants.js";
import { RefreshTokenPayload, RegisterUserInput } from "./auth.types.js";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const createUser = (data: RegisterUserInput) => {
  return prisma.user.create({
    data,
  });
};

export const saveRefreshToken = ({ token, userId }: RefreshTokenPayload) => {
  return prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_AGE),
    },
  });
};

export const findRefreshToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const deleteRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
};
