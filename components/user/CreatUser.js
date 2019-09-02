import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import UserForm from './UserForm';
import { signIn } from '../../loginUtils';

export default CreateUser = ({ ...props }) => {
  const createUserQuery = gql`
    mutation createUser($email: String!, $password: String!) {
      createUser(
        authProvider: { email: { email: $email, password: $password } }
      ) {
        id
      }
    }
  `;

  const signinUserQuery = gql`
    mutation signinUser($email: String!, $password: String!) {
      signinUser(email: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const [createUser, { loading }] = useMutation(createUserQuery);

  const [signinUser] = useMutation(signinUserQuery);

  signupUser = async ({ email, password }) => {
    console.log({ email, password });
    try {
      const user = await createUser({
        variables: { email, password },
      });
      const signin = await signinUser({
        variables: { email, password },
      });
      signIn(signin.data.signinUser.token);
      props.client.resetStore();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View>
      <ActivityIndicator size="large" animating={loading} />
      <Text>Register</Text>
      <UserForm type="Register" onSubmit={signupUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
