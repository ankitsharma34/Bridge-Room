import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  size = "md",
  showTagline = false,
  className,
  href = "/",
}: LogoProps) {
  const iconSizes = {
    sm: "h-8 w-8 text-xs rounded-lg",
    md: "h-10 w-10 text-sm rounded-xl",
    lg: "h-12 w-12 text-base rounded-2xl",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group transition-transform active:scale-98", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/25 transition-all group-hover:shadow-md group-hover:shadow-primary/30",
          iconSizes[size],
        )}
      >
        {/* Bridge & Connection Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          {/* Bridge arch / connection line */}
          <path d="M4 19c0-4.418 3.582-8 8-8s8 3.582 8 8" />
          <path d="M8 11V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold tracking-tight text-foreground transition-colors group-hover:text-primary",
            textSizes[size],
          )}
        >
          Bridge<span className="text-primary font-extrabold">Room</span>
        </span>
        {showTagline && (
          <span className="text-xs text-muted-foreground font-normal">
            Stay close, no matter the distance
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
