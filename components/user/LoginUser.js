import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import UserForm from './UserForm';
import { signIn } from '../../loginUtils';

export default LoginUser = ({ ...props }) => {
  const signinUserQuery = gql`
    mutation signinUser($email: String!, $password: String!) {
      signinUser(email: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const [signinUser, { loading }] = useMutation(signinUserQuery);

  loginUser = async ({ email, password }) => {
    try {
      const signin = await signinUser({
        variables: { email, password },
      });
      signIn(signin.data.signinUser.token);
      props.client.resetStore();
      console.log(signin.data.signinUser.token);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View>
      <ActivityIndicator size="large" animating={loading} />
      <Text>Login</Text>
      <UserForm type="Login" onSubmit={loginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
