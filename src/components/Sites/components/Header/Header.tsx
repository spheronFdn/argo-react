import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Navbar } from "..";
import { UpDownArrow } from "../SVGIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { OrganizationDropdown, ProfileDropdown } from "./components";
import { StateContext } from "../../../../hooks";
import Skeleton from "react-loading-skeleton";
import { IStateModel } from "../../../../model/hooks.model";

const Header = () => {
  const { user, selectedOrg, userLoading, selectedProject } = useContext<
    IStateModel
  >(StateContext);

  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = React.useState(false);
  return (
    <header className="Header">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <div className="app-logo-container">
              <Link to="/">
                <img
                  src={require("../../../../assets/png/logo-white.png")}
                  alt="logo"
                  className="logo-image"
                />
              </Link>
            </div>
            <div className="teams-container">
              {!userLoading ? (
                <img
                  src={
                    selectedOrg?.profile.image
                      ? selectedOrg.profile.image
                      : "https://avatars1.githubusercontent.com/u/70075140?s=200&v=4"
                  }
                  alt="org"
                  className="team-avatar"
                ></img>
              ) : (
                <Skeleton circle={true} height={42} width={42} duration={2} />
              )}
              <h4 className="team-name">
                {!userLoading ? (
                  selectedOrg?.profile.name
                ) : (
                  <Skeleton width={60} duration={2} />
                )}
              </h4>
              <div
                className={`team-up-down-arrow ${
                  showOrgDropdown
                    ? "selected-team-arrow"
                    : userLoading
                    ? "disabled-team-arrow"
                    : ""
                }`}
                onClick={(e) => (!userLoading ? setShowOrgDropdown(true) : null)}
              >
                <UpDownArrow />
              </div>
            </div>
            <div className="teams-container">
              <h4 className="team-name">
                {!userLoading ? (
                  selectedProject?.name
                ) : (
                  <Skeleton width={60} duration={2} />
                )}
              </h4>
            </div>
          </div>
          <div className="user-profile-container">
            <div className="menu-container">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </div>
            <div
              className="profile-container"
              onClick={(e) => (!userLoading ? setShowProfileDropdown(true) : null)}
            >
              {!userLoading ? (
                <img
                  src={user?.argo_profile.avatar}
                  alt="address-blockie"
                  className={`user-profile-blockie-icon ${
                    showProfileDropdown ? "selected-profile" : ""
                  }`}
                />
              ) : (
                <Skeleton circle={true} height={42} width={42} duration={2} />
              )}
            </div>
          </div>
          {showProfileDropdown && (
            <ProfileDropdown setShowDropdown={setShowProfileDropdown} />
          )}
          {showOrgDropdown && (
            <OrganizationDropdown setShowDropdown={setShowOrgDropdown} />
          )}
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
