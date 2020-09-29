import React from "react";
import "./Landing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons";
import RootHeader from "../RootHeader";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Landing() {
  return (
    <div className="Landing">
      <div className="landing-header">
        <RootHeader parent={"Landing"} />
      </div>
      <div className="landing-home">
        <div className="gradient-layer"></div>
        <div className="landing-home-body">
          <h1>Permaweb deployment.</h1>
          <h1 className="heading-sec">Simplified.</h1>
          <button type="button" className="primary-button">
            <span className="button-icon">
              <FontAwesomeIcon icon={faSpaceShuttle} />
            </span>
            <span>Start Deploying</span>
          </button>
          <div className="alpha-text">Alpha release now available</div>
        </div>
      </div>
      <div className="background-color-container">
        <div className="landing-deploy">
          <div className="landing-deploy-container">
            <div className="explore-text">Explore the 2 step deployment</div>
            <div className="argo-desc-text">
              ArGo is a one-click deployment service platform on top of Arweave
              permaweb. Our process is simple:
            </div>
            <div className="deploy-steps">
              <div className="deploy-steps-image-container">
                <span className="path-line"></span>
                <img
                  src={require("../../assets/svg/num_1.svg")}
                  alt="num_1"
                  className="numbers"
                />
              </div>
              <div className="deploy-steps-title">DEVELOP</div>
              <div className="deploy-steps-description">
                ArGo is the best place to deploy any frontend app to permaweb.
                Permaweb give you power to deploy full web app permanently, retrieved
                quickly, and decentralized – forever. <br /> No more 404s. No more
                stealth edits. No more web apps that decline in quality.
              </div>
              <div className="jamstack-support-container">
                <div className="jamstack-support-title">
                  WORKS WITH JAMSTACK FRAMEWORKS
                </div>
                <div className="jamstack-support-icons-container">
                  <div className="jamstack-support-icon">
                    <img src={require("../../assets/svg/React.svg")} alt="React" />
                  </div>
                  <div className="jamstack-support-icon icon-disabled">
                    <img src={require("../../assets/svg/Next.svg")} alt="React" />
                    <div>Coming soon</div>
                  </div>
                  <div className="jamstack-support-icon icon-disabled">
                    <img src={require("../../assets/svg/Vue.svg")} alt="React" />
                    <div>Coming soon</div>
                  </div>
                  <div className="jamstack-support-icon icon-disabled">
                    <img src={require("../../assets/svg/Angular.svg")} alt="React" />
                    <div>Coming soon</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="deploy-steps">
              <div className="deploy-steps-image-container">
                <span className="path-line"></span>
                <img
                  src={require("../../assets/svg/num_2.svg")}
                  alt="num_1"
                  className="numbers"
                />
              </div>
              <div className="deploy-steps-title">DEPLOY</div>
              <div className="deploy-steps-description">
                Frontend development is not meant to be a solo activity. The ArGo
                platform makes it a collaborative experience with deploy previews for
                every code change, by seamlessly integrating with GitHub & GitLab.
              </div>
              <div className="deploy-steps-features-container">
                <div className="deploy-steps-features">
                  <div className="deploy-steps-feature">
                    ◆ &nbsp;Feature Number 1
                  </div>
                  <div className="deploy-steps-feature">
                    ◆ &nbsp;Feature Number 2
                  </div>
                </div>
                <div className="deploy-steps-features">
                  <div className="deploy-steps-feature">
                    ◆ &nbsp;Feature Number 3
                  </div>
                  <div className="deploy-steps-feature">
                    ◆ &nbsp;Feature Number 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-about">
          <div className="landing-about-container">
            <div className="explore-text">About</div>
            <h1>Transcend the cloud.</h1>
            <div className="landing-about-paragraphs">
              <p>
                ArGo is built on Arweave, a new type of storage that backs data with
                sustainable and perpetual endowments. This allows developers to truly
                store data forever – for the very first time.
              </p>
              <p>
                As a collectively owned hard drive that never forgets, Arweave allows
                us to remember and preserve apps and version records indefinitely.
              </p>
              <p>
                ArGo is the first service to provide all your frontend deployment on
                permaweb in one place.
              </p>
            </div>
            <div className="button-container">
              <button type="button" className="primary-button">
                <span className="button-icon">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span>See code on GitHub</span>
              </button>
              <button type="button" className="primary-button white-button">
                <span className="button-icon">
                  <img src={require("../../assets/png/ar_light.png")} alt="ar" />
                </span>
                <span>Learn More about Arweave</span>
              </button>
            </div>
          </div>
        </div>
        <div className="landing-footer">
          <div className="landing-footer-container">
            <div>
              © 2020 ArGo • Built on <a href="https://www.arweave.org">Arweave</a> •{" "}
              <a href="https://www.arweave.org">Privacy Policy</a>
            </div>
            <div className="landing-footer-container-right">
              <div className="landing-footer-icon">
                <FontAwesomeIcon icon={faGithub} />
              </div>
              <div className="landing-footer-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
