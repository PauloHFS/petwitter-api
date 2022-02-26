import * as PostsController from "../controllers/posts-controller.js";
import { pagination } from "../middleware/pagination.js";
import { validateRequest } from "../middleware/auth.js";

export default {
  index: {
    method: "GET",
    url: "/posts",
    preHandler: [validateRequest, pagination()],
    handler: PostsController.index,
  },
  create: {
    method: "POST",
    url: "/posts",
    preHandler: [validateRequest],
    handler: PostsController.create,
  },
  remove: {
    method: "DELETE",
    url: "/posts/:id",
    preHandler: [validateRequest],
    handler: PostsController.remove,
  },
};
