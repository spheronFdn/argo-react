import React from "react";
import "./OrganizationDropdownItem.scss";
import { IOrganizationDropdownItemProps } from "./model";
import { LazyLoadedImage } from "../../../../..";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCog } from "@fortawesome/free-solid-svg-icons";

const OrganizationDropdownItem: React.FC<IOrganizationDropdownItemProps> = ({
  orgDetails,
  onClick,
}) => {
  return (
    <div className="organization-dropdown-item" onClick={onClick}>
      <div className="organization-dropdown-item-avatar">
        <LazyLoadedImage height={24} once>
          <img
            src={orgDetails.avatar}
            alt="org"
            className="team-avatar"
            height={24}
            width={24}
            loading="lazy"
          />
        </LazyLoadedImage>
      </div>
      <div className="organization-dropdown-item-title">{orgDetails.name}</div>
      {/* <div className="organization-dropdown-item-settings">
        <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
      </div> */}
    </div>
  );
};

export default OrganizationDropdownItem;
