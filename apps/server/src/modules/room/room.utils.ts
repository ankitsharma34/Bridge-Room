import crypto from "node:crypto";

export const generateRoomCode = () => {
  // generate a unique room code (4 bytes * 2 = 8 characters)
  return crypto.randomBytes(4).toString("hex").toUpperCase();
};
