import { useQuery } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { useAuthStore } from "@/store/auth.store";

export const roomMembersQueryKey = (roomId: string) =>
  ["rooms", roomId, "members"] as const;

export const useRoomMembers = (roomId: string) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: roomMembersQueryKey(roomId),
    queryFn: async () => {
      const res = await roomService.getRoomMembers(roomId);
      return res.members;
    },
    enabled: !!accessToken && !!roomId,
    staleTime: 1000 * 20,
  });
};
