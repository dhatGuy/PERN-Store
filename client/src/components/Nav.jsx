import { Badge, Button, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

const Nav = () => {
  const { cartData } = useCart();
  const user = authService.getCurrentUser();
  const cartQuantity = cartData?.items.reduce((acc, cur) => {
    return acc + Number(cur.quantity);
  }, 0);
  const name = user?.fullname.split(" ")[0] + " " + user?.fullname.split(" ")[1];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav>
      <nav className="flex items-center justify-between lg:px-36 py-2 bg-gray-50 shadow-lg">
        <span className="text-gray-700 text-2xl font-bold dark:text-gray-400">
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
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button layout="link">
                  <Link to="/cart">
                    Cart <Badge type="danger">{cartQuantity || 0}</Badge>{" "}
                  </Link>
                </Button>
              </li>
              <li className="relative">
                <Button
                  layout="link"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Account
                </Button>
                <Dropdown align="right" isOpen={isDropdownOpen}>
                  <DropdownItem className="curosr-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                    <p className="self-start">{name}</p>
                    <p className="self-start">@{user.username}</p>
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
                    <Link onClick={() => authService.logout()} to="/login">
                      Logout
                    </Link>
                  </DropdownItem>
                </Dropdown>
              </li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  );
};

export default Nav;
