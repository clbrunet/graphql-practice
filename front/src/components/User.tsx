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
      <div style={{ borderStyle: 'solid', width: 'fit-content', padding: '5px', marginBottom: '15px' }} key={index}>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
    );
  }) || 'Loading...';

  return (
    <div className="User" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{username}'s posts :</h1>
      {postsElements}
    </div>
  );
}

export default User;
