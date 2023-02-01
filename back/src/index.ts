import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { Post, Resolvers, User } from './generated/resolvers-types';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

const users: User[] = [
  {
    username: 'username_one',
    posts: [],
  },
  {
    username: 'username_two',
    posts: [],
  },
];

const posts: Post[] = [
  {
    title: 'title_one',
    content: 'content_one',
    author: users[0],
  }
];
users[0].posts.push(posts[0]);

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.username === args.username),
    posts: () => posts,
  },
  Mutation: {
    createUser: (_, args) => {
      if (users.find((user) => user.username === args.input.username)) {
        return undefined;
      }
      const new_user: User = { username: args.input.username, posts: [] };
      users.push(new_user);
      return new_user;
    },
    updateUser: (_, args) => {
      const user = users.find((user) => user.username === args.username);
      if (!user) {
        return undefined;
      }
      user.username = args.input.username;
      return user;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
