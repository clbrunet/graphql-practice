import { useQuery } from '@apollo/client';
import Post from '../components/Post';
import { graphql } from '../gql';

export const GET_ALL_POSTS = graphql(/* GraphQL */ `
query GetAllPosts {
  allPosts {
    title
    content
    author {
      username
    }
  }
}
`);

function Posts() {
  const { data } = useQuery(GET_ALL_POSTS);

  const postsElements = data?.allPosts.map((post, index) => {
    return (
      <Post title={post.title} content={post.content} author={post.author.username} key={index} />
    );
  }) || 'Loading...';

  return (
    <div className='Posts' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Posts :</h1>
      {postsElements}
    </div>
  );
}

export default Posts;
