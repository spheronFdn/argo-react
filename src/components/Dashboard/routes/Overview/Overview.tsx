import React, { useContext } from "react";
import { StateContext } from "../../../../hooks";
import { ProjectItem } from "./components";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import "./Overview.scss";
import { IStateModel } from "../../../../model/hooks.model";

const Overview = () => {
  const history = useHistory();

  const { selectedOrg, orgLoading } = useContext<IStateModel>(StateContext);

  return (
    <div className="Overview">
      <div className="overview-container">
        <div className="overview-team-avatar-container">
          {!orgLoading ? (
            <img
              src={
                selectedOrg?.profile.image
                  ? selectedOrg.profile.image
                  : "https://avatars1.githubusercontent.com/u/70075140?s=200&v=4"
              }
              alt="org"
              className="team-avatar"
            ></img>
          ) : (
            <Skeleton circle={true} height={120} width={120} duration={2} />
          )}
        </div>
        <div className="overview-team-details-container">
          <h1 className="overview-team-name">
            {!orgLoading ? (
              selectedOrg?.profile.name
            ) : (
              <Skeleton width={150} duration={2} />
            )}
          </h1>
          {!orgLoading ? (
            <div className="overview-team-misc-container">
              <div className="overview-team-detail-container">
                <label className="overview-team-detail-label">Members</label>
                <div
                  className="overview-team-member-value"
                  onClick={(e) => history.push("/dashboard/members")}
                >
                  {selectedOrg?.users?.length}
                </div>
              </div>
              <div className="overview-team-detail-container git-integration-container">
                <label className="overview-team-detail-label">Projects</label>
                <div className="overview-team-member-value">
                  {selectedOrg?.repositories?.length}
                </div>
              </div>
              {/* <div className="overview-team-detail-container git-integration-container">
              <label className="overview-team-detail-label">Git Integration</label>
              <div className="overview-team-git-integration-value">
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                <span className="git-name">argoapp-live</span>
              </div>
            </div> */}
            </div>
          ) : (
            <div className="overview-team-misc-container">
              <Skeleton width={250} duration={2} />
            </div>
          )}
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="secondary-button"
            onClick={(e) => history.push("/dashboard/members/new")}
          >
            Invite Members
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={(e) => history.push("/deploy/new")}
          >
            Deploy
          </button>
        </div>
      </div>
      <div className="project-list-container">
        <ul className="project-list">
          {!orgLoading ? (
            selectedOrg?.repositories?.length ? (
              selectedOrg?.repositories?.map((repo: any, index: number) => (
                <ProjectItem
                  index={index}
                  type="filled"
                  projectName={repo.name}
                  latestDeployment={repo.sitePreview}
                  githubUrl={repo.url}
                  updateTime={"5d ago"}
                  repo={repo}
                />
              ))
            ) : (
              <ProjectItem
                index={1}
                type="empty"
                projectName={null}
                latestDeployment={null}
                githubUrl={null}
                updateTime={null}
                repo={null}
              />
            )
          ) : (
            <ProjectItem
              index={1}
              type="skeleton"
              projectName={null}
              latestDeployment={null}
              githubUrl={null}
              updateTime={null}
              repo={null}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
