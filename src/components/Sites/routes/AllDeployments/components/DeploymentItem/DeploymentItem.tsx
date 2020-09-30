import React, { useContext } from "react";
import "./DeploymentItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import Lottie from "react-lottie";
import animationData from "../../../../../../assets/lotties/rotating-settings.json";
import moment from "moment";
import { ApiService } from "../../../../../../services";
import { useHistory, useParams } from "react-router-dom";
import { ActionContext } from "../../../../../../hooks";
import { IActionModel } from "../../../../../../model/hooks.model";

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
  const { setSelectedDeployment } = useContext<IActionModel>(ActionContext);

  const openDeployment = () => {
    ApiService.getDeployment(`${deployment?._id}`).subscribe((response) => {
      setSelectedDeployment(response.deployment);
      history.push(
        `/org/${params.orgid}/sites/${params.siteid}/deployments/${deployment?._id}`,
      );
    });
  };
  return (
    <div className="deployment-item" key={index} onClick={openDeployment}>
      {type === "filled" && (
        <>
          <div className="deployment-left">
            <div className="deployment-left-detail">
              <div className="deployment-publish-detail">
                <span className="bold-text">Published at: </span>
                {deployment?.sitePreview ? (
                  <a
                    href={deployment?.sitePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="commit-link"
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
                  {deployment?.branch}
                  {/* @
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="commit-link"
                  >
                    8234jf3
                  </a>{" "}
                  - Updated feature */}
                </span>
              </div>
            </div>
            <div className="deployment-time-details">
              <div className="bold-text">
                {moment(`${deployment?.createdAt}`).format("MMM DD")} at{" "}
                {moment(`${deployment?.createdAt}`).format("hh:mm A")}
              </div>
              <div className="deployment-status">
                <span className="deployment-status-icon">
                  {deployment?.deploymentStatus.toLowerCase() === "pending" ? (
                    <Lottie options={defaultOptions} height={42} width={58} />
                  ) : (
                    <img
                      src={require("../../../../../../assets/svg/rocket_background.svg")}
                      alt="rocket"
                      className="rocket-icon"
                    />
                  )}
                </span>
                {deployment?.deploymentStatus}
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
