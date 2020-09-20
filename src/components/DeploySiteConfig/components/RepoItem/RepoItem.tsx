import React from "react";
import "./RepoItem.scss";
import IRepoItemProps from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLock } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const RepoItem: React.FC<IRepoItemProps> = ({ name, privateRepo, skeleton }) => {
  return (
    <div className="deploy-site-item-repo-item">
      <div className="deploy-site-item-repo-item-details">
        <div className="deploy-site-item-github-icon">
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <div className="deploy-site-item-github-name">
          {skeleton ? <Skeleton width={220} height={24} duration={2} /> : name}
        </div>
      </div>
      {privateRepo && (
        <span className="deploy-site-item-private">
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <span>Private</span>
        </span>
      )}
      <span className="deploy-site-item-chevron-right">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
};

export default RepoItem;
