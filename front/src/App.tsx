import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Users from './pages/Users';
import User from './pages/User';
import SignIn from './pages/SignIn';
import { graphql } from './gql';
import { useMutation } from '@apollo/client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { setUsername } from './username';
import Posts from './pages/Posts';

type UsernameContextType = {
  username: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
};

export const UsernameContext = createContext<UsernameContextType>(null!);

const RELOGIN = graphql(/* GraphQL */`
mutation Relogin {
  relogin
}
`);

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);
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
      <UsernameContext.Provider value={{ username, setUsername }}>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:username" element={<User />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
