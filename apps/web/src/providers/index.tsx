"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./query-provider";
import { SocketProvider } from "./socket-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SocketProvider>
        {children}
        <Toaster richColors />
      </SocketProvider>
    </QueryProvider>
  );
}
