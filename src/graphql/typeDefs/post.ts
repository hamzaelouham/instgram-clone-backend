import { objectType } from "nexus";

export const Post = objectType({
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
