import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import Account from "pages/Account";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import { ProtectedRoute } from "protected.route";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ProductDetails = lazy(() => import("pages/ProductDetails"));
const Login = lazy(() => import("pages/Login"));
const OrderDetails = lazy(() => import("pages/OrderDetails"));
const Orders = lazy(() => import("pages/Orders"));
const Product = lazy(() => import("pages/ProductList"));
const Register = lazy(() => import("pages/Register"));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <Layout>

        <div className="h-full flex items-center justify-center">
          <Spinner size={150} />
        </div>
        </Layout>
      }>
        <>
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
            <ProtectedRoute exact path="/products/:id/">
              <ProductDetails />
            </ProtectedRoute>
            <ProtectedRoute exact path="/checkout">
              <Checkout />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders">
              <Orders />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders/:id/">
              <OrderDetails />
            </ProtectedRoute>
            <ProtectedRoute path="/cart">
              <Cart />
            </ProtectedRoute>
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
