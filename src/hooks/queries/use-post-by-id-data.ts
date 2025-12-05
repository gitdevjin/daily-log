import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "LIST" | "DETAIL";
}) {
  const session = useSession();
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
    enabled: type === "LIST" ? false : true,
  });
}
