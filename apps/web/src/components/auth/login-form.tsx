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

const LoginForm = () => {
  const form = useForm<loginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin({
    onSuccess: (response: loginResponse) => {
      setAccessToken(response.accessToken);
      toast.success(response.message);
      router.push("/dashboard");
    },

    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Login failed.");
        return;
      }

      toast.error("Something went wrong.");
    },
  });

  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: loginDto) => {
    loginMutation.mutate(data);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        id="email"
        type="email"
        {...form.register("email")}
        label="Email"
        placeholder="email"
        error={form.formState.errors.email?.message}
      />
      <PasswordInput
        id="password"
        type="password"
        {...form.register("password")}
        label="Password"
        placeholder="password"
        error={form.formState.errors.password?.message}
      />
      <Button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
