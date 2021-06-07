import React, { useContext } from "react";
import "./ProjectTopCard.scss";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ActionContext, StateContext } from "../../../../../hooks";
import {
  IActionModel,
  IStateModel,
  ISubdomain,
  IDomain,
} from "../../../../../model/hooks.model";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const ProjectTopCard = () => {
  const history = useHistory();

  const { projectLoading, selectedProject } = useContext<IStateModel>(StateContext);
  const { setRepoForTriggerDeployment } = useContext<IActionModel>(ActionContext);

  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((d) => d.status.toLowerCase() === "deployed")
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));
  let latestDeployment: any = {};
  if (sortedDeployments) {
    latestDeployment = sortedDeployments[0];
  }

  const lastPublishedDate = moment(selectedProject?.updatedAt).format(
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
    )}/tree/${selectedProject?.latestDeployment?.configuration.branch}`;
  }

  const domains = selectedProject ? selectedProject.domains : [];
  const subdomains = selectedProject ? selectedProject.subdomains : [];

  const isDomainOrSubPresent = [...domains, ...subdomains].length > 0;

  const triggerDeployment = () => {
    let latest = null;
    const sortedDeployments = projectLoading
      ? []
      : selectedProject?.deployments.sort((a, b) =>
          moment(b.createdAt).diff(moment(a.createdAt)),
        );
    if (sortedDeployments) {
      latest = sortedDeployments[0];
    }
    setRepoForTriggerDeployment({
      github_url: selectedProject?.githubUrl,
      branch: latest?.configuration.branch,
      framework: selectedProject?.latestDeployment?.configuration.framework,
      publish_dir: latest?.configuration.publishDir,
      package_manager: latest?.configuration.packageManager,
      build_command: latest?.configuration.buildCommand,
      workspace: latest?.configuration.workspace,
    });
    history.push("/deploy/new");
  };

  return (
    <div className="ProjectTopCard">
      <div className="project-top-card-container max-width-set">
        <div className="project-top-card-header">
          <h2 className="project-top-card-header-title">
            {!projectLoading ? (
              selectedProject?.name
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </h2>
          <p className="project-top-card-header-description">
            {!projectLoading ? (
              <>
                <u>Production</u>:{" "}
                {selectedProject?.latestDeployment?.configuration.branch} - Last
                published at {lastPublishedDate}
              </>
            ) : (
              <Skeleton width={400} duration={2} />
            )}
          </p>
        </div>
        <div className="project-top-card-content">
          {isDomainOrSubPresent && (
            <div className="project-top-card-fields">
              <span className="project-top-github-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              {!projectLoading ? (
                <>
                  {domains.map((d: IDomain, i: number, a: IDomain[]) => (
                    <>
                      <a
                        href={`https://${d.name}`}
                        className="project-top-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {d.name}
                      </a>
                      {(i !== a.length - 1 || subdomains.length > 0) && (
                        <span className="comma-sep">,</span>
                      )}
                    </>
                  ))}
                  {subdomains.map((s: ISubdomain, i: number, a: ISubdomain[]) => (
                    <>
                      <a
                        href={`https://${s.name}`}
                        className="project-top-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                      {i !== a.length - 1 && <span className="comma-sep">", "</span>}
                    </>
                  ))}
                </>
              ) : (
                <Skeleton width={300} duration={2} />
              )}
            </div>
          )}
          {/* <div className="project-top-card-fields">
            <span className="project-top-github-icon">
              <FontAwesomeIcon icon={faGlobe} />
            </span>
            <a
              href={githubBranchLink}
              className="project-top-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {!projectLoading ? (
                <>
                  {displayGithubRepo} (branch: {selectedProject?.branch})
                </>
              ) : (
                <Skeleton width={300} duration={2} />
              )}
            </a>
          </div> */}
          <div className="project-top-card-fields">
            <span className="project-top-github-icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <a
              href={githubBranchLink}
              className="project-top-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {!projectLoading ? (
                <>
                  {displayGithubRepo} (branch:{" "}
                  {selectedProject?.latestDeployment?.configuration.branch})
                </>
              ) : (
                <Skeleton width={300} duration={2} />
              )}
            </a>
          </div>
          <div className="project-top-card-fields">
            <img
              src={require("../../../../../assets/png/ar_light.png")}
              alt="github"
              className="project-top-logo"
              height={24}
              width={24}
              loading="lazy"
            />

            {latestDeployment?.sitePreview ? (
              <a
                href={latestDeployment?.sitePreview}
                className="project-top-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {!projectLoading ? (
                  "Latest Successful Site Preview on Arweave"
                ) : (
                  <Skeleton width={300} duration={2} />
                )}
              </a>
            ) : (
              <span>Site preview not available</span>
            )}
          </div>
          <div className="project-top-card-fields">
            <button className="trigger-deploy-button" onClick={triggerDeployment}>
              Redeploy Latest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTopCard;
