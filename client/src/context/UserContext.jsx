import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [authData, setAuthData] = useState({
    token: "",
    expiresAt: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(localStorage.getItem("user")));
      setAuthData(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  const setUserInfo = (data) => {
    const { user, token } = data;
    setIsLoggedIn(true);
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
    setAuthData({
      token: "",
      expiresAt: "",
    });
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserState: (data) => setUserInfo(data),
        logout,
        isLoggedIn,
        authData
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
