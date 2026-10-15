import { z } from "zod";

export const sendMessagePayloadSchema = z.object({
  roomId: z.cuid2({ message: "Invalid Room ID." }),
  content: z.string().trim().min(1, { message: "Message cannot be empty." }),
});

export type SendMessagePayload = z.infer<typeof sendMessagePayloadSchema>;

export interface SocketMessage {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    username: string;
    avatarUrl: string | null;
    isVerified: boolean;
  };
}

export type SendMessageAcknowledgement =
  | { success: true; message: SocketMessage }
  | { success: false; error: string };

export type SendMessageAcknowledge = (
  result: SendMessageAcknowledgement,
) => void;
