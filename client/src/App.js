import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import Cart from "pages/Cart";
import Login from "pages/Login";
import Register from "pages/Register";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

const ProductDetails = lazy(() => import("pages/ProductDetails"));
const OrderDetails = lazy(() => import("pages/OrderDetails"));
const Orders = lazy(() => import("pages/Orders"));
const Product = lazy(() => import("pages/ProductList"));
const Checkout = lazy(() => import("pages/Checkout"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
const Account = lazy(()=> import("pages/Account"))

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <Layout>
            <Spinner size={100} />
          </Layout>
        }
      >
        <>
          <Toaster position="top-right" />
          <Switch>
            <ProtectedRoute exact path="/profile">
              <Account />
            </ProtectedRoute>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path={["/", "/products"]}>
              <Product />
            </Route>
            <Route exact path="/products/:id/">
              <ProductDetails />
            </Route>
            <ProtectedRoute exact path="/checkout">
              <Checkout />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders">
              <Orders />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders/:id/">
              <OrderDetails />
            </ProtectedRoute>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path="*">
              <h1>404 Error Found</h1>
            </Route>
          </Switch>
        </>
      </Suspense>
    </Router>
  );
}

export default App;
