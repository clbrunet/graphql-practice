import { useQuery } from '@apollo/client';
import { graphql } from './../gql';
import CreateUser from './CreateUser';

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
      <CreateUser />
    </div>
  );
}

export default Users;
