import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import useQuery from "hooks/useQuery";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
      <Toaster />
      {msg.showForm ? (
        <div>
          <h1>Reset Password</h1>
          <form onSubmit={handlePasswordReset}>
            <Label>
              <span>Password</span>
              <Input
                type="password"
                inputMode="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
            <HelperText>{resetmsg.message || ""}</HelperText>
            <Label>
              <span>Confirm Password</span>
              <Input
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
      ) : (
        <div>{msg.message}</div>
      )}
    </Layout>
  );
};

export default ResetPassword;
