import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Art, Login } from "./views";
import { WithAuth } from "./hoc";

const PrivateRoute = props => (
  <WithAuth>
    {({ isAuthenticated }) =>
      isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />
    }
  </WithAuth>
);

export default () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={Art} />
    </Switch>
  </Router>
);
