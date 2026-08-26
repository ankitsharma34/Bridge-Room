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
    const { data } = await api.get<GetMessagesResponse>(
      `/messages/rooms/${roomId}`,
      {
        params: cursor ? { cursor } : undefined,
      },
    );
    return data;
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
      data: ChatMessage;
    }>(`/messages/${messageId}`, payload);
    return data;
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
