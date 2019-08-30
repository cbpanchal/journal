import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Fab, Icon } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import navStyles from '../../styles/navStyles';

export default MyPosts = ({ ...props }) => {
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

  const { loading, error, data } = useQuery(postQuery, {
    variables: {
      id: params.id,
    },
  });

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        animating={loading}
        style={styles.indicator}
      />
    );
  if (error) return <Text>Error :(</Text>;

  updatePost = () => {
    props.navigation.navigate('UpdatePost', {
      id: params.id,
      title: params.title,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>{data.Post.body}</Text>
      <Fab style={styles.newPost} onPress={updatePost}>
        <Icon name="create" />
      </Fab>
    </View>
  );
};

MyPosts.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  return {
    title: params.title,
    ...navStyles,
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  bodyText: {
    fontSize: 16,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPost: {
    backgroundColor: '#82D8D8',
  },
});
