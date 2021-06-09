import React, { useContext } from "react";
import "./Overview.scss";
import { ProjectTopCard } from "../_SharedComponent";
import moment from "moment";
import { StateContext } from "../../../../hooks";
import { IStateModel } from "../../../../model/hooks.model";
import Skeleton from "react-loading-skeleton";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";

const Overview = () => {
  const history = useHistory();
  const params = useParams<any>();

  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);

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

  const lastCreatedDate = moment(selectedProject?.createdAt).format(
    "MMM DD, YYYY hh:mm A",
  );

  let displayGithubRepo = "";
  let githubBranchLink = "";
  if (selectedProject) {
    displayGithubRepo = selectedProject.githubUrl.substring(
      19,
      selectedProject.githubUrl.length - 4,
    );

    githubBranchLink = `${selectedProject.githubUrl.substring(
      0,
      selectedProject.githubUrl.length - 4,
    )}/tree/${"master"}`;
  }

  return (
    <div className="SiteOverview">
      <ProjectTopCard />
      <div
        className="site-overview-card-container domain-container"
        onClick={(e) =>
          history.push(`/org/${params.orgid}/sites/${params.siteid}/domain`)
        }
      >
        <div className="domain-container-left">
          <h2>Set up a custom domain with ArGo</h2>
          <p>
            Setup a domain you already own. All domains come with a free SSL cert.
          </p>
        </div>
        {!projectLoading && (
          <div className="domain-container-right">
            {!selectedProject?.domains.length ? (
              <span className="blue-color">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            ) : (
              <span className="green-color">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </div>
        )}
      </div>
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
                `${displayGithubRepo} (branch: ${selectedProject?.latestDeployment?.configuration.branch})`
              ) : (
                <Skeleton width={200} duration={2} />
              )}
            </a>
          </div>
          <div className="deploy-summary-body-item">
            <label>Latest deploy site:</label>
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
