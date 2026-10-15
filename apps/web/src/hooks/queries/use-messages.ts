import { useInfiniteQuery } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { useAuthStore } from "@/store/auth.store";
import { useMemo } from "react";

export const messagesQueryKey = (roomId: string) =>
  ["rooms", roomId, "messages"] as const;

export const useMessages = (roomId: string) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useInfiniteQuery({
    queryKey: messagesQueryKey(roomId),
    queryFn: ({ pageParam }) =>
      messageService.getRoomMessages(roomId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!accessToken && !!roomId,
    staleTime: 1000 * 5, // 5 seconds
  });

  const messages = useMemo(() => {
    const uniqueMessages = new Map(
      query.data?.pages
        .flatMap((page) => page.messages)
        .map((message) => [message.id, message]),
    );

    return [...uniqueMessages.values()].sort((left, right) => {
      const timeDifference =
        new Date(left.createdAt).getTime() -
        new Date(right.createdAt).getTime();

      return timeDifference || left.id.localeCompare(right.id);
    });
  }, [query.data?.pages]);

  return { ...query, messages };
};
