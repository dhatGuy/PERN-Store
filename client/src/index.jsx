import { Windmill } from "@windmill/react-ui";
import { CartProvider } from "context/CartContext";
import { OrderProvider } from "context/OrderContext";
import { ProductProvider } from "context/ProductContext";
import { ReviewProvider } from "context/ReviewContext";
import { UserProvider } from "context/UserContext";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./tailwind.output.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Windmill>
      <UserProvider>
        <ProductProvider>
          <ReviewProvider>
            <CartProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </CartProvider>
          </ReviewProvider>
        </ProductProvider>
      </UserProvider>
    </Windmill>
  </HelmetProvider>
);
