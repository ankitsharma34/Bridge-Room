"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type registerDto, registerSchema } from "@bridgeroom/shared";
import PasswordInput from "./password-input";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";

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
  const onSubmit = (data: registerDto) => {
    console.log(data);
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
      <Button type="submit" className="mt-2 h-11 w-full rounded-xl">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
