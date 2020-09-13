import React from "react";
import "./Settings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  return (
    <div className="Settings">
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
            <div className="settings-profile-header">Organisation Details</div>
            <div className="settings-profile-body">
              <div className="settings-profile-item">
                <label className="settings-profile-item-title">
                  Organisation Username
                </label>
                <label className="settings-profile-item-subtitle">
                  This is your organization username taken from OAuth provider.
                </label>
                <input
                  type="text"
                  placeholder="e.g. argoapp-live"
                  className="settings-profile-item-input"
                />
              </div>
              <div className="settings-profile-item">
                <label className="settings-profile-item-title">
                  Organisation Name
                </label>
                <label className="settings-profile-item-subtitle">
                  Please enter your team's name, or a display name you are
                  comfortable with.
                </label>
                <input
                  type="text"
                  placeholder="e.g. ArGo Team"
                  className="settings-profile-item-input"
                />
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
                    This is your organisation's avatar taken from the OAuth provider.
                  </label>
                  <label className="settings-profile-item-subtitle">
                    Click on the avatar to upload a custom one from your files.
                  </label>
                </div>
                <div className="settings-profile-avatar-image-container">
                  <input type="file" className="file-upload" />
                  <img
                    src="https://avatars1.githubusercontent.com/u/70075140?s=200&v=4"
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
                <span>Click save to update your organisation</span>
              </div>
              <button type="button" className="primary-button">
                Save
              </button>
            </div>
          </div>
          <div className="settings-profile-details">
            <div className="settings-profile-header delete-containers">
              Delete Organisation
            </div>
            <div className="settings-profile-body">
              <div className="delete-org-container">
                This action will queue the removal of all your team's data,
                including:
                <br /> Deployments, Member associations, Activity, Aliases, Domains,
                Certificates and your Billing subscription.
              </div>
              <div className="delete-org-confirm-container">
                <span className="confirm-checkbox">
                  <input type="checkbox" />
                </span>
                <span>
                  Confirm that I want to irreversibly delete the team Argo Team
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
              <button type="button" className="primary-button delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
