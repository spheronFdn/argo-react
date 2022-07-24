import React, { useEffect } from "react";
import Loading from "../../../../../Loading";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGithub();
  }, []);

  const signInWithGithub = async () => {
    import("../../../../../../config").then((config: any) => {
      const githubSignInUrl = `${config.default.urls.API_URL}/auth/github`;
      window.open(githubSignInUrl, "_self");
    });
  };

  return <Loading />;
};

export default GithubSignup;
