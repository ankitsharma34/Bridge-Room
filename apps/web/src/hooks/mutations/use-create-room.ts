import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRoomPayload, roomService } from "@/services/room.service";
import { MY_ROOMS_QUERY_KEY } from "../queries/use-my-rooms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateRoomPayload) => roomService.createRoom(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: MY_ROOMS_QUERY_KEY });
      toast.success(`Room "${data.room.name}" created!`);
      router.push(`/dashboard/rooms/${data.room.id}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create room.");
        return;
      }
      toast.error("Failed to create room.");
    },
  });
};
