import { objectType, extendType, idArg, nonNull } from "nexus";

export const user = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getUser", {
      type: "User",
      resolve: async (_, __, ctx) => {
        return await ctx.db.user.findMany();
      },
    }),
      t.nonNull.list.field("getUserById", {
        type: "User",
        args: {
          id: nonNull(idArg()),
        },
        resolve: async (_, args, ctx) => {
          console.log(args.id);

          return await ctx.db.user.findUnique({
            where: {},
          });
        },
      });
  },
});
