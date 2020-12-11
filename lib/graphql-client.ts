import { GraphQLClient } from "graphql-request";

const endpoint = process.env.FAUNA_GRAPHQL_ENDPOINT;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Basic ${process.env.FAUNA_AUTH_HEADER}`,
  },
});

export default graphQLClient;
