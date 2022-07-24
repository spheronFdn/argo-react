import React from "react";
import "./Login.scss";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));
const GithubIcon = React.lazy(() => import("./components/SVGIcons/GithubIcon"));

function Login() {
  const signInWithGithub = async () => {
    const githubSignInUrl = `${window.location.origin}/#/signup/github`;
    window.open(githubSignInUrl, "_blank");
  };
  // const signInWithGitlab = async () => {
  //   const gitlabSignInUrl = `${config.urls.BASE_URL}/signup/gitlab`;
  //   window.open(gitlabSignInUrl, "_blank");
  // };
  return (
    <div className="Login">
      <RootHeader parent={"Login"} />
      <div className="login-main-container">
        <div className="login-container-inner">
          <h1 className="login-header">Login to ArGo</h1>
          <div className="login-button-container">
            <button className="github-button" onClick={signInWithGithub}>
              <span className="github-icon">
                <GithubIcon />
              </span>
              <span>Continue with Github</span>
            </button>
            {/* <button className="gitlab-button" onClick={signInWithGitlab}>
              <span className="gitlab-icon">
                <GitlabIcon />
              </span>
              <span>Continue with Gitlab</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
