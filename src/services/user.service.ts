import { Hash } from "../utils";

export const login = (arg: any) => {};
//@ts-ignore
export const register = async (_, args: any, ctx: any) => {
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
