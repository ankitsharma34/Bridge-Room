import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Heart } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
];

const productLinks = [
  { label: "Private Rooms", href: "/features#rooms" },
  { label: "Real-Time Chat", href: "/features#chat" },
  { label: "Shared Media", href: "/features#media" },
  { label: "Mini Games", href: "/features#games" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              A cozy digital hangout built to help long-distance friends and families stay connected in real time.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" />
              <span>for people who care.</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Status Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal & Trust
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-border/70 bg-card p-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                All Systems Operational
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {currentYear} BridgeRoom. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
