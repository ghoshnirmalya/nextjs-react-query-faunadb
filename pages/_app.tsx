import {
  Box,
  ChakraProvider,
  Container,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Link from "next/link";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Box bg="gray.100" h="100vh" w="100vw">
            <Box borderWidth={1} rounded="md" bg="white" p={6}>
              <Container maxW="4xl">
                <HStack spacing={16}>
                  <Link href="/">
                    <ChakraLink>Customers</ChakraLink>
                  </Link>
                  <Link href="/products">
                    <ChakraLink>Products</ChakraLink>
                  </Link>
                  <Link href="/orders">
                    <ChakraLink>Orders</ChakraLink>
                  </Link>
                </HStack>
              </Container>
            </Box>
            <Container maxW="4xl" centerContent>
              <Component {...pageProps} />
            </Container>
          </Box>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
