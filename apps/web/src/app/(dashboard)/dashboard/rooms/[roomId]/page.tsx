"use client";

import { use, useState } from "react";
import { useRoom } from "@/hooks/queries/use-room";
import { RoomHeader } from "@/components/room/room-header";
import { RoomStage } from "@/components/room/room-stage";
import { RoomMembers } from "@/components/room/room-members";
import { RoomChat } from "@/components/room/room-chat";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DoorOpen, ArrowLeft, Users, MessageSquare } from "lucide-react";

interface RoomPageProps {
  params: Promise<{ roomId: string }>;
}

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = use(params);
  const { data: room, isLoading, isError } = useRoom(roomId);
  const [mobileTab, setMobileTab] = useState<"STAGE" | "CHAT" | "MEMBERS">("STAGE");

  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        {/* Header skeleton */}
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-6 bg-card">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>

        {/* Body skeleton */}
        <div className="flex flex-1 overflow-hidden p-6 gap-6">
          <Skeleton className="flex-1 rounded-3xl" />
          <Skeleton className="hidden lg:block w-80 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (isError || !room) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
          <DoorOpen className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">
          Room Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This room may have been deleted, or you might not have permission to join it.
        </p>
        <Button asChild className="mt-6 rounded-xl gap-2">
          <Link href="/dashboard/rooms">
            <ArrowLeft className="h-4 w-4" />
            Back to My Rooms
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Top Room Header */}
      <RoomHeader room={room} />

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex items-center justify-around border-b border-border/60 bg-muted/30 p-1 md:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("STAGE")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
            mobileTab === "STAGE"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          Hangout Stage
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("CHAT")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileTab === "CHAT"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="h-3 w-3" />
          Chat
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("MEMBERS")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileTab === "MEMBERS"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Users className="h-3 w-3" />
          Members
        </button>
      </div>

      {/* Main Room Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center Hangout Stage */}
        <div
          className={`flex-1 overflow-hidden ${
            mobileTab !== "STAGE" ? "hidden md:flex" : "flex"
          }`}
        >
          <RoomStage room={room} />
        </div>

        {/* Right Members Panel */}
        <div
          className={`h-full ${
            mobileTab !== "MEMBERS" ? "hidden xl:flex" : "flex w-full"
          }`}
        >
          <RoomMembers roomId={room.id} />
        </div>

        {/* Right Chat Panel */}
        <div
          className={`h-full ${
            mobileTab !== "CHAT" ? "hidden lg:flex" : "flex w-full"
          }`}
        >
          <RoomChat roomId={room.id} />
        </div>
      </div>
    </div>
  );
}
