import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../Loading";

const GithubCallback = () => {
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    // eslint-disable-next-line no-console
    localStorage.setItem("jwt-token", token || "");
    const bc = new BroadcastChannel("signin_channel");
    bc.postMessage("signedup");
    window.close();

    return () => {
      bc.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Loading />;
};

export default GithubCallback;
