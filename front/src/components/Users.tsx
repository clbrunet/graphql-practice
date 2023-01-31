import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";

type User = {
  username: string;
  posts: Post[];
};

type Post = {
  title: string;
  content: string;
  author: User,
};

const GET_USERS = gql`
query GetUsers {
  users {
    username
    posts {
      title
      content
    }
  }
}
`;

function Users() {
  const { data }: { data: { users: User[] } | undefined } = useQuery(GET_USERS);
  if (!data) {
    return (
      <p>Loading ...</p>
    );
  }
  const { users } = data;
  const usersElements = users.map((user) => {
    return (
      <pre style={{ textAlign: 'left' }} key={user.username}>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    );
  });

  return (
    <div className="Users">
      <h1>Users</h1>
      {usersElements}
    </div>
  );
}

export default Users;
