import Spinner from "components/Spinner";
import AdminLayout from "layout/AdminLayout";
import Layout from "layout/Layout";
import {
  Account,
  Cart,
  Checkout,
  Confirmation,
  Login,
  NotFound,
  OrderDetails,
  Orders,
  ProductDetails,
  ProductList,
  Register,
  ResetPassword,
} from "pages";
import { ProductDetails as AdminProductDetails, AdminProductList, ProductEdit } from "pages/admin";
import Dashboard from "pages/admin/Dashboard";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

function App() {
  return (
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/products/:slug" element={<AdminProductDetails />} />
            <Route path="/admin/products/:slug/edit" element={<ProductEdit />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<ProductList />} />
        <Route path="/products/:slug/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
