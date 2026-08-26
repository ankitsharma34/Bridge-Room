import {
  DoorOpen,
  MessageSquare,
  Video,
  Film,
  Gamepad2,
  MonitorUp,
} from "lucide-react";

const features = [
  {
    id: "rooms",
    icon: DoorOpen,
    title: "Private Rooms",
    description:
      "Create dedicated, cozy spaces for different friend groups, families, or study buddies with custom codes and permissions.",
    tag: "Core Space",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Real-Time Chat",
    description:
      "Instant messaging with live typing indicators, delivery status, read receipts, and markdown support.",
    tag: "Messaging",
  },
  {
    id: "video",
    icon: Video,
    title: "Voice & Video",
    description:
      "Crystal clear audio and video hanging out. Jump in and out of the conversation whenever you like.",
    tag: "Presence",
  },
  {
    id: "media",
    icon: Film,
    title: "Shared Media",
    description:
      "Watch YouTube, movies, and streams in synchronized harmony. Never count down '3, 2, 1, play' again.",
    tag: "Watch Together",
  },
  {
    id: "games",
    icon: Gamepad2,
    title: "Mini Games",
    description:
      "Play quick multiplayer trivia, drawing games, and party classics directly in your room without leaving the chat.",
    tag: "Activities",
  },
  {
    id: "screenshare",
    icon: MonitorUp,
    title: "Screen Sharing",
    description:
      "Share your desktop or tabs to show vacation photos, work on group projects, or browse online together.",
    tag: "Collaboration",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Everything You Need
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything for meaningful hangouts
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            All the tools you need to spend quality time with your favorite people, under one warm roof.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-7 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
