import React from "react";
import "./LandingAbout.scss";
import LazyLoad from "react-lazyload";
import {
  LandingAboutButtons,
  LandingAboutTitle,
  LandingAboutTop,
} from "./components";
import LandingAboutDesc from "./components/LandingAboutDesc";

const LandingAbout = () => {
  return (
    <div className="landing-about">
      <div className="landing-about-container">
        <LazyLoad>
          <LandingAboutTop />
        </LazyLoad>

        <LazyLoad>
          <LandingAboutTitle />
        </LazyLoad>

        <LazyLoad>
          <LandingAboutDesc />
        </LazyLoad>

        <LazyLoad>
          <LandingAboutButtons />
        </LazyLoad>
      </div>
    </div>
  );
};

export default LandingAbout;
