import { Badge, Card, CardBody } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "helpers/formatCurrency";
import Layout from "layout/Layout";
import { useEffect, useState } from "react";
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
      <div className="my-4">
        <h1 className="font-bold text-2xl">Order Details</h1>
        <p>Order no: #{state.order.order_id}</p>
        <p>{`${state.order.total || "Not available"} items`}</p>
        <p>
          Status: <Badge type="success">{state.order.status}</Badge>
        </p>
        <p>Total Amount: {formatCurrency(state.order.amount)}</p>
        <p>Placed on: {format(parseISO(state.order.date), "d MMM, yyyy")}</p>
        <div className="border-t-2">
          <h1 className="font-bold text-xl">Items in your order</h1>
          {items?.map((item) => (
            <Card key={item.product_id} className="flex my-4 p-2 md:flex-row flex-col">
              <img
                className="sm:w-full md:w-1/2 lg:w-1/3 object-contain md:object-cover"
                loading="lazy"
                decoding="async"
                src={item.image_url}
                alt={item.name}
              />
              <CardBody>
                <h1 className="font-semibold text-gray-600">{item.name}</h1>
                <p className="mb-2">{formatCurrency(item.price)}</p>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                <p className="mt-2">Quantity: {item.quantity}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
