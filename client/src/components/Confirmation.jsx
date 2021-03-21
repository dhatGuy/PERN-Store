import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { CheckCircle } from "react-feather";

const Confirmation = () => {
  const { userData } = useUser();
  return (
    <section className="grid place-items-center border p-10 shadow">
      <div className="text-center">
        <div className="grid place-items-center">
          <CheckCircle color="green" size={100} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl">Order Confirmed</h1>
          <p className="">
            Thank you for your purchase, {`${userData?.fullname}`}!
          </p>
          <p className="flex flex-col md:flex-row space-y-2.5 md:space-y-0 md:space-x-2 mt-2">
            <Button tag={Link} to="/products" layout="outline">
              Continue shopping
            </Button>
            <Button tag={Link} to="/orders" layout="primary">
              Manage Order
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
