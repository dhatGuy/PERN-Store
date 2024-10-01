import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meQueryOption } from "~/lib/queryOptions";
import authService from "~/services/auth.service";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data, _variables) => {
      localStorage.setItem("token", JSON.stringify(data.data.token));
      await queryClient.fetchQuery(meQueryOption);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
