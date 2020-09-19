import React from "react";
import "./SignupWorkflows.scss";
import { Route } from "react-router-dom";
import {
  GithubCallback,
  GithubSignup,
  GitlabCallback,
  GitlabSignup,
} from "./routes";

const SignupWorkflows = () => {
  return (
    <div className="SignupWorkflows">
      <Route path="/signup/github" exact render={() => <GithubSignup />} />
      <Route path="/signup/gitlab" exact render={() => <GitlabSignup />} />
      <Route path="/callback/github" exact render={() => <GithubCallback />} />
      <Route path="/callback/gitlab" exact render={() => <GitlabCallback />} />
    </div>
  );
};

export default SignupWorkflows;
