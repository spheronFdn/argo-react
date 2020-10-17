import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LandingAboutButtons.scss";

const LandingAboutButtons = () => {
  return (
    <div className="landing-about-button-container">
      <button
        type="button"
        className="primary-button"
        onClick={(e) =>
          window.open("https://github.com/argoapp-live", "_blank", "noopener")
        }
      >
        <span className="button-icon">
          <FontAwesomeIcon icon={faGithub} />
        </span>
        <span>See code on GitHub</span>
      </button>
      <button
        type="button"
        className="primary-button white-button"
        onClick={(e) => window.open("https://www.arweave.org", "_blank", "noopener")}
      >
        <span className="button-icon">
          <img
            src={require("../../../../../../assets/png/ar_light.png")}
            alt="ar"
            height={20}
            width={20}
          />
        </span>
        <span>Learn More about Arweave</span>
      </button>
    </div>
  );
};

export default LandingAboutButtons;
