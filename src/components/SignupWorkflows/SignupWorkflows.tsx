import React from "react";
import "./SignupWorkflows.scss";
import { Route } from "react-router-dom";

const GithubCallback = React.lazy(
  () => import("./routes/Github/components/GithubCallback"),
);
const GithubSignup = React.lazy(
  () => import("./routes/Github/components/GithubSignup"),
);
const GithubApp = React.lazy(() => import("./routes/Github/components/GithubApp"));
const GithubAppCallback = React.lazy(
  () => import("./routes/Github/components/GithubAppCallback"),
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
      <Route path="/github/app/:id" exact render={() => <GithubApp />} />
      <Route
        path="/github/callback/app"
        exact
        render={() => <GithubAppCallback />}
      />
    </div>
  );
};

export default SignupWorkflows;
