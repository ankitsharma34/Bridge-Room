"use client";

import { useRoomMembers } from "@/hooks/queries/use-room-members";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Crown } from "lucide-react";

interface RoomMembersProps {
  roomId: string;
}

export function RoomMembers({ roomId }: RoomMembersProps) {
  const { data: members, isLoading, isError } = useRoomMembers(roomId);

  return (
    <div className="flex h-full flex-col border-l border-border/60 bg-card/30 w-64 lg:w-72 shrink-0">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Members
          </h3>
          {members && (
            <Badge variant="subtle" className="h-5 px-1.5 text-[10px]">
              {members.length}
            </Badge>
          )}
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {isLoading ? (
          <div className="space-y-2 pt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2.5 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="p-4 text-center text-xs text-muted-foreground">
            Could not load members.
          </p>
        ) : !members || members.length === 0 ? (
          <p className="p-4 text-center text-xs text-muted-foreground">
            No members in this room yet.
          </p>
        ) : (
          members.map((member) => {
            const isOwner = member.role === "OWNER";

            return (
              <div
                key={member.id}
                className="flex items-center justify-between gap-2.5 rounded-2xl p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative">
                    <Avatar
                      src={member.avatarUrl}
                      fallback={member.username}
                      size="sm"
                    />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate flex items-center gap-1">
                      {member.username}
                      {isOwner && (
                        <Crown className="h-3 w-3 text-amber-500 shrink-0" />
                      )}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {isOwner ? "Host" : "Member"}
                    </p>
                  </div>
                </div>

                {isOwner && (
                  <Badge
                    variant="subtle"
                    className="text-[9px] px-1.5 py-0 h-4 uppercase font-semibold"
                  >
                    Host
                  </Badge>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RoomMembers;
