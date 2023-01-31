import { useQuery } from '@apollo/client';
import { graphql } from './../gql';

const GET_USERS = graphql(/* GraphQL */ `
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
  const usersElements = data?.users.map((user) => {
    return (
      <pre style={{ textAlign: 'left' }} key={user.username}>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    );
  }) || 'Loading...';

  return (
    <div className="Users">
      <h1>Users</h1>
      {usersElements}
    </div>
  );
}

export default Users;
