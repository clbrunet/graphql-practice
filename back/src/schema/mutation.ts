import { GraphQLError } from 'graphql';
import { mutationType, nonNull, stringArg } from 'nexus';
import bcrypt from 'bcrypt';
import { Context } from '../context.js';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JWT_COOKIE_KEY, SALT_ROUNDS } from '../constants.js';

const signIn = (username: string, res: Response): string  => {
  let access_token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  });
  res.cookie(JWT_COOKIE_KEY, access_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });
  return username;
}

export const Mutation = mutationType({
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
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        if (!context.username) {
          return null;
        }
        let post = await context.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: {
                username: context.username,
              }
            },
          }
        });
        return post;
      },
    });
  },
});
