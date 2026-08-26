"use client";

import { useState } from "react";
import { RoomDetail } from "@/services/room.service";
import { useAuthStore } from "@/store/auth.store";
import { useDeleteRoom } from "@/hooks/mutations/use-delete-room";
import { useLeaveRoom } from "@/hooks/mutations/use-leave-room";
import { EditRoomDialog } from "./edit-room-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  Share2,
  Settings,
  LogOut,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface RoomHeaderProps {
  room: RoomDetail;
}

export function RoomHeader({ room }: RoomHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const deleteRoomMutation = useDeleteRoom();
  const leaveRoomMutation = useLeaveRoom();

  const isOwner = user?.id === room.owner.id;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    toast.success(`Invite code "${room.code}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Room link copied to clipboard!");
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      deleteRoomMutation.mutate(room.id);
    }
  };

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave this room?")) {
      leaveRoomMutation.mutate(room.code);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 bg-card/60 px-4 py-3.5 sm:px-6 backdrop-blur-sm">
        {/* Left: Room details */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-sm">
            {room.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
                {room.name}
              </h1>

              <Badge variant={isOwner ? "default" : "subtle"} className="text-[10px] uppercase">
                {isOwner ? "Host" : "Member"}
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 font-mono">
                <span>CODE: {room.code}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="hover:text-foreground p-0.5 rounded"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>

              <span>•</span>

              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {room.memberCount} member{room.memberCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareLink}
            className="rounded-xl gap-1.5 text-xs font-semibold h-8"
          >
            <Share2 className="h-3.5 w-3.5 text-primary" />
            Share
          </Button>

          {isOwner ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditDialogOpen(true)}
                className="rounded-xl gap-1.5 text-xs h-8"
              >
                <Settings className="h-3.5 w-3.5" />
                Edit
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleteRoomMutation.isPending}
                className="rounded-xl gap-1.5 text-xs text-destructive hover:bg-destructive/10 h-8"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLeave}
              disabled={leaveRoomMutation.isPending}
              className="rounded-xl gap-1.5 text-xs text-destructive hover:bg-destructive/10 h-8"
            >
              <LogOut className="h-3.5 w-3.5" />
              Leave
            </Button>
          )}
        </div>
      </div>

      <EditRoomDialog
        roomId={room.id}
        currentName={room.name}
        currentDescription={room.description}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}

export default RoomHeader;
