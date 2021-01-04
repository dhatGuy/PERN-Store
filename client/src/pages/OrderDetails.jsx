import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import orderService from "services/order.service";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [items, setItems] = useState(null);

  useEffect(() => {
    orderService.getOrder(id).then((res) => setItems(res.data));
  }, [id]);
  return (
    <div>
      <p>Order id: #{state.order.order_id}</p>
      <p>No. of Item: {state.order.total || "Not available"}</p>
      <p>Order Status: {state.order.status}</p>
      <p>Total amount: ${state.order.amount}</p>
      <p>Order Date: {state.order.date}</p>
      <div>
        {items?.map((item) => (
          <div key={item.product_id}>
            <h1>Product Name: {item.name}</h1>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
