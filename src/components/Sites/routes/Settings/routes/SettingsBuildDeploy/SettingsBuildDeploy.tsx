import React, { useContext, useEffect, useState } from "react";
import "./SettingsBuildDeploy.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { ApiService } from "../../../../../../services";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import BounceLoader from "react-spinners/BounceLoader";

const SettingsBuildDeploy = () => {
  const { selectedProject, projectLoading } = useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [packageManager, setPackageManager] = useState<string>("");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");
  // const [productionBranch, setProductionBranch] = useState<string>("");
  const [isDataChanged1, setIsDataChanged1] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  // const [isDataChanged2, setIsDataChanged2] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      setPackageManager(selectedProject.package_manager);
      setBuildCommand(selectedProject.build_command);
      setPublishDirectory(selectedProject.publish_dir);
      // setProductionBranch("master");
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      if (
        selectedProject.package_manager !== packageManager ||
        selectedProject.build_command !== buildCommand ||
        selectedProject.publish_dir !== publishDirectory
      ) {
        setIsDataChanged1(true);
      } else {
        setIsDataChanged1(false);
      }
      // if ("master" !== productionBranch) {
      //   setIsDataChanged2(true);
      // } else {
      //   setIsDataChanged2(false);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, packageManager, buildCommand, publishDirectory]);

  const updateProject = () => {
    if (selectedProject) {
      setUpdateLoading(true);
      const project = {
        package_manager: packageManager,
        build_command: buildCommand,
        publish_dir: publishDirectory,
        branch: selectedProject.branch,
      };

      ApiService.updateProject(`${selectedProject?._id}`, project).subscribe(
        (result) => {
          setUpdateLoading(false);
          fetchProject(`${selectedProject?._id}`);
        },
      );
    }
  };
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
  if (selectedProject?.framework === "static") {
    framework = "No Framework - Simple JavaScript App";
  } else if (selectedProject?.framework === "react") {
    framework = "Create React App";
  } else if (selectedProject?.framework === "vue") {
    framework = "Vue App";
  } else if (selectedProject?.framework === "angular") {
    framework = "Angular App";
  } else if (selectedProject?.framework === "next") {
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
                <div className="settings-project-value">{selectedProject?.url}</div>
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
            {selectedProject?.framework !== "static" && (
              <>
                {selectedProject?.framework !== "next" ? (
                  <div className="settings-project-item">
                    <label className="settings-project-item-title">
                      Package Manager
                    </label>
                    <label className="settings-project-item-subtitle">
                      This is your project's package manager. You can use any one of
                      them to deploy your project.
                    </label>
                    {!projectLoading ? (
                      <div className="deploy-site-item-select-container">
                        <select
                          className="deploy-site-item-select"
                          value={packageManager}
                          onChange={(e) => setPackageManager(e.target.value)}
                        >
                          <option value="npm">NPM</option>
                          <option value="yarn">YARN</option>
                        </select>
                        <span className="select-down-icon">
                          <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                      </div>
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
                      {selectedProject?.framework !== "next" ? (
                        <>
                          <input
                            type="text"
                            className="settings-project-item-input-disabled"
                            value={buildCommandPrefix}
                            disabled
                          />
                          <input
                            type="text"
                            className="settings-project-item-input-build"
                            value={buildCommand}
                            onChange={(e) => setBuildCommand(e.target.value)}
                          />
                        </>
                      ) : (
                        <input
                          type="text"
                          className="settings-project-item-input"
                          value={buildCommand}
                          onChange={(e) => setBuildCommand(e.target.value)}
                        />
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
                    <input
                      type="text"
                      className="settings-project-item-input"
                      value={publishDirectory}
                      onChange={(e) => setPublishDirectory(e.target.value)}
                    />
                  ) : (
                    <Skeleton width={326} height={36} duration={2} />
                  )}
                </div>
              </>
            )}
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
              disabled={projectLoading || !isDataChanged1}
              onClick={updateProject}
            >
              {updateLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
              Save
            </button>
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
