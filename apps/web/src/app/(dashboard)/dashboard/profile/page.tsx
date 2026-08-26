"use client";

import { useProfile } from "@/hooks/queries/use-profile";
import { useMyRooms } from "@/hooks/queries/use-my-rooms";
import { useLogout } from "@/hooks/mutations/use-logout";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  ShieldCheck,
  DoorOpen,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { data: user } = useProfile();
  const { data: rooms } = useMyRooms();
  const logoutMutation = useLogout();

  const displayName = user?.username || "BridgeRoom Friend";
  const displayEmail = user?.email || "friend@bridgeroom.app";
  const ownedCount = rooms?.filter((r) => r.role === "OWNER").length || 0;
  const joinedCount = rooms?.filter((r) => r.role === "MEMBER").length || 0;

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar
            src={user?.avatarUrl}
            fallback={displayName}
            size="xl"
            className="h-20 w-20 text-2xl shadow-md ring-4 ring-background"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {displayName}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <Mail className="h-3.5 w-3.5" />
                  {displayEmail}
                </p>
              </div>

              <div className="flex items-center gap-2 justify-center sm:justify-end">
                <Badge variant={user?.isVerified ? "success" : "subtle"} className="gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {user?.isVerified ? "Verified User" : "Community Member"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground border-t border-border/50">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Member since {joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <DoorOpen className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold text-foreground">
              {ownedCount}
            </span>
          </div>
          <h3 className="mt-4 text-base font-bold text-foreground">
            Rooms Created
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Private hangout spaces you manage and own.
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold text-foreground">
              {joinedCount}
            </span>
          </div>
          <h3 className="mt-4 text-base font-bold text-foreground">
            Circles Joined
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Rooms you were invited to by friends or family.
          </p>
        </div>
      </div>

      {/* Account Actions */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Account Actions</h3>
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Sign Out</p>
            <p className="text-xs text-muted-foreground">
              Log out of your current BridgeRoom session on this device.
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="rounded-xl gap-2 text-xs font-semibold"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
