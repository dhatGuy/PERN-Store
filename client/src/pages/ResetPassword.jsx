import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import useQuery from "hooks/useQuery";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import authService from "services/auth.service";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [resetmsg, setResetMsg] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const token = query.get("token");
  const email = query.get("email");

  useEffect(() => {
    authService
      .checkToken(token, email)
      .then(({ data }) => setMsg(data))
      .catch((e) => console.log(e.response));
  }, [token, email]);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsResetting(true);
    authService
      .resetPassword(token, email, password, password2)
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
        console.log(err);
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
            <form className="flex flex-col" onSubmit={handlePasswordReset}>
              <Label className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </span>
                <Input
                  className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
                  type="password"
                  inputMode="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <HelperText valid={false}>{resetmsg.message || ""}</HelperText>
              </Label>
              <Label className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </span>
                <Input
                  className="rounded w-full text-gray-700 focus:outline-none border px-2 py-2 focus:border-purple-600 transition duration-500"
                  type="password"
                  inputMode="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Label>
              <Button type="submit">
                {isResetting ? <Spinner size={20} /> : "Reset Password"}
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
