import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
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
const USER_CREATED = graphql(/* GraphQL */ `
subscription UserCreated {
  userCreated {
    username
  }
}
`);

function Users() {
  const { data, subscribeToMore } = useQuery(GET_USERS);
  useEffect(() => {
    subscribeToMore({
      document: USER_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        let next = {
          users: [...prev.users, {
            username: subscriptionData.data.userCreated.username,
            posts: [],
          }]
        };
        return next;
      },
    });
  }, [subscribeToMore]);

  const usersElements = data?.users.map((user, index) => {
    return (
      <p key={index}>
        <Link to={`/users/${user.username}`}>{user.username}</Link>, {user.posts.length} posts
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
