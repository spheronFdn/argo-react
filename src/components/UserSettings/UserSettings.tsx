import React, { useContext, useEffect, useState } from "react";
import { RootHeader } from "..";
import "./UserSettings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDetailsCard } from "./components";
import { ActionContext, StateContext } from "../../hooks";
import Skeleton from "react-loading-skeleton";
import { ApiService } from "../../services";
import { useHistory } from "react-router-dom";

function UserSettings() {
  const history = useHistory();

  const { user, userLoading } = useContext(StateContext);
  const { fetchUser } = useContext(ActionContext);

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<string>("");
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUsername(user.argo_profile.username);
      setName(user.argo_profile.name);
      setEmail(user.argo_profile.email ? user.argo_profile.email : undefined);
      setAvatar(user.argo_profile.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (
        user.argo_profile.username !== username ||
        user.argo_profile.name !== name ||
        user.argo_profile.avatar !== avatar
      ) {
        setIsDataChanged(true);
      } else {
        setIsDataChanged(false);
      }
    }
  }, [avatar, name, user, username]);

  const fileUpload = (file: any) => {
    const reader: FileReader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => saveURL(reader);
  };

  const saveURL = async (reader: FileReader) => {
    setAvatar(`${reader.result}`);
  };

  const updateProfile = () => {
    const profile = {
      ...user?.argo_profile,
      username,
      name,
      avatar,
    };

    ApiService.updateProfile(profile).subscribe((result) => {
      fetchUser();
    });
  };

  const deleteUser = () => {
    if (user && deleteConfirmed) {
      ApiService.deleteProfile((user as any)._id).subscribe((result) => {
        localStorage.removeItem("jwt-token");
        history.push("/signup");
      });
    }
  };

  return (
    <div className="UserSettings">
      <RootHeader parent={"UserSettings"} />
      <main className="app-main">
        <div className="user-settings-container">
          <UserDetailsCard />
          <div className="settings-container">
            <div className="settings-left-side-bar">
              <div className="settings-bar-item selected">General</div>
              <div className="settings-bar-item">OAuth</div>
              <div className="settings-bar-item">Git Integration</div>
              <div className="settings-bar-item">Billing</div>
              <div className="settings-bar-item">Tokens</div>
            </div>
            <div className="settings-right-container">
              <div className="settings-profile-details">
                <div className="settings-profile-header">Profile Details</div>
                <div className="settings-profile-body">
                  <div className="settings-profile-item">
                    <label className="settings-profile-item-title">
                      Your Username
                    </label>
                    <label className="settings-profile-item-subtitle">
                      This is your ArGo username taken from OAuth provider.
                    </label>
                    {!userLoading ? (
                      <input
                        type="text"
                        className="settings-profile-item-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    ) : (
                      <Skeleton width={326} height={36} duration={2} />
                    )}
                  </div>
                  <div className="settings-profile-item">
                    <label className="settings-profile-item-title">Your Name</label>
                    <label className="settings-profile-item-subtitle">
                      Please enter your name, or a display name you are comfortable
                      with.
                    </label>
                    {!userLoading ? (
                      <input
                        type="text"
                        className="settings-profile-item-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <Skeleton width={326} height={36} duration={2} />
                    )}
                  </div>
                  <div className="settings-profile-item">
                    <label className="settings-profile-item-title">Your Email</label>
                    <label className="settings-profile-item-subtitle">
                      This is your email address connected with the OAuth provider.
                      We don't allow it to be edited as of now.
                    </label>
                    {!userLoading ? (
                      <input
                        type="text"
                        className="settings-profile-item-input"
                        value={email}
                        disabled
                      />
                    ) : (
                      <Skeleton width={326} height={36} duration={2} />
                    )}
                  </div>
                  <div className="settings-profile-item avatar-container">
                    <div className="settings-profile-item-avatar-container">
                      <label className="settings-profile-item-title">
                        Your Avatar
                      </label>
                      <label className="settings-profile-item-subtitle">
                        This is your avatar taken from the OAuth provider.
                      </label>
                      <label className="settings-profile-item-subtitle">
                        Click on the avatar to upload a custom one from your files.
                      </label>
                    </div>
                    <div className="settings-profile-avatar-image-container">
                      {!userLoading ? (
                        <>
                          <input
                            type="file"
                            className="file-upload"
                            onChange={(e) =>
                              e.target.files
                                ? fileUpload(e.target.files[0])
                                : undefined
                            }
                          />
                          <img
                            src={
                              avatar
                                ? avatar
                                : require("../../assets/svg/camera_grad.svg")
                            }
                            alt="avatar"
                            className="settings-avatar"
                          />
                        </>
                      ) : (
                        <Skeleton
                          circle={true}
                          height={64}
                          width={64}
                          duration={2}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="settings-profile-footer">
                  <div className="warning-text-container">
                    <span className="exclamation-icon">
                      <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                    </span>
                    <span>Click save to update your profile</span>
                  </div>
                  <button
                    type="button"
                    className="primary-button"
                    disabled={userLoading || !isDataChanged}
                    onClick={updateProfile}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="settings-profile-details">
                <div className="settings-profile-header delete-containers">
                  Delete Your ArGo Account
                </div>
                <div className="settings-profile-body">
                  <div className="delete-org-container">
                    This action will queue the removal of all your Vercel account's
                    data, including:
                    <br /> Deployments, Activity, Aliases, Domains, Certificates and
                    your Billing subscription.
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
                      Confirm that I want to start the account deletion process for
                      the account <b>Prashant</b>.
                    </span>
                  </div>
                </div>
                <div className="settings-profile-footer delete-containers">
                  <div className="warning-text-container">
                    <span className="exclamation-icon">
                      <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                    </span>
                    <span>
                      Please confirm and click delete button to delete your profile.
                    </span>
                  </div>
                  <button
                    type="button"
                    className="primary-button delete-button"
                    disabled={!deleteConfirmed}
                    onClick={deleteUser}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserSettings;
