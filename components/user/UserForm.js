import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

export default UserForm = ({ ...props }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  submitForm = () => {
    props.onSubmit({ email, password });
  };

  return (
    <Form>
      <Item floatingLabel>
        <Label>Email</Label>
        <Input
          keyboardType="email-address"
          value={email}
          onChangeText={email => {
            setEmail(email);
          }}
        />
      </Item>
      <Item floatingLabel>
        <Label>Password</Label>
        <Input
          secureTextEntry
          value={password}
          onChangeText={password => {
            setPassword(password);
          }}
        />
      </Item>
      <Button title={props.type} onPress={submitForm} />
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
