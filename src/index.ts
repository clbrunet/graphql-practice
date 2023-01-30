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
  users: () => {
    return users;
  },
  posts: () => {
    return posts;
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
