import { useQuery } from '@apollo/client';
import Post from '../components/Post';
import { graphql } from '../gql';

export const GET_ALL_POSTS = graphql(/* GraphQL */ `
query GetAllPosts {
  allPosts {
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

function Posts() {
  const { data } = useQuery(GET_ALL_POSTS);

  const postsElements = data?.allPosts.map((post, index) => {
    // post.likes[
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
    <div className='Posts' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Posts :</h1>
      {postsElements}
    </div>
  );
}

export default Posts;
