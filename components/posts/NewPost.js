import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import PostForm from './PostForm';
import navStyles from '../../styles/navStyles';

export default NewPost = ({ ...props }) => {
  const { navigation } = props;
  const newPostQuery = gql`
    mutation newPost($title: String!, $body: String!, $userId: ID!) {
      createPost(title: $title, body: $body, userId: $userId) {
        id
      }
    }
  `;

  const [newPost, { loading, error }] = useMutation(newPostQuery, {
    refetchQueries: ['userQuery'],
  });

  if (error) return null;

  addNewPost = ({ title, body }) => {
    console.log('ID====', props.screenProps.user.id);
    newPost({
      variables: {
        title,
        body,
        userId: props.screenProps.user.id,
      },
    })
      .then(res => {
        console.log({ res });
        navigation.goBack();
      })
      .catch(err => {
        console.log({ err });
      });
  };
  console.log('props user', props.screenProps.user);
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
      ) : (
        <PostForm onSubmit={addNewPost} />
      )}
    </View>
  );
};

NewPost.navigationOptions = {
  title: 'New Post',
  ...navStyles,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
