import { useEffect } from "react";
import Auth from "../../Auth/Auth";

export default () => {
  useEffect(() => {
    const instantiateAuth = new Auth();
    instantiateAuth.login();
  });
  return null;
};
