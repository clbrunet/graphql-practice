import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsernameContext } from '../App';
import { graphql } from '../gql';

const LOGOUT = graphql(/* GraphQL */ `
mutation Logout {
  logout
}
`);

function Header() {
  const { username, setUsername } = useContext(UsernameContext);
  const [logout] = useMutation(LOGOUT, {
    onCompleted(_data, clientOptions) {
      setUsername('');
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
      {username ?
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
