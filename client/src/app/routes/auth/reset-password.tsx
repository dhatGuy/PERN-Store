import { Alert } from "flowbite-react";
import { AlertCircle } from "react-feather";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { SEOHelmet } from "~/components/SEOHelmet";
import ResetPasswordForm from "~/features/auth/components/reset-password-form";
import authService from "~/services/auth.service";

export const resetPasswordLoader =
  () =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");

    if (!token || !email) {
      return { showForm: false };
    }
    const res = await authService.checkToken({ token, email });

    const showForm = res.data.data;

    return { showForm };
  };

export function ResetPassword() {
  const { showForm } = useLoaderData() as { showForm: boolean };

  return (
    <>
      <SEOHelmet title="Reset Password" />
      {showForm ? (
        <div className="pt-12">
          <div className="mx-auto max-w-lg shadow-2xl p-8 md:p-10">
            <ResetPasswordForm />
          </div>
        </div>
      ) : (
        <div>
          <Alert color="failure" icon={AlertCircle} className="text-2xl font-medium">
            Password reset link has expired or is invalid
          </Alert>
        </div>
      )}
    </>
  );
}
