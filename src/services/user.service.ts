import { Compare, Hash, createToken } from "../utils";

export const login = async (_: any, args: any, ctx: any) => {
  const user = await ctx.db.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  if (!Compare(args.password, user.password)) {
    throw new Error("Invalid password");
  }

  const accessToken = createToken({
    userId: user.id,
    email: user.email,
    image: user.image,
  });

  return {
    accessToken,
  };
};

export const register = async (_: any, args: any, ctx: any) => {
  let user = await ctx.db.user.findUnique({
    where: { email: args.data.email },
  });

  if (user) {
    throw new Error("email must be unique !, email already taken!");
  }

  user = await ctx.db.user.create({
    data: {
      email: args.data.email,
      name: args.data.name,
      password: await Hash(args.data.password, 10),
      image: args.data.image,
    },
  });

  if (!user) {
    throw new Error("ops!, you are not registerd !");
  }

  return user;
};
