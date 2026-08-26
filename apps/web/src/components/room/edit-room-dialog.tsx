"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateRoom } from "@/hooks/mutations/use-update-room";
import { Loader2, Settings2 } from "lucide-react";

interface EditRoomDialogProps {
  roomId: string;
  currentName: string;
  currentDescription?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRoomDialog({
  roomId,
  currentName,
  currentDescription,
  open,
  onOpenChange,
}: EditRoomDialogProps) {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription || "");
  const updateMutation = useUpdateRoom(roomId);

  useEffect(() => {
    setName(currentName);
    setDescription(currentDescription || "");
  }, [currentName, currentDescription, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 3) return;

    updateMutation.mutate(
      {
        name: name.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
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
            <Settings2 className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center">Edit Room Details</DialogTitle>
          <DialogDescription className="text-center">
            Update the title and description of your hangout room.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="space-y-1.5">
            <label htmlFor="edit-name" className="text-xs font-semibold text-foreground">
              Room Name
            </label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              maxLength={50}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-desc" className="text-xs font-semibold text-foreground">
              Description
            </label>
            <textarea
              id="edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
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
            disabled={name.trim().length < 3 || updateMutation.isPending}
            className="rounded-xl gap-2 font-medium"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

export default EditRoomDialog;
