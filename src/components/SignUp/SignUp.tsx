import React from "react";
import "./SignUp.scss";
import { SignUpListItem, GithubIcon, GitlabIcon } from "./components";
import Logo from "../Logo";

function SignUp() {
  const signInWithGithub = async () => {
    const githubSignInUrl = "http://localhost:8080/auth/github";
    window.open(githubSignInUrl, "_self");
  };
  return (
    <div className="SignIn">
      <div className="side-backdrop"></div>
      <div className="sign-total-container">
        <div className="sign-in-header">
          <div className="sign-in-header-container">
            <Logo theme="dark" />
            {/* <div className="sign-arweave-logo-container">
              Powered by{" "}
              <a href="https://github.com/">
                <ArweaveIcon />
              </a>
            </div> */}
          </div>
        </div>
        <div className="sign-in-container">
          <div className="sign-in-left-container">
            <div className="sign-in-usage-container">
              <SignUpListItem
                index={1}
                title={"Built on top on Arweave"}
                description={
                  "We have built our solution directly on top on Arweave CLI to make our architecture linear and extensible."
                }
              />
              <SignUpListItem
                index={2}
                title={"Permanently deploy your web app"}
                description={
                  "As we deploy your site directly to Arweave Permaweb, it will be always available for you to see."
                }
              />
              <SignUpListItem
                index={3}
                title={"Instant static deploys"}
                description={
                  "Push to git and your website is live. Zero configuration required."
                }
              />
              <SignUpListItem
                index={4}
                title={"Maintained Permaweb Deployment"}
                description={
                  "Find your deployed site in your dashboard along with your logs, versions and preview for every deployment."
                }
              />
            </div>
          </div>
          <div className="sign-in-right-container">
            <div className="sign-in-all-right-container">
              <h1 className="sign-in-right-header">Deploy your site permanently</h1>
              <div className="sign-in-right-button-container">
                <button className="github-button" onClick={signInWithGithub}>
                  <span className="github-icon">
                    <GithubIcon />
                  </span>
                  <span>Continue with Github</span>
                </button>
                <button className="gitlab-button">
                  <span className="gitlab-icon">
                    <GitlabIcon />
                  </span>
                  <span>Continue with Gitlab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
