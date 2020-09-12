import React from "react";
import "./OrganizationDropdown.scss";
import IOrganizationDropdownProps from "./model";
import { OrganizationDropdownItem } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const OrganizationDropdown: React.FC<IOrganizationDropdownProps> = ({
  setShowDropdown,
}) => {
  return (
    <>
      <div
        className="organization-dropdown-overlay"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="organization-dropdown-box">
        <label>Teams</label>
        <OrganizationDropdownItem
          teamDetails={{
            name: "ArGoAppLive",
            avatar: "https://avatars1.githubusercontent.com/u/70075140?s=200&v=4",
          }}
        />
        <div className="create-team-item-container">
          <div className="create-team-item">
            <div className="create-team-title">Create a Team</div>
            <div className="create-team-icon">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationDropdown;
