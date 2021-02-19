import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(localStorage.getItem("user"))
  );

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    // setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData))
    if (userData?.token) setIsLoggedIn(true);
  }, [userData, userData?.token]);

  const setUserInfo = (data) => {
    setUserData(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUserData(null);
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
