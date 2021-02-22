import React from "react";
import { Route, Switch } from "react-router";

export default (
  <Route>
    <Switch>
      <Route path="/" />
      <Route path="/products/:id" />
      <Route path="/cart" />
      <Route path="/profile" />
      <Route path="/orders" />
      <Route path="/orders/:id" />
      <Route path="/login" />
      <Route path="/signup" />
      <Route path="*" />
    </Switch>
  </Route>
);
