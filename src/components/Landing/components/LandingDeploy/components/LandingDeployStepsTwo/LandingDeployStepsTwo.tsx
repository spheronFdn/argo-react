import React from "react";
import "./LandingDeployStepsTwo.scss";

const LandingDeployStepsTwo = () => {
  return (
    <div className="deploy-steps-two">
      <div className="deploy-steps-image-container">
        <span className="path-line"></span>
        <img
          src={require("../../../../../../assets/svg/num_2.svg")}
          alt="num_1"
          className="numbers"
        />
      </div>
      <div className="deploy-steps-title">DEPLOY</div>
      <div className="deploy-steps-description">
        Frontend development is not meant to be a solo activity. The ArGo platform
        makes it a collaborative experience with deploy previews for every code
        change, by seamlessly integrating with GitHub & GitLab.
      </div>
      <div className="deploy-steps-features-container">
        <div className="deploy-steps-features">
          <div className="deploy-steps-feature">◆ &nbsp;Permanent site</div>
          <div className="deploy-steps-feature">◆ &nbsp;Push to deploy</div>
        </div>
        <div className="deploy-steps-features">
          <div className="deploy-steps-feature">◆ &nbsp;Deploy Preview URL</div>
          <div className="deploy-steps-feature">◆ &nbsp;Share and Collaborate</div>
        </div>
      </div>
    </div>
  );
};

export default LandingDeployStepsTwo;
