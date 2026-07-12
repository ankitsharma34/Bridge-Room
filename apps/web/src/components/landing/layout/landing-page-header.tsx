import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../logo";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "About",
    href: "/about",
  },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
