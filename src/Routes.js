import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Art } from "./views";
import { WithAuth } from "./hoc";

const PrivateRoute = props => (
  <WithAuth>
    <Route {...props} />
  </WithAuth>
);

export default () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" component={Art} />
    </Switch>
  </BrowserRouter>
);
