import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../Redux/auth/actions";
import { isAuthenticated } from "../Redux/auth/reducer";
import { useLoadProfile } from "../useHooks";
import { Loading } from "../components";
import Auth from "../Auth/Auth";

function LoadUserProfile({ setAuth, failAuth }) {
  const { isLoadingProfile, userProfile } = useLoadProfile(
    window.location.hash
  );

  useEffect(() => {
    if (userProfile) {
      if (userProfile.error) {
        failAuth(userProfile);
        return;
      }
      setAuth(userProfile);
    }
  }, [userProfile]);

  return isLoadingProfile && <Loading text="is loading profile" />;
}

const WithLogin = props => {
  const { children, isAuthenticated } = props;
  if (isAuthenticated) {
    return children;
  }
  if (!isAuthenticated && window.location.hash.indexOf("access_token") > -1) {
    return <LoadUserProfile {...props} />;
  }
  if (!isAuthenticated) {
    const instantiateAuth = new Auth();
    instantiateAuth.login();
  }

  return null;
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(
  mapStateToProps,
  actions
)(WithLogin);
