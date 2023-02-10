import { useApolloClient, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsernameContext } from '../App';
import { graphql } from '../gql';

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
  let location = useLocation();
  const { setUsername } = useContext(UsernameContext);
  const [form, setForm] = useState({
    username: '',
    password: '',
    error_message: '',
  });
  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        error_message: location.state,
      }));
    }
  }, []);
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
  const onSignInError = (message: string) => {
    setForm((prev) => ({
      ...prev,
      error_message: message
    }));
  };
  const [login] = useMutation(LOGIN, {
    variables,
    onCompleted(data, _clientOptions) {
      onSignInCompleted(data.login);
    },
    onError(error, _clientOptions) {
      onSignInError(error.message);
    },
  });
  const [register] = useMutation(REGISTER, {
    variables,
    onCompleted(data, _clientOptions) {
      onSignInCompleted(data.register);
    },
    onError(error, _clientOptions) {
      onSignInError(error.message);
    },
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} >
      <h4>Sign in :</h4>
      <label htmlFor='username'>Username :</label>
      <input id='username' type='text' value={form.username}
        onChange={(event) => setForm((prev) => ({
          ...prev,
          username: event.target.value,
        }))} />
      <label htmlFor='password'>Password :</label>
      <input id='password' type='text' value={form.password}
        onChange={(event) => setForm((prev) => ({
          ...prev,
          password: event.target.value,
        }))} />
      {form.error_message && <p style={{ color: 'red' }}>{form.error_message}</p>}
      <button onClick={() => login()} style={{ margin: 'auto' }}>Login</button>
      <button onClick={() => register()} style={{ margin: 'auto' }}>Register</button>
    </form>
  );
}

export default SignIn;
