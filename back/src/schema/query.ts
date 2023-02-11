import { GraphQLError } from 'graphql';
import { queryType, stringArg } from 'nexus';
import { Context } from '../context.js';

export const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });
    t.field('user', {
      type: 'User',
      args: {
        username: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        let { username } = args;
        if (username === undefined) {
          username = context.username;
        }
        return context.prisma.user.findUnique({ where: { username: args.username } });
      },
    });
    t.nonNull.list.nonNull.field('allPosts', {
      type: 'Post',
      resolve: async (_parent, _args, context: Context) => {
        let posts = await context.prisma.post.findMany();
        return posts.reverse();
      },
    });
    t.list.nonNull.field('posts', {
      type: 'Post',
      args: {
        username: stringArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        let username = args.username || context.username;
        if (!username) {
          throw new GraphQLError('No username provided or logged in user');
        }
        let posts = await context.prisma.user.findUnique({ where: { username } }).posts();
        return posts.reverse();
      },
    });
  },
});
