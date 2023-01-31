import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const schema = loadSchemaSync('schema.graphql', { loaders: [new GraphQLFileLoader()], });

type Post = {
  title: string;
  content: string;
  author: User,
};

type User = {
  username: string;
  posts: Post[];
};

type UserInput = {
  username: string;
};

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

const root = {
  users: (): User[] => {
    return users;
  },
  user: ({ username }: { username: string }): User | undefined => {
    return users.find((user) => user.username === username);
  },
  posts: (): Post[] => {
    return posts;
  },
  createUser: ({ input: { username } }: { input: UserInput }): User | undefined => {
    if (users.find((user) => user.username === username)) {
      return undefined;
    }
    const new_user: User = { username, posts: [] };
    users.push(new_user);
    return new_user;
  },
  updateUser: ({ username, input }: { username: string, input: UserInput }): User | undefined => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return undefined;
    }
    user.username = input.username;
    return user;
  },
};

const app = express();
const port = 3000;

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
