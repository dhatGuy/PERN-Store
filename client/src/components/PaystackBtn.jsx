import { Button } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { useUser } from "context/UserContext";
import toast from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import orderService from "services/order.service";

const PaystackBtn = ({ isProcessing, setIsProcessing }) => {
  const { cartSubtotal, cartTotal, cartData, setCartData } = useCart();
  const { userData } = useUser();
  const navigate = useNavigate();

  const onSuccess = (data) => {
    orderService.createOrder(cartSubtotal, cartTotal, data.reference, "PAYSTACK").then(() => {
      setCartData({ ...cartData, items: [] });
      setIsProcessing(false);
      navigate("/cart/success", {
        state: {
          fromPaymentPage: true,
        },
      });
    });
  };

  const onClose = () => {
    toast.error("Payment cancelled");
    setIsProcessing(false);
  };

  const config = {
    email: userData.email,
    amount: (cartSubtotal * 100).toFixed(2),
    publicKey: import.meta.env.VITE_PAYSTACK_PUB_KEY,
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <Button
      disabled={isProcessing}
      className="w-full"
      onClick={() => {
        setIsProcessing(true);
        initializePayment(onSuccess, onClose);
      }}
    >
      {isProcessing ? "Processing..." : "Pay with Paystack"}
    </Button>
  );
};

export default PaystackBtn;
