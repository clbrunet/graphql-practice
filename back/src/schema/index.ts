import { makeSchema, objectType } from 'nexus';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Context } from '../context.js';
import { Mutation } from './mutation.js';
import { Query } from './query.js';
import { Subscription } from './subscription.js';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
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
    t.nonNull.id('id');
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.field('author', {
      type: 'User',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.post.findUnique({ where: { id: parent.id } }).author();
      },
    });
    t.nonNull.list.nonNull.field('likes', {
      type: 'Like',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.post.findUnique({ where: { id: parent.id } }).likes();
      },
    });
  },
});

const Like = objectType({
  name: 'Like',
  definition(t) {
    t.nonNull.id('userId');
    t.nonNull.id('postId');
  },
});

const schema = makeSchema({
  types: [
    User,
    Post,
    Like,
    Query,
    Mutation,
    Subscription,
  ],
  outputs: {
    schema: join(dirname(fileURLToPath(import.meta.url)), '/../../schema.gen.graphql'),
  },
});

export default schema;
