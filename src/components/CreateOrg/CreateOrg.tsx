import React from "react";
import { useHistory } from "react-router-dom";
import { RootHeader } from "..";
import "./CreateOrg.scss";

function CreateOrg() {
  const history = useHistory();

  return (
    <div className="CreateOrg">
      <RootHeader />
      <main className="app-main">
        <div className="create-org-container">
          <div className="create-org-card">
            <div className="create-org-card-inner">
              <h1 className="create-org-title">Create a new organization</h1>
              <div className="create-org-form">
                <label className="create-org-form-title">
                  What’s your organization’s name?
                </label>
                <label className="create-org-form-subtitle">
                  This is your organization's visible name within ArGo. For example,
                  the name of your company or department. You can always change it
                  later if you need to.
                </label>
                <input type="text" className="create-org-form-input" />
              </div>
              <div className="create-org-form">
                <label className="create-org-form-title">
                  What’s your organization’s username?
                </label>
                <label className="create-org-form-subtitle">
                  This is your team’s username on ArGo. With it, your team can
                  inspect their projects, check out any recent activity, or configure
                  settings to their liking.
                </label>
                <input type="text" className="create-org-form-input" />
              </div>
              <div className="create-org-form avatar-container">
                <div className="create-org-form-avatar-container">
                  <label className="create-org-form-title">Your Avatar</label>
                  <label className="create-org-form-subtitle">
                    This is your team's avatar.
                  </label>
                  <label className="create-org-form-subtitle">
                    Click on the avatar to upload a custom one from your files.
                  </label>
                  <label className="create-org-form-subtitle">
                    An avatar is optional but strongly recommended.
                  </label>
                </div>
                <div className="create-org-profile-avatar-image-container">
                  <input type="file" className="file-upload" />
                  <img
                    src="https://avatars0.githubusercontent.com/u/18068841?v=4"
                    alt="avatar"
                    className="create-org-avatar"
                  />
                </div>
              </div>
              <div className="button-container">
                <button type="button" className="primary-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={(e) => history.goBack()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateOrg;
