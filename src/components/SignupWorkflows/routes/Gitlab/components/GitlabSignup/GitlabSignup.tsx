import React, { useEffect } from "react";
import Loading from "../../../../../Loading";

const GithubSignup = () => {
  useEffect(() => {
    signInWithGitlab();
  }, []);

  const signInWithGitlab = async () => {
    import("../../../../../../config").then((config: any) => {
      const gitlabSignInUrl = `${config.default.urls.API_URL}/auth/gitlab`;
      window.open(gitlabSignInUrl, "_self");
    });
  };

  return <Loading />;
};

export default GithubSignup;
