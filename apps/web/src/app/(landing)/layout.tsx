import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "@/providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/landing/layout/landing-page-header";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BridgeRoom",
  description: "Real-time Hangout platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
