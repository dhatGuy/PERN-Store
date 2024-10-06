import { Button } from "flowbite-react";
import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingCart className="w-24 h-24 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
      <Link to="/">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
