import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../Redux/auth/actions'
import { isAuthenticated } from '../Redux/auth/reducer'
import Auth from './Auth'

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

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
  }),
  actions
)(AuthenticationRouteHandler)
