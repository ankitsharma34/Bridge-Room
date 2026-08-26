import { HeartHandshake, Shield, Sparkles, Compass } from "lucide-react";

const trustPoints = [
  {
    icon: HeartHandshake,
    title: "Made for Intimate Circles",
    description:
      "Not a crowded social network. A quiet, private haven made exclusively for your closest relationships.",
  },
  {
    icon: Shield,
    title: "100% Private & Ad-Free",
    description:
      "Your conversations stay between you and your circle. No surveillance algorithms or sponsored feeds.",
  },
  {
    icon: Compass,
    title: "Zero Setup Friction",
    description:
      "Send an 8-character code or link. Friends join from any browser on phone, tablet, or laptop instantly.",
  },
  {
    icon: Sparkles,
    title: "Always Feels Like Home",
    description:
      "Customizable spaces that stay alive with past memories, messages, and recurring hangouts.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Why BridgeRoom?
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Designed for genuine warmth, not endless scrolling.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="group relative rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
