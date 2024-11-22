import { defineAction } from "astro:actions";
import { db, eq, Post } from "astro:db";
import { z } from "astro:schema";

export const getPostLikes = defineAction({
  input: z.string(),
  handler: async (postId) => {
    /* const posts = await db.select().from(Post).where(eq(Post.id, postId)); */

    const [post] = await db.select().from(Post).where(eq(Post.id, postId));

    if (!post) {
      return { likes: 0, exist: false };
    }

    return {
      likes: post.likes,
      exist: true,
    };
  },
});
