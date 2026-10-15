"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useSocket } from "@/providers/socket-provider";

const TYPING_START_DELAY_MS = 250;
const TYPING_INACTIVITY_MS = 1_500;

const EVENTS = {
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
  TYPING_UPDATED: "typing:updated",
} as const;

interface TypingUpdatedPayload {
  roomId: string;
  users: string[];
  count: number;
}

export const useTypingIndicator = (roomId: string) => {
  const { socket, status } = useSocket();
  const currentUserId = useAuthStore((state) => state.user?.id);
  const [typingUserIds, setTypingUserIds] = useState<string[]>([]);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  const clearTimer = (timer: typeof startTimerRef) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const stopTyping = useCallback(() => {
    clearTimer(startTimerRef);
    clearTimer(stopTimerRef);

    if (isTypingRef.current && status === "connected") {
      socket.emit(EVENTS.TYPING_STOP);
    }

    isTypingRef.current = false;
  }, [socket, status]);

  const notifyTyping = useCallback(
    (value: string) => {
      if (!value.trim()) {
        stopTyping();
        return;
      }

      if (status !== "connected") return;

      clearTimer(stopTimerRef);

      if (isTypingRef.current) {
        stopTimerRef.current = setTimeout(stopTyping, TYPING_INACTIVITY_MS);
        return;
      }

      if (startTimerRef.current) return;

      startTimerRef.current = setTimeout(() => {
        socket.emit(EVENTS.TYPING_START);
        isTypingRef.current = true;
        startTimerRef.current = null;
        stopTimerRef.current = setTimeout(stopTyping, TYPING_INACTIVITY_MS);
      }, TYPING_START_DELAY_MS);
    },
    [socket, status, stopTyping],
  );

  useEffect(() => {
    const handleTypingUpdated = (payload: TypingUpdatedPayload) => {
      if (payload.roomId !== roomId) return;

      setTypingUserIds(
        [...new Set(payload.users)].filter(
          (userId) => userId !== currentUserId,
        ),
      );
    };

    const handleDisconnect = () => setTypingUserIds([]);

    socket.on(EVENTS.TYPING_UPDATED, handleTypingUpdated);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off(EVENTS.TYPING_UPDATED, handleTypingUpdated);
      socket.off("disconnect", handleDisconnect);
    };
  }, [currentUserId, roomId, socket]);

  useEffect(() => stopTyping, [stopTyping]);

  return { typingUserIds, notifyTyping, stopTyping };
};
