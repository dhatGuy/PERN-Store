import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import authService from "services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();

  const user = authService.getCurrentUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(!isLoading)
      await authService.login(email, password);
      setRedirectToReferrer(true);
      setIsLoading(!isLoading)
      window.location.reload();
    } catch (error) {
      setIsLoading(false)
      setError(error.response.data);
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/"} />;
  }
  if (user?.token) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <Layout title="Login">
      <div className="flex items-center justify-center m-auto mt-20">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-1/2 "
          onSubmit={onSubmit}
        >
          <h1 className="text-center text-4xl mb-2">Continue Shopping</h1>
          <div className="mb-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Email</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              required
              id="email"
              value={email}
              placeholder="Enter a valid email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Password</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password"
              required
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <Button type="submit">
            {isLoading ? <Spinner size={20} loading={isLoading}/> : "Login"}
          </Button>
          {error && <HelperText className="mt-1 italic" valid={false}>{error.message}</HelperText>}
          <p className="text-sm mt-4">
            Don't have an account? <Link to="/signup" className="font-bold">Sign Up</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
