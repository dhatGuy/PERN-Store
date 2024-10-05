import { SEOHelmet } from "~/components/SEOHelmet";
import { LoginForm } from "~/features/auth/components/login-form";

export function Login() {
  return (
    <div className="flex items-center justify-center mx-auto mt-20">
      <SEOHelmet title="Create an account" />
      <LoginForm />
    </div>
  );
}
