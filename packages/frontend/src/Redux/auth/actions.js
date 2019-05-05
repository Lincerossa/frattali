import { AUTH_SET, AUTH_FAILED, AUTH_LOGOUT } from './types'

export const setAuth = payload => ({
  type: AUTH_SET,
  payload,
})

export const failAuth = payload => ({
  type: AUTH_FAILED,
  payload,
})

export const logoutAuth = payload => ({
  type: AUTH_LOGOUT,
  payload,
})
