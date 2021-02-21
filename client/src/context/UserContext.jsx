import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [name, setName] = useState("")

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (userData?.token) {
      setIsLoggedIn(true);
      setName(userData?.fullname?.split(" ").join(" "))
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const setUserInfo = (data) => {
    setUserData(data);
    localStorage.setItem("user", JSON.stringify(data));
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
        name,
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
