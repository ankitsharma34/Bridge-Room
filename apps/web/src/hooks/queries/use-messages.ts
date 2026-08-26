import { useQuery } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { useAuthStore } from "@/store/auth.store";

export const messagesQueryKey = (roomId: string) =>
  ["rooms", roomId, "messages"] as const;

export const useMessages = (roomId: string, cursor?: string) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...messagesQueryKey(roomId), cursor ?? "initial"],
    queryFn: async () => {
      const res = await messageService.getRoomMessages(roomId, cursor);
      return res;
    },
    enabled: !!accessToken && !!roomId,
    staleTime: 1000 * 5, // 5 seconds
  });
};
