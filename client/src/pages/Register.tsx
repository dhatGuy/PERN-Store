import { ContentLayout } from "~/components/layouts";
import { SignupForm } from "~/features/auth/components/signup-form";

const Register = () => {
  // const { isLoggedIn, setUserState } = useUser();

  // if (isLoggedIn) {
  //   return <Navigate to={state?.from || "/"} />;
  // }
  return (
    <ContentLayout title="Create account">
      <div className="flex items-center justify-center mx-auto mt-20">
        <SignupForm />
      </div>
    </ContentLayout>
  );
};

export default Register;
