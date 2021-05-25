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
    : selectedProject?.deployments.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );
  let latestDeployment: any = {};
  if (sortedDeployments) {
    latestDeployment = sortedDeployments[0];
  }

  const isArweave = latestDeployment?.protocol === "arweave" ? true : false;

  const lastPublishedDate = moment(selectedProject?.updateDate).format(
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
    )}/tree/${selectedProject.branch}`;
  }

  const domains = selectedProject ? selectedProject.domains : [];
  const subdomains = selectedProject ? selectedProject.subDomains : [];

  const isDomainOrSubPresent = [...domains, ...subdomains].length > 0;

  const triggerDeployment = () => {
    setRepoForTriggerDeployment({
      github_url: selectedProject?.url,
      branch: latestDeployment?.branch,
      framework: selectedProject?.framework,
      publish_dir: latestDeployment?.publish_dir,
      package_manager: latestDeployment?.package_manager,
      build_command: latestDeployment?.build_command,
      workspace: latestDeployment?.workspace,
      protocol: latestDeployment?.protocol,
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
                <u>Production</u>: {selectedProject?.branch} - Last published at{" "}
                {lastPublishedDate}
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
                  {displayGithubRepo} (branch: {selectedProject?.branch})
                </>
              ) : (
                <Skeleton width={300} duration={2} />
              )}
            </a>
          </div>
          <div className="project-top-card-fields">
            {isArweave ? (
              <img
                src={require("../../../../../assets/png/ar_light.png")}
                alt="github"
                className="project-top-logo"
                height={24}
                width={24}
                loading="lazy"
              />
            ) : (
              <img
                src={require("../../../../../assets/png/skynet.png")}
                alt="github"
                className="project-top-logo"
                height={24}
                width={24}
                loading="lazy"
              />
            )}

            {latestDeployment?.sitePreview ? (
              <a
                href={latestDeployment?.sitePreview}
                className="project-top-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {!projectLoading ? (
                  "Latest deployment preview"
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
