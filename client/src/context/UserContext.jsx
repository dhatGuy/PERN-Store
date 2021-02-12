import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const setUserInfo = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUserData(data);
  };

  const isAuthenticated = () => {
    if (!userData?.token || !userData?.exp) {
      return false;
    }
    return Math.floor(Date.now() / 1000) < userData.exp;
  };

  const logout = () => {
    setUserData(null)
    authService.logout()
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserState: (data) => setUserInfo(data),
        isAuthenticated,
        logout
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

