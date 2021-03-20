import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import API from "api/axios.config";
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const history = useHistory();
  const { isLoggedIn } = useUser();
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { password, password2, username, name, email } = data;
    setError("");
    if (password === password2) {
      setIsLoading(!isLoading);
      API.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      })
        .then(() => {
          setError("");
          toast.success("Account created successfully.");
          setTimeout(() => {
            history.push("/login");
            setIsLoading(!isLoading);
          }, 1000);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setError(response.data);
        });
    } else {
      setError("Password doesn't match ");
    }
  };

  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }
  return (
    <Layout title="Create account">
      <div className="flex items-center justify-center mx-auto mt-20 ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2 mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-4xl">Create Account</h1>
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Username</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="username"
              ref={register({
                minLength: {
                  value: 4,
                  message: "Username must be greater than 3 characters",
                },
                required: "Username is required",
              })}
            />
          </div>
          {errors.username && errors.username.type === "required" && (
            <HelperText className="pt-2" valid={false}>
              {errors.username.message}
            </HelperText>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <HelperText className="pt-2" valid={false}>
              {errors.username.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Fullname</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="name"
              ref={register({
                required: "Name cannot be empty",
                minLength: {
                  value: 6,
                  message: "Name must be greater than 5 characters",
                },
              })}
            />
          </div>
          {errors.name && errors.name.type === "required" && (
            <HelperText className="pt-2" valid={false}>
              {errors.name.message}
            </HelperText>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <HelperText className="pt-2" valid={false}>
              {errors.name.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Email</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              ref={register({
                required: "Email required",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not valid",
                },
              })}
            />
          </div>
          {errors.email && errors.email.type === "required" && (
            <HelperText className="pt-2" valid={false}>
              {errors.email.message}
            </HelperText>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <HelperText className="pt-2" valid={false}>
              {errors.email.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Password</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password"
              ref={register({
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Password must be greater than 5 characters",
                },
              })}
            />
          </div>
          {errors.password && errors.password.type === "required" && (
            <HelperText className="pt-2" valid={false}>
              {errors.password.message}
            </HelperText>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <HelperText className="pt-2" valid={false}>
              {errors.password.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Confirm Password</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password2"
              ref={register({
                validate: (value) =>
                  value === password.current || "Passwords do not match",
              })}
            />
            {errors.password2 && (
              <HelperText className="pt-2" valid={false}>
                {errors.password2.message}
              </HelperText>
            )}
          </div>
          <Button type="submit" className="mt-4">
            {isLoading ? (
              <PulseLoader color={"#0a138b"} size={10} loading={isLoading} />
            ) : (
              "Create Account"
            )}
          </Button>
          {error && (
            <HelperText className="pt-2" valid={false}>
              {error}
            </HelperText>
          )}
          <p className="text-sm mt-4">
            Have an account?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
