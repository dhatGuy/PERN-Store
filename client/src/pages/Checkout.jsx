import Layout from "layout/Layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <Layout>
      <div>
        <h1>It's ordered!</h1>
        <p>Your order has been recieved.</p>
        <p>Order No.: #{state.detail.order_id}</p>
        <p>Order Date: {state.detail.date}</p>
        <p>No. of items: {state.detail.total}</p>
        <p>Amount: ${state.detail?.amount}</p>
        <Link to="/products">Continue shopping</Link>
      </div>
    </Layout>
  );
};

export default Checkout;
