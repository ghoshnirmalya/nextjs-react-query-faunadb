import { Badge, Box, Grid, HStack, Text } from "@chakra-ui/react";
import getAllOrders from "lib/get-all-orders";
import { NextPage } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Order } from "types/order";

const OrdersPage: NextPage = () => {
  const { status, data } = useQuery("allOrders", getAllOrders, {
    staleTime: Infinity,
  });

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
            Orders
          </Text>
        </Box>
        <Box>
          {data.map((order: Order) => {
            return (
              <Box key={order._id} p={8} color="gray.700" borderBottomWidth={1}>
                <HStack spacing={8} justifyContent="space-between">
                  <Text>{order.shipAddress.city}</Text>
                  <Badge colorScheme="green">{order.status}</Badge>
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("allOrders", getAllOrders, {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OrdersPage;
