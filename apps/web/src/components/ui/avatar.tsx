import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-14 w-14 text-lg",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = "User avatar", fallback = "U", size = "md", className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    // Pick initials or fallback
    const initials = fallback
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    // Deterministic pleasant gradient based on fallback string
    const colors = [
      "from-indigo-500 to-purple-600",
      "from-pink-500 to-rose-600",
      "from-amber-500 to-orange-600",
      "from-emerald-500 to-teal-600",
      "from-blue-500 to-cyan-600",
      "from-violet-500 to-fuchsia-600",
    ];
    const colorIndex =
      Math.abs(
        fallback.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
      ) % colors.length;

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-tr text-white",
              colors[colorIndex],
            )}
          >
            {initials}
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
