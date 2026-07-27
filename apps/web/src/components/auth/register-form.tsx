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

const RegisterForm = () => {
  const form = useForm<registerDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegister({
    onSuccess: (response) => {
      setAccessToken(response.accessToken);
      toast.success(response.message);
      router.push("/dashboard");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Registration failed.");
        return;
      }

      toast.error("Something went wrong.");
    },
  });

  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: registerDto) => {
    registerMutation.mutate(data);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        id="username"
        type="text"
        {...form.register("username")}
        label="Username"
        placeholder="username"
        error={form.formState.errors.username?.message}
      />
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
      <PasswordInput
        id="confirmPassword"
        type="password"
        {...form.register("confirmPassword")}
        label="Confirm Password"
        placeholder="confirm password"
        error={form.formState.errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
