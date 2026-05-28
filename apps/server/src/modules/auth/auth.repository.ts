import { prisma } from "../../prisma/prisma.js";
import { RegisterUserInput } from "./auth.types.js";

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
