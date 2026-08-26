import { api } from "./api";

export interface RoomListItem {
  id: string;
  code: string;
  name: string;
  description: string | null;
  role: "OWNER" | "MEMBER";
  memberCount: number;
  unreadCount: number;
  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface MyRoomsResponse {
  success: boolean;
  totalRooms: number;
  rooms: RoomListItem[];
}

export interface RoomDetail {
  id: string;
  code: string;
  name: string;
  description: string | null;
  owner: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoomDetailResponse {
  success: boolean;
  message?: string;
  room: RoomDetail;
}

export interface RoomMemberItem {
  id: string;
  username: string;
  avatarUrl: string | null;
  isVerified: boolean;
  role: "OWNER" | "MEMBER";
  joinedAt: string;
}

export interface RoomMembersResponse {
  success: boolean;
  roomId: string;
  memberCount: number;
  members: RoomMemberItem[];
}

export interface CreateRoomPayload {
  name: string;
  description?: string;
}

export interface CreateRoomResponse {
  success: boolean;
  room: {
    id: string;
    code: string;
    name: string;
    description: string | null;
  };
}

export interface JoinRoomPayload {
  code: string;
}

export interface UpdateRoomPayload {
  name?: string;
  description?: string;
}

export const roomService = {
  getMyRooms: async (): Promise<MyRoomsResponse> => {
    const { data } = await api.get<MyRoomsResponse>("/rooms/my-rooms");
    return data;
  },

  getRoomById: async (roomId: string): Promise<RoomDetailResponse> => {
    const { data } = await api.get<RoomDetailResponse>(`/rooms/${roomId}`);
    return data;
  },

  getRoomMembers: async (roomId: string): Promise<RoomMembersResponse> => {
    const { data } = await api.get<RoomMembersResponse>(`/rooms/${roomId}/members`);
    return data;
  },

  createRoom: async (payload: CreateRoomPayload): Promise<CreateRoomResponse> => {
    const { data } = await api.post<CreateRoomResponse>("/rooms/create", payload);
    return data;
  },

  joinRoom: async (payload: JoinRoomPayload): Promise<CreateRoomResponse> => {
    const { data } = await api.post<CreateRoomResponse>("/rooms/join", payload);
    return data;
  },

  leaveRoom: async (code: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.post<{ success: boolean; message: string }>("/rooms/leave", { code });
    return data;
  },

  updateRoom: async (
    roomId: string,
    payload: UpdateRoomPayload,
  ): Promise<RoomDetailResponse> => {
    const { data } = await api.patch<RoomDetailResponse>(`/rooms/${roomId}`, payload);
    return data;
  },

  deleteRoom: async (roomId: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.delete<{ success: boolean; message: string }>(`/rooms/${roomId}`);
    return data;
  },

  removeMember: async (
    roomId: string,
    memberId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.delete<{ success: boolean; message: string }>(
      `/rooms/${roomId}/members/${memberId}`,
    );
    return data;
  },
};
