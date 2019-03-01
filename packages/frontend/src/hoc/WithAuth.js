import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../Redux/auth/actions";
import { isAuthenticated } from "../Redux/auth/reducer";
import { useLoadProfile } from "../useHooks";
import { Loading, Wecome } from "../components";
import Auth from "../Auth/Auth";

function Welcome(props) {
  const [isWelcomeEnded, setIsWelcomeEnded] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsWelcomeEnded(true);
    }, 2500);
  });

  useEffect(() => {
    if (isWelcomeEnded) {
      const { setAuth, failAuth, userProfile } = props;
      if (userProfile) {
        window.location.hash = "";
        if (userProfile.error) {
          failAuth(userProfile);
          return;
        }
        setAuth(userProfile);
      }
    }
  }, [isWelcomeEnded]);

  return <Wecome {...props.userProfile} />;
}

const WelcomeConnected = connect(
  state => state,
  actions
)(Welcome);

function LoadUserProfile() {
  const { userProfile, isLoadingProfile } = useLoadProfile(
    window.location.hash
  );
  const [showWelcome, setShowWelcome] = useState(userProfile);

  useEffect(() => {
    if (userProfile) {
      setShowWelcome(true);
    }
  }, [userProfile]);

  return showWelcome ? (
    <WelcomeConnected userProfile={userProfile} />
  ) : (
    <Loading text="is loading profile" />
  );
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
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(
  mapStateToProps,
  actions
)(WithLogin);
