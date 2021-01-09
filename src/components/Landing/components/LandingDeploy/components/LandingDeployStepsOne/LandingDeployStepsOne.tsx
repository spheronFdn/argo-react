import React from "react";
import { LazyLoadedImage } from "../../../../../_SharedComponents";
import "./LandingDeployStepsOne.scss";

const LandingDeployStepsOne = () => {
  return (
    <div className="deploy-steps-one">
      <div className="deploy-steps-image-container">
        <span className="path-line"></span>
        <LazyLoadedImage height={80} once>
          <img
            src={require("../../../../../../assets/svg/num_1.svg")}
            alt="num_1"
            className="numbers"
            height={80}
            width={80}
            loading="lazy"
          />
        </LazyLoadedImage>
      </div>
      <div className="deploy-steps-title">DEVELOP</div>
      <div className="deploy-steps-description">
        ArGo is the best place to deploy any frontend app to the permaweb. The
        permaweb gives you the power to deploy full web apps permanently. <br />{" "}
        <br /> If everything published on the web could be stored permanently, in its
        original form, information would be immutable, transparent, and accessible to
        everyone. <br /> <br /> No more walled off gardens of the web that can be
        controlled or manipulated by a single person or organisation, no more 404
        ‘page not found errors’, no more stealth edits.
      </div>
      <div className="jamstack-support-container">
        <div className="jamstack-support-title">WORKS WITH JAMSTACK FRAMEWORKS</div>
        <div className="jamstack-support-icons-container">
          <div className="jamstack-support-icon">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/JS.svg")}
                alt="JS"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
          </div>
          <div className="jamstack-support-icon">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/React.svg")}
                alt="React"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
          </div>
          <div className="jamstack-support-icon">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/Vue.svg")}
                alt="Vue"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
          </div>
          <div className="jamstack-support-icon">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/Angular.svg")}
                alt="Angular"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
          </div>
          <div className="jamstack-support-icon">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/Next.svg")}
                alt="Next"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
          </div>
          <div className="jamstack-support-icon icon-disabled">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/Jekyll.svg")}
                alt="Jekyll"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
            <div className="icon-text">Coming soon</div>
          </div>
          <div className="jamstack-support-icon icon-disabled">
            <LazyLoadedImage height={60} noFlex={true} once>
              <img
                src={require("../../../../../../assets/svg/Hugo.svg")}
                alt="Jekyll"
                height={60}
                width={60}
                loading="lazy"
              />
            </LazyLoadedImage>
            <div className="icon-text">Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDeployStepsOne;
