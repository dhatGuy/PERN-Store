import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [authData, setAuthData] = useState({
    token: "",
    expiresAt: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (authData?.token) {
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log(userData)
    }
  }, [authData, userData]);

  const setUserInfo = (data) => {
    const {user, token} = data
    setUserData(user);
    setAuthData({
      token,
      expiresAt: "",
    });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    // localStorage.setItem("expiresAt", JSON.stringify(token));
  };

  const logout = () => {
    setUserData();
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserState: (data) => setUserInfo(data),
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
