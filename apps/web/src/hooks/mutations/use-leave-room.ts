import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { MY_ROOMS_QUERY_KEY } from "../queries/use-my-rooms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export const useLeaveRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (code: string) => roomService.leaveRoom(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_ROOMS_QUERY_KEY });
      toast.success("You have left the room.");
      router.push("/dashboard/rooms");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to leave room.");
        return;
      }
      toast.error("Failed to leave room.");
    },
  });
};
