import { useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { graphql } from '../gql';
import { GET_USERS } from './Users';

const CREATE_USER = graphql(/* GraphQL */ `
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    username
  }
}
`);

function CreateUser() {
  const [username, setUsername] = useState('');
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      input: {
        username: username,
      },
    },
    refetchQueries: [GET_USERS],
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createUser();
    setUsername('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username :
        <input type='text' value={username} onChange={handleChange} />
      </label>
      <input type='submit' />
    </form>
  );
}

export default CreateUser;
