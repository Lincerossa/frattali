import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Art, LoadUser, WelcomeUser } from './views'
import * as actions from './Redux/auth/actions'
import { isAuthenticated } from './Redux/auth/reducer'
import Auth from './Auth/Auth'

const AuthenticationRouteHandler = props => {
  const { children, isAuthenticated } = props

  if (isAuthenticated) {
    return children
  }
  if (!isAuthenticated && window.location.hash.indexOf('access_token') > -1) {
    return (
      <Redirect
        to={{
          pathname: '/loaduser',
          hash: window.location.hash,
        }}
      />
    )
  }
  if (!isAuthenticated) {
    const instantiateAuth = new Auth()
    instantiateAuth.login()
  }

  return null
}

const ConnectedAuthenticationRouteHandler = connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
  }),
  actions
)(AuthenticationRouteHandler)

const PrivateRoute = props => (
  <ConnectedAuthenticationRouteHandler>
    <Route {...props} />
  </ConnectedAuthenticationRouteHandler>
)

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/loaduser" component={LoadUser} />
      <PrivateRoute path="/welcomeuser" component={WelcomeUser} />
      <PrivateRoute path="/" component={Art} />
    </Switch>
  </BrowserRouter>
)
