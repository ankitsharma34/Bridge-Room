import { hashPassword } from "../../utils/hash.js";
import { AUTH_MESSAGES } from "./auth.constants.js";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "./auth.repository.js";
import type { RegisterUserInput } from "./auth.types.js";

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
