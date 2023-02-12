import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { graphql } from '../gql';

const LOGOUT = graphql(/* GraphQL */ `
mutation Logout {
  logout
}
`);

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [logout] = useMutation(LOGOUT, {
    onCompleted(_data, clientOptions) {
      setUser(null);
      clientOptions?.client?.resetStore();
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to='/'>
        Posts
      </Link>
      <Link to='/createPost'>
        Create post
      </Link>
      <Link to='/users'>
        Users
      </Link>
      {user ?
        <button onClick={() => logout()}>Logout</button>
        :
        <Link to='/signin'>
          Sign in
        </Link>
      }
    </div>
  );
}

export default Header;
