import React from "react";
import { connect } from "react-redux";

import { isAuthenticated } from "../Redux/auth/reducer";

const WithLogin = props => {
  const { children, isAuthenticated } = props;
  return children({ isAuthenticated });
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});
export default connect(mapStateToProps)(WithLogin);
