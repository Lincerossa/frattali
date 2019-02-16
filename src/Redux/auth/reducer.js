import { AUTH_SET, AUTH_FAILED, AUTH_LOGOUT } from "./types";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET:
      const { idTokenPayload, expiresIn, ...authData } = action.payload;
      return {
        ...state,
        ...authData,
        profile: idTokenPayload,
        expiresAt: action.payload.expiresIn * 1000 + new Date().getTime(),
      };
    case AUTH_FAILED:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_LOGOUT:
      return {
        state,
      };

    default:
      return state;
  }
};

export const getAuth = state => state && state.auth;

export const getAccessToken = state => {
  const auth = getAuth(state);
  return auth && auth.accessToken;
};

export const isAuthenticated = state => getAccessToken(state);

export const getUserName = state => {
  const auth = getAuth(state);
  return auth && auth.nickname;
};

export const getUserPicture = state => {
  const auth = getAuth(state);
  return auth && auth.picture;
};
