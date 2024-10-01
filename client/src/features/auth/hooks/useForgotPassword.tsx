import { useMutation } from "@tanstack/react-query";
import authService from "~/services/auth.service";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};
