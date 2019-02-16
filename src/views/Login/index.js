import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as S from "./styles";
import * as actions from "../../Redux/auth/actions";
import { isAuthenticated } from "../../Redux/auth/reducer";
import Auth from "../../Auth/Auth";

const Login = props => {
  const [isLoadingProfile, setIsLoadingProfile] = useState(null);

  useEffect(() => {
    const { isAuthenticated } = props;

    if (
      !isAuthenticated &&
      window.location.hash.indexOf("access_token") === -1
    ) {
      const instantiateAuth = new Auth();
      instantiateAuth.login();
    }
  });

  useEffect(() => {
    const { setAuth, failAuth } = props;

    if (window.location.hash.indexOf("access_token") > -1) {
      setIsLoadingProfile(true);
      const instantiateAuth = new Auth();
      instantiateAuth
        .getUserProfile()
        .then(userProfile => {
          setAuth(userProfile);
          setIsLoadingProfile(false);
        })
        .catch(e => failAuth(e));
    }
  });

  if (!props.isAuthenticated) return null;

  return isLoadingProfile ? (
    <S.Loading>
      <S.LoadingText>is loading profile</S.LoadingText>
    </S.Loading>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(
  mapStateToProps,
  actions
)(Login);
