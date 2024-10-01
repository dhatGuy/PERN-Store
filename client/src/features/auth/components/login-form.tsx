import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { isAxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "~/components/ui/Button";
import Label from "~/components/ui/label";
import TextInput from "~/components/ui/text-input";
import ForgotPasswordModal from "~/features/auth/components/forgot-password";
import { addServerErrors } from "~/utils";
import { LoginInput, loginInputSchema } from "../auth-schema";
import { useGLogin } from "../hooks/useGoogleLogin";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const gLoginMutation = useGLogin();

  const gLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      gLoginMutation.mutate(codeResponse.code, {
        onSuccess: () => {
          toast.success("Login successful 🔓");
          // navigate("/", { replace: true });
        },
        onError: (error) => {
          // console.log("Login Failed:", error)
          toast.error("Google login failed");
        },
      });
    },
    onError: (_error) => toast.error("Google login failed"),
    flow: "auth-code",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginInputSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (inputs) => {
    loginMutation.mutate(inputs, {
      onError: (error) => {
        if (isAxiosError(error)) {
          if (error.response?.data.status === "FIELD_ERROR") {
            return addServerErrors(error.response.data.formFields, setError);
          }
        }
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again!");
      },
      onSuccess: () => {
        toast.success("Login successful 🔓");

        if (state?.next) {
          return navigate(state?.next, { replace: true });
        }

        navigate("/", { replace: true });
      },
    });
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-4xl my-4">Continue Shopping</h1>
        <div className="">
          <Label className="block text-grey-darker text-sm font-bold mb-2">Email</Label>
          <TextInput
            {...register("email")}
            placeholder="Enter a valid email"
            error={errors?.email?.message}
          />
        </div>
        <div className="mt-4">
          <Label className="block text-grey-darker text-sm font-bold mb-2">Password</Label>
          <TextInput type="password" {...register("password")} error={errors?.password?.message} />
        </div>
        <div className="mt-4 ml-auto">
          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="mb-1 text-sm p-1 text-blue-700"
          >
            Forgot password?
          </Button>
        </div>
        <Button
          type="submit"
          className="mt-4"
          loading={loginMutation.isPending}
          disabled={gLoginMutation.isPending}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={gLogin}
          loading={gLoginMutation.isPending}
          disabled={loginMutation.isPending}
          className={`justify-center mt-4 hover:bg-white bg-white shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-2"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          Login in with Google
        </Button>
        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>

      <ForgotPasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
