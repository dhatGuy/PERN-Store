import ProductDetails from "pages/ProductDetails";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Home from "pages/Account";
import Login from "pages/Login";
import OrderDetails from "pages/OrderDetails";
import Orders from "pages/Orders";
import Product from "pages/ProductList";
import Register from "pages/Register";
import { ProtectedRoute } from "protected.route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  
  return (
    <Router>
      <>
        <Switch>
          <ProtectedRoute exact path="/profile">
            <Home />
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
    </Router>
  );
}

export default App;
