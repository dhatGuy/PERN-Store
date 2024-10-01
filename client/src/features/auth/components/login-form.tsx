import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "~/components/ui/Button";
import Label from "~/components/ui/label";
import TextInput from "~/components/ui/text-input";
import { addServerErrors } from "~/utils";
import { LoginInput, loginInputSchema } from "../auth-schema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const loginMutation = useLogin();
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
      {/* <div className="mt-4">
        <ForgotPasswordModal />
      </div> */}
      <Button type="submit" className="mt-4" loading={loginMutation.isPending}>
        Login
      </Button>
      {/* <Button
        type="button"
        layout="link"
        onClick={() => {
          setIsGoogleLoading(true);
          login();
        }}
        disabled={isLoading || isGoogleLoading}
        className="mt-4 hover:bg-white bg-white shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        {isGoogleLoading ? (
          <PulseLoader color={"#0a138b"} size={10} loading />
        ) : (
          "Login in with Google"
        )}
      </Button> */}
      <p className="text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
