import { Button, Input, Label } from "@windmill/react-ui";
import instance from "api/axios.config";
import Layout from "layout/Layout";
import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import authService from "services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state } = useLocation();
  const history = useHistory()

  const user = authService.getCurrentUser();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      instance.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      })
      .then(()=> history.push("/login"))
      .catch(error=>{
        console.log(error)
      })
    } else {
      alert("Password doesn't match ");
    }
  };

  if (user?.token) {
    return <Redirect to={state?.from || "/"} />;
  }
  return (
    <Layout title="Create account">
      <div className="flex items-center justify-center m-auto mt-20">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-1/2 "
          onSubmit={onSubmit}
        >
          <h1 className="text-center">Create Account</h1>
          <div className="mb-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Username</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="username"
              required
              id="username"
              value={username}
              placeholder="Enter a valid username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Fullname</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="name"
              required
              id="name"
              value={name}
              placeholder="Enter your fullname"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Confirm Password</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password2"
              required
              id="password2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Create account</Button>
          <p className="text-sm mt-4">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
