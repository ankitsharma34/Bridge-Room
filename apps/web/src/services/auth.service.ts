import {
  loginDto,
  loginResponse,
  registerDto,
  registerResponseDto,
} from "@bridgeroom/shared";
import { api } from "./api";

export const authService = {
  register: async (payload: registerDto) => {
    const { data } = await api.post<registerResponseDto>(
      "/auth/register",
      payload,
    );
    return data;
  },

  login: async (payload: loginDto) => {
    const { data } = await api.post<loginResponse>("/auth/login", payload);
    return data;
  },
};
