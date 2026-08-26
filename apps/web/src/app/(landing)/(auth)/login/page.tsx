import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import { Sparkles, Users, Video, MessageCircleHeart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your BridgeRoom account to join your rooms and hang out with friends.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-12">
        {/* Left Branding Column */}
        <div className="relative flex flex-col justify-between bg-primary/5 p-8 sm:p-12 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border/60">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Your Cozy Digital Space</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back to your circle.
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in to catch up with family across oceans, chat with friends, and hang out in your private rooms.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-8 space-y-3 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <Video className="h-4 w-4" />
              </div>
              <span>Real-time voice, video & screen sharing</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <Users className="h-4 w-4" />
              </div>
              <span>Private rooms reserved for people you care about</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary shadow-xs">
                <MessageCircleHeart className="h-4 w-4" />
              </div>
              <span>Instant messaging with typing indicators & read receipts</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to access your rooms
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
