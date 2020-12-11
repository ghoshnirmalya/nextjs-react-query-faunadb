import { GraphQLClient, gql } from "graphql-request";

export default async function getAllCustomers() {
  const endpoint = process.env.FAUNA_GRAPHQL_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Basic ${process.env.FAUNA_AUTH_HEADER}`,
    },
  });

  const query = gql`
    {
      allCustomers {
        data {
          _id
          firstName
          lastName
        }
      }
    }
  `;

  const response = await graphQLClient.request(query);
  const data = JSON.parse(JSON.stringify(response));

  return data.allCustomers.data;
}
