"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useMyRooms } from "@/hooks/queries/use-my-rooms";
import { RoomCard } from "@/components/room/room-card";
import { JoinRoomDialog } from "@/components/dashboard/join-room-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  KeyRound,
  DoorOpen,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function DashboardHomePage() {
  const user = useAuthStore((state) => state.user);
  const { data: rooms, isLoading, isError } = useMyRooms();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = user?.username || "Friend";
  const totalUnread = rooms?.reduce((acc, r) => acc + r.unreadCount, 0) || 0;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-r from-primary/10 via-primary/5 to-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Welcome to BridgeRoom
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {getGreeting()}, {displayName} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here are your active hangout rooms and latest updates.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={() => setJoinDialogOpen(true)}
              className="rounded-xl gap-2 text-xs font-semibold shadow-xs"
            >
              <KeyRound className="h-4 w-4 text-primary" />
              Join with Code
            </Button>

            <Button asChild className="rounded-xl gap-2 text-xs font-semibold shadow-sm">
              <Link href="/dashboard/rooms/create">
                <Plus className="h-4 w-4" />
                Create Room
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Highlights Counters */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 border-t border-border/50 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-primary shadow-xs">
              <DoorOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">
                {isLoading ? "—" : rooms?.length ?? 0}
              </p>
              <p className="text-[11px] text-muted-foreground">Joined Rooms</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-primary shadow-xs">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">
                {isLoading ? "—" : totalUnread}
              </p>
              <p className="text-[11px] text-muted-foreground">Unread Messages</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-emerald-500 shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">Ready</p>
              <p className="text-[11px] text-muted-foreground">Real-time Connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rooms Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Your Rooms
            </h2>
            {rooms && rooms.length > 0 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground font-medium">
                {rooms.length}
              </span>
            )}
          </div>

          {rooms && rooms.length > 0 && (
            <Link
              href="/dashboard/rooms"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-border p-6 space-y-4 bg-card"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="pt-4 border-t border-border/50 flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <p className="text-sm font-semibold text-destructive">
              Failed to load your rooms.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Please check your connection and try refreshing the page.
            </p>
          </div>
        ) : !rooms || rooms.length === 0 ? (
          <div className="rounded-3xl border border-border/80 bg-card p-10 sm:p-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">
              Your room list is empty
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Create a private space for your friends and family or join an existing room with an invite code.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild className="rounded-xl gap-2">
                <Link href="/dashboard/rooms/create">
                  <Plus className="h-4 w-4" />
                  Create Your First Room
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setJoinDialogOpen(true)}
                className="rounded-xl gap-2"
              >
                <KeyRound className="h-4 w-4 text-primary" />
                Join with Code
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      {/* Join Room Dialog */}
      <JoinRoomDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </div>
  );
}
