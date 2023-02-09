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
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.post.findMany();
      },
    });
    t.list.nonNull.field('posts', {
      type: 'Post',
      args: {
        username: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        let { username } = args;
        if (username === undefined) {
          username = context.username;
        }
        return context.prisma.user.findUnique({ where: { username } }).posts();
      },
    });
  },
});