import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { JWT_KEY } from '../contants';

function Header() {
  const jwt = localStorage.getItem(JWT_KEY);
  const navigate = useNavigate();
  const client = useApolloClient();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to="/">
        Root
      </Link>
      <Link to="/users">
        Users
      </Link>
      {jwt ?
        <button onClick={() => {
          localStorage.removeItem(JWT_KEY);
          client.resetStore();
          navigate('/');
        }}>
          Logout
        </button>
        :
        <Link to="/login">
          Login
        </Link>
      }
    </div>
  );
}

export default Header;
