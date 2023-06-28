import { objectType, extendType, idArg, nonNull, inputObjectType } from "nexus";
import { register } from "../../services/user.service";

export const user = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.string("id"); // <- Field named `id` of type `Int`
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("password");
    t.string("iamge");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getUsers", {
      type: "User",
      resolve: async (_, __, ctx) => {
        return await ctx.db.user.findMany();
      },
    }),
      t.nonNull.field("getUserById", {
        type: "User",
        args: {
          id: nonNull(idArg()),
        },
        resolve: async (_, args, ctx) => {
          return await ctx.db.user.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      });
  },
});

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("password");
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "User",
      args: { data: RegisterInput },
      resolve: async (_, args: any, ctx: any) => {
        return await register(_, args, ctx);
      },
    });
  },
});
