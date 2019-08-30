import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

export default PostForm = ({ ...props }) => {
  const [title, setTitle] = useState(props.post.title || '');
  const [body, setBody] = useState(props.post.body || '');

  submitForm = () => {
    props.onSubmit({
      title,
      body,
    });
  };

  return (
    <View>
      <Form>
        <Item floatingLabel>
          <Label>Title</Label>
          <Input onChangeText={title => setTitle(title)} value={title} />
        </Item>
        <Item floatingLabel>
          <Label>Body</Label>
          <Input
            multiline
            onChangeText={body => setBody(body)}
            style={styles.body}
            value={body}
          />
        </Item>
      </Form>
      <Button title="Save Post" onPress={submitForm}></Button>
    </View>
  );
};

PostForm.defaultProps = {
  post: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: 400,
    textAlignVertical: 'top',
  },
});
