
import { UserContext } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUserData(authService.getCurrentUser());
    setIsLoading(false)
  }, [setUserData]);
  
  if(isLoading) return <div>loading..</div>
  return (
    <Layout title="Home" className="container">
      home
      <header>
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
    </Layout>
  );
};

export default Home;
