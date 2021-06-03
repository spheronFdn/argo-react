import React, { useContext } from "react";
import { ActionContext, StateContext } from "../../../../hooks";
import { ProjectItem } from "./components";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { IActionModel, IProject, IStateModel } from "../../../../model/hooks.model";
import TimeAgo from "javascript-time-ago";
import "./Overview.scss";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";
import { LazyLoadedImage } from "../../../_SharedComponents";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

const Overview = () => {
  const timeAgo = new TimeAgo("en-US");

  const history = useHistory();

  const { selectedOrg, orgLoading } = useContext<IStateModel>(StateContext);
  const { setRepoForTriggerDeployment } = useContext<IActionModel>(ActionContext);

  return (
    <div className="Overview">
      <div className="overview-container">
        <div className="overview-team-avatar-container">
          {!orgLoading ? (
            <LazyLoadedImage height={120} once>
              <img
                src={
                  selectedOrg?.profile.image
                    ? selectedOrg.profile.image
                    : require("../../../../assets/png/default_icon.png")
                }
                alt="org"
                className="team-avatar"
                height={120}
                width={120}
                loading="lazy"
              />
            </LazyLoadedImage>
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
                  {selectedOrg?.projects?.length}
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
            onClick={(e) => {
              setRepoForTriggerDeployment(null);
              history.push("/deploy/new");
            }}
          >
            Deploy
          </button>
        </div>
      </div>
      <div className="project-list-container">
        <ul className="project-list">
          {!orgLoading ? (
            selectedOrg?.projects?.length ? (
              selectedOrg?.projects?.map((repo: IProject, index: number) => (
                <div key={index}>
                  <ProjectItem
                    type="filled"
                    projectName={repo.name}
                    domains={repo.domains?.length ? repo.domains : []}
                    subdomains={repo.subdomains?.length ? repo.subdomains : []}
                    latestDeployment={repo.sitePreview}
                    githubUrl={repo.githubUrl}
                    updateTime={timeAgo.format(new Date(`${repo.updatedAt}`))}
                    repo={repo}
                    index={index}
                  />
                </div>
              ))
            ) : (
              <ProjectItem
                type="empty"
                projectName={null}
                domains={null}
                subdomains={null}
                latestDeployment={null}
                githubUrl={null}
                updateTime={null}
                repo={null}
                index={1}
              />
            )
          ) : (
            <ProjectItem
              type="skeleton"
              projectName={null}
              domains={null}
              subdomains={null}
              latestDeployment={null}
              githubUrl={null}
              updateTime={null}
              repo={null}
              index={1}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
