import { queryOptions } from "@tanstack/react-query";
import authService from "~/services/auth.service";

export const meQueryOption = queryOptions({
  queryKey: ["me"],
  queryFn: authService.getCurrentUser,
  staleTime: Infinity,
  // retry(failureCount, error) {
  //   if (isAxiosError(error) && error.response?.status === 401) {
  //     return false;
  //   }
  //   return failureCount < 3;
  // },
});
