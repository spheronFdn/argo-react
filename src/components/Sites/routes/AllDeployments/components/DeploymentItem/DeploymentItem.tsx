import React, { useContext } from "react";
import "./DeploymentItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import Lottie from "react-lottie";
import animationData from "../../../../../../assets/lotties/rotating-settings.json";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { StateContext } from "../../../../../../hooks";
import { IDomain, IStateModel } from "../../../../../../model/hooks.model";
import { LazyLoadedImage } from "../../../../../_SharedComponents";

const DeploymentItem: React.FC<IDeploymentItemProps> = ({
  index,
  type,
  deployment,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  const params = useParams<any>();
  const history = useHistory();
  const { selectedProject } = useContext<IStateModel>(StateContext);

  const domains =
    selectedProject && deployment?.sitePreview
      ? selectedProject.domains.filter(
          (d) => deployment?.sitePreview.indexOf(d.link) !== -1,
        )
      : [];

  const subdomains =
    selectedProject && deployment?.sitePreview
      ? selectedProject.subdomains.filter(
          (d) => deployment?.sitePreview.indexOf(d.link) !== -1,
        )
      : [];

  const hnsDomains =
    selectedProject && deployment?.sitePreview
      ? selectedProject.handshakeDomains.filter(
          (d) => deployment?.sitePreview.indexOf(d.link) !== -1,
        )
      : [];

  const hnsSubdomains =
    selectedProject && deployment?.sitePreview
      ? selectedProject.handshakeSubdomains.filter(
          (d) => deployment?.sitePreview.indexOf(d.link) !== -1,
        )
      : [];

  const isDomainOrSubPresent =
    [...domains, ...subdomains, ...hnsDomains, ...hnsSubdomains].length > 0;

  const showProtocolTag = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return <span className="protocol-tag-arweave">Arweave</span>;
      case "skynet":
        return <span className="protocol-tag-skynet">Skynet</span>;

      default:
    }
  };

  const openDeployment = () => {
    history.push(
      `/org/${params.orgid}/sites/${params.siteid}/deployments/${deployment?._id}`,
    );
  };

  return (
    <div className="deployment-item" key={index} onClick={openDeployment}>
      {type === "filled" && (
        <>
          <div className="deployment-left">
            <div className="deployment-left-detail">
              {isDomainOrSubPresent && (
                <div className="deployment-domains-detail">
                  <span className="bold-text">Published at: </span>
                  {
                    <>
                      {domains.map((d: IDomain, i: number, a: IDomain[]) => (
                        <>
                          <a
                            href={`https://${d.name}`}
                            className="deployment-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {d.name}
                          </a>
                          {(i !== a.length - 1 ||
                            subdomains.length > 0 ||
                            hnsDomains.length > 0 ||
                            hnsSubdomains.length > 0) && (
                            <span className="comma-sep">,</span>
                          )}
                        </>
                      ))}
                      {subdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                        <>
                          <a
                            href={`https://${s.name}`}
                            className="deployment-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {s.name}
                          </a>
                          {(i !== a.length - 1 ||
                            hnsDomains.length > 0 ||
                            hnsSubdomains.length > 0) && (
                            <span className="comma-sep">,</span>
                          )}
                        </>
                      ))}
                      {hnsDomains.map((s: IDomain, i: number, a: IDomain[]) => (
                        <>
                          <a
                            href={`http://${s.name}`}
                            className="deployment-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {s.name}
                          </a>
                          {(i !== a.length - 1 || hnsSubdomains.length > 0) && (
                            <span className="comma-sep">,</span>
                          )}
                        </>
                      ))}
                      {hnsSubdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                        <>
                          <a
                            href={`http://${s.name}`}
                            className="deployment-link"
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
                  }
                </div>
              )}
              <div className="deployment-publish-detail">
                <span className="bold-text">Preview: </span>
                {deployment?.sitePreview ? (
                  <a
                    href={deployment?.sitePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="deployment-link"
                  >
                    {deployment?.sitePreview}
                  </a>
                ) : (
                  <span>Site preview not available</span>
                )}
              </div>
              <div className="deployment-commit-details">
                <span className="bold-text">Production: </span>
                <span>
                  {deployment?.configuration.branch}
                  {deployment?.commitId ? (
                    <>
                      @
                      <a
                        href={`${selectedProject?.githubUrl.substring(
                          0,
                          selectedProject?.githubUrl.length - 4,
                        )}/commit/${deployment?.commitId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="deployment-link"
                      >
                        {deployment?.commitId.substr(0, 7)}{" "}
                        {deployment?.commitMessage
                          ? `- ${deployment?.commitMessage.substr(0, 64)}...`
                          : ""}
                      </a>
                    </>
                  ) : null}
                </span>
              </div>
              <div className="protocol-tag-container">
                {showProtocolTag(deployment?.configuration.protocol!)}
              </div>
            </div>
            <div className="deployment-time-details">
              <div className="bold-text">
                {moment(`${deployment?.createdAt}`).format("MMM DD")} at{" "}
                {moment(`${deployment?.createdAt}`).format("hh:mm A")}
              </div>
              <div className="deployment-status">
                <span className="deployment-status-icon">
                  {deployment?.status.toLowerCase() === "pending" && (
                    <Lottie options={defaultOptions} height={42} width={58} />
                  )}
                  {deployment?.status.toLowerCase() === "deployed" && (
                    <LazyLoadedImage height={16} once>
                      <img
                        src={require("../../../../../../assets/svg/rocket_background.svg")}
                        alt="rocket"
                        className="rocket-icon"
                        height={16}
                        width={16}
                        loading="lazy"
                      />
                    </LazyLoadedImage>
                  )}
                  {deployment?.status.toLowerCase() === "failed" && (
                    <LazyLoadedImage height={16} once>
                      <img
                        src={require("../../../../../../assets/svg/error.svg")}
                        alt="rocket"
                        className="rocket-icon"
                        height={16}
                        width={16}
                        loading="lazy"
                      />
                    </LazyLoadedImage>
                  )}
                </span>
                {deployment?.status}
              </div>
            </div>
          </div>
          <div className="deployment-right">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </>
      )}
      {type === "skeleton" && (
        <>
          <div className="deployment-left">
            <div className="deployment-left-detail">
              <div className="deployment-publish-detail">
                <Skeleton width={300} duration={2} />
              </div>
              <div className="deployment-commit-details">
                <Skeleton width={180} duration={2} />
              </div>
            </div>
            <div className="deployment-time-details">
              <div className="bold-text">
                <Skeleton width={60} duration={2} />
              </div>
            </div>
          </div>
          <div className="deployment-right">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </>
      )}
    </div>
  );
};

export default DeploymentItem;
