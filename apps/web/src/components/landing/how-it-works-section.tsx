import { PlusCircle, Send, Users } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create a room",
    description:
      "Pick a name like 'Family Sunday' or 'College Squad' and generate a private room in one click.",
    icon: PlusCircle,
  },
  {
    step: "02",
    title: "Invite your people",
    description:
      "Share your unique 8-character room code or invite link via WhatsApp, iMessage, or email.",
    icon: Send,
  },
  {
    step: "03",
    title: "Hang out together",
    description:
      "Talk, chat, watch movies, and play games in synchronized harmony with live presence.",
    icon: Users,
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Simple & Effortless
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How BridgeRoom Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            No complicated installs. No confusing permissions. Start in under a minute.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col items-center rounded-3xl border border-border/70 bg-card p-8 text-center shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* Step badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-sm shadow-primary/25">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
                  Step {item.step}
                </span>

                <h3 className="mt-2 text-xl font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
