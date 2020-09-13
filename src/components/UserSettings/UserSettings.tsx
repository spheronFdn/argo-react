import React from "react";
import { RootHeader } from "..";
import "./UserSettings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDetailsCard } from "./components";

function UserSettings() {
  return (
    <div className="UserSettings">
      <RootHeader />
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
                    <input type="text" className="settings-profile-item-input" />
                  </div>
                  <div className="settings-profile-item">
                    <label className="settings-profile-item-title">Your Name</label>
                    <label className="settings-profile-item-subtitle">
                      Please enter your name, or a display name you are comfortable
                      with.
                    </label>
                    <input type="text" className="settings-profile-item-input" />
                  </div>
                  <div className="settings-profile-item">
                    <label className="settings-profile-item-title">Your Email</label>
                    <label className="settings-profile-item-subtitle">
                      This is your email address connected with the OAuth provider.
                      We don't allow it to be edited as of now.
                    </label>
                    <input type="text" className="settings-profile-item-input" />
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
                      <input type="file" className="file-upload" />
                      <img
                        src="https://avatars0.githubusercontent.com/u/18068841?v=4"
                        alt="avatar"
                        className="settings-avatar"
                      />
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
                  <button type="button" className="primary-button">
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
                      <input type="checkbox" />
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
                  <button type="button" className="primary-button delete-button">
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
