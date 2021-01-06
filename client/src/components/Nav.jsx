import { Button } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

const Nav = () => {
  const { cartData } = useCart();
  const user = authService.getCurrentUser();
  const cartQuantity = cartData?.items.reduce((acc, cur) => {
    return acc + Number(cur.quantity);
  }, 0);
  return (
    <nav>
      <nav className="flex items-center justify-between px-6 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg">
        <span className="text-gray-700 dark:text-gray-400">
          {/* <Logo className="w-6 h-6 text-purple-600" /> */}
          <p>PERN Store</p>
        </span>
        <ul className="flex space-x-4">
            {!user && (
              <>
                <li>
                  <Button layout="link">
                    <Link to="/signup">signup</Link>
                  </Button>
                </li>
                <li>
                  <Button layout="link">
                    <Link to="/login">login</Link>
                  </Button>
                </li>
              </>
            )}
          {user && (
            <>
              <li>
                <Button layout="link">
                  <Link onClick={() => authService.logout()} to="/login">
                    logout
                  </Link>
                </Button>
              </li>
              <li>
                <Button layout="link">
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button layout="link">
                  <Link to="/orders">Orders</Link>
                </Button>
              </li>
              <li>
                <Button layout="link">
                  <Link to="/cart">Cart ({cartQuantity || 0})</Link>
                </Button>
              </li>
              <li>
              <Button layout="link">
                <Link to="/profile">Profile</Link>
              </Button>
            </li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  );
};

export default Nav;
