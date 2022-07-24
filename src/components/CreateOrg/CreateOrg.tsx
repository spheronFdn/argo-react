import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { ActionContext } from "../../hooks";
import { ApiService } from "../../services";
import "./CreateOrg.scss";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function CreateOrg() {
  const history = useHistory();
  const { fetchUser } = useContext(ActionContext);

  const [orgName, setOrgName] = useState<string>("");
  const [orgUsername, setOrgUsername] = useState<string>("");
  const [orgAvatar, setOrgAvatar] = useState<string>("");
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [createOrgLoading, setCreateOrgLoading] = useState<boolean>(false);

  const fileUpload = (file: Blob) => {
    const reader: FileReader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => saveURL(reader);
  };

  const saveURL = async (reader: FileReader) => {
    setOrgAvatar(`${reader.result}`);
  };

  useEffect(() => {
    if (orgUsername && orgName) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [orgUsername, orgName]);

  const createOrg = () => {
    setCreateOrgLoading(true);
    const organization = {
      username: orgUsername,
      name: orgName,
      image: orgAvatar,
    };
    ApiService.createOrganization(organization).subscribe((res) => {
      setCreateOrgLoading(false);
      sessionStorage.setItem("selected-org-id", res.id);
      fetchUser(res.id);
      history.push("/dashboard");
    });
  };

  return (
    <div className="CreateOrg">
      <RootHeader parent={"CreateOrg"} />
      <main className="app-main">
        <div className="create-org-container">
          <div className="create-org-card">
            <div className="create-org-card-inner">
              <h1 className="create-org-title">Create a new organization</h1>
              <div className="create-org-form">
                <label className="create-org-form-title">Organization Name</label>
                <label className="create-org-form-subtitle">
                  This is your organization's visible name within ArGo. For example,
                  the name of your company or department. You can always change it
                  later if you need to.
                </label>
                <input
                  type="text"
                  className="create-org-form-input"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <div className="create-org-form">
                <label className="create-org-form-title">
                  Organization Username
                </label>
                <label className="create-org-form-subtitle">
                  This is your team’s username on ArGo. With it, your team can
                  inspect their projects, check out any recent activity, or configure
                  settings to their liking.
                </label>
                <input
                  type="text"
                  className="create-org-form-input"
                  value={orgUsername}
                  onChange={(e) => setOrgUsername(e.target.value)}
                />
              </div>
              <div className="create-org-form avatar-container">
                <div className="create-org-form-avatar-container">
                  <label className="create-org-form-title">
                    Organization Avatar
                  </label>
                  <label className="create-org-form-subtitle">
                    This is your organization's avatar.
                  </label>
                  <label className="create-org-form-subtitle">
                    Click on the avatar to upload a custom one from your files.
                  </label>
                  <label className="create-org-form-subtitle">
                    An avatar is optional but strongly recommended.
                  </label>
                </div>
                <div className="create-org-profile-avatar-image-container">
                  <input
                    type="file"
                    className="file-upload"
                    onChange={(e) =>
                      e.target.files ? fileUpload(e.target.files[0]) : undefined
                    }
                  />
                  <img
                    src={
                      orgAvatar
                        ? orgAvatar
                        : require("../../assets/svg/camera_grad.svg")
                    }
                    alt="avatar"
                    className="create-org-avatar"
                    height={82}
                    width={82}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="primary-button"
                  disabled={!isFormFilled || createOrgLoading}
                  onClick={createOrg}
                >
                  {createOrgLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
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
