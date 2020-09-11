import React from "react";
import "./ProjectItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import IProjectItemProps from "./model";

const ProjectItem: React.FC<IProjectItemProps> = ({ index }) => {
  return (
    <div className="project-item" key={index}>
      <div className="project-item-header">
        <h3 className="project-item-title">argo-react</h3>
        <button type="button" className="project-item-visit-button">
          Visit
        </button>
      </div>
      <div className="project-item-body">
        <span className="project-item-live-key">Latest deployed at</span>
        <a
          href="https://arweave.net/SgR5PmbNpDEb3nXB1VnvxoT8FtFpfQxVqRejTPrnYqg"
          className="project-item-live-value"
        >
          https://arweave.net/SgR5PmbNpDEb3nXB1VnvxoT8FtFpfQxVqRejTPrnYqg
        </a>
      </div>
      <div className="project-item-footer">
        <div className="project-item-git-integration">
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          <span className="git-name">argoapp-live/argo-react</span>
        </div>
        <div className="project-item-updated-time">Updated 5d ago</div>
      </div>
    </div>
  );
};

export default ProjectItem;
