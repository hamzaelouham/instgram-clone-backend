import { NexusGenObjects } from "../graphql/nexus-typegen";
import { context } from "../utils/types";

class User {
  async getUsers(ctx: context): Promise<NexusGenObjects["User"][] | null> {
    return await ctx.db.user.findMany();
  }
  async getUserById(
    id: string,
    ctx: context
  ): Promise<NexusGenObjects["User"] | null> {
    return await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new User();
