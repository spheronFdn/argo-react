import React from "react";
import { LazyLoadedImage } from "../../../../../_SharedComponents";
import "./LandingDeployStepsTwo.scss";

const LandingDeployStepsTwo = () => {
  return (
    <div className="deploy-steps-two">
      <div className="deploy-steps-image-container">
        <span className="path-line"></span>
        <LazyLoadedImage height={80} once>
          <img
            src={require("../../../../../../assets/svg/num_2.svg")}
            alt="num_1"
            className="numbers"
            height={80}
            width={80}
            loading="lazy"
          />
        </LazyLoadedImage>
      </div>
      <div className="deploy-steps-title">DEPLOY</div>
      <div className="deploy-steps-description">
        Frontend development is not meant to be a solo activity. ArGo makes it a
        collaborative experience with deploy previews for every code change and a
        seamless integration with GitHub & GitLab
      </div>
      <div className="deploy-steps-features-container">
        <div className="deploy-steps-features">
          <div className="deploy-steps-feature">◆ &nbsp;Permanent hosting</div>
          <div className="deploy-steps-feature">◆ &nbsp;Push to deploy</div>
        </div>
        <div className="deploy-steps-features">
          <div className="deploy-steps-feature">◆ &nbsp;Deploy Preview</div>
          <div className="deploy-steps-feature">◆ &nbsp;Share and Collaborate</div>
        </div>
      </div>
    </div>
  );
};

export default LandingDeployStepsTwo;
