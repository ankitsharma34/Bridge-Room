import FeaturesSection from "@/components/landing/features-section";
import CTASection from "@/components/landing/cta-section";
import type { Metadata } from "next";
import { Sparkles, Shield, Cpu, Zap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover all the ways BridgeRoom helps you stay close to friends and family with real-time video, chat, shared media, and games.",
};

const deeperFeatures = [
  {
    icon: Users,
    title: "Dedicated Virtual Living Rooms",
    description:
      "Permanent spaces tailored for your family, gaming squad, or study circle. Chat history, member lists, and room settings are always saved.",
  },
  {
    icon: Zap,
    title: "Low Latency Real-Time Sync",
    description:
      "Built with WebSockets and modern streaming pipelines to guarantee sub-second delivery for messages, typing indicators, and reactions.",
  },
  {
    icon: Shield,
    title: "Zero Spam & Invitation Control",
    description:
      "Every room is gated by unique codes and owner permissions. No uninvited guests or spam bots can ever enter your private circle.",
  },
  {
    icon: Cpu,
    title: "Lightweight & Resource-Friendly",
    description:
      "Engineered to run smoothly in standard web browsers on low-spec laptops, tablets, and smartphones without overheating your device.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="border-b border-border/60 bg-muted/20 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built For Connection</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Thoughtfully built for people who care
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Explore the tools and features designed to make long-distance interactions feel just like hanging out in the same living room.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <FeaturesSection />

      {/* Deep Dive Grid */}
      <section className="border-t border-border/60 bg-muted/10 py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Under the Hood
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Performance, privacy, and simplicity at the core of everything we build.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deeperFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
