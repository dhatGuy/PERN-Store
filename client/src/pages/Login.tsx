import { ContentLayout } from "~/components/layouts";
import { LoginForm } from "~/features/auth/components/login-form";

const Login = () => {
  return (
    <ContentLayout title="Login">
      <div className="flex items-center justify-center m-auto mt-20">
        <LoginForm />
      </div>
    </ContentLayout>
  );
};

export default Login;
