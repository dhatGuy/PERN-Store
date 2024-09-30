import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "~/components/ui/Button";
import Heading from "~/components/ui/heading";
import Label from "~/components/ui/label";
import TextInput from "~/components/ui/text-input";
import { addServerErrors } from "~/utils";
import { SignupInput, signupInputSchema } from "../auth-schema";
import { useSignup } from "../hooks/useSignup";

export function SignupForm() {
  const [error, setServerError] = useState("");
  // const { state } = useLocation();
  const mutation = useSignup();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupInputSchema),
  });

  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        if (isAxiosError(error)) {
          if (error.response?.data.status === "FIELD_ERROR") {
            addServerErrors(error.response.data.formFields, setError);
          }
        } else {
          setServerError("An error occurred. Please try again.");
        }
      },
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2 mx-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading className="text-center" order={2}>
        Create Account
      </Heading>
      <div className="mt-4">
        <Label className="block text-grey-darker text-sm font-bold mb-2">Username</Label>
        <TextInput {...register("username")} error={errors?.username?.message} />
      </div>
      <div className="mt-4">
        <Label className="block text-grey-darker text-sm font-bold mb-2">Fullname</Label>
        <TextInput type="text" {...register("fullname")} error={errors?.fullname?.message} />
      </div>
      <div className="mt-4">
        <Label className="block text-grey-darker text-sm font-bold mb-2">Email</Label>
        <TextInput type="email" {...register("email")} error={errors?.email?.message} />
      </div>
      <div className="mt-4">
        <Label className="block text-grey-darker text-sm font-bold mb-2">Password</Label>
        <TextInput type="password" {...register("password")} error={errors?.password?.message} />
      </div>
      <div className="mt-4">
        <Label className="block text-grey-darker text-sm font-bold mb-2">Confirm Password</Label>
        <TextInput type="password" {...register("password2")} error={errors?.password2?.message} />
      </div>
      <Button type="submit" className="mt-4" loading={mutation.isPending}>
        Create Account
      </Button>
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      <p className="text-sm mt-4">
        Have an account?{" "}
        <Link to="/login" className="font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
