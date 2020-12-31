import Home from "pages/Home";
import Login from "pages/Login";
import Product from "pages/Product";
import Register from "pages/Register";
import { ProtectedRoute } from "protected.route";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import authService from "services/auth.service";

function App() {

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link onClick={()=> authService.logout()} to="/login">logout</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <ProtectedRoute exact path="/">
          <Home />
        </ProtectedRoute>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/products">
          <Product />
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
