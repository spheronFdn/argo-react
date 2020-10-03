import React, { useEffect } from "react";
import config from "../../../../../../config";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGithub();
  }, []);

  const signInWithGithub = async () => {
    const githubSignInUrl = `${config.urls.API_URL}/auth/github`;
    window.open(githubSignInUrl, "_self");
  };

  return <div></div>;
};

export default GithubSignup;
