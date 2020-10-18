import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./LandingFooter.scss";

const LandingFooter = () => {
  return (
    <div className="landing-footer">
      <div className="landing-footer-container">
        <div>
          © 2020 ArGo • Built on{" "}
          <a
            href="https://www.arweave.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arweave
          </a>{" "}
          •{" "}
          <a
            href="https://www.arweave.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
        <div className="landing-footer-container-right">
          <div
            className="landing-footer-icon"
            onClick={(e) =>
              window.open("https://github.com/argoapp-live", "_blank", "noopener")
            }
          >
            <FontAwesomeIcon icon={faGithub} />
          </div>
          <div
            className="landing-footer-icon"
            onClick={(e) =>
              window.open("https://twitter.com/argoapplive", "_blank", "noopener")
            }
          >
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
