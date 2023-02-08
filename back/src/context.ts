import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  username: string;
}

export interface Context {
  res: Response;
  prisma: PrismaClient;
  username: string | undefined;
}

const prisma = new PrismaClient();

export const context = async ({ req, res }: ExpressContextFunctionArgument): Promise<Context> => {
  let username: string | undefined = undefined;
  try {
    let payload = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
    username = payload.username;
  } catch (error) {
  }
  return {
    res,
    prisma,
    username,
  };
};
