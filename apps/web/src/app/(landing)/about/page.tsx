import CTASection from "@/components/landing/cta-section";
import type { Metadata } from "next";
import { Heart, Globe, Users, Smile } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Why we built BridgeRoom: to bridge the physical gap between loved ones with comfortable digital spaces.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-border/60 bg-muted/20 py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Our Mission</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Bridging the physical distance between hearts
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            We built BridgeRoom because distance is hard. Whether you are living in a new country, studying in another city, or just busy during the week, staying in touch with the people who matter shouldn&apos;t feel like a chore.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                The Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Not a social network. A living room.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Modern social platforms are designed to maximize screen time, engagement metrics, and sponsored feeds. They pull people into passive consumption instead of active connection.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                BridgeRoom is different. There are no public follower counts, no algorithmic discovery feeds, and no ads. Just a cozy room where you can turn on your camera, put on a movie, share your screen, and just *be* together.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs text-center">
                <Globe className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 text-base font-bold text-foreground">Global</h3>
                <p className="mt-1 text-xs text-muted-foreground">Connecting loved ones across every continent</p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs text-center">
                <Users className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 text-base font-bold text-foreground">Close Circles</h3>
                <p className="mt-1 text-xs text-muted-foreground">Dedicated to families, partners, & close friends</p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs text-center col-span-2">
                <Smile className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 text-base font-bold text-foreground">Comfort First</h3>
                <p className="mt-1 text-xs text-muted-foreground">Minimal friction, zero clutter, intuitive warmth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
