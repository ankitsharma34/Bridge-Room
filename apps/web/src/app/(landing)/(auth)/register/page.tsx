import Link from "next/link";

import RegisterForm from "@/components/auth/register-form";
import Logo from "@/components/landing/logo";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h1>
        </div>

        <RegisterForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
