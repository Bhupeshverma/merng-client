import React from 'react';
import App from './App';
import { InMemoryCache, ApolloClient, createHttpLink, ApolloProvider } from "@apollo/client";
import { setContext } from "apollo-link-context";


const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ``
    }
  };
});
const httpLink = createHttpLink({
  uri: "https://serene-sierra-97965.herokuapp.com/",
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)