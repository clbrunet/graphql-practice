import { makeSchema, mutationType, nonNull, objectType, queryType, stringArg } from 'nexus';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Context } from './context';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { JWT_COOKIE_KEY, SALT_ROUNDS } from './constants.js';

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

const signIn = (username: string, res: Response): string  => {
  let access_token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  });
  res.cookie(JWT_COOKIE_KEY, access_token, {
    httpOnly: true,
  });
  return username;
}

const Mutation = mutationType({
  definition(t) {
    t.nonNull.string('register', {
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        if (args.username.length === 0) {
          throw new GraphQLError('Username must not be empty')
        }
        if (args.password.length === 0) {
          throw new GraphQLError('Password must not be empty')
        }
        let user = await context.prisma.user.findUnique({ where: { username: args.username } });
        if (user) {
          throw new GraphQLError('Username already exists')
        }
        await context.prisma.user.create({
          data: {
            username: args.username,
            password: bcrypt.hashSync(args.password, SALT_ROUNDS),
          }
        });
        return signIn(args.username, context.res);
      },
    });
    t.nonNull.string('login', {
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        let user = await context.prisma.user.findUnique({ where: { username: args.username } });
        if (!user || !bcrypt.compareSync(args.password, user.password)) {
          throw new GraphQLError('Invalid username or password')
        }
        return signIn(user.username, context.res);
      },
    });
    t.string('relogin', {
      resolve: async (_parent, _args, context: Context) => {
        if (!context.username) {
          return null;
        }
        return signIn(context.username, context.res);
      },
    });
    t.string('logout', {
      resolve: async (_parent, _args, context: Context) => {
        context.res.clearCookie(JWT_COOKIE_KEY);
        return context.username;
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
