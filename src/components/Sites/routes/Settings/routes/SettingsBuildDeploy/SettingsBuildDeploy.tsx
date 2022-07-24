import React, { useContext, useEffect, useState } from "react";
import "./SettingsBuildDeploy.scss";
import Skeleton from "react-loading-skeleton";
import { StateContext } from "../../../../../../hooks";
import { IStateModel } from "../../../../../../model/hooks.model";

const SettingsBuildDeploy = () => {
  const { selectedProject, projectLoading } = useContext<IStateModel>(StateContext);

  const [packageManager, setPackageManager] = useState<string>("");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");

  useEffect(() => {
    if (selectedProject) {
      setPackageManager(
        selectedProject?.latestDeployment?.configuration.packageManager
          ? selectedProject?.latestDeployment?.configuration.packageManager
          : "",
      );
      setBuildCommand(
        selectedProject?.latestDeployment?.configuration.buildCommand
          ? selectedProject?.latestDeployment?.configuration.buildCommand
          : "",
      );
      setPublishDirectory(
        selectedProject?.latestDeployment?.configuration.publishDir
          ? selectedProject?.latestDeployment?.configuration.publishDir
          : "",
      );
      // setProductionBranch("master");
    }
  }, [selectedProject]);

  // useEffect(() => {
  //   if (selectedProject) {
  //     if (
  //       selectedProject?.latestDeployment?.configuration.packageManager !==
  //         packageManager ||
  //       selectedProject?.latestDeployment?.configuration.buildCommand !==
  //         buildCommand ||
  //       selectedProject?.latestDeployment?.configuration.publishDir !==
  //         publishDirectory
  //     ) {
  //       setIsDataChanged1(true);
  //     } else {
  //       setIsDataChanged1(false);
  //     }
  //     // if ("master" !== productionBranch) {
  //     //   setIsDataChanged2(true);
  //     // } else {
  //     //   setIsDataChanged2(false);
  //     // }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedProject, packageManager, buildCommand, publishDirectory]);

  // const updateProject = () => {
  //   if (selectedProject) {
  //     setUpdateLoading(true);
  //     const project = {
  //       package_manager: packageManager,
  //       build_command: buildCommand,
  //       publish_dir: publishDirectory,
  //       branch: selectedProject?.latestDeployment?.configuration.branch,
  //     };

  //     ApiService.updateProject(`${selectedProject?._id}`, project).subscribe(
  //       (result) => {
  //         setUpdateLoading(false);
  //         fetchProject(`${selectedProject?._id}`);
  //       },
  //     );
  //   }
  // };
  // };

  // const deleteOrg = () => {
  //   if (selectedOrg && deleteConfirmed) {
  //     ApiService.deleteOrganization((selectedOrg as any)._id).subscribe((result) => {
  //       fetchUser();
  //       history.push("/dashboard");
  //     });
  //   }
  // };

  let buildCommandPrefix: string = "";
  if (packageManager === "npm") {
    buildCommandPrefix = "npm run";
  } else {
    buildCommandPrefix = "yarn";
  }

  let framework: string = "";
  const foundFrameworks = selectedProject?.latestDeployment?.configuration.framework;
  if (foundFrameworks === "static") {
    framework = "No Framework - Simple JavaScript App";
  } else if (foundFrameworks === "react") {
    framework = "Create React App";
  } else if (foundFrameworks === "vue") {
    framework = "Vue App";
  } else if (foundFrameworks === "angular") {
    framework = "Angular App";
  } else if (foundFrameworks === "next") {
    framework = "Next.js App";
  } else {
    framework = "N.A";
  }

  return (
    <div className="SettingsBuildDeploy">
      <div className="settings-right-container">
        <div className="settings-project-details">
          <div className="settings-project-header">Build Settings</div>
          <div className="settings-project-body">
            <div className="settings-project-item">
              <label className="settings-project-item-title">Repository</label>
              <label className="settings-project-item-subtitle">
                This is your project repository.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">
                  {selectedProject?.githubUrl}
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">Framework</label>
              <label className="settings-project-item-subtitle">
                This is your project framework.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">{framework}</div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            {selectedProject?.latestDeployment?.configuration.framework !==
              "static" && (
              <>
                {selectedProject?.latestDeployment?.configuration.framework !==
                "next" ? (
                  <div className="settings-project-item">
                    <label className="settings-project-item-title">
                      Package Manager
                    </label>
                    <label className="settings-project-item-subtitle">
                      This is your project's package manager. You can use any one of
                      them to deploy your project.
                    </label>
                    {!projectLoading ? (
                      <div className="settings-project-value">{packageManager}</div>
                    ) : (
                      <Skeleton width={326} height={36} duration={2} />
                    )}
                  </div>
                ) : null}
                <div className="settings-project-item">
                  <label className="settings-project-item-title">
                    Build Command
                  </label>
                  <label className="settings-project-item-subtitle">
                    This is your project's build command.
                  </label>
                  {!projectLoading ? (
                    <div className="settings-project-item-input-container">
                      {selectedProject?.latestDeployment?.configuration.framework !==
                      "next" ? (
                        <>
                          <div className="settings-project-value">
                            {buildCommandPrefix} {buildCommand}
                          </div>
                        </>
                      ) : (
                        <div className="settings-project-value">{buildCommand}</div>
                      )}
                    </div>
                  ) : (
                    <Skeleton width={326} height={36} duration={2} />
                  )}
                </div>
                <div className="settings-project-item">
                  <label className="settings-project-item-title">
                    Publish directory
                  </label>
                  <label className="settings-project-item-subtitle">
                    This is the project's publish directory
                  </label>
                  {!projectLoading ? (
                    <div className="settings-project-value">{publishDirectory}</div>
                  ) : (
                    <Skeleton width={326} height={36} duration={2} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className="settings-project-details">
          <div className="settings-project-header">Deploy Contexts</div>
          <div className="settings-project-body">
            <div className="settings-project-item">
              <label className="settings-project-item-title">
                Production branch
              </label>
              <label className="settings-project-item-subtitle">
                This is your project's production branch.
              </label>
              {!projectLoading ? (
                <div className="deploy-site-item-select-container">
                  <select className="deploy-site-item-select">
                    <option value="master">master</option>
                  </select>
                  <span className="select-down-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
          </div>
          <div className="settings-project-footer">
            <div className="warning-text-container">
              <span className="exclamation-icon">
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              </span>
              <span>Click save to update your organisation</span>
            </div>
            <button
              type="button"
              className="primary-button"
              disabled={projectLoading || !isDataChanged2}
              // onClick={updateOrganization}
            >
              Save
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SettingsBuildDeploy;
