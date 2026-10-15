import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: {
    default: "BridgeRoom — Stay Close, No Matter the Distance",
    template: "%s | BridgeRoom",
  },
  description:
    "A private digital room where people you care about can meet, talk, watch, play, and hang out together in real time.",
  keywords: [
    "social hangout",
    "private rooms",
    "long distance friends",
    "family hangout",
    "virtual living room",
    "real-time chat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans antialiased">
      <body className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
