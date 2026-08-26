"use client";

import { useState } from "react";
import Link from "next/link";
import { useMyRooms } from "@/hooks/queries/use-my-rooms";
import { RoomCard } from "@/components/room/room-card";
import { JoinRoomDialog } from "@/components/dashboard/join-room-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, KeyRound, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterTab = "ALL" | "OWNED" | "JOINED";

export default function MyRoomsPage() {
  const { data: rooms, isLoading, isError } = useMyRooms();
  const [filter, setFilter] = useState<FilterTab>("ALL");
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const filteredRooms = rooms?.filter((room) => {
    if (filter === "OWNED") return room.role === "OWNER";
    if (filter === "JOINED") return room.role === "MEMBER";
    return true;
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Rooms
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage all the private rooms you belong to or own.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setJoinDialogOpen(true)}
            className="rounded-xl gap-1.5 text-xs font-semibold"
          >
            <KeyRound className="h-4 w-4 text-primary" />
            Join with Code
          </Button>

          <Button asChild className="rounded-xl gap-1.5 text-xs font-semibold">
            <Link href="/dashboard/rooms/create">
              <Plus className="h-4 w-4" />
              Create Room
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-border/60 pb-3">
        {(
          [
            { key: "ALL", label: "All Rooms" },
            { key: "OWNED", label: "Created by Me" },
            { key: "JOINED", label: "Joined Circles" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === tab.key
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
            Failed to load rooms.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please try again in a few moments.
          </p>
        </div>
      ) : !filteredRooms || filteredRooms.length === 0 ? (
        <div className="rounded-3xl border border-border/80 bg-card p-10 sm:p-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <DoorOpen className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-foreground">
            {filter === "ALL"
              ? "No rooms found"
              : filter === "OWNED"
                ? "You haven't created any rooms yet"
                : "You haven't joined any other rooms yet"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Create a private room to start hanging out with your friends and family.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="rounded-xl gap-2">
              <Link href="/dashboard/rooms/create">
                <Plus className="h-4 w-4" />
                Create Room
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      {/* Join Dialog */}
      <JoinRoomDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </div>
  );
}
