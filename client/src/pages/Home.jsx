import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUserData(authService.getCurrentUser());
    setIsLoading(false)
  }, []);
  
  if(isLoading) return <div>loading..</div>
  return (
    <div className="container">
      home
      <header className="jumbotron">
        <h3>
          <strong>{userData.username}</strong>'s Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {userData.token.substring(0, 20)} ...{" "}
        {userData.token.substr(userData.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {userData.user_id}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  );
};

export default Home;
