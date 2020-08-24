import React from "react";
import "./Landing.scss";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/lottie-rocket.json";

function Landing() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };
  return (
    <div className="Landing">
      <ul className="bg-animation">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="landing-container">
        <header className="header">
          <div className="top-message">Deployment made easy on Arweave.</div>
          <a
            href="https://discord.gg/9fcQkp"
            target="_blank"
            rel="noopener noreferrer"
            className="join-button"
          >
            <span className="join-text">Join</span>
          </a>
        </header>
        <main className="main">
          <div className="main-container">
            <div className="introducing-text">Introducing</div>
            <div className="logo-container">
              <img
                src={require("../../assets/png/logo-white.png")}
                alt="ArGo light version"
                className="logo-image"
              />
              <span className="logo-text">ArGo.</span>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="coming-soon-container">
            <div className="coming-soon-text">Coming soon</div>
            <Lottie options={defaultOptions} height={36} width={36} />
          </div>
          <div>
            <a
              href="https://twitter.com/argoapplive"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-container"
            >
              <img
                src={require("../../assets/svg/twitter_light.svg")}
                alt="github light version"
                className="social-icon"
              />
            </a>
            <a
              href="https://github.com/argoapp-live"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-container"
            >
              <img
                src={require("../../assets/svg/github_light.svg")}
                alt="github light version"
                className="social-icon"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
