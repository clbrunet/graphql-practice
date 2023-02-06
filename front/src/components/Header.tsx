import { Link } from 'react-router-dom';

function Header() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <Link to="/">
        Root
      </Link>
      <Link to="/users">
        Users
      </Link>
      <Link to="/login">
        Login
      </Link>
    </div>
  );
}

export default Header;
