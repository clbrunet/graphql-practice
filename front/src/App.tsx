import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Users from './pages/Users';
import User from './pages/User';
import SignIn from './pages/SignIn';
import { graphql } from './gql';
import { useMutation } from '@apollo/client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';

export type UserState = undefined | null | {
  id: string;
  username: string;
};

type UserContextType = {
  user: UserState;
  setUser: Dispatch<SetStateAction<UserState>>;
};

export const UserContext = createContext<UserContextType>(null!);

const RELOGIN = graphql(/* GraphQL */`
mutation Relogin {
  relogin {
    id
    username
  }
}
`);

function App() {
  const [user, setUser] = useState<UserState>(undefined);
  const [relogin] = useMutation(RELOGIN, {
    onCompleted(data, clientOptions) {
      setUser(data.relogin);
      clientOptions?.client?.resetStore();
    },
    onError(_error, clientOptions) {
      setUser(null);
      clientOptions?.client?.resetStore();
    },
  });
  useEffect(() => {
    relogin();
  }, [relogin]);
  if (user === undefined) {
    return (
      <>
      </>
    );
  }

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:username' element={<User />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
