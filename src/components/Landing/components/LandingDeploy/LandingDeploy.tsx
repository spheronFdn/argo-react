import React from "react";
import LazyLoad from "react-lazyload";
import { Particle } from "..";
import {
  LandingDeployDesc,
  LandingDeployStepsOne,
  LandingDeployStepsTwo,
  LandingDeployTitle,
} from "./components";
import "./LandingDeploy.scss";

const LandingDeploy = () => {
  return (
    <div className="landing-deploy">
      <Particle type="deploy" />
      <div className="landing-deploy-container">
        <LazyLoad>
          <LandingDeployTitle />
        </LazyLoad>
        <LazyLoad>
          <LandingDeployDesc />
        </LazyLoad>
        <LazyLoad>
          <LandingDeployStepsOne />
        </LazyLoad>
        <LazyLoad>
          <LandingDeployStepsTwo />
        </LazyLoad>
      </div>
    </div>
  );
};

export default LandingDeploy;
