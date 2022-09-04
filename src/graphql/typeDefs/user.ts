import { objectType, extendType } from "nexus";
import prisma from "../../../prisma/client";

export const user = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.string("name"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
  },
});

export const userQuery = extendType({
  type: "Query", // 2
  definition(t) {
    t.nonNull.list.field("getUser", {
      type: "User",
      resolve: async () => {
        return await prisma.user.findMany();
      },
    });
  },
});
