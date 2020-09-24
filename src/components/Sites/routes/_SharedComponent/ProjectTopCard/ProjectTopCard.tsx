import React, { useEffect } from "react";
import "./ProjectTopCard.scss";
// import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProjectTopCard = () => {
  useEffect(() => {}, []);

  return (
    <div className="ProjectTopCard">
      <div className="project-top-card-container max-width-set">
        <div className="project-top-card-header">
          <h2 className="project-top-card-header-title">argo-react</h2>
          <p className="project-top-card-header-description">
            <u>Production</u>: master - Last published at May 7 at 7:49 PM
          </p>
        </div>
        <div className="project-top-card-content">
          <div className="project-top-card-fields">
            <span className="project-top-github-icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <a
              href={"https://github.com/argoapp-live/argo-react"}
              className="project-top-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"rekpero/arweave-neighbour-tweet-react"} (branch: {"master"})
            </a>
          </div>
          <div className="project-top-card-fields">
            <img
              src={require("../../../../../assets/png/ar_light.png")}
              alt="github"
              className="project-top-logo"
            />

            <a
              href={"https://arweave.net/"}
              className="project-top-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview deploy on Arweave
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTopCard;
