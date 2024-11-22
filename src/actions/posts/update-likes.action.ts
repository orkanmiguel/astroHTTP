import { actions, defineAction } from "astro:actions";
import { db, eq, Post } from "astro:db";
import { z } from "astro:schema";

export const updatePostLike = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const { data, error } = await actions.getPostLikes(postId);

    if (error) {
      console.log(error);
      throw new Error("Algo Salio Mal");
    }

    const { exist, likes } = data;

    if (!exist) {
      const newPost = {
        id: postId,
        title: "posts not found",
        likes: 0,
      };

      await db.insert(Post).values(newPost);
    }

    /*    post.likes = post.likes + increment; */

    await db
      .update(Post)
      .set({ likes: likes + increment })
      .where(eq(Post.id, postId));

    return true;
  },
});
