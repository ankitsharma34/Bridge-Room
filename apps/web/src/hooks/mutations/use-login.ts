import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { loginResponse, loginDto } from "@bridgeroom/shared";

export const useLogin = (
  options?: UseMutationOptions<loginResponse, Error, loginDto>,
) => {
  return useMutation({
    mutationFn: authService.login,
    ...options,
  });
};
