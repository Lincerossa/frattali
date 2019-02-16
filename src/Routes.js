import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Art, PopupLogin } from "./views";
import { WithAuth } from "./hoc";

const PrivateRoute = props => (
  <WithAuth>
    {({ isAuthenticated }) =>
      isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />
    }
  </WithAuth>
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={PopupLogin} exact />
      <PrivateRoute path="/" component={Art} />
    </Switch>
  </BrowserRouter>
);
