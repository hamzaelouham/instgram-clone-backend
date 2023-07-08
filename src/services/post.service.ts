import { context } from "../utils/types";

class Post {
  async createPost(_: any, args: any, ctx: context) {
    const { caption, imageUrl } = args;
    const userId = ctx.req?.user?.userId; // Assuming you have user authentication and userId available in the context
    if (!userId) return null;

    const post = await ctx.db.post.create({
      data: {
        caption,
        imageUrl,
        likesCount: 0,
        author: { connect: { id: userId } },
      },
    });

    return post;
  }

  async deletePost(_: any, args: any, ctx: context) {}
  async updatePost(_: any, args: any, ctx: context) {}

  async getAllPosts(ctx: context) {
    const posts = await ctx.db.post.findMany({
      where: {
        authorId: ctx.req?.user?.userId,
      },
    });

    return posts;
  }

  async getPost(id: string, ctx: context) {
    const post = await ctx.db.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }
}

export default new Post();
