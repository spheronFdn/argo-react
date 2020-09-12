import React, { useEffect } from "react";
import { API_URL } from "../../../../../../config";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGithub();
  }, []);

  const signInWithGithub = async () => {
    const githubSignInUrl = `${API_URL}/auth/github`;
    window.open(githubSignInUrl, "_self");
  };

  return <div></div>;
};

export default GithubSignup;
