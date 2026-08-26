import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { MY_ROOMS_QUERY_KEY } from "../queries/use-my-rooms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (roomId: string) => roomService.deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_ROOMS_QUERY_KEY });
      toast.success("Room deleted successfully.");
      router.push("/dashboard/rooms");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete room.");
        return;
      }
      toast.error("Failed to delete room.");
    },
  });
};
