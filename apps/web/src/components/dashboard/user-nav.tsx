"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/mutations/use-logout";
import { User, LogOut, Plus, DoorOpen, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/queries/use-profile";

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoutMutation = useLogout();
  const user = useAuthStore((state) => state.user);

  // Sync profile if needed
  useProfile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  const displayName = user?.username || "Friend";
  const displayEmail = user?.email || "";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full p-1 text-left transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
        aria-expanded={isOpen}
        aria-label="User account menu"
      >
        <Avatar
          src={user?.avatarUrl}
          fallback={displayName}
          size="sm"
        />
        <span className="hidden sm:inline-block text-xs font-semibold text-foreground max-w-[120px] truncate">
          {displayName}
        </span>
        <ChevronDown className="hidden sm:inline-block h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl animate-in fade-in-0 zoom-in-95 z-50">
          {/* User Info Header */}
          <div className="border-b border-border/60 px-3 py-2.5">
            <p className="text-xs font-semibold text-foreground truncate">
              {displayName}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {displayEmail}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1 space-y-0.5">
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Your Profile
            </Link>

            <Link
              href="/dashboard/rooms"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <DoorOpen className="h-4 w-4 text-muted-foreground" />
              My Rooms
            </Link>

            <Link
              href="/dashboard/rooms/create"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
              Create Room
            </Link>
          </div>

          <div className="border-t border-border/60 pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserNav;
