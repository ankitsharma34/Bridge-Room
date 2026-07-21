import { z } from "zod";

// Requires at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address." }),
    username: z
      .string()
      .min(3, { message: "Username should be atleast 3 character long." })
      .max(20, { message: "Username should not exceed 20 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(passwordRegex, {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
