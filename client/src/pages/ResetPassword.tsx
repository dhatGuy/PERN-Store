import { useLoaderData } from "react-router-dom";
import { ContentLayout } from "~/components/layouts";
import ResetPasswordForm from "~/features/auth/components/reset-password-form";

const ResetPassword = () => {
  const showForm = useLoaderData();

  return (
    <ContentLayout title="Reset Password">
      {showForm ? (
        <div className="pt-12">
          <div className="mx-auto max-w-lg shadow-2xl p-8 md:p-10">
            <ResetPasswordForm />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-medium">Password reset link has expired or is invalid</p>
        </div>
      )}
    </ContentLayout>
  );
};

export default ResetPassword;
