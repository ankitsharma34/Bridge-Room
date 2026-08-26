import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Film } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Join BridgeRoom to create private rooms and stay close to family and long-distance friends.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-12">
        {/* Left Branding Column */}
        <div className="relative flex flex-col justify-between bg-primary/5 p-8 sm:p-12 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border/60">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Start In Seconds</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bring your favorite people closer together.
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Create dedicated private hangout rooms for movie nights, study sessions, family dinners, or everyday chats.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-8 space-y-3 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span>End-to-end encrypted rooms & private invitations</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <span>No ads, no algorithms — pure human connection</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <Film className="h-4 w-4" />
              </div>
              <span>Synchronized media, games, and screen sharing</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Get started in 30 seconds. No credit card required.
              </p>
            </div>

            <RegisterForm />

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
