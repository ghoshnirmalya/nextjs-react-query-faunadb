import { Box, Grid, Text } from "@chakra-ui/react";
import getAllCustomers from "lib/get-all-customers";
import { NextPage } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { User } from "types/user";

const CustomersPage: NextPage = () => {
  const { status, data } = useQuery("allCustomers", getAllCustomers, {
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
            Customers
          </Text>
        </Box>
        <Box>
          {data.map((user: User) => {
            return (
              <Text key={user._id} p={8} color="gray.700" borderBottomWidth={1}>
                {user.firstName} {user.lastName}
              </Text>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("allCustomers", getAllCustomers, {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CustomersPage;
