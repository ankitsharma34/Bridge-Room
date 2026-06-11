import { redis } from "../../redis/redis.js";

const getTypingKey = (roomId: string) => `typing:${roomId}`;

export const addTypingUser = async (roomId: string, userId: string) => {
  await redis.sadd(getTypingKey(roomId), userId);
};

export const removeTypingUser = async (roomId: string, userId: string) => {
  await redis.srem(getTypingKey(roomId), userId);
};

export const getTypingUsers = async (roomId: string) => {
  return redis.smembers(getTypingKey(roomId));
};
