import instance from "api/axios.config";
import { UserContext } from "context/UserContext";
import React, { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const { state } = useLocation();
  const [userData] = useContext(UserContext)

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      setRedirectToReferrer(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }
    const user = JSON.parse(localStorage.getItem("user"));
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
