import React, { useContext } from "react";
import "./ProjectTopCard.scss";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ActionContext, StateContext } from "../../../../../hooks";
import {
  IActionModel,
  IStateModel,
  IDomain,
} from "../../../../../model/hooks.model";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import config from "../../../../../config";

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

  const showProtocolImage = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return (
          <img
            src={require("../../../../../assets/png/ar_light.png")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
      case "skynet":
        return (
          <img
            src={require("../../../../../assets/png/skynet.png")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
      case "neofs":
        return (
          <img
            src={require("../../../../../assets/png/neo-light.png")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
      case "ipfs-filecoin":
        return (
          <img
            src={require("../../../../../assets/png/filecoin.png")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
      case "ipfs-pinata":
        return (
          <img
            src={require("../../../../../assets/svg/pinata.svg")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );

      default:
        return (
          <img
            src={require("../../../../../assets/png/question_mark.png")}
            alt="github"
            className="project-top-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
    }
  };

  const lastPublishedDate = moment(selectedProject?.updatedAt).format(
    "MMM DD, YYYY hh:mm A",
  );
  const imageUrl = (imageUrl: string | undefined) => {
    if (imageUrl) {
      return imageUrl;
    }
    return config.urls.IMAGE_NOT_FOUND;
  };

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
  const hnsDomains = selectedProject ? selectedProject.handshakeDomains : [];
  const hnsSubdomains = selectedProject ? selectedProject.handshakeSubdomains : [];
  const ensDomains = selectedProject ? selectedProject.ensDomains : [];

  const isDomainOrSubPresent =
    [...domains, ...subdomains, ...hnsDomains, ...hnsSubdomains].length > 0;

  const triggerDeployment = () => {
    const latest = selectedProject?.latestDeployment;
    setRepoForTriggerDeployment({
      github_url: selectedProject?.githubUrl,
      branch: latest?.configuration.branch,
      framework: latest?.configuration.framework,
      publish_dir: latest?.configuration.publishDir,
      package_manager: latest?.configuration.packageManager,
      build_command: latest?.configuration.buildCommand,
      workspace: latest?.configuration.workspace,
      protocol: latest?.configuration.protocol,
    });
    history.push("/deploy/new");
  };

  return (
    <div className="ProjectTopCard">
      <div className="project-top-card-container max-width-set">
        <div className="deployment-top-card-container">
          <div className="deployment-screenshot-container">
            {!projectLoading ? (
              <a
                href={latestDeployment?.sitePreview}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="deployment-screenshot"
                  src={imageUrl(selectedProject?.latestDeployment?.screenshot?.url)}
                  // onClick={latestDeployment?.sitePreview}
                  alt={"Preview not Available"}
                />
              </a>
            ) : (
              <Skeleton height={200} width={320} duration={2} />
            )}
          </div>
          <div className="deployment-right">
            <div className="project-top-card-header">
              <div className="project-top-card-header-title-container">
                <h2 className="project-top-card-header-title">
                  {!projectLoading ? (
                    selectedProject?.name
                  ) : (
                    <Skeleton width={200} duration={2} />
                  )}
                </h2>
                <div className="archive-tag-container">
                  {!projectLoading ? (
                    selectedProject?.state === "ARCHIVED" ? (
                      <span className="archive-tag">{selectedProject?.state}</span>
                    ) : null
                  ) : null}
                </div>
              </div>
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
                  <div className="project-top-github-icon">
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                  <div className="domain-overview-container">
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
                            {(i !== a.length - 1 ||
                              subdomains.length > 0 ||
                              hnsDomains.length > 0 ||
                              hnsSubdomains.length > 0 ||
                              ensDomains.length > 0) && (
                              <span className="comma-sep">,</span>
                            )}
                          </>
                        ))}
                        {subdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                          <>
                            <a
                              href={`https://${s.name}`}
                              className="project-top-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {s.name}
                            </a>
                            {(i !== a.length - 1 ||
                              hnsDomains.length > 0 ||
                              hnsSubdomains.length > 0 ||
                              ensDomains.length > 0) && (
                              <span className="comma-sep">,</span>
                            )}
                          </>
                        ))}
                        {hnsDomains.map((s: IDomain, i: number, a: IDomain[]) => (
                          <>
                            <a
                              href={`http://${s.name}`}
                              className="project-top-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {s.name}
                            </a>
                            {(i !== a.length - 1 ||
                              hnsSubdomains.length > 0 ||
                              ensDomains.length > 0) && (
                              <span className="comma-sep">,</span>
                            )}
                          </>
                        ))}
                        {hnsSubdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                          <>
                            <a
                              href={`http://${s.name}`}
                              className="project-top-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {s.name}
                            </a>
                            {(i !== a.length - 1 || ensDomains.length > 0) && (
                              <span className="comma-sep">,</span>
                            )}
                          </>
                        ))}
                        {ensDomains.map((s: IDomain, i: number, a: IDomain[]) => (
                          <>
                            <a
                              href={`https://${s.name}.link`}
                              className="project-top-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {s.name}
                            </a>
                            {i !== a.length - 1 && (
                              <span className="comma-sep">,</span>
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <Skeleton width={300} duration={2} />
                    )}
                  </div>
                </div>
              )}
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
                {showProtocolImage(
                  selectedProject?.latestDeployment?.configuration.protocol!,
                )}

                {latestDeployment?.sitePreview ? (
                  <a
                    href={latestDeployment?.sitePreview}
                    className="project-top-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {!projectLoading ? (
                      "Latest Successful Site Preview"
                    ) : (
                      <Skeleton width={300} duration={2} />
                    )}
                  </a>
                ) : !projectLoading ? (
                  <span>Site preview not available</span>
                ) : (
                  <Skeleton width={300} duration={2} />
                )}
              </div>
              {!projectLoading && (
                <div className="project-top-card-fields">
                  <button
                    className="trigger-deploy-button"
                    onClick={triggerDeployment}
                  >
                    Redeploy Latest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTopCard;
