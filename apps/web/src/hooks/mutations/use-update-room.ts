import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService, UpdateRoomPayload } from "@/services/room.service";
import { MY_ROOMS_QUERY_KEY } from "../queries/use-my-rooms";
import { roomQueryKey } from "../queries/use-room";
import { toast } from "sonner";
import axios from "axios";

export const useUpdateRoom = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRoomPayload) =>
      roomService.updateRoom(roomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: roomQueryKey(roomId) });
      toast.success("Room details updated.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update room.");
        return;
      }
      toast.error("Failed to update room.");
    },
  });
};
