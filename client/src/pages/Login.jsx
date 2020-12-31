import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
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
      authService.login(email, password)
      console.log(state);
      setRedirectToReferrer(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }
    if (user?.token) {
    return <Redirect to={state?.from || '/'} />
  } 

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
