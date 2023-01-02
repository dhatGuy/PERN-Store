import { Button, TableCell } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";

const CartItem = ({ item }) => {
  const { decrement, increment, deleteItem } = useCart();

  const increase = () => {
    increment(item.product_id);
  };
  const decrease = () => {
    decrement(item.product_id);
  };
  return (
    <>
      <TableCell>{item.name}</TableCell>
      <TableCell>{formatCurrency(item.price)}</TableCell>
      <TableCell className="flex items-center">
        <Button
          size="small"
          layout="outline"
          disabled={item.quantity === 1}
          onClick={() => decrease()}
        >
          -
        </Button>
        <span className="mr-2 ml-2">{item.quantity}</span>
        <Button size="small" layout="outline" onClick={() => increase()}>
          +
        </Button>
      </TableCell>
      <TableCell>{formatCurrency(item.subtotal)}</TableCell>
      <TableCell>
        <Button layout="Link" onClick={() => deleteItem(item.product_id)}>
          <span>X</span>
        </Button>
      </TableCell>
    </>
  );
};

export default CartItem;
