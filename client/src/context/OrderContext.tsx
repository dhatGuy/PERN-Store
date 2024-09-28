import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);

  return <OrderContext.Provider value={{ orders, setOrders }}>{children}</OrderContext.Provider>;
};

const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within a OrderProvider");
  }
  return context;
};

export { OrderProvider, useOrders };
