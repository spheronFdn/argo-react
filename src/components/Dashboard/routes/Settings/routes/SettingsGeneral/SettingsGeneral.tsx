import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
// import { useHistory } from "react-router-dom";
import { StateContext, ActionContext } from "../../../../../../hooks";
import { ApiService } from "../../../../../../services";
import "./SettingsGeneral.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { LazyLoadedImage } from "../../../../../_SharedComponents";

const SettingsGeneral = () => {
  // const history = useHistory();
  const { selectedOrg, orgLoading } = useContext(StateContext);
  const { fetchUser } = useContext(ActionContext);

  const [orgUsername, setOrgUsername] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [orgAvatar, setOrgAvatar] = useState<string>("");
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  // const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedOrg) {
      setOrgUsername(selectedOrg.profile.username);
      setOrgName(selectedOrg.profile.name);
      setOrgAvatar(selectedOrg.profile.image);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg) {
      if (
        selectedOrg.profile.username !== orgUsername ||
        selectedOrg.profile.name !== orgName ||
        selectedOrg.profile.image !== orgAvatar
      ) {
        setIsDataChanged(true);
      } else {
        setIsDataChanged(false);
      }
    }
  }, [selectedOrg, orgUsername, orgName, orgAvatar]);

  const fileUpload = (file: Blob) => {
    const reader: FileReader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => saveURL(reader);
  };

  const saveURL = async (reader: FileReader) => {
    setOrgAvatar(`${reader.result}`);
  };

  const updateOrganization = () => {
    if (selectedOrg) {
      setUpdateLoading(true);
      const org = {
        username: orgUsername,
        name: orgName,
        image: orgAvatar,
      };

      ApiService.updateOrganization(`${selectedOrg?._id}`, org).subscribe(
        (result) => {
          setUpdateLoading(false);
          fetchUser();
        },
      );
    }
  };

  // const deleteOrg = () => {
  //   if (selectedOrg && deleteConfirmed) {
  //     setDeleteLoading(true);
  //     ApiService.deleteOrganization((selectedOrg as any)._id).subscribe((result) => {
  //       setDeleteLoading(false);
  //       fetchUser();
  //       history.push("/dashboard");
  //     });
  //   }
  // };
  return (
    <div className="OrgSettingsGeneral">
      <div className="settings-right-container">
        <div className="settings-profile-details">
          <div className="settings-profile-header">Organisation Details</div>
          <div className="settings-profile-body">
            <div className="settings-profile-item">
              <label className="settings-profile-item-title">
                Organisation Username
              </label>
              <label className="settings-profile-item-subtitle">
                This is your organization username.
              </label>
              {!orgLoading ? (
                <input
                  type="text"
                  placeholder="e.g. argoapp-live"
                  className="settings-profile-item-input"
                  value={orgUsername}
                  onChange={(e) => setOrgUsername(e.target.value)}
                />
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-profile-item">
              <label className="settings-profile-item-title">
                Organisation Name
              </label>
              <label className="settings-profile-item-subtitle">
                Please enter your team's name, or a display name you are comfortable
                with.
              </label>
              {!orgLoading ? (
                <input
                  type="text"
                  placeholder="e.g. ArGo Team"
                  className="settings-profile-item-input"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            {/* <div className="settings-profile-item">
                <label className="settings-profile-item-title">Your Email</label>
                <label className="settings-profile-item-subtitle">
                  This is your email address connected with the OAuth provider. We
                  don't allow it to be edited as of now.
                </label>
                <input
                  type="text"
                  placeholder="e.g. jthely"
                  className="settings-profile-item-input"
                />
              </div> */}
            <div className="settings-profile-item avatar-container">
              <div className="settings-profile-item-avatar-container">
                <label className="settings-profile-item-title">
                  Organisation Avatar
                </label>
                <label className="settings-profile-item-subtitle">
                  This is your organisation's avatar.
                </label>
                <label className="settings-profile-item-subtitle">
                  Click on the avatar to upload a custom one from your files.
                </label>
              </div>
              <div className="settings-profile-avatar-image-container">
                {!orgLoading ? (
                  <>
                    <input
                      type="file"
                      className="file-upload"
                      onChange={(e) =>
                        e.target.files ? fileUpload(e.target.files[0]) : undefined
                      }
                    />
                    <LazyLoadedImage height={64} once>
                      <img
                        src={
                          orgAvatar
                            ? orgAvatar
                            : require("../../../../../../assets/svg/camera_grad.svg")
                        }
                        alt="avatar"
                        className="settings-avatar"
                        height={64}
                        width={64}
                        loading="lazy"
                      />
                    </LazyLoadedImage>
                  </>
                ) : (
                  <Skeleton circle={true} height={64} width={64} duration={2} />
                )}
              </div>
            </div>
          </div>
          <div className="settings-profile-footer">
            <div className="warning-text-container">
              <span className="exclamation-icon">
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              </span>
              <span>Click save to update your organisation</span>
            </div>
            <button
              type="button"
              className="primary-button"
              disabled={orgLoading || !isDataChanged}
              onClick={updateOrganization}
            >
              {updateLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
              Save
            </button>
          </div>
        </div>
        {/* <div className="settings-profile-details">
          <div className="settings-profile-header delete-containers">
            Delete Organisation
          </div>
          <div className="settings-profile-body">
            <div className="delete-org-container">
              This action will queue the removal of all your team's data, including:
              <br /> Deployments, Member associations, Activity, Aliases, Domains,
              Certificates and your Billing subscription.
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
                Confirm that I want to irreversibly delete the team{" "}
                {selectedOrg?.profile.name}
              </span>
            </div>
          </div>
          <div className="settings-profile-footer delete-containers">
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
              className="delete-button"
              disabled={!deleteConfirmed}
              onClick={deleteOrg}
            >
              {deleteLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
              Delete
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SettingsGeneral;
