import React, { useContext, useEffect, useState } from "react";
import "./SettingsBuildDeploy.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { StateContext } from "../../../../../../hooks";

const SettingsBuildDeploy = () => {
  const { selectedProject, projectLoading } = useContext(StateContext);

  const [packageManager, setPackageManager] = useState<string>("");
  const [productionBranch, setProductionBranch] = useState<string>("");
  const [isDataChanged1, setIsDataChanged1] = useState<boolean>(false);
  const [isDataChanged2, setIsDataChanged2] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      setPackageManager("NPM");
      setProductionBranch("master");
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      if ("NPM" !== packageManager) {
        setIsDataChanged1(true);
      } else {
        setIsDataChanged1(false);
      }
      if ("master" !== productionBranch) {
        setIsDataChanged2(true);
      } else {
        setIsDataChanged2(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, packageManager]);

  // const updateOrganization = () => {
  //   if (selectedProject) {
  //     const org = {
  //       username: orgUsername,
  //       name: orgName,
  //       image: orgAvatar,
  //     };

  //     ApiService.updateOrganization(`${selectedOrg?._id}`, org).subscribe(
  //       (result) => {
  //         // eslint-disable-next-line no-console
  //         console.log(result);
  //         fetchUser();
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
                <div className="settings-project-value">Create React App</div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">Package Manager</label>
              <label className="settings-project-item-subtitle">
                This is your project's package manager. You can use any one of them
                to deploy your project.
              </label>
              {!projectLoading ? (
                <div className="deploy-site-item-select-container">
                  <select
                    className="deploy-site-item-select"
                    value={packageManager}
                    onChange={(e) => setPackageManager(e.target.value)}
                  >
                    <option value="NPM">NPM</option>
                    <option value="YARN">YARN</option>
                  </select>
                  <span className="select-down-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-project-item">
              <label className="settings-project-item-title">Build Command</label>
              <label className="settings-project-item-subtitle">
                This is your project's build command.
              </label>
              {!projectLoading ? (
                <div className="settings-project-value">yarn build</div>
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
                <div className="settings-project-value">dist</div>
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
              disabled={projectLoading || !isDataChanged1}
              // onClick={updateOrganization}
            >
              Save
            </button>
          </div>
        </div>
        <div className="settings-project-details">
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
        </div>
      </div>
    </div>
  );
};

export default SettingsBuildDeploy;
