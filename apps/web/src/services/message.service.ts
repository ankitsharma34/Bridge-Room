import { api } from "./api";

export interface MessageSender {
  id: string;
  username: string;
  avatarUrl: string | null;
}

export interface ChatMessage {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  sender?: MessageSender;
  createdAt: string;
  updatedAt: string;
}

export type IncomingChatMessage = Omit<ChatMessage, "senderId" | "updatedAt"> & {
  senderId?: string;
  updatedAt?: string;
};

export type SendMessageAcknowledgement =
  | { success: true; message: IncomingChatMessage }
  | { success: false; error: string };

export const normalizeChatMessage = (
  message: IncomingChatMessage,
): ChatMessage => ({
  ...message,
  senderId: message.senderId ?? message.sender?.id ?? "",
  updatedAt: message.updatedAt ?? message.createdAt,
});

export interface GetMessagesResponse {
  success: boolean;
  messages: ChatMessage[];
  nextCursor: string | null;
}

export interface SendMessagePayload {
  content: string;
}

export interface PatchMessagePayload {
  content: string;
}

export const messageService = {
  getRoomMessages: async (
    roomId: string,
    cursor?: string,
  ): Promise<GetMessagesResponse> => {
    const { data } = await api.get<
      Omit<GetMessagesResponse, "messages"> & {
        messages: IncomingChatMessage[];
      }
    >(
      `/messages/rooms/${roomId}`,
      {
        params: cursor ? { cursor } : undefined,
      },
    );
    return {
      ...data,
      messages: data.messages.map(normalizeChatMessage),
    };
  },

  markAsRead: async (
    roomId: string,
    messageId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.post<{ success: boolean; message: string }>(
      `/messages/rooms/${roomId}/read`,
      { messageId },
    );
    return data;
  },

  updateMessage: async (
    messageId: string,
    payload: PatchMessagePayload,
  ): Promise<{ success: boolean; message: string; data: ChatMessage }> => {
    const { data } = await api.patch<{
      success: boolean;
      message: string;
      data: IncomingChatMessage;
    }>(`/messages/${messageId}`, payload);
    return {
      ...data,
      data: normalizeChatMessage(data.data),
    };
  },

  deleteMessage: async (
    messageId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.delete<{ success: boolean; message: string }>(
      `/messages/${messageId}`,
    );
    return data;
  },
};
