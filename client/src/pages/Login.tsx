import { SEOHelmet } from "~/components/SEOHelmet";
import { LoginForm } from "~/features/auth/components/login-form";

const Login = () => {
  return (
    <div className="flex items-center justify-center m-auto mt-20">
      <SEOHelmet title="Login" />
      <LoginForm />
    </div>
  );
};

export default Login;
