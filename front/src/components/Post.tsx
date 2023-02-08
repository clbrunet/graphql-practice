type PostProps = {
  title: string;
  content: string;
};

function Post({ title, content }: PostProps) {

  return (
    <div className="Post" style={{ borderStyle: 'solid', width: 'fit-content', padding: '5px', marginBottom: '15px' }}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

export default Post;
