import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Context, context } from './context.js';
import schema from './schema/index.js';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
  cookieParser(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
