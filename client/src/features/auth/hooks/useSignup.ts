import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import API from "~/api/axios.config";
import { SignupInput } from "../auth-schema";

export const useSignup = () => {
  const signup = async (data: SignupInput) => {
    const { username, email, password, fullname } = data;

    const res = await API.post("/auth/signup", {
      username,
      email,
      password,
      fullname,
    });

    return res.data;
  };

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
