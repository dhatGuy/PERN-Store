import { SEOHelmet } from "~/components/SEOHelmet";
import { SignupForm } from "~/features/auth/components/signup-form";

export function Signup() {
  return (
    <div className="flex items-center justify-center mx-auto mt-20">
      <SEOHelmet title="Create an account" />
      <SignupForm />
    </div>
  );
}
