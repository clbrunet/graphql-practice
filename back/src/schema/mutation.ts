import { GraphQLError } from 'graphql';
import { idArg, mutationType, nonNull, stringArg } from 'nexus';
import bcrypt from 'bcrypt';
import { Context } from '../context.js';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JWT_COOKIE_KEY, SALT_ROUNDS, USER_CREATED } from '../constants.js';
import { pubsub } from './subscription.js';
import { User } from '@prisma/client';

const signIn = (user: User, res: Response): User => {
  let access_token = jwt.sign({
    user: {
      id: user.id.toString(),
      username: user.username,
    }
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  });
  res.cookie(JWT_COOKIE_KEY, access_token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return user;
}

export const Mutation = mutationType({
  definition(t) {
    t.nonNull.field('register', {
      type: 'User',
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
        user = await context.prisma.user.create({
          data: {
            username: args.username,
            password: bcrypt.hashSync(args.password, SALT_ROUNDS),
          }
        });
        pubsub.publish(USER_CREATED, user);
        return signIn(user, context.res);
      },
    });
    t.nonNull.field('login', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        let user = await context.prisma.user.findUnique({ where: { username: args.username } });
        if (!user || !bcrypt.compareSync(args.password, user.password)) {
          throw new GraphQLError('Invalid username or password')
        }
        return signIn(user, context.res);
      },
    });
    t.nonNull.field('relogin', {
      type: 'User',
      resolve: async (_parent, _args, context: Context) => {
        if (!context.username) {
          throw new GraphQLError('User credentials missing')
        }
        let user = await context.prisma.user.findUnique({ where: { username: context.username } });
        return signIn(user, context.res);
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
    t.boolean('toggleLike', {
      args: {
        postId: nonNull(idArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        if (!context.username) {
          return null;
        }
        let user = await context.prisma.user.findUnique({ where: { username: context.username } });
        const userId_postId = {
          userId: user.id,
          postId: parseInt(args.postId),
        }
        let like = await context.prisma.like.findUnique({ where: { userId_postId, } });
        if (like) {
          await context.prisma.like.delete({ where: { userId_postId, } });
          return false;
        } else {
          await context.prisma.like.create({ data: userId_postId });
          return true;
        }
      },
    });
  },
});
