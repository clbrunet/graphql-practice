import { arg, inputObjectType, makeSchema, mutationType, nonNull, objectType, queryType, stringArg } from 'nexus';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Context } from './context';

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
        username: nonNull(stringArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.findUnique({ where: { username: args.username } });
      },
    });
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.post.findMany();
      },
    });
  },
});

const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.nonNull.string('username');
  },
});

const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        input: nonNull(arg({ type: 'UserInput' })),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.create({
          data: {
            username: args.input.username,
          },
        });
      },
    });
    t.field('updateUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        input: nonNull(arg({ type: 'UserInput' })),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.update({
          where: { username: args.username },
          data: { username: args.input.username },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [
    User,
    Post,
    Query,
    UserInput,
    Mutation,
  ],
  outputs: {
    schema: join(dirname(fileURLToPath(import.meta.url)), '/../schema.gen.graphql'),
  },
});

export default schema;
