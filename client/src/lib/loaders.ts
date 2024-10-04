import { queryClient } from "~/queryClient";
import { meQueryOption } from "./queryOptions";
export const rootLoader = async () => {
  await queryClient.ensureQueryData(meQueryOption);
  return null;
};
