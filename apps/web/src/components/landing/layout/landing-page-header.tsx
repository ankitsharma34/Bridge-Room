"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { useAuthStore } from "@/store/auth.store";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground font-semibold bg-muted/60"
                    : "text-muted-foreground hover:bg-muted/40",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {accessToken ? (
            <Button asChild size="sm" className="rounded-xl gap-2 font-medium shadow-sm">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-xl font-medium text-muted-foreground hover:text-foreground">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl gap-1.5 font-medium shadow-sm">
                <Link href="/register">
                  Sign Up
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 pt-2 pb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
            {accessToken ? (
              <Button asChild className="w-full rounded-xl gap-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full rounded-xl gap-1.5 font-medium shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/register">
                    Sign Up Free
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
