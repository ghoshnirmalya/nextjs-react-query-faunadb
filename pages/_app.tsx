import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}
