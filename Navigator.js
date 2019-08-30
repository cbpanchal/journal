import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { Fab, Icon } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withApollo } from '@apollo/react-hoc';

import navStyles from './styles/navStyles';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import NewPost from './components/posts/NewPost';
import Login from './components/user/Login';
import { signOut } from './loginUtils';
import UpdatePost from './components/posts/UpdatePost';

const Home = ({ ...props }) => {
  newPost = () => {
    props.navigation.navigate('NewPost');
  };

  return (
    <View style={styles.container}>
      <Posts {...props} />
      <Button
        onPress={() => {
          signOut();
          props.client.resetStore();
        }}
        title="Logout"
      />
      <Fab style={styles.newPost} onPress={newPost}>
        <Icon name="add" />
      </Fab>
    </View>
  );
};

Home.navigationOptions = {
  title: 'Home',
  ...navStyles,
};

const Navigator = createStackNavigator(
  {
    Home: {
      screen: withApollo(Home),
    },
    Post: {
      screen: Post,
    },
    NewPost: {
      screen: NewPost,
    },
    UpdatePost: {
      screen: UpdatePost,
    },
    Login: {
      screen: Login,
    },
  },
  {
    defaultNavigationOptions: {},
  },
);

const AppContainer = createAppContainer(Navigator);

const NavWrapper = ({ ...props }) => {
  const userQuery = gql`
    query userQuery {
      user {
        id
        email
        posts(orderBy: createdAt_DESC) {
          id
          title
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(userQuery);
  if (loading)
    return (
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  console.log(data.user);
  if (!data.user) return <Login />;
  return <AppContainer screenProps={{ user: data.user }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newPost: {
    backgroundColor: '#82D8D8',
  },
  newPostText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default NavWrapper;
