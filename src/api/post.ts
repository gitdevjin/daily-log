import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

export async function fetchPosts({
  from,
  to,
  userId,
}: {
  from: number;
  to: number;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*) , myLikes: like!post_id (*)")
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data.map((post) => ({
    ...post,
    isLiked: post.myLikes && post.myLikes.length > 0,
  }));
}

export async function fetchPostById({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*) , myLikes: like!post_id (*)")
    .eq("like.user_id", userId)
    .eq("id", postId)
    .single();

  if (error) throw error;
  return {
    ...data,
    isLiked: data.myLikes && data.myLikes.length > 0,
  };
}

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. Create Post
  const post = await createPost(content);

  try {
    // 2. Upload Images
    if (images.length === 0) return post;
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;
        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 3. Update image_urls in Post Table
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatePost;
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data;
}
