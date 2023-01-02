import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";

const OrderSummary = () => {
  const { cartData, cartSubtotal } = useCart();
  return (
    <div>
      <h1 className="text-xl font-medium">Order Summary</h1>
      {cartData?.items.map((item) => (
        <div key={item.product_id} className="flex border-b-2 py-2 space-x-2">
          <img
            className="w-2/5"
            loading="lazy"
            decoding="async"
            src={item.image_url}
            alt={item.name}
          />
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold">{item.name}</span>
            <span className="text-xl font-medium">{formatCurrency(item.price)}</span>
            <span className="">Quantity: {item.quantity}</span>
          </div>
        </div>
      ))}
      <p className="text-3xl font-semibold text-right p-2">Total: {formatCurrency(cartSubtotal)}</p>
    </div>
  );
};

export default OrderSummary;
