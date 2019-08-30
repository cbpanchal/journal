import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import PostForm from './PostForm';
import navStyles from '../../styles/navStyles';

export default UpdatePost = ({ ...props }) => {
  const { navigation } = props;
  const { params } = props.navigation.state;

  const postQuery = gql`
    query Post($id: ID!) {
      Post(id: $id) {
        id
        title
        body
      }
    }
  `;

  const newPostQuery = gql`
    mutation updatePost(
      $id: ID!
      $title: String!
      $body: String!
      $userId: ID!
    ) {
      updatePost(id: $id, title: $title, body: $body, userId: $userId) {
        id
      }
    }
  `;

  const { data } = useQuery(postQuery, {
    variables: {
      id: params.id,
    },
  });

  const [updatePost, { loading, error }] = useMutation(newPostQuery, {
    refetchQueries: ['postQuery'],
  });

  if (error) return null;

  addNewPost = ({ title, body }) => {
    console.log('ID====', props.screenProps.user.id);
    updatePost({
      variables: {
        id: data.Post.id,
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

  console.log('data===', data);
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
      ) : (
        <PostForm onSubmit={addNewPost} post={data.Post} />
      )}
    </View>
  );
};

UpdatePost.navigationOptions = {
  title: 'Update Post',
  ...navStyles,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
