import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Video, MessageSquare, Gamepad2, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[600px] rounded-full bg-primary/8 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-xs">
            <Sparkles className="h-4 w-4" />
            <span>Built for friends & families living apart</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.15]">
            Stay close, <br className="hidden sm:inline" />
            <span className="text-primary">no matter the distance.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Create a private room, invite the people you care about, and hang out together in real time. Talk, watch, play, and share moments as if you were in the same room.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-xl gap-2 px-7 text-base font-semibold shadow-md shadow-primary/20">
              <Link href="/register">
                Create a Room
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto rounded-xl px-7 text-base font-medium">
              <Link href="/features">
                Explore Features
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Free forever for small groups • No downloads required • Invite via private link
          </p>
        </div>

        {/* Hero Visual: Interactive Hangout Room Simulation */}
        <div className="mt-14 sm:mt-18 mx-auto max-w-5xl">
          <div className="rounded-3xl border border-border/80 bg-card p-3 sm:p-5 shadow-xl shadow-foreground/5">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5 px-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  🏠 Family Sunday Hangout
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground font-mono">
                  CODE: SUN-8842
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  4 online
                </span>
              </div>
            </div>

            {/* Room Content Mockup */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Main Stage: Watch Party / Hangout */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-video rounded-2xl bg-muted/70 overflow-hidden border border-border/50 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-lg bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
                    <Video className="h-3.5 w-3.5 text-primary" />
                    Synchronized Stream Active
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                    <Heart className="h-7 w-7 fill-current" />
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-foreground">Watching Studio Ghibli Night</h4>
                  <p className="text-xs text-muted-foreground mt-1">Synchronized playback across California, London & Tokyo</p>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-background/90 backdrop-blur-sm p-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="inline-block h-6 w-6 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-background">M</div>
                        <div className="inline-block h-6 w-6 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-background">R</div>
                        <div className="inline-block h-6 w-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-background">K</div>
                        <div className="inline-block h-6 w-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-background">Y</div>
                      </div>
                      <span className="text-muted-foreground font-medium">Mom, Rahul, Kevin & You</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary font-medium">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      Trivia next
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Sidebar Simulation */}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-3.5 flex flex-col justify-between h-[240px] sm:h-auto">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    Room Chat
                  </span>
                  <span className="text-[10px] text-muted-foreground">Live</span>
                </div>

                <div className="space-y-2.5 py-2 overflow-hidden text-xs">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">M</div>
                    <div className="bg-background rounded-xl rounded-tl-none p-2 border border-border/50 shadow-xs">
                      <span className="font-semibold text-foreground text-[11px] block">Mom</span>
                      Can everyone hear the audio clearly? ❤️
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">R</div>
                    <div className="bg-background rounded-xl rounded-tl-none p-2 border border-border/50 shadow-xs">
                      <span className="font-semibold text-foreground text-[11px] block">Rahul</span>
                      Crystal clear! Starting popcorn now 🍿
                    </div>
                  </div>

                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-xl rounded-tr-none p-2 shadow-xs">
                      So great seeing everyone tonight!
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-background px-2.5 py-1 text-xs text-muted-foreground border border-border/50">
                    Type a message...
                  </div>
                  <div className="h-6 w-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
