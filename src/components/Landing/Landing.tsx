import React from "react";
import "./Landing.scss";
import RootHeader from "../RootHeader";
import {
  LandingAbout,
  LandingDeploy,
  LandingFooter,
  LandingHome,
} from "./components";
import LazyLoad from "react-lazyload";

function Landing() {
  return (
    <div className="Landing">
      <div className="landing-header">
        <RootHeader parent={"Landing"} />
      </div>
      <LazyLoad once>
        <LandingHome />
      </LazyLoad>
      <div className="background-color-container">
        <LazyLoad once>
          <LandingDeploy />
        </LazyLoad>

        <LazyLoad once>
          <LandingAbout />
        </LazyLoad>

        <LazyLoad once>
          <LandingFooter />
        </LazyLoad>
      </div>
    </div>
  );
}

export default Landing;
