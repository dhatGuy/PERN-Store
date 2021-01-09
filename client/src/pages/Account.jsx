import { Card, CardBody } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import { UserContext } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const Account = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserData(authService.getCurrentUser());
    setIsLoading(false);
  }, [setUserData]);

  if (isLoading)
    return (
      <Layout title="Account">
        <Spinner size={40} loading={isLoading} />
      </Layout>
    );
  return (
    <Layout title="Account">
      <div className="flex items-center justify-center">
        <Card className="lg:w-1/2 mt-2">
          <CardBody>
            <h1 className="text-4xl font-bold">Account</h1>
            <p className="my-6">Username: {userData.username}</p>
            <p className="my-6">Fullname: {userData.fullname}</p>
            <p>Email: {userData.email}</p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Account;
