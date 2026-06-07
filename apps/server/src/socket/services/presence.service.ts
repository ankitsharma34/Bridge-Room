import { redis } from "../../redis/redis.js";

const getOnlineUserKey = (userId: string) => `online:user:${userId}`;

export const markUserOnline = async (userId: string, socketId: string) => {
  await redis.sadd(getOnlineUserKey(userId), socketId);
};

export const markUserOffline = async (userId: string, socketId: string) => {
  const key = getOnlineUserKey(userId);
  await redis.srem(key, socketId);
  const remainingSockets = await redis.scard(key);
  if (remainingSockets === 0) {
    await redis.del(key);
  }
  return remainingSockets;
};
