import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { graphql } from '../gql';

export const GET_USERS = graphql(/* GraphQL */ `
query GetUsers {
  users {
    username
    posts {
      title
      content
    }
  }
}
`);

function Users() {
  const { data } = useQuery(GET_USERS);

  const usersElements = data?.users.map((user, index) => {
    return (
      <p key={index}>
        <Link to={'/users/' + user.username}>
          {user.username}
        </Link>
        , {user.posts.length} posts
      </p>
    );
  }) || 'Loading...';

  return (
    <div className='Users'>
      <h1>Users :</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {usersElements}
      </div>
    </div>
  );
}

export default Users;
