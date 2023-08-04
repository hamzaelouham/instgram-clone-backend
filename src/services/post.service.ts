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
  async deletePost(id: string, ctx: context) {
    try {
      const postToDelete = await ctx.db.post.findUnique({ where: { id } });

      if (postToDelete?.authorId === ctx.req?.user?.userId) {
        return await ctx.db.post.delete({ where: { id: postToDelete?.id } });
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updatePost(_: any, args: any, ctx: context) {}

  async getAllPosts(ctx: context) {
    const posts = await ctx.db.post.findMany({
      where: {
        authorId: ctx.req?.user?.userId,
      },
      orderBy: {
        createdAt: "desc",
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

  async likePost(postId: string, ctx: context) {
    return await ctx.db.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });
  }
  async unLikePost(postId: string, ctx: context) {
    return await ctx.db.post.update({
      where: { id: postId },
      data: { likesCount: { decrement: 1 } },
    });
  }
}

export default new Post();
