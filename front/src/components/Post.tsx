import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import heart_empty from '../assets/heart_empty.png';
import heart_full from '../assets/heart_full.png';
import { graphql } from '../gql';

type PostProps = {
  author: string,
  title: string,
  content: string,
  id: string,
  likes: {
    userId: string,
  }[]
};

const TOGGLE_LIKE = graphql(/* GraphQL */ `
mutation ToggleLike($postId: ID!) {
  toggleLike(postId: $postId)
}
`);

function Post({ author, title, content, id, likes }: PostProps) {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.userId === user?.id));
  const [likesCount, setLikesCount] = useState(likes.length);
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
    onCompleted(data, _clientOptions) {
      if (data.toggleLike !== undefined && data.toggleLike !== null) {
        setIsLiked(data.toggleLike);
        if (data.toggleLike) {
          setLikesCount((prev) => prev + 1);
        } else {
          setLikesCount((prev) => prev - 1);
        }
      }
    },
  });
  return (
    <div className='Post' style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', width: 'fit-content', padding: '5px', marginBottom: '15px' }}>
      <p style={{ textAlign: 'start' }}>
        Posted by <Link to={`/users/${author}`}>{author}</Link>
      </p>
      <h4>{title}</h4>
      <p>{content}</p>
      <div onClick={() => toggleLike()} style={{ display: 'flex', justifyItems: 'left', alignItems: 'center', cursor: 'pointer' }}>
        {isLiked ?
          <img src={heart_full} alt='Full heart' width='30px' height='30px' />
          :
          <img src={heart_empty} alt='Empty heart' width='30px' height='30px' />
        }
        <p style={{ marginLeft: '10px' }}>{likesCount}</p>
      </div>
    </div>
  );
}

export default Post;
