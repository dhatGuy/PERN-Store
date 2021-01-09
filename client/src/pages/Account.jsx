import { Card, CardBody } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import { UserContext } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserData(authService.getCurrentUser());
    setIsLoading(false);
  }, [setUserData]);

  if (isLoading)
    return (
      <Layout title="Home">
        <Spinner size={40} loading={isLoading}/>
      </Layout>
    );
  return (
    <Layout title="Account">
      <div className="flex items-center justify-center">

      <Card className="w-1/2 mt-32">
        <CardBody>
          <header>
            <img src="./images/Apple - Custard.jpg" />
            <h3>{userData.username}'s Profile</h3>
          </header>
          <p>Email:{userData.email}</p>
        </CardBody>
      </Card>
      </div>
    </Layout>
  );
};

export default Home;
