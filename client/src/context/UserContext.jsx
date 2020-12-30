import React, { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({children}) =>{
  const [userData, setUserData] = useState(null)

  return <UserContext.Provider value={[userData, setUserData]}>{children}</UserContext.Provider>
}

export {UserProvider, UserContext}
