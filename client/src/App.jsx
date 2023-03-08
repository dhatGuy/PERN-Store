import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import {
  Account,
  Cart,
  Checkout,
  Confirmation,
  Login,
  OrderDetails,
  Orders,
  ProductDetails,
  ProductList,
  Register,
  ResetPassword,
} from "pages";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Layout>
            <Spinner size={100} />
          </Layout>
        }
      >
        <Toaster position="top-right" />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Account />} />
            <Route path="/cart/checkout" element={<Checkout />} />
            <Route path="/cart/success" element={<Confirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id/" element={<OrderDetails />} />
          </Route>

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route index element={<ProductList />} />
          <Route path="/products/:id/" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<h1>404 Error Found</h1>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
