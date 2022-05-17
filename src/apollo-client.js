import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.REACT_APP_SECRET_KEY,
    cache: new InMemoryCache()
});


export { client }