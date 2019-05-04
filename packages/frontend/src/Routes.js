import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { LoadUser, WelcomeUser, Art } from './views'

import { AuthenticationRouteHandler } from './modules'

const withAuth = Component => props => {
  return (
    <AuthenticationRouteHandler>
      <Component {...props} />
    </AuthenticationRouteHandler>
  )
}

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/loaduser" component={LoadUser} />
      <Route path="/welcomeuser" component={withAuth(WelcomeUser)} />
      <Route path="/" component={withAuth(Art)} />
    </Switch>
  </BrowserRouter>
)
