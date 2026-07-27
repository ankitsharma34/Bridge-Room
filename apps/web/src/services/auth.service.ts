import { registerDto } from "@bridgeroom/shared";
import { api } from "./api";
import { registerResponseDto } from "@bridgeroom/shared";

export const authService = {
  register: async (payload: registerDto) => {
    const { data } = await api.post<registerResponseDto>(
      "/auth/register",
      payload,
    );
    return data;
  },
};
