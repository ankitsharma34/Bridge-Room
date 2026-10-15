"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/providers/socket-provider";
import { useAuthStore } from "@/store/auth.store";
import { MY_ROOMS_QUERY_KEY } from "@/hooks/queries/use-my-rooms";
import type { RoomListItem } from "@/services/room.service";
import type { ChatMessage } from "@/services/message.service";

const EVENTS = {
  MESSAGE_DELIVERED: "message:delivered",
  MESSAGE_READ: "message:read",
} as const;

interface DeliveryReceiptPayload {
  messageId: string;
  userId: string;
}

interface ReadReceiptPayload extends DeliveryReceiptPayload {
  roomId: string;
}

export type MessageReceiptStatus = "sending" | "sent" | "delivered" | "read";

export const useMessageReceipts = (roomId: string, messages: ChatMessage[]) => {
  const { socket, status } = useSocket();
  const currentUserId = useAuthStore((state) => state.user?.id);
  const queryClient = useQueryClient();
  const chatRef = useRef<HTMLDivElement>(null);
  const deliveredMessageIdsRef = useRef(new Set<string>());
  const readMessageIdsRef = useRef(new Set<string>());
  const [isElementVisible, setIsElementVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () =>
      typeof document !== "undefined" && document.visibilityState === "visible",
  );
  const [deliveredByMessage, setDeliveredByMessage] = useState<
    Record<string, Set<string>>
  >({});
  const [readByMessage, setReadByMessage] = useState<
    Record<string, Set<string>>
  >({});

  const addReceipt = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<Record<string, Set<string>>>>,
      messageId: string,
      userId: string,
    ) => {
      if (userId === currentUserId) return;

      setter((current) => ({
        ...current,
        [messageId]: new Set(current[messageId]).add(userId),
      }));
    },
    [currentUserId],
  );

  useEffect(() => {
    const handleDelivered = ({ messageId, userId }: DeliveryReceiptPayload) => {
      addReceipt(setDeliveredByMessage, messageId, userId);
    };
    const handleRead = ({
      roomId: receiptRoomId,
      messageId,
      userId,
    }: ReadReceiptPayload) => {
      if (receiptRoomId !== roomId) return;
      addReceipt(setReadByMessage, messageId, userId);
    };

    socket.on(EVENTS.MESSAGE_DELIVERED, handleDelivered);
    socket.on(EVENTS.MESSAGE_READ, handleRead);

    return () => {
      socket.off(EVENTS.MESSAGE_DELIVERED, handleDelivered);
      socket.off(EVENTS.MESSAGE_READ, handleRead);
    };
  }, [addReceipt, roomId, socket]);

  useEffect(() => {
    const element = chatRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsElementVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const markDelivered = useCallback(
    (message: ChatMessage) => {
      if (
        status !== "connected" ||
        message.senderId === currentUserId ||
        deliveredMessageIdsRef.current.has(message.id)
      ) {
        return;
      }

      deliveredMessageIdsRef.current.add(message.id);
      socket.emit(EVENTS.MESSAGE_DELIVERED, message.id);
    },
    [currentUserId, socket, status],
  );

  useEffect(() => {
    const newestMessage = messages.at(-1);
    if (
      !newestMessage ||
      newestMessage.id.startsWith("temp-") ||
      status !== "connected" ||
      !isElementVisible ||
      !isDocumentVisible ||
      readMessageIdsRef.current.has(newestMessage.id)
    ) {
      return;
    }

    readMessageIdsRef.current.add(newestMessage.id);
    socket.emit(EVENTS.MESSAGE_READ, {
      roomId,
      messageId: newestMessage.id,
    });

    queryClient.setQueryData<RoomListItem[]>(MY_ROOMS_QUERY_KEY, (rooms) =>
      rooms?.map((room) =>
        room.id === roomId ? { ...room, unreadCount: 0 } : room,
      ),
    );
  }, [
    isDocumentVisible,
    isElementVisible,
    messages,
    queryClient,
    roomId,
    socket,
    status,
  ]);

  const getReceiptStatus = useCallback(
    (message: ChatMessage): MessageReceiptStatus => {
      if (message.id.startsWith("temp-")) return "sending";
      if (readByMessage[message.id]?.size) return "read";
      if (deliveredByMessage[message.id]?.size) return "delivered";
      return "sent";
    },
    [deliveredByMessage, readByMessage],
  );

  return { chatRef, markDelivered, getReceiptStatus };
};
