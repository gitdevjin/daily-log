import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { type Post, type UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      await queryclient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryclient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId),
      );

      queryclient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("Post doesn't exist in cache");
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return { prevPost };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context && context.prevPost)
        queryclient.setQueryData(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost,
        );
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
