import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { LoadUser, WelcomeUser, Art } from './views'

import { AuthenticationRouteHandler, Layout } from './modules'

const withAuth = Component => props => {
  return (
    <AuthenticationRouteHandler>
      <Component {...props} />
    </AuthenticationRouteHandler>
  )
}

const withLayout = Component => props => {
  return (
    <Layout
      links={[
        {
          text: 'home',
          link: '/',
        },
        {
          text: 'paintings',
          link: '/paintings',
        },
      ]}
    >
      <Component {...props} />
    </Layout>
  )
}

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/loaduser" component={LoadUser} />
      <Route path="/welcomeuser" component={withAuth(WelcomeUser)} />
      <Route
        path="/paintings"
        component={withAuth(withLayout(() => <div>paintings</div>))}
      />
      <Route path="/" component={withAuth(withLayout(Art))} />
    </Switch>
  </BrowserRouter>
)
