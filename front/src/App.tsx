import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Users from './pages/Users';
import User from './pages/User';
import SignIn from './pages/SignIn';
import { graphql } from './gql';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { setUsername } from './username';

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
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
