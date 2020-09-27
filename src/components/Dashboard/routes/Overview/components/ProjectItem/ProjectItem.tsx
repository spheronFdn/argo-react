import React, { useContext } from "react";
import "./ProjectItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import IProjectItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { ActionContext, StateContext } from "../../../../../../hooks";

const ProjectItem: React.FC<IProjectItemProps> = ({
  index,
  type,
  projectName,
  latestDeployment,
  githubUrl,
  updateTime,
  repo,
}) => {
  const history = useHistory();

  const { setSelectedProject } = useContext<IActionModel>(ActionContext);
  const { selectedOrg } = useContext<IStateModel>(StateContext);

  let displayGithubRepo = "";
  if (githubUrl) {
    displayGithubRepo = githubUrl.substring(19, githubUrl.length - 4);
  }

  return (
    <div className="project-item" key={index}>
      {type === "filled" && (
        <>
          <div className="project-item-header">
            <h3
              className="project-item-title"
              onClick={(e) => {
                setSelectedProject(null);
                history.push(`/org/${selectedOrg?._id}/sites/${repo?._id}/overview`);
              }}
            >
              {projectName}
            </h3>
            <button
              type="button"
              className="project-item-visit-button"
              onClick={(e) => window.open(`${latestDeployment}`, "_blank")}
            >
              Visit
            </button>
          </div>
          <div className="project-item-body">
            <span className="project-item-live-key">Latest deployed at</span>
            <a
              href={`${latestDeployment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item-live-value"
            >
              {latestDeployment}
            </a>
          </div>
          <div className="project-item-footer">
            <div className="project-item-git-integration">
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
              <a
                href={`${githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="git-name"
              >
                {displayGithubRepo}
              </a>
            </div>
            <div className="project-item-updated-time">Updated {updateTime}</div>
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
        <div
          className="project-item-empty"
          onClick={(e) => history.push("/deploy/new")}
        >
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
