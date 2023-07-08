import { login, register } from "../../services/user.service";
import {
  objectType,
  extendType,
  idArg,
  nonNull,
  inputObjectType,
  stringArg,
} from "nexus";

export const user = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("fullname");
    t.string("email");
    t.string("password");
    t.string("iamge");
    t.field("createdAt", {
      type: "DateTime",
    });
    t.field("updatedAt", {
      type: "DateTime",
    });

    t.list.field("posts", {
      type: "Post",
      resolve: (parent, _args, ctx) => {
        return ctx.db.user
          .findUnique({
            where: { id: parent.id },
          })
          .posts();
      },
    });
    t.list.field("followers", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.db.user
          .findUnique({
            where: { id: parent.id },
          })
          .followers();
      },
    });
    t.list.field("following", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.db.user
          .findUnique({
            where: { id: parent.id },
          })
          .following();
      },
    });
  },
});

export const session = objectType({
  name: "Session", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name");
    t.string("fullname"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("iamge");
    t.string("accessToken");
  },
});

export const me = objectType({
  name: "Me", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name");
    t.string("fullname"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("iamge");
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
      }),
      t.field("me", {
        type: "Me",
        resolve: (_, __, ctx) => {
          return ctx.req.user;
        },
      });
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "User",

      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        fullname: stringArg(),
        name: stringArg(),
      },
      resolve: async (_, args: any, ctx: any) => {
        return await register(_, args, ctx);
      },
    }),
      t.nonNull.field("login", {
        type: "Session",
        args: { email: nonNull(stringArg()), password: nonNull(stringArg()) },
        resolve: async (_, args: any, ctx: any) => {
          return await login(_, args, ctx);
        },
      });
  },
});
