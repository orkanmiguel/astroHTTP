import { getGreeting } from "./greetings/get-greetin.action";
import { getPostLikes } from "./posts/get-post-likes.action";
import { updatePostLike } from "./posts/update-likes.action";

export const server = {
  getGreeting,
  getPostLikes,
  updatePostLike,
};
