import getAllCustomers from "lib/get-all-customers";
import { QueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { User } from "types/user";

export default function GraphQLPage() {
  const { status, data } = useQuery("allCustomers", getAllCustomers);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return data.map((user: User) => {
    return (
      <div key={user._id}>
        {user.firstName} {user.lastName}
      </div>
    );
  });
}

export async function getServerSideProps() {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery("allCustomers", getAllCustomers);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
}
