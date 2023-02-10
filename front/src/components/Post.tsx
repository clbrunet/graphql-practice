import { Link } from 'react-router-dom';

type PostProps = {
  title: string;
  content: string;
  author?: string;
};

function Post({ title, content, author }: PostProps) {

  return (
    <div className='Post' style={{ borderStyle: 'solid', width: 'fit-content', padding: '5px', marginBottom: '15px' }}>
      {author && <p style={{ textAlign: 'start' }}>
        Posted by <Link to={`/users/${author}`}>{author}</Link>
      </p>}
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

export default Post;
