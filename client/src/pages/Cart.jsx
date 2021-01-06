import CartItem from "components/CartItem";
import { useCart } from "context/CartContext";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderService from "services/order.service";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Badge,
  TableFooter,
  Pagination,
  Button,
} from "@windmill/react-ui";

const Cart = () => {
  const { cartData, setCartData } = useCart();
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const history = useHistory();

  const checkout = () => {
    OrderService.createOrder(cartData.cartId, total, totalItems).then((res) => {
      setCartData({ ...cartData, items: [] });
      history.push({
        pathname: `/checkout`,
        state: { detail: res.data },
      });
    });
  };

  useEffect(() => {
    const data = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.subtotal);
    }, 0);
    const items = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.quantity);
    }, 0);
    setTotalItems(items);
    setTotal(Number(data));
  }, [cartData?.items]);

  if (!cartData) {
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );
  }

  if (cartData.items.length === 0) {
    return (
      <Layout>
        <h1 className="my-10 text-center text-4xl font-semibold">
          Shopping Cart
        </h1>
        <p>Cart is empty</p>
      </Layout>
    );
  }

  return (
    <Layout>
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
            {cartData.items.map((item) => {
              return (
                <TableRow key={item.product_id}>
                  <CartItem item={item} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter className="flex flex-col justify-end items-end">
          <div className="mb-2">Total: ${total.toFixed(2)}</div>
          <Button onClick={() => checkout()}>Checkout</Button>
        </TableFooter>
      </TableContainer>
    </Layout>
  );
};

export default Cart;
