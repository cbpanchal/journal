/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import Navigator from './Navigator';
import { setContext } from 'apollo-link-context';
import { getToken } from './loginUtils';

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjzwmuzb920gm0154ypyrmc98',
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
