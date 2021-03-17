import CartItem from "components/CartItem";
import { useCart } from "context/CartContext";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import OrderService from "services/order.service";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Button,
} from "@windmill/react-ui";
import PulseLoader from "react-spinners/PulseLoader";
import { ShoppingCart } from "react-feather";
import { formatCurrency } from "helpers";

const Cart = () => {
  const { cartData, setCartData, isLoading } = useCart();
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const history = useHistory();

  const checkout = () => {
    setIsProcessing(true);
    OrderService.createOrder(total, totalItems).then((res) => {
      setCartData({ ...cartData, items: [] });
      history.push({
        pathname: `/checkout`,
        state: { details: res.data },
      });
      setIsProcessing(false);
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    const data = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.subtotal);
    }, 0);
    const items = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.quantity);
    }, 0);
    if (isSubscribed) {
      setTotalItems(items);
      setTotal(+data);
    }
    return () => (isSubscribed = false);
  }, [cartData]);

  if (cartData?.items?.length === 0) {
    return (
      <Layout title="Cart" loading={isLoading}>
        <h1 className="my-10 text-center text-4xl font-semibold">
          Shopping Cart
        </h1>
        <div className="h-full flex flex-col justify-center items-center">
          <ShoppingCart size={150} />
          <p>Cart is empty</p>
          <Link to="/">
            <Button tag="a">Continue shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout loading={isLoading}>
      <h1 className="my-10 text-center text-4xl font-semibold">
        Shopping Cart
      </h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartData?.items?.map((item) => {
              return (
                <TableRow key={item.product_id}>
                  <CartItem item={item} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter className="flex flex-col justify-end items-end">
          <div className="mb-2">Total: {formatCurrency(total)}</div>
          <Button onClick={() => checkout()} disabled={isProcessing}>
            {isProcessing ? <PulseLoader size={10} color={"#0a138b"} /> : "Checkout"}
          </Button>
        </TableFooter>
      </TableContainer>
    </Layout>
  );
};

export default Cart;
