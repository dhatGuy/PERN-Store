import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { meQueryOption } from "~/lib/queryOptions";
import authService from "~/services/auth.service";

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signup,
    onSuccess: async (data, _variables) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      await queryClient.fetchQuery(meQueryOption);
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
