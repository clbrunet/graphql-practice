import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UsernameContext } from '../App';
import { graphql } from '../gql';

const CREATE_POST = graphql(/* GraphQL */ `
mutation Mutation($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    title
  }
}
`);

function CreatePost() {
  const { username } = useContext(UsernameContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
  });
  const [createPost] = useMutation(CREATE_POST, {
    variables: form,
    onCompleted(_data, _clientOptions) {
      navigate(`/users/${username}`);
    },
  });
  if (username === '') {
    return (
      <Navigate to='/signin' state={'Please sign in to create a post'}/>
    );
  }
  return (
    <div className='CreatePost'>
      <form onSubmit={(e) => e.preventDefault()} >
        <h4>Create Post :</h4>
        <label htmlFor='title'>Title :</label>
        <input id='title' type='text' value={form.title} onChange={(event) => {
          setForm((prev) => ({ ...prev, title: event.target.value }))
        }} />
        <label htmlFor='content'>Content :</label>
        <textarea id='content' value={form.content} onChange={(event) => {
          setForm((prev) => ({ ...prev, content: event.target.value }))
        }} />
        <button onClick={() => createPost()} style={{ margin: 'auto' }}>Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
