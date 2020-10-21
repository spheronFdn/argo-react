import React from "react";
import "./SignupWorkflows.scss";
import { Route } from "react-router-dom";

const GithubCallback = React.lazy(
  () => import("./routes/Github/components/GithubCallback"),
);
const GithubSignup = React.lazy(
  () => import("./routes/Github/components/GithubSignup"),
);
const GitlabCallback = React.lazy(
  () => import("./routes/Gitlab/components/GitlabCallback"),
);
const GitlabSignup = React.lazy(
  () => import("./routes/Gitlab/components/GitlabSignup"),
);

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
