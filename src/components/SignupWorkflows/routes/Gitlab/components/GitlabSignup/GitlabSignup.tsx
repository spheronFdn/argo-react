import React, { useEffect } from "react";
import config from "../../../../../../config";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGitlab();
  }, []);

  const signInWithGitlab = async () => {
    const gitlabSignInUrl = `${config.urls.API_URL}/auth/gitlab`;
    window.open(gitlabSignInUrl, "_self");
  };

  return <div></div>;
};

export default GithubSignup;
