import { gql } from "graphql-request";
import graphQLClient from "lib/graphql-client";

const getAllOrders = async () => {
  const query = gql`
    {
      allOrders {
        data {
          _id
          status
          shipAddress {
            city
          }
        }
      }
    }
  `;

  const response = await graphQLClient.request(query);
  const data = JSON.parse(JSON.stringify(response));

  return data.allOrders.data;
};

export default getAllOrders;
