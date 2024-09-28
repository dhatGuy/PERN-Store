import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import CartItem from "~/components/CartItem";
import { ContentLayout } from "~/components/layouts";
import { useCart } from "~/context/CartContext";
import { formatCurrency } from "~/helpers/formatCurrency";

const Cart = () => {
  const { cartData, isLoading, cartSubtotal } = useCart();

  if (cartData?.items?.length === 0) {
    return (
      <ContentLayout title="Cart" loading={isLoading}>
        <h1 className="my-10 text-center text-4xl font-semibold">Shopping Cart</h1>
        <div className="h-full flex flex-col justify-center items-center">
          <ShoppingCart size={150} />
          <p>Cart is empty</p>
          <Button tag={Link} to="/">
            Continue shopping
          </Button>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Cart" loading={isLoading || cartData === undefined}>
      <h1 className="my-10 text-center text-4xl font-semibold">Shopping Cart</h1>
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
          <div className="mb-2">Total: {formatCurrency(cartSubtotal)}</div>
          <Button
            tag={Link}
            to={"/cart/checkout"}
            state={{
              fromCartPage: true,
            }}
          >
            Checkout
          </Button>
        </TableFooter>
      </TableContainer>
    </ContentLayout>
  );
};

export default Cart;
