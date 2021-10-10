import React, { useContext, useEffect, useRef, useState } from "react";
import "./Overview.scss";
import { ProjectTopCard } from "../_SharedComponent";
import moment from "moment";
import { StateContext } from "../../../../hooks";
import { IStateModel } from "../../../../model/hooks.model";
import Skeleton from "react-loading-skeleton";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { ApiService } from "../../../../services";

const Overview = () => {
  const history = useHistory();
  const params = useParams<any>();
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const [pinDetailLoading, setPinDetailLoading] = useState<boolean>(true);
  const [pinDetail, setPinDetail] = useState<any>(null);

  const { projectLoading, selectedProject, selectedOrg, orgLoading } =
    useContext<IStateModel>(StateContext);

  const latestDeployment: any = selectedProject?.latestDeployment;

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

  useEffect(() => {
    if (latestDeployment?.configuration?.protocol === "ipfs-filecoin") {
      getFilecoinPinDetais();
    } else if (latestDeployment?.configuration?.protocol === "ipfs-pinata") {
      getPinataPinDetais();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestDeployment?.configuration?.protocol]);

  const getFilecoinPinDetais = async () => {
    setPinDetailLoading(true);
    if (latestDeployment.sitePreview) {
      const cid = latestDeployment.sitePreview.split(
        "https://ipfs.infura.io/ipfs/",
      )[1];
      ApiService.getFilecoinPinDetails(cid).subscribe((data) => {
        if (componentIsMounted.current) {
          setPinDetail(data);
          setPinDetailLoading(false);
        }
      });
    } else {
      setPinDetailLoading(false);
    }
  };
  const getPinataPinDetais = async () => {
    setPinDetailLoading(true);
    if (latestDeployment.sitePreview) {
      const cid = latestDeployment.sitePreview.split(
        "https://ipfs.infura.io/ipfs/",
      )[1];
      ApiService.getPinataPinDetails(cid).subscribe((data) => {
        if (componentIsMounted.current) {
          setPinDetail(data);
          setPinDetailLoading(false);
        }
      });
    } else {
      setPinDetailLoading(false);
    }
  };

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
      {latestDeployment?.configuration?.protocol === "ipfs-filecoin" && (
        <div className="site-overview-card-container deploy-container">
          <div className="site-overview-header-title">
            Latest Filecoin Deployment Pinning Details
          </div>
          <div className="deploy-summary-item">
            <div className="deploy-summary-body-item">
              <label>Filecoin CID:</label>
              <span>
                {!pinDetailLoading ? (
                  pinDetail.cid
                ) : (
                  <Skeleton width={200} duration={2} />
                )}
              </span>
            </div>
            <div className="deploy-summary-body-item">
              <label>Filecoin Pinning Status:</label>
              <span>
                {!pinDetailLoading ? (
                  pinDetail.isPinned ? (
                    "Pinned"
                  ) : (
                    "Not Pinned"
                  )
                ) : (
                  <Skeleton width={200} duration={2} />
                )}
              </span>
            </div>
            {!pinDetailLoading && pinDetail.isPinned && (
              <div className="deploy-summary-body-item">
                <label>Filecoin Pinned Date:</label>
                <span>
                  {!pinDetailLoading ? (
                    moment(pinDetail.pinnedDate).format("MMM DD, YYYY hh:mm A")
                  ) : (
                    <Skeleton width={200} duration={2} />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {latestDeployment?.configuration?.protocol === "ipfs-pinata" && (
        <div className="site-overview-card-container deploy-container">
          <div className="site-overview-header-title">
            Latest IPFS Deployment Pinning Details
          </div>
          <div className="deploy-summary-item">
            <div className="deploy-summary-body-item">
              <label>IPFS CID:</label>
              <span>
                {!pinDetailLoading ? (
                  pinDetail.cid
                ) : (
                  <Skeleton width={200} duration={2} />
                )}
              </span>
            </div>
            <div className="deploy-summary-body-item">
              <label>IPFS Pinning Status:</label>
              <span>
                {!pinDetailLoading ? (
                  pinDetail.isPinned ? (
                    "Pinned"
                  ) : (
                    "Not Pinned"
                  )
                ) : (
                  <Skeleton width={200} duration={2} />
                )}
              </span>
            </div>
            {!pinDetailLoading && pinDetail.isPinned && (
              <div className="deploy-summary-body-item">
                <label>IPFS Pinned Date:</label>
                <span>
                  {!pinDetailLoading ? (
                    moment(pinDetail.pinnedDate).format("MMM DD, YYYY hh:mm A")
                  ) : (
                    <Skeleton width={200} duration={2} />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
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
              {!orgLoading ? (
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
                <span>Site preview not available</span>
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
