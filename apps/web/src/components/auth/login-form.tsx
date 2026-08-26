"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type loginDto, loginResponse, loginSchema } from "@bridgeroom/shared";
import PasswordInput from "./password-input";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useLogin } from "@/hooks/mutations/use-login";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
  const form = useForm<loginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const loginMutation = useLogin({
    onSuccess: (response: loginResponse) => {
      setAuth(response.accessToken);
      toast.success(response.message || "Welcome back to BridgeRoom!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? "Invalid email or password";
        toast.error(msg);
        return;
      }
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const onSubmit = (data: loginDto) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        id="email"
        type="email"
        autoComplete="email"
        {...form.register("email")}
        label="Email Address"
        placeholder="you@example.com"
        error={form.formState.errors.email?.message}
      />

      <PasswordInput
        id="password"
        autoComplete="current-password"
        {...form.register("password")}
        label="Password"
        placeholder="Enter your password"
        error={form.formState.errors.password?.message}
      />

      <Button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl gap-2 font-medium shadow-sm transition-all"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
