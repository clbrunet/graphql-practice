import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  username: string;
}

export interface Context {
  prisma: PrismaClient;
  username: string;
}

const prisma = new PrismaClient();

export const context = async ({ req }: StandaloneServerContextFunctionArgument): Promise<Context> => {
  let username: string;
  try {
    let payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET) as JwtPayload;
    username = payload.username;
  } catch (error) {
  }
  return {
    prisma,
    username,
  };
};
