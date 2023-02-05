import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Context, context } from './context.js';
import schema from './schema.js';

const server = new ApolloServer<Context>({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
});
console.log(`🚀  Server ready at: ${url}`)
