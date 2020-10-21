import React from "react";
import "./Landing.scss";
import { RootHeader } from "../SharedComponents";
import LazyLoad from "react-lazyload";

const LandingHome = React.lazy(() => import("./components/LandingHome"));
const LandingFooter = React.lazy(() => import("./components/LandingFooter"));
const LandingDeploy = React.lazy(() => import("./components/LandingDeploy"));
const LandingAbout = React.lazy(() => import("./components/LandingAbout"));

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
