import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";
import Post from "../../services/post.service";
import { context } from "../../utils/types";

export const post = objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.nullable.string("caption");
    t.string("imageUrl");
    t.int("likesCount");
    t.field("createdAt", {
      type: "DateTime",
    });
    t.field("updatedAt", {
      type: "DateTime",
    });
    t.field("author", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.db.post
          .findUnique({
            where: { id: parent.id },
          })
          .author();
      },
    });
    t.list.field("comments", {
      type: "Comment",
      resolve: (parent, _args, ctx) => {
        return ctx.db.post
          .findUnique({
            where: { id: parent.id },
          })
          .comments();
      },
    });
  },
});

export const postMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",

      args: {
        caption: stringArg(),
        imageUrl: nonNull(stringArg()),
      },
      resolve: async (_, args: any, ctx: context) => {
        return await Post.createPost(_, args, ctx);
      },
    }),
      t.field("likePost", {
        type: "Post",

        args: {
          id: nonNull(stringArg()),
        },
        resolve: async (_, args, ctx: context) => {
          return await Post.likePost(args.id, ctx);
        },
      }),
      t.field("unlikePost", {
        type: "Post",

        args: {
          id: nonNull(stringArg()),
        },
        resolve: async (_, args, ctx: context) => {
          return await Post.unLikePost(args.id, ctx);
        },
      }),
      t.field("deletePost", {
        type: "Post",

        args: {
          id: nonNull(stringArg()),
        },
        resolve: async (_, args, ctx: context) => {
          return await Post.deletePost(args.id, ctx);
        },
      });
  },
});

export const postQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getPost", {
      type: "Post",
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, args, ctx: context) => {
        return await Post.getPost(args.id, ctx);
      },
    }),
      t.list.field("getAllPosts", {
        type: "Post",

        resolve: async (_, __: any, ctx: context) => {
          return await Post.getAllPosts(ctx);
        },
      });
  },
});
