import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import PulseLoader from "react-spinners/PulseLoader";
import useQuery from "helpers/useQuery";
import Layout from "layout/Layout";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import authService from "services/auth.service";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [msg, setMsg] = useState("");
  const [resetmsg, setResetMsg] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const token = query.get("token");
  const email = query.get("email");
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    authService
      .checkToken(token, email)
      .then(({ data }) => setMsg(data))
      .catch((e) => console.error(e.response));
  }, [token, email]);

  const handlePasswordReset = (data) => {
    setIsResetting(true);
    authService
      .resetPassword(token, email, data.password, data.password2)
      .then(({ data }) => {
        if (data.status === "error") {
          setIsResetting(false);
          setResetMsg(data);
          return;
        }
        toast.success(data.message);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      })
      .catch((err) => {
        setIsResetting(false);
      });
  };
  return (
    <Layout title="Reset Password">
      {msg.showForm ? (
        <div className="pt-12">
          <header className="max-w-lg mx-auto mb-4">
            <h1 className="text-4xl font-bold text-center">Reset Password</h1>
          </header>
          <div className="mx-auto max-w-lg shadow-2xl p-8 md:p-10">
            <form className="flex flex-col" onSubmit={handleSubmit(handlePasswordReset)}>
              <Label className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Password</span>
                <Input
                  className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
                  type="password"
                  inputMode="password"
                  name="password"
                  ref={register({
                    required: "Password cannot be empty",
                    minLength: {
                      value: 6,
                      message: "Password must be greater than 5 characters",
                    },
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <HelperText className="pt-2" valid={false}>
                    {resetmsg.message}
                  </HelperText>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <HelperText className="pt-2" valid={false}>
                    {resetmsg.message}
                  </HelperText>
                )}
              </Label>
              <Label className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</span>
                <Input
                  className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
                  type="password"
                  inputMode="password"
                  name="password2"
                  ref={register({
                    validate: (value) => value === password.current || "Passwords do not match",
                  })}
                />
              </Label>
              {errors.password && errors.password.type === "required" && (
                <HelperText className="pt-2" valid={false}>
                  {resetmsg.message}
                </HelperText>
              )}
              {resetmsg && (
                <HelperText className="pt-2" valid={false}>
                  {resetmsg.message || ""}
                </HelperText>
              )}
              <Button type="submit" disabled={isResetting}>
                {isResetting ? <PulseLoader size={10} color={"#0a138b"} /> : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div>{msg.message}</div>
      )}
    </Layout>
  );
};

export default ResetPassword;
