import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h1>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          New User?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
