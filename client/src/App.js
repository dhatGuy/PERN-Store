import ProductDetails from "components/ProductDetails";
import { useCart } from "context/CartContext";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Home from "pages/Home";
import Login from "pages/Login";
import OrderDetails from "pages/OrderDetails";
import Orders from "pages/Orders";
import Product from "pages/ProductList";
import Register from "pages/Register";
import { ProtectedRoute } from "protected.route";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import authService from "services/auth.service";

function App() {
  const {cartData} = useCart()
  const user = authService.getCurrentUser()
  const cartQuantity = cartData?.items.reduce((acc, cur) => {
    return acc + Number(cur.quantity);
  }, 0);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {user && 
            
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            }
            {!user && 
            <>
            <li>
              <Link to="/signup">signup</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            </>
            }

            {user && 
            <>
            <li>
              <Link onClick={() => authService.logout()} to="/login">
                logout
              </Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cartQuantity || 0})</Link>
            </li>
            </>
            }
          </ul>
        </nav>

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
          <ProtectedRoute exact path={["/", "/products"]}>
            <Product />
          </ProtectedRoute>
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
      </div>
    </Router>
  );
}

export default App;
