import { useQuery } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { useAuthStore } from "@/store/auth.store";

export const MY_ROOMS_QUERY_KEY = ["rooms"] as const;

export const useMyRooms = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: MY_ROOMS_QUERY_KEY,
    queryFn: async () => {
      const res = await roomService.getMyRooms();
      return res.rooms;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 30, // 30 seconds
  });
};
