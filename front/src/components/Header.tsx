import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { graphql } from '../gql';
import { clearUsername, getUsername } from '../username';

const LOGOUT = graphql(/* GraphQL */ `
mutation Logout {
  logout
}
`);

function Header() {
  const username = getUsername();
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT, {
    onCompleted(_data, clientOptions) {
      clearUsername();
      clientOptions?.client?.resetStore();
      navigate('/');
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to="/">
        Posts
      </Link>
      <Link to="/users">
        Users
      </Link>
      {username ?
        <button onClick={() => logout()}>Logout</button>
        :
        <Link to="/signIn">
          Sign in
        </Link>
      }
    </div>
  );
}

export default Header;
