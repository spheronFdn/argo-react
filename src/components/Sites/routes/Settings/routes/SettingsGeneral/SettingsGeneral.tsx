import React, { useContext, useEffect, useState } from "react";
import "./SettingsGeneral.scss";
import Skeleton from "react-loading-skeleton";
import IDeploymentItemProps from "./model";
import { IStateModel } from "../../../../../../model/hooks.model";
import config from "../../../../../../config";
import { StateContext } from "../../../../../../hooks";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const SettingsGeneral: React.FC<IDeploymentItemProps> = ({
  index,
  type,
  deployment,
}) => {
  const { selectedProject, projectLoading, selectedOrg } =
    useContext<IStateModel>(StateContext);

  const [workspace, setWorkspace] = useState<string>("");

  // const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  const lastPublishedDate = moment(selectedProject?.updatedAt).format(
    "MMM DD, YYYY hh:mm A",
  );

  const lastCreatedDate = moment(selectedProject?.createdAt).format(
    "MMM DD, YYYY hh:mm A",
  );

  let displayGithubRepo = "";
  if (selectedProject) {
    displayGithubRepo = selectedProject.githubUrl.substring(
      19,
      selectedProject.githubUrl.length - 4,
    );
  }

  useEffect(() => {
    if (selectedProject) {
      setWorkspace(
        selectedProject?.latestDeployment?.configuration.workspace
          ? selectedProject?.latestDeployment?.configuration.workspace
          : "",
      );
    }
  }, [selectedProject]);

  const imageUrl = (imageUrl: string | undefined) => {
    if (imageUrl) {
      return imageUrl;
    }
    return config.urls.IMAGE_NOT_FOUND;
  };

  // useEffect(() => {
  //   if (selectedProject) {
  //     if (selectedProject?.latestDeployment?.configuration.workspace !== workspace) {
  //       setIsDataChanged(true);
  //     } else {
  //       setIsDataChanged(false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedProject, workspace]);

  // const updateProject = () => {
  //   if (selectedProject) {
  //     setUpdateLoading(true);
  //     const project = {
  //       package_manager:
  //         selectedProject?.latestDeployment?.configuration.packageManager,
  //       build_command: selectedProject?.latestDeployment?.configuration.buildCommand,
  //       publish_dir: selectedProject?.latestDeployment?.configuration.publishDir,
  //       branch: selectedProject?.latestDeployment?.configuration.branch,
  //       workspace,
  //     };

  //     ApiService.updateProject(`${selectedProject?._id}`, project).subscribe(
  //       (result) => {
  //         setUpdateLoading(false);
  //         fetchProject(`${selectedProject?._id}`);
  //       },
  //     );
  //   }
  // };

  // const deleteOrg = () => {
  //   if (selectedOrg && deleteConfirmed) {
  //     ApiService.deleteOrganization((selectedOrg as any)._id).subscribe((result) => {
  //       fetchUser();
  //       history.push("/dashboard");
  //     });
  //   }
  // };

  return (
    <div className="SettingsGeneral">
      <div className="settings-right-container">
        <div className="settings-project-details">
          <div className="settings-project-header">Project Details</div>
          <div className="settings-project-body">
            {/* <div className="settings-project-item">
              <label className="settings-project-item-title">Project Name</label>
              <label className="settings-project-item-subtitle">
                This is your project name.
              </label>
              {!projectLoading ? (
                <input
                  type="text"
                  placeholder="e.g. argoapp-live"
                  className="settings-project-item-input"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                />
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div> */}
            <div className="settings-project-item">
              <label className="settings-project-item-title">Project Owner</label>
              <label className="settings-project-item-subtitle">
                This is the organization from which this project is deployed
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">
                  {selectedOrg?.profile.name}
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">
                GitHub Repo/Branch
              </label>
              <label className="settings-project-item-subtitle">
                This is the organization from which this project is deployed
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">
                  {displayGithubRepo} (branch:{" "}
                  {selectedProject?.latestDeployment?.configuration.branch})
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">
                Workspace directory
              </label>
              <label className="settings-project-item-subtitle">
                This is the project's client side workspace if you have a monorepo
                like structure.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">
                  {workspace ? workspace : "No Workspace"}
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">Creation Date</label>
              <label className="settings-project-item-subtitle">
                This is the creation date of this project.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">{lastCreatedDate}</div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">Last Published</label>
              <label className="settings-project-item-subtitle">
                This is the creation date of this project.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">{lastPublishedDate}</div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
          </div>
          {/* <div className="settings-project-footer">
            <div className="warning-text-container">
              <span className="exclamation-icon">
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              </span>
              <span>Click save to update your organisation</span>
            </div>
            <button
              type="button"
              className="primary-button"
              disabled={projectLoading || !isDataChanged}
              onClick={updateProject}
            >
              {updateLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
              Save
            </button>
          </div> */}
        </div>
        <div className="settings-project-details">
          <div className="settings-project-header delete-containers">
            Archive Project
          </div>
          <div className="settings-project-body">
            <div className="delete-org-container">
              This project will be archived and will not be shown in your
              organization main directory.
              <br />
              <br /> Note - You can unarchive your project by going to organization
              settings and clicking on unarchive button.
            </div>
            <div className="settings-deployment-item">
              <>
                <div className="settings-deployment-left">
                  {!projectLoading ? (
                    <img
                      className="deployment-screenshot"
                      src={imageUrl(
                        selectedProject?.latestDeployment?.screenshot?.url,
                      )}
                      alt={"Preview not Available"}
                    />
                  ) : (
                    <Skeleton height={100} width={190} duration={2} />
                  )}
                  <div className="deployment-left-detail">
                    <div className="deployment-publish-detail">
                      <div className="deployment-header-title">
                        {!projectLoading ? (
                          selectedProject?.name
                        ) : (
                          <Skeleton width={400} duration={2} />
                        )}
                      </div>

                      <div className="deployment-header-description">
                        {!projectLoading ? (
                          <>Last updated at {lastPublishedDate}</>
                        ) : (
                          <Skeleton width={400} duration={2} />
                        )}
                      </div>
                    </div>
                    {/* <div className="deployment-commit-details">
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
                      </div> */}
                    {/* <div className="protocol-tag-container">
                      {showProtocolTag(deployment?.configuration.protocol!)}
                    </div> */}
                  </div>
                  {/* <div className="deployment-time-details">
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
                  </div> */}
                </div>
              </>
              {/* {type === "skeleton" && (
                <>
                  <div className="deployment-left">
                    <Skeleton height={100} width={190} duration={2} />
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
                </>
              )} */}
            </div>
            <div className="delete-org-confirm-container">
              <span className="confirm-checkbox">
                <input
                  type="checkbox"
                  // checked={deleteConfirmed}
                  // onChange={(e) => setDeleteConfirmed(!deleteConfirmed)}
                />
              </span>
              <span>I confirm that I want to archive this project</span>
            </div>
            <div className="settings-project-footer delete-containers">
              <div className="warning-text-container">
                <span className="exclamation-icon">
                  <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                </span>
                <span>Please confirm and click archive to archive your project</span>
              </div>
              <button
                type="button"
                className="primary-button delete-button"
                // disabled={!deleteConfirmed}
                // onClick={deleteOrg}
              >
                Archive
              </button>
            </div>
            {/* <div className="archive-button-container">
              <button
                type="button"
                className="primary-button archive-button"
                // disabled={!deleteConfirmed}
                // onClick={deleteOrg}
              >
                Archive
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneral;
