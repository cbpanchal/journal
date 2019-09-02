import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, Body, Icon, Right } from 'native-base';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';

export default ({ ...props }) => {
  const { navigation, screenProps } = props;
  // const { loading, error, data } = useQuery(gql`
  //   query postsQuery {
  //     allPosts(orderBy: createdAt_DESC) {
  //       title
  //       id
  //     }
  //   }
  // `);

  // if (loading)
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       animating={loading}
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     />
  //   );
  // if (error) return <Text>Error :(</Text>;
  return (
    <View style={{ flex: 1 }}>
      <List>
        <FlatList
          data={screenProps.user.posts}
          renderItem={({ item }) => (
            <ListItem
              button={true}
              onPress={() => {
                navigation.navigate('Post', {
                  id: item.id,
                  title: item.title,
                });
              }}>
              <Body>
                <Text>{item.title}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )}
          keyExtractor={item => item.id}
        />
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
