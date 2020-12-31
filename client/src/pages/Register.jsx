import instance from "api/axios.config";
import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import authService from "services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {state} = useLocation()

  const user = authService.getCurrentUser();

  const onSubmit = (e) => {
    e.preventDefault()
    if(password === confirmPassword){

      instance.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      });
    } else{
      alert("Password doesn't match ")
    }
  };

  if (user?.token) {
    return <Redirect to={state?.from || '/'} />

} 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="name">Fullname</label>
          <input
            type="text"
            name="name"
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
