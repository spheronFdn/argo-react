import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../../Loading";

const GithubSignup = () => {
  const params = useParams<{ id: string }>();

  useEffect(() => {
    signInWithGithub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithGithub = async () => {
    import("../../../../../../config").then((config: any) => {
      const githubAppInUrl = `${config.default.urls.API_URL}/auth/github/app/auth/${params.id}`;
      window.open(githubAppInUrl, "_self");
    });
  };

  return <Loading />;
};

export default GithubSignup;
