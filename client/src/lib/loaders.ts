import { QueryClient } from "@tanstack/react-query";
import { meQueryOption } from "./queryOptions";

const queryClient = new QueryClient();

export const rootLoader = async () => {
  await queryClient.prefetchQuery(meQueryOption);
  return null;
};
