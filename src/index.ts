import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const root = {
  hello: () => {
    return 'Hello world!';
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
