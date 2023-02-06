import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

import { useParams } from 'react-router-dom';

export const GET_USER_POSTS = graphql(/* GraphQL */ `
query GetUserPosts($username: String!) {
  posts(username: $username) {
    title
    content
  }
}
`);

function User() {
  const { username } = useParams();
  const { data } = useQuery(GET_USER_POSTS, {
    variables: {
      username: username!
    }
  });

  const postsElements = data?.posts?.map((post, index) => {
    return (
      <pre style={{ textAlign: 'left' }} key={index}>
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    );
  }) || 'Loading...';

  return (
    <div className="User">
      <h1>{username}'s posts :</h1>
      {postsElements}
    </div>
  );
}

export default User;
