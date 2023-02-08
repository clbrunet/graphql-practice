import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
// import { JWT_KEY } from './contants';

// const httpLink = createHttpLink({
// });

// const authLink = setContext((_, { headers }) => {
//   const jwt = localStorage.getItem(JWT_KEY);
//   return {
//     headers: {
//       ...headers,
//       authorization: jwt ? `Bearer ${jwt}` : "",
//     }
//   }
// });

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
