import { useEffect, useState } from "react";
import Auth from "../Auth/Auth";

export default () => {
  const [isLoadingProfile, setIsLoadingProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    setIsLoadingProfile(true);
    const instantiateAuth = new Auth();
    instantiateAuth
      .getUserProfile()
      .then(userProfile => {
        setUserProfile(userProfile);
        setIsLoadingProfile(false);
        window.location.hash = "";
      })
      .catch(e => {
        setUserProfile({ error: e });
        setIsLoadingProfile(false);
      });
  });

  return {
    isLoadingProfile,
    userProfile,
  };
};
