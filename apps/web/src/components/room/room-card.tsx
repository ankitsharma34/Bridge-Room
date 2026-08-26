import Link from "next/link";
import { RoomListItem } from "@/services/room.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RoomCardProps {
  room: RoomListItem;
}

export function RoomCard({ room }: RoomCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    toast.success(`Room code "${room.code}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div>
        {/* Card Header: Icon + Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-base transition-transform group-hover:scale-105">
            {room.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <Badge
              variant={room.role === "OWNER" ? "default" : "subtle"}
              className="text-[10px] uppercase font-semibold tracking-wider"
            >
              {room.role === "OWNER" ? "Owner" : "Member"}
            </Badge>

            {room.unreadCount > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5 font-bold">
                {room.unreadCount} unread
              </Badge>
            )}
          </div>
        </div>

        {/* Room Title & Description */}
        <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {room.name}
        </h3>

        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
          {room.description || "A cozy hangout space for your favorite people."}
        </p>

        {/* Room Code Badge with 1-click Copy */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/50">
          <span>CODE: {room.code}</span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="hover:text-foreground transition-colors p-0.5 rounded"
            title="Copy Code"
            aria-label="Copy room code"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      {/* Card Footer: Members + Open Action */}
      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <Users className="h-3.5 w-3.5" />
          <span>
            {room.memberCount} member{room.memberCount === 1 ? "" : "s"}
          </span>
        </div>

        <Button asChild size="sm" className="rounded-xl gap-1.5 text-xs font-semibold h-8 shadow-xs">
          <Link href={`/dashboard/rooms/${room.id}`}>
            Enter Room
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RoomCard;
