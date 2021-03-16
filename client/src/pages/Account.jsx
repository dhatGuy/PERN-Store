import { Card, CardBody } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";

const Account = () => {
  const { userData } = useUser();

  return (
    <Layout title="Profile" loading={userData === null}>
      <div className="flex items-center justify-center">
        <Card className="mt-2">
          <CardBody>
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="my-6">Username: {userData?.username}</p>
            <p className="my-6">Fullname: {userData?.fullname}</p>
            <p className="my-6">Email: {userData?.email}</p>
            <p>Roles: {userData?.roles.toString()}</p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Account;
