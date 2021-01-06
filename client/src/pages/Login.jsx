import { Button, Input, Label } from "@windmill/react-ui";
import Layout from "layout/Layout";
import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import authService from "services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const { state } = useLocation();

  const user = authService.getCurrentUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      authService.login(email, password).then(() => {
        setRedirectToReferrer(true);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
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
          <Button type="submit">Login</Button>
        <p className="text-sm mt-4">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
