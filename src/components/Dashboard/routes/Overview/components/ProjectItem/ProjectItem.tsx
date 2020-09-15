import React from "react";
import "./ProjectItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import IProjectItemProps from "./model";
import Skeleton from "react-loading-skeleton";

const ProjectItem: React.FC<IProjectItemProps> = ({ index, type }) => {
  return (
    <div className="project-item" key={index}>
      {type === "filled" && (
        <>
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
        </>
      )}
      {type === "skeleton" && (
        <>
          <div className="project-item-header">
            <h3 className="project-item-title">
              <Skeleton width={180} duration={2} />
            </h3>
          </div>
          <div className="project-item-body">
            <span className="project-item-live-key">
              <Skeleton width={200} duration={2} />
            </span>
            <span className="project-item-live-value">
              <Skeleton width={300} duration={2} />
            </span>
          </div>
          <div className="project-item-footer">
            <div className="project-item-git-integration">
              <Skeleton width={150} duration={2} />
            </div>
            <div className="project-item-updated-time">
              <Skeleton width={120} duration={2} />
            </div>
          </div>
        </>
      )}
      {type === "empty" && (
        <div className="project-item-empty">
          <div className="project-item-content">
            <div className="project-item-icon">
              <FontAwesomeIcon icon={faFolderPlus}></FontAwesomeIcon>
            </div>
            <div className="project-item-icon-title">Import Project</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
