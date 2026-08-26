"use client";

import { useState } from "react";
import Link from "next/link";
import { useCreateRoom } from "@/hooks/mutations/use-create-room";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DoorOpen, Sparkles, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

const suggestions = [
  "🏠 Family Sunday Hangout",
  "🍿 Movie & Popcorn Squad",
  "🎓 College Reunion Lounge",
  "🎮 Late Night Gaming Zone",
  "☕ Virtual Coffee Break",
];

export default function CreateRoomPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const createRoomMutation = useCreateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 3) return;

    createRoomMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Back Link */}
      <Link
        href="/dashboard/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to rooms
      </Link>

      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <DoorOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Create a Private Room
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Give your hangout space a memorable name and invite your circle.
            </p>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary" />
            Quick Inspiration
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setName(item)}
                className="rounded-xl border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">
              Room Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sunday Family Dinner"
              required
              minLength={3}
              maxLength={50}
              className="rounded-xl h-11"
            />
            <p className="text-[11px] text-muted-foreground">
              Between 3 and 50 characters
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-semibold text-foreground">
              Description <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this room for? (e.g. Weekly calls, trivia nights, movie streams)"
              maxLength={200}
              rows={3}
              className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <p className="text-[11px] text-muted-foreground text-right">
              {description.length}/200
            </p>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p>
              Your room will be assigned a unique 8-character code. Only people with the code will be able to join.
            </p>
          </div>

          {/* Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <Link href="/dashboard/rooms">Cancel</Link>
            </Button>

            <Button
              type="submit"
              disabled={name.trim().length < 3 || createRoomMutation.isPending}
              className="rounded-xl gap-2 font-medium"
            >
              {createRoomMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Room...
                </>
              ) : (
                "Create Room"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
