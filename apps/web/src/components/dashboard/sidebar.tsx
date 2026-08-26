"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMyRooms } from "@/hooks/queries/use-my-rooms";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DoorOpen,
  Plus,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { data: rooms, isLoading, isError } = useMyRooms();
  const params = useParams();
  const activeRoomId = params?.roomId as string | undefined;

  return (
    <aside className="flex h-full w-full flex-col border-r border-border/60 bg-card/40 md:w-72 lg:w-80 shrink-0">
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-2">
          <DoorOpen className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            My Rooms
          </h2>
          {rooms && rooms.length > 0 && (
            <Badge variant="subtle" className="h-5 px-1.5 text-[10px]">
              {rooms.length}
            </Badge>
          )}
        </div>

        <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/rooms/create" title="Create Room">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Rooms Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {isLoading ? (
          <div className="space-y-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl p-2.5">
                <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            <p>Could not load rooms.</p>
          </div>
        ) : !rooms || rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-foreground">No rooms yet</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Create a cozy room and invite your friends.
            </p>
            <Button asChild size="sm" className="mt-4 rounded-xl text-xs gap-1.5">
              <Link href="/dashboard/rooms/create">
                <Plus className="h-3.5 w-3.5" />
                Create Room
              </Link>
            </Button>
          </div>
        ) : (
          rooms.map((room) => {
            const isActive = activeRoomId === room.id;
            const hasUnread = room.unreadCount > 0;

            return (
              <Link
                key={room.id}
                href={`/dashboard/rooms/${room.id}`}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl p-2.5 transition-all text-left outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-medium"
                    : "hover:bg-muted/70 text-foreground",
                )}
              >
                {/* Room Avatar / Badge */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-transform group-hover:scale-102",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {room.name.substring(0, 2).toUpperCase()}
                </div>

                {/* Room Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold truncate",
                        isActive ? "text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {room.name}
                    </span>

                    {hasUnread && !isActive && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Last Message preview or member count */}
                  <p
                    className={cn(
                      "mt-0.5 text-[11px] truncate leading-tight",
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {room.lastMessage
                      ? room.lastMessage.content
                      : `${room.memberCount} member${room.memberCount === 1 ? "" : "s"}`}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Sidebar Footer Quick Action */}
      <div className="border-t border-border/60 p-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-start rounded-xl gap-2 text-xs font-medium"
        >
          <Link href="/dashboard/rooms">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            View All Rooms
          </Link>
        </Button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
