import React, { useContext } from "react";
import "./OrganizationDropdown.scss";
import IOrganizationDropdownProps from "./model";
import { OrganizationDropdownItem } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { ActionContext, StateContext } from "../../../../../hooks";
import { IActionModel, IOrganization } from "../../../../../model/hooks.model";

const OrganizationDropdown: React.FC<IOrganizationDropdownProps> = ({
  setShowDropdown,
}) => {
  const history = useHistory();

  const { setSelectedOrganization } = useContext<IActionModel>(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <>
      <div
        className="organization-dropdown-overlay"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="organization-dropdown-box">
        <label>Teams</label>
        {user?.organizations?.map((org: IOrganization, index: number) => (
          <OrganizationDropdownItem
            orgDetails={{
              name: org.profile.name,
              avatar: org.profile.image
                ? org.profile.image
                : require("../../../../../assets/png/default_icon.png"),
            }}
            key={index}
            onClick={(e: Event) => {
              setSelectedOrganization(org);
              // history.push("/dashboard");
              setShowDropdown(false);
            }}
          />
        ))}
        <div
          className="create-team-item-container"
          onClick={(e) => history.push("/org/new")}
        >
          <div className="create-team-item">
            <div className="create-team-title">Create a Organization</div>
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
