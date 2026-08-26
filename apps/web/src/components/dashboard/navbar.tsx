"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/logo";
import { UserNav } from "./user-nav";
import { JoinRoomDialog } from "./join-room-dialog";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  DoorOpen,
  Plus,
  KeyRound,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Rooms", href: "/dashboard/rooms", icon: DoorOpen },
  { label: "Create Room", href: "/dashboard/rooms/create", icon: Plus },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-6">
            <Logo size="sm" href="/dashboard" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Join by Code Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJoinDialogOpen(true)}
              className="hidden sm:inline-flex rounded-xl gap-1.5 text-xs font-medium h-9"
            >
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              Join with Code
            </Button>

            {/* User Profile Menu */}
            <UserNav />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-background px-4 py-3 md:hidden space-y-2 animate-in slide-in-from-top-2">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setJoinDialogOpen(true);
                }}
                className="w-full rounded-xl gap-2 text-xs font-medium"
              >
                <KeyRound className="h-3.5 w-3.5 text-primary" />
                Join with Code
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Join Room Modal */}
      <JoinRoomDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </>
  );
}

export default DashboardNavbar;
