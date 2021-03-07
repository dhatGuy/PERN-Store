import { Button } from "@windmill/react-ui";
import Layout from "layout/Layout";
import React from "react";
import { format, parseISO } from "date-fns";
import { Link, useHistory, useLocation } from "react-router-dom";
import { formatCurrency } from "helpers";

const Checkout = () => {
  const { state } = useLocation();
  const { goBack } = useHistory();
  if (!state) {
    return goBack();
  }
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1>It's ordered!</h1>
        <p>Your order has been recieved.</p>
        <p>Order No.: #{state.details.order_id}</p>
        <p>Order Date: {format(parseISO(state.details.date), "d MMM, yyyy")}</p>
        <p>No. of items: {state.details.total}</p>
        <p>Amount: {formatCurrency(state.details?.amount)}</p>
        <Button layout="outline">
          <Link to="/products">Continue shopping</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default Checkout;
