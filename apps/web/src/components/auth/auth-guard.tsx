"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/common/logo";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // Wait for Zustand hydration from localStorage
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hydrated, accessToken, router]);

  if (!hydrated || !accessToken) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Logo size="lg" href="" />
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Entering BridgeRoom...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
