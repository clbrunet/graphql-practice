import { useApolloClient, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../gql';
import { setUsername } from '../username';

const LOGIN = graphql(/* GraphQL */ `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
`);

const REGISTER = graphql(/* GraphQL */ `
mutation Register($username: String!, $password: String!) {
  register(username: $username, password: $password)
}
`);

function SignIn() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const variables = {
    username: form.username,
    password: form.password,
  };
  const client = useApolloClient();
  const navigate = useNavigate();
  const onSignInCompleted = (username: string) => {
    setUsername(username);
    client.resetStore();
    navigate('/');
  };

  const [login] = useMutation(LOGIN, {
    variables,
    onCompleted(data, _clientOptions) {
      onSignInCompleted(data.login);
    },
  });
  const [register] = useMutation(REGISTER, {
    variables,
    onCompleted(data, _clientOptions) {
      onSignInCompleted(data.register);
    },
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>
      <h4>Create User :</h4>
      <label>
        Username :
        <input type='text' value={form.username}
          onChange={(event) => setForm((prev) => ({
            ...prev,
            username: event.target.value,
          }))} />
      </label>
      <label>
        Password :
        <input type='text' value={form.password}
          onChange={(event) => setForm((prev) => ({
            ...prev,
            password: event.target.value,
          }))} />
      </label>
      <button onClick={() => login()} style={{ margin: 'auto' }}>Login</button>
      <button onClick={() => register()} style={{ margin: 'auto' }}>Register</button>
    </form>
  );
}

export default SignIn;
