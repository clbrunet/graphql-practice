import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

import { useParams } from 'react-router-dom';
import Post from '../components/Post';

export const GET_USER_POSTS = graphql(/* GraphQL */ `
query GetUserPosts($username: String!) {
  posts(username: $username) {
    id
    title
    content
    author {
      username
    }
    likes {
      userId
    }
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
      <Post
        title={post.title}
        content={post.content}
        author={post.author.username}
        key={index}
        id={post.id}
        likes={post.likes}
      />
    );
  }) || 'Loading...';

  return (
    <div className='User' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{username}'s posts :</h1>
      {postsElements}
    </div>
  );
}

export default User;
