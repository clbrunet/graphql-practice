import { makeSchema, objectType, queryType, stringArg } from 'nexus';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Context } from '../context.js';
import { Mutation } from './mutation.js';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.user.findUnique({ where: { id: parent.id } }).posts();
      },
    });
  }
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.field('author', {
      type: 'User',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.post.findUnique({ where: { id: parent.id } }).author();
      },
    });
  },
});

const Query = queryType({
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

const schema = makeSchema({
  types: [
    User,
    Post,
    Query,
    Mutation,
  ],
  outputs: {
    schema: join(dirname(fileURLToPath(import.meta.url)), '/../schema.gen.graphql'),
  },
});

export default schema;
