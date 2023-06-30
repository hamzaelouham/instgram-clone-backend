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
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("password");
    t.string("iamge");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
  },
});

export const session = objectType({
  name: "Session", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("iamge");
    t.string("accessToken");
  },
});

export const me = objectType({
  name: "Me", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name"); // <- Field named `title` of type `String`
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
