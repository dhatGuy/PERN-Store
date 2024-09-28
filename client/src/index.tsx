import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Windmill } from "@windmill/react-ui";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Windmill>
          {/* <SidebarProvider>
          <UserProvider>
            <ProductProvider>
              <ReviewProvider>
                <CartProvider>
                  <OrderProvider>
                    <BrowserRouter> */}
          {/* <GlobalHistory /> */}
          <App />
          {/* </BrowserRouter>
                  </OrderProvider>
                </CartProvider>
              </ReviewProvider>
            </ProductProvider>
          </UserProvider>
        </SidebarProvider> */}
        </Windmill>
      </QueryClientProvider>
    </HelmetProvider>
  </GoogleOAuthProvider>
);
