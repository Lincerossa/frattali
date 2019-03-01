import { unset } from "./persist";
import { AUTH_LOGOUT } from "./types";

export const logout = () => dispatch => {
  unset();
  dispatch({ type: AUTH_LOGOUT });
};
