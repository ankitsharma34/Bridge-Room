"use client";

import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJoinRoom } from "@/hooks/mutations/use-join-room";
import { Loader2, KeyRound } from "lucide-react";

interface JoinRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinRoomDialog({ open, onOpenChange }: JoinRoomDialogProps) {
  const [code, setCode] = useState("");
  const joinMutation = useJoinRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.length !== 8) return;

    joinMutation.mutate(
      { code: cleanCode },
      {
        onSuccess: () => {
          setCode("");
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center">Join a Private Room</DialogTitle>
          <DialogDescription className="text-center">
            Enter the 8-character invite code shared by your friend or family member.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. X9K2LM8P"
            maxLength={8}
            className="text-center text-lg font-mono tracking-widest uppercase h-12 rounded-xl"
            autoFocus
          />
          <p className="text-[11px] text-center text-muted-foreground">
            Room codes are 8 letters and numbers
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={code.trim().length !== 8 || joinMutation.isPending}
            className="rounded-xl gap-2 font-medium"
          >
            {joinMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Room"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

export default JoinRoomDialog;
