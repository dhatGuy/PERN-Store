import localCart from "helpers/localStorage";
import { createContext, useContext, useEffect, useState } from "react";
import cartService from "services/cart.service";
import { useUser } from "./UserContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState();
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { isLoggedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      const saveLocalCart = async () => {
        const cartObj = localCart
          .getItems()
          .map(({ product_id, quantity }) => cartService.addToCart(product_id, quantity));
        await Promise.all(cartObj);
        localCart.clearCart();
        cartService.getCart().then((res) => {
          setCartData(res?.data);
          setIsLoading(false);
        });
      };
      saveLocalCart();
    } else {
      const items = localCart.getItems();
      if (items === null) {
        return;
      }
      setCartData({ items: [...items] });
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const quantity = cartData?.items?.reduce((acc, cur) => {
      return acc + Number(cur.quantity);
    }, 0);
    const totalAmt = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.subtotal);
    }, 0);
    setCartSubtotal(totalAmt);
    setCartTotal(quantity);
  }, [cartData]);

  const addItem = async (product, quantity) => {
    if (isLoggedIn) {
      try {
        const { data } = await cartService.addToCart(product.product_id, quantity);
        setCartData({ items: [...data.data] });
      } catch (error) {
        return error;
      }
    } else {
      localCart.addItem(product, 1);
      setCartData({ ...cartData, items: localCart.getItems() });
    }
  };

  const deleteItem = (product_id) => {
    if (isLoggedIn) {
      const { items } = cartData;
      cartService.removeFromCart(product_id).then(() => {
        const data = items.filter((item) => item.product_id !== product_id);
        setCartData({ ...cartData, items: data });
      });
    } else {
      localCart.removeItem(product_id);
      setCartData({ ...cartData, items: localCart.getItems() });
    }
  };

  const increment = async (product_id) => {
    if (isLoggedIn) {
      const res = await cartService.increment(product_id);
      setCartData({ ...cartData, items: res.data });
      return res;
    } else {
      localCart.incrementQuantity(product_id);
      setCartData({ ...cartData, items: localCart.getItems() });
    }
  };

  const decrement = async (product_id) => {
    if (isLoggedIn) {
      const res = await cartService.decrement(product_id);
      setCartData({ ...cartData, items: res.data });
      return res;
    } else {
      localCart.decrementQuantity(product_id);
      setCartData({ ...cartData, items: localCart.getItems() });
    }
  };

  return (
    <CartContext.Provider
      value={{
        isLoading,
        cartData,
        setCartData,
        addItem,
        deleteItem,
        increment,
        decrement,
        cartTotal,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
