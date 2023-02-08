import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import Users from './Users';
import User from './User';
import Login from './Login';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { setUsername } from '../username';

const RELOGIN = graphql(/* GraphQL */`
mutation Relogin {
  relogin
}
`);

function App() {
  const [relogin] = useMutation(RELOGIN, {
    onCompleted(data, clientOptions) {
      if (!data.relogin!) {
        return;
      }
      setUsername(data.relogin);
      clientOptions?.client?.resetStore();
    },
  });
  useEffect(() => {
    relogin();
  }, [relogin]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={'Home'} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
