import React, { useEffect } from "react";
import { BroadcastChannel } from "broadcast-channel";
import Loading from "../../../../../Loading";

const GithubCallback = () => {
  useEffect(() => {
    const bc = new BroadcastChannel("github_app_auth");
    bc.postMessage("authorized");
    window.close();

    return () => {
      bc.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Loading />;
};

export default GithubCallback;
