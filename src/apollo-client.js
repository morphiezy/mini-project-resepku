import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://mini-project-resepku.hasura.app/v1/graphql',
    cache: new InMemoryCache()
});

export { client }