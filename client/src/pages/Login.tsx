import { ContentLayout } from "~/components/layouts";
import { LoginForm } from "~/features/auth/components/login-form";

const Login = () => {
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => handleGoogleLogin(codeResponse),
  //   onError: (error) => console.log("Login Failed:", error),
  //   flow: "auth-code",
  // });

  // async function handleGoogleLogin(googleData) {
  //   try {
  //     const data = await authService.googleLogin(googleData.code);
  //     toast.success("Login successful 🔓");

  //     // setUserState(data);
  //     setRedirectToReferrer(true);
  //     setIsGoogleLoading(false);
  //   } catch (error) {
  //     setIsGoogleLoading(false);
  //     toast.error("Could not login with Google 😢");
  //   }
  // }

  // if (redirectToReferrer) {
  //   return <Navigate to={state?.from || "/"} />;
  // }
  // if (isLoggedIn) {
  //   return <Navigate to={state?.from || "/"} />;
  // }

  return (
    <ContentLayout title="Login">
      <div className="flex items-center justify-center m-auto mt-20">
        <LoginForm />
      </div>
    </ContentLayout>
  );
};

export default Login;
