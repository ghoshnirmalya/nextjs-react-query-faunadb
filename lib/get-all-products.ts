import { gql } from "graphql-request";
import graphQLClient from "lib/graphql-client";

const getAllProducts = async () => {
  const query = gql`
    {
      allProducts {
        data {
          _id
          name
          description
          price
        }
      }
    }
  `;

  const response = await graphQLClient.request(query);
  const data = JSON.parse(JSON.stringify(response));

  return data.allProducts.data;
};

export default getAllProducts;
