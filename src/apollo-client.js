import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.REACT_APP_HASURA_URI,
    cache: new InMemoryCache()
});


export { client }