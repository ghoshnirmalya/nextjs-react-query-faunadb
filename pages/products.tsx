import { Badge, Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import getAllProducts from "lib/get-all-products";
import { NextPage } from "next";
import React from "react";
import { QueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Product } from "types/product";

const ProductsPage: NextPage = () => {
  const { status, data } = useQuery("allProducts", getAllProducts);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <Grid gap={4} m={4} gridTemplateColumns="1fr" w="100%">
      <Box borderWidth={1} rounded="md" bg="white">
        <Box borderBottomWidth={1} px={8} py={6} bg="gray.200">
          <Text fontWeight="bold" textTransform="uppercase">
            Products
          </Text>
        </Box>
        <Box>
          {data.map((product: Product) => {
            return (
              <Box
                key={product._id}
                p={8}
                color="gray.700"
                borderBottomWidth={1}
              >
                <HStack spacing={8} justifyContent="space-between">
                  <Text>{product.name}</Text>
                  <Badge colorScheme="green">{product.description}</Badge>
                </HStack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
};

export const getServerSideProps = async () => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery("allProducts", getAllProducts);
  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};

export default ProductsPage;
