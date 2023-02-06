import { useMutation } from '@apollo/client';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { graphql } from '../gql';

const LOGIN = graphql(/* GraphQL */ `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
`);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN, {
    variables: {
      username: username,
      password: password,
    },
    onCompleted(data, _clientOptions) {
      localStorage.setItem('jwt', data.login);
    },
  });

  const handleChange = (setState: Dispatch<SetStateAction<string>>,
    event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  }

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
          <input type='text' value={username}
            onChange={(event) => handleChange(setUsername, event)} />
        </label>
        <label>
          Password :
          <input type='text' value={password}
            onChange={(event) => handleChange(setPassword, event)} />
        </label>
        <input type='submit' />
      </form>
    </>
  );
}

export default Login;
