import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../Redux/auth/actions";
import { isAuthenticated } from "../Redux/auth/reducer";
import { useLoadProfile } from "../useHooks";
import * as S from "./styles";

function LoadUserProfile({ setAuth, failAuth }) {
  const { isLoadingProfile, userProfile } = useLoadProfile();

  useEffect(() => {
    if (!userProfile) return;
    setAuth(userProfile);
    if (userProfile.error) failAuth(userProfile);
  }, [userProfile]);

  if (isLoadingProfile)
    return (
      <S.Loading>
        <S.LoadingText>is loading profile</S.LoadingText>
      </S.Loading>
    );

  if (userProfile && !isLoadingProfile) return <Redirect to="/" />;
  return null;
}

const WithLogin = props => {
  const { children, isAuthenticated, failAuth, setAuth } = props;

  if (!isAuthenticated && window.location.hash.indexOf("access_token") > -1) {
    return <LoadUserProfile failAuth={failAuth} setAuth={setAuth} />;
  }

  return children({ isAuthenticated });
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});
export default connect(
  mapStateToProps,
  actions
)(WithLogin);
