import React from "react";
import "./Landing.scss";
import { RootHeader } from "../_SharedComponents";
import LazyLoad from "react-lazyload";

const LandingHome = React.lazy(() => import("./components/LandingHome"));
const LandingFooter = React.lazy(() => import("./components/LandingFooter"));
const LandingDeploy = React.lazy(() => import("./components/LandingDeploy"));
const LandingAbout = React.lazy(() => import("./components/LandingAbout"));

const MemoLandingHome = React.memo(LandingHome);
const MemoLandingFooter = React.memo(LandingFooter);
const MemoLandingDeploy = React.memo(LandingDeploy);
const MemoLandingAbout = React.memo(LandingAbout);

function Landing() {
  return (
    <div className="Landing">
      <div className="landing-header">
        <RootHeader parent={"Landing"} />
      </div>
      <LazyLoad>
        <MemoLandingHome />
      </LazyLoad>
      <div className="background-color-container">
        <LazyLoad>
          <MemoLandingDeploy />
        </LazyLoad>

        <LazyLoad>
          <MemoLandingAbout />
        </LazyLoad>

        <LazyLoad>
          <MemoLandingFooter />
        </LazyLoad>
      </div>
    </div>
  );
}

export default Landing;
