"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type registerDto, registerSchema } from "@bridgeroom/shared";
import PasswordInput from "./password-input";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { useRegister } from "@/hooks/mutations/use-register";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

export const RegisterForm = () => {
  const form = useForm<registerDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const registerMutation = useRegister({
    onSuccess: (response) => {
      setAuth(response.accessToken);
      toast.success(response.message || "Account created successfully! Welcome to BridgeRoom.");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? "Registration failed. Please check your inputs.";
        toast.error(msg);
        return;
      }
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const onSubmit = (data: registerDto) => {
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        id="username"
        type="text"
        autoComplete="username"
        {...form.register("username")}
        label="Username"
        placeholder="e.g. sarah_k"
        error={form.formState.errors.username?.message}
      />

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
        autoComplete="new-password"
        {...form.register("password")}
        label="Password"
        placeholder="At least 6 characters"
        error={form.formState.errors.password?.message}
      />

      <PasswordInput
        id="confirmPassword"
        autoComplete="new-password"
        {...form.register("confirmPassword")}
        label="Confirm Password"
        placeholder="Re-enter your password"
        error={form.formState.errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl gap-2 font-medium shadow-sm transition-all"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Free Account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
