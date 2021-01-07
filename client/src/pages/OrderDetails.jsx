import { Badge, Card, CardBody } from "@windmill/react-ui";
import Layout from "layout/Layout";
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
    <Layout>
      <div>
        <h1>Order Details</h1>
        <p>Order no: #{state.order.order_id}</p>
        <p>{`${state.order.total || "Not available"} items`}</p>
        <p>Status:  <Badge type="success">{state.order.status}</Badge></p>
        <p>Total: ₦{state.order.amount}</p>
        <p>Placed on: {state.order.date}</p>
        <div>
          <h1>Items in your order</h1>
          {items?.map((item) => (
          <Card key={item.product_id} className="flex h-48">
            <img className="object-cover w-1/3" alt="img" src="/img/forest.jpeg" />
            <CardBody>
              <h1 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Product Name: {item.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Description: {item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </CardBody>
          </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
