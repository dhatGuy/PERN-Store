import { useUser } from "context/UserContext";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn} = useUser()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoggedIn ? (
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
