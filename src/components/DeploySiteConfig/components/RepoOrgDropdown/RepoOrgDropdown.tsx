import React from "react";
import "./RepoOrgDropdown.scss";
import IRepoOrgDropdownProps from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import config from "../../../../config";
import { LazyLoadedImage } from "../../../_SharedComponents";

const RepoOrgDropdown: React.FC<IRepoOrgDropdownProps> = ({
  setShowDropdown,
  repoOwner,
  selectedRepoOwner,
  setSelectedRepoOwner,
}) => {
  return (
    <>
      <div
        className="dropdown-overlay-repo"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="dropdown-box-repo">
        {repoOwner.map((owner, index) => (
          <div
            className="dropdown-item"
            key={index}
            onClick={(e) => setSelectedRepoOwner(owner)}
          >
            <LazyLoadedImage height={32} once>
              <img
                src={owner.avatar}
                alt="camera"
                className="dropdown-item-org-avatar"
                height={32}
                width={32}
                loading="lazy"
              />
            </LazyLoadedImage>
            <span className="dropdown-item-org-name">{owner.name}</span>
            {selectedRepoOwner.name === owner.name && (
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </div>
        ))}
        <div
          className="dropdown-item top-border"
          key={repoOwner.length}
          onClick={(e) =>
            window.open(`${config.urls.API_URL}/github/app/new`, "_blank")
          }
        >
          <span className="dropdown-item-org-name">Add another Org</span>
        </div>
      </div>
    </>
  );
};

export default RepoOrgDropdown;
