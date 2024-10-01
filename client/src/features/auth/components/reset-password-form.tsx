import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "~/components/ui/Button";
import Heading from "~/components/ui/heading";
import Label from "~/components/ui/label";
import TextInput from "~/components/ui/text-input";
import { ResetPasswordInput, resetPasswordSchema } from "../auth-schema";
import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const passwordResetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password2: "",
      email: email || "",
      token: token || "",
    },
  });

  const handlePasswordReset = async (data: ResetPasswordInput) => {
    passwordResetMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successfully");
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        toast.error("Password reset failed");
      },
    });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(handlePasswordReset)}>
      <header className="max-w-lg mx-auto mb-4">
        <Heading order={2} className="text-4xl font-semibold text-center">
          Reset Password
        </Heading>
      </header>

      <Label>Password</Label>
      <TextInput
        // className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        className="mb-4"
      />
      <Label>Confirm Password</Label>
      <TextInput
        // className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
        type="password"
        className="mb-4"
        error={errors.password2?.message}
        {...register("password2")}
      />
      {/* {resetMsg && (
        <HelperText className="pt-2" valid={false}>
          {resetMsg.message || ""}
        </HelperText>
      )} */}
      <Button type="submit" loading={passwordResetMutation.isPending}>
        Reset Password
      </Button>
    </form>
  );
}
