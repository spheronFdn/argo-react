import React, { useContext } from "react";
import "./SettingsGeneral.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { StateContext } from "../../../../../../hooks";
import moment from "moment";
import { IStateModel } from "../../../../../../model/hooks.model";

const SettingsGeneral = () => {
  const { selectedProject, projectLoading, selectedOrg } = useContext<IStateModel>(
    StateContext,
  );

  // const [repoName, setRepoName] = useState<string>("");
  // const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  // const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  const lastPublishedDate = moment(selectedProject?.updateDate).format(
    "MMM DD, YYYY hh:mm A",
  );

  const lastCreatedDate = moment(selectedProject?.createDate).format(
    "MMM DD, YYYY hh:mm A",
  );

  let displayGithubRepo = "";
  if (selectedProject) {
    displayGithubRepo = selectedProject.url.substring(
      19,
      selectedProject.url.length - 4,
    );
  }

  // useEffect(() => {
  //   if (selectedProject) {
  //     setRepoName(selectedProject.name);
  //   }
  // }, [selectedProject]);

  // useEffect(() => {
  //   if (selectedProject) {
  //     if (selectedProject.name !== repoName) {
  //       setIsDataChanged(true);
  //     } else {
  //       setIsDataChanged(false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedProject, repoName]);

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
                  {displayGithubRepo} (branch: master)
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
              // onClick={updateOrganization}
            >
              Save
            </button>
          </div> */}
        </div>
        {/* <div className="settings-project-details">
          <div className="settings-project-header delete-containers">
            Delete Project
          </div>
          <div className="settings-project-body">
            <div className="delete-org-container">
              This action will queue the removal of all your team's data, including:
              <br /> Deployments, Domains, Certificates.
            </div>
            <div className="delete-org-confirm-container">
              <span className="confirm-checkbox">
                <input
                  type="checkbox"
                  checked={deleteConfirmed}
                  onChange={(e) => setDeleteConfirmed(!deleteConfirmed)}
                />
              </span>
              <span>
                Confirm that I want to irreversibly delete the this project
              </span>
            </div>
          </div>
          <div className="settings-project-footer delete-containers">
            <div className="warning-text-container">
              <span className="exclamation-icon">
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              </span>
              <span>
                Please confirm and click delete to delete your organisation
              </span>
            </div>
            <button
              type="button"
              className="primary-button delete-button"
              disabled={!deleteConfirmed}
              // onClick={deleteOrg}
            >
              Delete
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SettingsGeneral;
