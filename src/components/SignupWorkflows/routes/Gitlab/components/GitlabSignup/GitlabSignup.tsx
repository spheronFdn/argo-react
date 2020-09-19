import React, { useEffect } from "react";
import { API_URL } from "../../../../../../config";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGitlab();
  }, []);

  const signInWithGitlab = async () => {
    const gitlabSignInUrl = `${API_URL}/auth/gitlab`;
    window.open(gitlabSignInUrl, "_self");
  };

  return <div></div>;
};

export default GithubSignup;
