import React, { useContext } from "react";
import { StateContext } from "../../../../hooks";
import { ProjectItem } from "./components";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import "./Overview.scss";

const Overview = () => {
  const history = useHistory();
  const { selectedOrg, userLoading } = useContext(StateContext);
  return (
    <div className="Overview">
      <div className="overview-container">
        <div className="overview-team-avatar-container">
          {!userLoading ? (
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
            {!userLoading ? (
              selectedOrg?.profile.name
            ) : (
              <Skeleton width={150} duration={2} />
            )}
          </h1>
          {!userLoading ? (
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
          <button type="button" className="secondary-button">
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
          {!userLoading ? (
            selectedOrg?.repositories?.length ? (
              selectedOrg?.repositories?.map((repo: any, index: number) => (
                <ProjectItem index={index} type="filled" />
              ))
            ) : (
              <ProjectItem index={1} type="empty" />
            )
          ) : (
            <ProjectItem index={1} type="skeleton" />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
