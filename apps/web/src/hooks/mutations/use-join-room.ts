import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JoinRoomPayload, roomService } from "@/services/room.service";
import { MY_ROOMS_QUERY_KEY } from "../queries/use-my-rooms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export const useJoinRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: JoinRoomPayload) => roomService.joinRoom(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: MY_ROOMS_QUERY_KEY });
      toast.success(`Joined room "${data.room.name}"!`);
      router.push(`/dashboard/rooms/${data.room.id}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid room code.");
        return;
      }
      toast.error("Failed to join room.");
    },
  });
};
