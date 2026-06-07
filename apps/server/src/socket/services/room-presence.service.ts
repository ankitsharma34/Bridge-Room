import { redis } from "../../redis/redis.js";

const getRoomPresenceKey = (roomId: string) => `room_presence:${roomId}`;

export const addUserToRoomPresence = async (roomId: string, userId: string) => {
  await redis.sadd(getRoomPresenceKey(roomId), userId);
};

export const removeUserFromRoomPresence = async (
  roomId: string,
  userId: string,
) => {
  await redis.srem(getRoomPresenceKey(roomId), userId);
};

export const getRoomPresence = async (roomId: string) => {
  return await redis.smembers(getRoomPresenceKey(roomId));
};

export const getRoomPresenceCount = async (roomId: string) => {
  return await redis.scard(getRoomPresenceKey(roomId));
};
