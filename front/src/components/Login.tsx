import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../gql';
import { setUsername } from '../username';

const LOGIN = graphql(/* GraphQL */ `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
`);

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [login] = useMutation(LOGIN, {
    variables: {
      username: form.username,
      password: form.password,
    },
    onCompleted(data, clientOptions) {
      setUsername(data.login);
      clientOptions?.client?.resetStore();
      navigate('/');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  }

  return (
    <>
      <h4>Create User :</h4>
      <form onSubmit={handleSubmit}>
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
        <input type='submit' />
      </form>
    </>
  );
}

export default Login;
