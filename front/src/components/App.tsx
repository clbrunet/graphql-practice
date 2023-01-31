import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './../styles/App.css';
import Users from './Users';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Users />
      </div>
    </ApolloProvider>
  );
}

export default App;
