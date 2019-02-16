import { AUTH_SET, AUTH_FAILED } from "./types";

export const setAuth = payload => ({
  type: AUTH_SET,
  payload,
});

export const failAuth = payload => ({
  type: AUTH_FAILED,
  payload,
});
