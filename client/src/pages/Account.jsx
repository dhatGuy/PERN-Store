import { Card, CardBody } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";

const Account = () => {
  const { userData } = useUser();

  if (!userData)
    return (
      <Layout title="Account">
        <div className="h-full flex items-center justify-center">
          <Spinner size={150} loading />
        </div>
      </Layout>
    );
  return (
    <Layout title="Profile">
      <div className="flex items-center justify-center">
        <Card className="mt-2">
          <CardBody>
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="my-6">Username: {userData.username}</p>
            <p className="my-6">Fullname: {userData.fullname}</p>
            <p className="my-6">Email: {userData.email}</p>
            <p>Roles: {userData.roles.toString()}</p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Account;
