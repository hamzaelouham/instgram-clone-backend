import { rule, shield } from "graphql-shield";
import { verifyToken } from "../utils";

//@ts-ignore
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace("Bearer", "").trim();
  const payload = verifyToken(token);
  //@ts-ignore
  return !!payload.userId;
});

export const permissions = shield({
  Query: {
    getUsers: isAuthenticated,
  },
  Mutation: {},
});
