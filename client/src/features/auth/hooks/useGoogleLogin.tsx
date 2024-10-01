import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meQueryOption } from "~/lib/queryOptions";
import authService from "~/services/auth.service";

export const useGLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: async (data) => {
      localStorage.setItem("token", JSON.stringify(data.data.token));
      await queryClient.fetchQuery(meQueryOption);
    },
  });
};
