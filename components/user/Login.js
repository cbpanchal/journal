import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { withApollo } from '@apollo/react-hoc';
import CreatUser from './CreatUser';
import LoginUser from './LoginUser';

const Login = ({ ...props }) => {
  const [register, setRegister] = useState(true);
  return (
    <View style={styles.container}>
      {register ? <CreatUser {...props} /> : <LoginUser {...props} />}
      <Button
        title={register ? 'Login' : 'Register'}
        onPress={() => {
          setRegister(!register);
        }}
      />
    </View>
  );
};

export default withApollo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
