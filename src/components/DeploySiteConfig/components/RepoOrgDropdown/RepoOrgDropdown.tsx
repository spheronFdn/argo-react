import React from "react";
import "./RepoOrgDropdown.scss";
import IRepoOrgDropdownProps from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
            <img
              src={owner.avatar}
              alt="camera"
              className="dropdown-item-org-avatar"
            />
            <span className="dropdown-item-org-name">{owner.name}</span>
            {selectedRepoOwner.name === owner.name && (
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RepoOrgDropdown;
