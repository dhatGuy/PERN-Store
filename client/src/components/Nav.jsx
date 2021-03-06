import { Badge, Button, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart, User } from "react-feather";
import { useUser } from "context/UserContext";

const Nav = () => {
  const { cartQuantity } = useCart();
  const { isLoggedIn, userData, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    return (
    <nav className="flex items-center justify-between px-2 lg:px-36 py-2 bg-gray-50 shadow-lg">
      <span className="text-gray-700 text-2xl font-bold dark:text-gray-400">
        <h1>PERN Store</h1>
      </span>
      <ul className="flex space-x-4">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup">
                <Button layout="link">signup</Button>
              </Link>
            </li>
            <li>
              <Button layout="link">
                <Link to="/login">login</Link>
              </Button>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/">
                <Button layout="link">
                  <span className="lg:block hidden">Home</span>
                  <Home className="lg:hidden" />
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <Button layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {cartQuantity || 0}
                  </Badge>{" "}
                </Button>
              </Link>
            </li>
            <li className="relative">
              <Button
                layout="link"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="lg:block hidden">Account</span>
                <User className="lg:hidden" />
              </Button>
              <Dropdown align="right" isOpen={isDropdownOpen}>
                <DropdownItem className="curosr-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                  <p className="self-start">{userData?.fullname?.split(" ").join(" ")}</p>
                  <p className="self-start">@{userData?.username}</p>
                </DropdownItem>
                <DropdownItem tag="a">
                  <Link className="w-full" to="/profile">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem tag="a">
                  <Link className="w-full" to="/orders">
                    Orders
                  </Link>
                </DropdownItem>
                <DropdownItem tag="a" className="border-t">
                  <Link
                    className="w-full"
                    onClick={() => logout()}
                    to="/login"
                  >
                    <Button block>Logout</Button>
                  </Link>
                </DropdownItem>
              </Dropdown>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
