"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useMessages, messagesQueryKey } from "@/hooks/queries/use-messages";
import { ChatMessage } from "@/services/message.service";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import {
  Send,
  MessageSquare,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

interface RoomChatProps {
  roomId: string;
}

export function RoomChat({ roomId }: RoomChatProps) {
  const [inputText, setInputText] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useMessages(roomId);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const content = inputText.trim();
    if (!content || !user) return;

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

    setLocalMessages((prev) => [...prev, optimisticMessage]);
    setInputText("");

    try {
      // In real-time socket or API message send
      // In backend, messages are received via websocket `message:send` or API
      // If we mark read or send:
      queryClient.invalidateQueries({ queryKey: messagesQueryKey(roomId) });
    } catch {
      toast.error("Failed to send message.");
    }
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
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
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
            <p className="mt-3 text-xs font-semibold text-foreground">No messages yet</p>
            <p className="mt-1 text-[11px]">
              Start the conversation with your group!
            </p>
          </div>
        ) : (
          localMessages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            const senderName = msg.sender?.username || (isMe ? "You" : "Friend");
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
                    <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-muted-foreground">
                    <span>{timeString}</span>
                    {isMe && (
                      <CheckCheck className="h-3 w-3 text-primary/70" />
                    )}
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
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message... (Enter to send)"
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2 text-xs shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[38px] max-h-24"
            />
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={!inputText.trim()}
            className="h-[38px] w-[38px] rounded-xl shrink-0 shadow-xs"
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
