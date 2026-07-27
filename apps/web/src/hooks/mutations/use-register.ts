import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { registerResponseDto, registerDto } from "@bridgeroom/shared";

export const useRegister = (
  options?: UseMutationOptions<registerResponseDto, Error, registerDto>,
) => {
  return useMutation({
    mutationFn: authService.register,
    ...options,
  });
};
