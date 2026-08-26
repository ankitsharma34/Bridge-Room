import {
  loginDto,
  loginResponse,
  registerDto,
  registerResponseDto,
} from "@bridgeroom/shared";
import { api } from "./api";
import { AuthUser } from "@/store/auth.store";

export interface GetMeResponse {
  success: boolean;
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const authService = {
  register: async (payload: registerDto): Promise<registerResponseDto> => {
    const { data } = await api.post<registerResponseDto>(
      "/auth/register",
      payload,
    );
    return data;
  },

  login: async (payload: loginDto): Promise<loginResponse> => {
    const { data } = await api.post<loginResponse>("/auth/login", payload);
    return data;
  },

  getMe: async (): Promise<GetMeResponse> => {
    const { data } = await api.get<GetMeResponse>("/auth/me");
    return data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const { data } = await api.post<LogoutResponse>("/auth/logout");
    return data;
  },
};
