import React, { useContext } from "react";
import "./Overview.scss";
import { ProjectTopCard } from "../_SharedComponent";
import moment from "moment";
import { StateContext } from "../../../../hooks";
import { IStateModel } from "../../../../model/hooks.model";
import Skeleton from "react-loading-skeleton";

const Overview = () => {
  const { projectLoading, selectedProject, selectedOrg } = useContext<IStateModel>(
    StateContext,
  );

  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );
  let latestDeployment: any = {};
  if (sortedDeployments) {
    latestDeployment = sortedDeployments[0];
  }

  const lastPublishedDate = moment(latestDeployment?.createdAt).format(
    "MMM DD, YYYY hh:mm A",
  );

  const lastCreatedDate = moment(selectedProject?.createDate).format(
    "MMM DD, YYYY hh:mm A",
  );

  let displayGithubRepo = "";
  let githubBranchLink = "";
  if (selectedProject) {
    displayGithubRepo = selectedProject.url.substring(
      19,
      selectedProject.url.length - 4,
    );

    githubBranchLink = `${selectedProject.url.substring(
      0,
      selectedProject.url.length - 4,
    )}/tree/${"master"}`;
  }

  return (
    <div className="SiteOverview">
      <ProjectTopCard />
      <div className="site-overview-card-container deploy-container">
        <div className="site-overview-header-title">Project Overview</div>
        <div className="deploy-summary-item">
          <div className="deploy-summary-body-item">
            <label>Name:</label>
            <span>
              {!projectLoading ? (
                selectedProject?.name
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </span>
          </div>
          <div className="deploy-summary-body-item">
            <label>Owner:</label>
            <span>
              {!projectLoading ? (
                selectedOrg?.profile.name
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </span>
          </div>
          <div className="deploy-summary-body-item">
            <label>GitHub Repo/Branch:</label>
            <a href={githubBranchLink} target="_blank" rel="noopener noreferrer">
              {!projectLoading ? (
                `${displayGithubRepo} (branch: ${selectedProject?.branch})`
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </a>
          </div>
          <div className="deploy-summary-body-item">
            <label>Latest deploy site on Arweave:</label>
            {!projectLoading ? (
              latestDeployment?.sitePreview ? (
                <a
                  href={latestDeployment?.sitePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {latestDeployment?.sitePreview}
                </a>
              ) : (
                "Site preview not available"
              )
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </div>
          <div className="deploy-summary-body-item">
            <label>Created:</label>
            <span>
              {!projectLoading ? (
                lastCreatedDate
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </span>
          </div>
          <div className="deploy-summary-body-item">
            <label>Last Published:</label>
            <span>
              {!projectLoading ? (
                lastPublishedDate
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
