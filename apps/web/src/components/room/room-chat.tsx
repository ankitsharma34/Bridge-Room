"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useMessages, messagesQueryKey } from "@/hooks/queries/use-messages";
import {
  type ChatMessage,
  type GetMessagesResponse,
  type IncomingChatMessage,
  type SendMessageAcknowledgement,
  normalizeChatMessage,
} from "@/services/message.service";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/providers/socket-provider";
import {
  Send,
  MessageSquare,
  Sparkles,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface RoomChatProps {
  roomId: string;
}

interface DeletedMessagePayload {
  messageId: string;
}

type MessageUpdater = (messages: ChatMessage[]) => ChatMessage[];

const EVENTS = {
  MESSAGE_SEND: "message:send",
  MESSAGE_RECEIVED: "message:received",
  MESSAGE_UPDATED: "message:updated",
  MESSAGE_DELETED: "message:deleted",
} as const;

export function RoomChat({ roomId }: RoomChatProps) {
  const [inputText, setInputText] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useMessages(roomId);
  const {
    socket,
    status: connectionStatus,
    error: connectionError,
  } = useSocket();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const updateMessages = useCallback(
    (updater: MessageUpdater) => {
      setLocalMessages(updater);
      queryClient.setQueriesData<GetMessagesResponse>(
        { queryKey: messagesQueryKey(roomId) },
        (current) =>
          current
            ? { ...current, messages: updater(current.messages) }
            : current,
      );
    },
    [queryClient, roomId],
  );

  // Sync query data into local messages
  useEffect(() => {
    if (data?.messages) {
      setLocalMessages(data.messages);
    }
  }, [data?.messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    const handleMessageReceived = (incoming: IncomingChatMessage) => {
      if (incoming.roomId !== roomId) return;
      const message = normalizeChatMessage(incoming);

      updateMessages((current) => {
        if (current.some((item) => item.id === message.id)) return current;

        const optimisticIndex =
          message.senderId === user?.id
            ? current.findIndex(
                (item) =>
                  item.id.startsWith("temp-") &&
                  item.content === message.content,
              )
            : -1;

        if (optimisticIndex === -1) return [...current, message];

        const next = [...current];
        next[optimisticIndex] = message;
        return next;
      });
    };

    const handleMessageUpdated = (incoming: IncomingChatMessage) => {
      if (incoming.roomId !== roomId) return;
      const message = normalizeChatMessage(incoming);

      updateMessages((current) =>
        current.map((item) => (item.id === message.id ? message : item)),
      );
    };

    const handleMessageDeleted = ({ messageId }: DeletedMessagePayload) => {
      updateMessages((current) =>
        current.filter((message) => message.id !== messageId),
      );
    };

    socket.on(EVENTS.MESSAGE_RECEIVED, handleMessageReceived);
    socket.on(EVENTS.MESSAGE_UPDATED, handleMessageUpdated);
    socket.on(EVENTS.MESSAGE_DELETED, handleMessageDeleted);

    return () => {
      socket.off(EVENTS.MESSAGE_RECEIVED, handleMessageReceived);
      socket.off(EVENTS.MESSAGE_UPDATED, handleMessageUpdated);
      socket.off(EVENTS.MESSAGE_DELETED, handleMessageDeleted);
    };
  }, [roomId, socket, updateMessages, user?.id]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const content = inputText.trim();
    if (!content || !user || connectionStatus !== "connected" || isSending)
      return;

    // Optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      content,
      roomId,
      senderId: user.id,
      sender: {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    updateMessages((current) => [...current, optimisticMessage]);
    setInputText("");
    setIsSending(true);
    setSendError(null);

    socket
      .timeout(10_000)
      .emit(
        EVENTS.MESSAGE_SEND,
        { roomId, content },
        (
          timeoutError: Error | null,
          acknowledgement?: SendMessageAcknowledgement,
        ) => {
          const acknowledgementError =
            acknowledgement && !acknowledgement.success
              ? acknowledgement.error
              : undefined;

          if (timeoutError || !acknowledgement || !acknowledgement.success) {
            const message =
              timeoutError?.message ||
              acknowledgementError ||
              "The message could not be sent.";

            updateMessages((current) =>
              current.filter((item) => item.id !== tempId),
            );
            setInputText((current) => current || content);
            setSendError(message);
            setIsSending(false);
            toast.error(message);
            return;
          }

          const persistedMessage = normalizeChatMessage(
            acknowledgement.message,
          );
          updateMessages((current) => {
            const withoutOptimistic = current.filter(
              (item) => item.id !== tempId,
            );

            return withoutOptimistic.some(
              (item) => item.id === persistedMessage.id,
            )
              ? withoutOptimistic
              : [...withoutOptimistic, persistedMessage];
          });
          setIsSending(false);
        },
      );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col border-l border-border/60 bg-card/40 w-80 lg:w-96 shrink-0">
      {/* Chat Header */}
      <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Room Chat
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              sendError || connectionError
                ? "bg-destructive"
                : connectionStatus === "connected"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
            }`}
          />
          {isSending
            ? "Sending..."
            : sendError || connectionError
              ? "Connection issue"
              : connectionStatus === "connected"
                ? "Live"
                : connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Offline"}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-8 w-3/4 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-xs text-muted-foreground pt-4">
            Could not load messages.
          </p>
        ) : localMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-foreground">
              No messages yet
            </p>
            <p className="mt-1 text-[11px]">
              Start the conversation with your group!
            </p>
          </div>
        ) : (
          localMessages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            const senderName =
              msg.sender?.username || (isMe ? "You" : "Friend");
            const timeString = new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  isMe ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isMe && (
                  <Avatar
                    src={msg.sender?.avatarUrl}
                    fallback={senderName}
                    size="sm"
                    className="mt-0.5"
                  />
                )}

                <div
                  className={`flex flex-col max-w-[75%] ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {!isMe && (
                    <span className="text-[11px] font-semibold text-foreground mb-0.5 px-1">
                      {senderName}
                    </span>
                  )}

                  <div
                    className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/80 text-foreground border border-border/50 rounded-tl-none"
                    }`}
                  >
                    <p className="wrap-break-word whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-muted-foreground">
                    <span>{timeString}</span>
                    {isMe &&
                      (msg.id.startsWith("temp-") ? (
                        <Loader2 className="h-3 w-3 animate-spin text-primary/70" />
                      ) : (
                        <CheckCheck className="h-3 w-3 text-primary/70" />
                      ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <div className="border-t border-border/60 p-3 bg-card/60">
        {(sendError || connectionError) && (
          <p className="mb-2 text-[10px] text-destructive" role="alert">
            {sendError || connectionError}
          </p>
        )}
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSendError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Send a message... (Enter to send)"
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2 text-xs shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-9.5 max-h-24"
            />
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={
              !inputText.trim() || isSending || connectionStatus !== "connected"
            }
            className="h-9.5 w-9.5 rounded-xl shrink-0 shadow-xs"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RoomChat;
