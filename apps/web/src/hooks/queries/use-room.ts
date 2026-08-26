import { useQuery } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { useAuthStore } from "@/store/auth.store";

export const roomQueryKey = (roomId: string) => ["rooms", roomId] as const;

export const useRoom = (roomId: string) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: roomQueryKey(roomId),
    queryFn: async () => {
      const res = await roomService.getRoomById(roomId);
      return res.room;
    },
    enabled: !!accessToken && !!roomId,
    staleTime: 1000 * 30,
  });
};
