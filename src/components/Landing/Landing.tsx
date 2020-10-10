import React from "react";
import "./Landing.scss";
import { RootHeader } from "../SharedComponents";
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
      <LazyLoad>
        <LandingHome />
      </LazyLoad>
      <div className="background-color-container">
        <LazyLoad>
          <LandingDeploy />
        </LazyLoad>

        <LazyLoad>
          <LandingAbout />
        </LazyLoad>

        <LazyLoad>
          <LandingFooter />
        </LazyLoad>
      </div>
    </div>
  );
}

export default Landing;
