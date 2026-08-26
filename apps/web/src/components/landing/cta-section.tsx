import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Soft gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-primary/5 to-card p-8 sm:p-14 text-center shadow-lg shadow-primary/5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Ready for your next hangout?</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Distance shouldn&apos;t keep you apart.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
            Create a room in 30 seconds and bring your favorite people together under one warm digital roof.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-xl gap-2 px-8 text-base font-semibold shadow-md shadow-primary/25">
              <Link href="/register">
                Create Your Free Room
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="lg" className="w-full sm:w-auto rounded-xl px-7 text-base font-medium">
              <Link href="/login">
                Already a member? Sign in
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
