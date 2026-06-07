import { redis } from "../../redis/redis.js";

const getActiveRoomKey = (userId: string) => `active_room:user:${userId}`;

export const setActiveRoom = async (userId: string, roomId: string) => {
  await redis.set(getActiveRoomKey(userId), roomId);
};

export const getActiveRoom = async (userId: string) => {
  return await redis.get(getActiveRoomKey(userId));
};

export const clearActiveRoom = async (userId: string) => {
  await redis.del(getActiveRoomKey(userId));
};
