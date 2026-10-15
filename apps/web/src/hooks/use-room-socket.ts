"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/socket-provider";

const EVENTS = {
  ACTIVE_ROOM_JOIN: "active_room:join",
  ACTIVE_ROOM_LEAVE: "active_room:leave",
  ACTIVE_ROOM_JOINED: "active_room:joined",
  ACTIVE_ROOM_LEFT: "active_room:left",
  ROOM_PRESENCE_UPDATED: "room_presence:updated",
  MEMBER_JOINED_ROOM: "room:member_joined",
  MEMBER_LEFT_ROOM: "room:member_left",
} as const;

interface RoomPresencePayload {
  roomId: string;
  activeUsers: string[];
  count: number;
}

interface RoomMemberPresencePayload {
  roomId: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  };
}

export const useRoomSocket = (roomId: string) => {
  const { socket, status, error } = useSocket();
  const [isJoined, setIsJoined] = useState(false);
  const [onlineUserIds, setOnlineUserIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const handleRoomJoined = (joinedRoomId: string) => {
      if (joinedRoomId === roomId) setIsJoined(true);
    };

    const handleRoomLeft = (leftRoomId?: string) => {
      if (!leftRoomId || leftRoomId === roomId) {
        setIsJoined(false);
        setOnlineUserIds(new Set());
        setOnlineCount(0);
      }
    };

    const handlePresenceUpdated = (payload: RoomPresencePayload) => {
      if (payload.roomId !== roomId) return;

      setOnlineUserIds(new Set(payload.activeUsers));
      setOnlineCount(payload.count);
    };

    const handleMemberJoined = (payload: RoomMemberPresencePayload) => {
      if (payload.roomId !== roomId) return;

      setOnlineUserIds((current) => {
        return new Set(current).add(payload.user.id);
      });
    };

    const handleMemberLeft = (payload: RoomMemberPresencePayload) => {
      if (payload.roomId !== roomId) return;

      setOnlineUserIds((current) => {
        const next = new Set(current);
        next.delete(payload.user.id);
        return next;
      });
    };

    socket.on(EVENTS.ACTIVE_ROOM_JOINED, handleRoomJoined);
    socket.on(EVENTS.ACTIVE_ROOM_LEFT, handleRoomLeft);
    socket.on(EVENTS.ROOM_PRESENCE_UPDATED, handlePresenceUpdated);
    socket.on(EVENTS.MEMBER_JOINED_ROOM, handleMemberJoined);
    socket.on(EVENTS.MEMBER_LEFT_ROOM, handleMemberLeft);

    if (status === "connected") {
      socket.emit(EVENTS.ACTIVE_ROOM_JOIN, roomId);
    }

    return () => {
      if (status === "connected") {
        socket.emit(EVENTS.ACTIVE_ROOM_LEAVE);
      }

      socket.off(EVENTS.ACTIVE_ROOM_JOINED, handleRoomJoined);
      socket.off(EVENTS.ACTIVE_ROOM_LEFT, handleRoomLeft);
      socket.off(EVENTS.ROOM_PRESENCE_UPDATED, handlePresenceUpdated);
      socket.off(EVENTS.MEMBER_JOINED_ROOM, handleMemberJoined);
      socket.off(EVENTS.MEMBER_LEFT_ROOM, handleMemberLeft);
    };
  }, [roomId, socket, status]);

  return {
    isJoined,
    onlineUserIds,
    onlineCount,
    connectionStatus: status,
    connectionError: error,
  };
};
