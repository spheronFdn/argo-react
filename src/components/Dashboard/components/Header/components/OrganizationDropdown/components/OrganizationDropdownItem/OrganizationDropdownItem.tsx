import React from "react";
import "./OrganizationDropdownItem.scss";
import { IOrganizationDropdownItemProps } from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const OrganizationDropdownItem: React.FC<IOrganizationDropdownItemProps> = ({
  teamDetails,
}) => {
  return (
    <div className="organization-dropdown-item">
      <div className="organization-dropdown-item-avatar">
        <img src={teamDetails.avatar} alt="org" className="team-avatar"></img>
      </div>
      <div className="organization-dropdown-item-title">{teamDetails.name}</div>
      <div className="organization-dropdown-item-settings">
        <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default OrganizationDropdownItem;
