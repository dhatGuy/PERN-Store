import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import Spinner from "~/components/Spinner";
import { ContentLayout } from "./components/layouts";
import { router } from "./routes";

function App() {
  return (
    <Suspense
      fallback={
        <ContentLayout>
          <Spinner size={100} />
        </ContentLayout>
      }
    >
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      {/* <Routes>
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
      </Routes> */}
    </Suspense>
  );
}

export default App;
