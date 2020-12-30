import { UserContext } from "context/UserContext";
import React, { Children, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const [userData] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return JSON.parse(localStorage.getItem("user")) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
