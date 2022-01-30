import React, { useContext } from "react";
import "./Header.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import { LazyLoadedImage, Navbar } from "..";
import { UpDownArrow } from "../SVGIcons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { OrganizationDropdown, ProfileDropdown } from "./components";
import { ActionContext, StateContext } from "../../../hooks";
import Skeleton from "react-loading-skeleton";
import { IActionModel, IStateModel } from "../../../model/hooks.model";
import IHeaderProps from "./model";

const Header: React.FC<IHeaderProps> = ({ parent }) => {
  const history = useHistory();
  const params = useParams<any>();
  const {
    user,
    selectedOrg,
    userLoading,
    selectedProject,
    orgLoading,
    projectLoading,
  } = useContext<IStateModel>(StateContext);
  const { fetchUser } = useContext<IActionModel>(ActionContext);

  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = React.useState(false);
  return (
    <header className="Header">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <div className="app-logo-container">
              <Link to="/" onClick={(e) => fetchUser(selectedOrg?._id)}>
                <img
                  src={require("../../../assets/png/logo-white.png")}
                  alt="logo"
                  className="logo-image"
                  height={32}
                  loading="lazy"
                />
                <span className="logo-badge">Beta</span>
              </Link>
            </div>
            <div className="teams-container">
              {!orgLoading ? (
                <LazyLoadedImage height={36} once>
                  <img
                    src={
                      selectedOrg?.profile?.image
                        ? selectedOrg.profile?.image
                        : require("../../../assets/png/default_icon.png")
                    }
                    alt="org"
                    className="team-avatar"
                    onClick={(e) => {
                      fetchUser(selectedOrg?._id);
                      history.push("/dashboard");
                    }}
                    height={36}
                    width={36}
                    loading="lazy"
                  />
                </LazyLoadedImage>
              ) : (
                <Skeleton circle={true} height={42} width={42} duration={2} />
              )}
              <h4
                className="team-name"
                onClick={(e) => {
                  fetchUser(selectedOrg?._id);
                  history.push("/dashboard");
                }}
              >
                {!orgLoading ? (
                  selectedOrg?.profile?.name ? (
                    selectedOrg?.profile?.name
                  ) : (
                    "N.A"
                  )
                ) : (
                  <Skeleton width={60} duration={2} />
                )}
              </h4>
              <div
                className={`team-up-down-arrow ${
                  showOrgDropdown
                    ? "selected-team-arrow"
                    : orgLoading
                    ? "disabled-team-arrow"
                    : ""
                }`}
                onClick={(e) => (!orgLoading ? setShowOrgDropdown(true) : null)}
              >
                <UpDownArrow />
              </div>
            </div>
            {parent === "sites" && (
              <div className="teams-container">
                <h4
                  className={`team-name ${!projectLoading ? "project-name" : ""}`}
                  onClick={(e) =>
                    history.push(
                      `/org/${params.orgid}/sites/${params.slug1}/overview`,
                    )
                  }
                >
                  {!projectLoading ? (
                    selectedProject?.name
                  ) : (
                    <Skeleton width={140} duration={2} />
                  )}
                </h4>
              </div>
            )}
          </div>
          <div className="user-profile-container">
            {/* <div className="menu-container">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </div> */}
            <a
              href="https://docs.spheron.network"
              target="_blank"
              rel="noopener noreferrer"
              className="link-container"
            >
              Docs
            </a>
            <div
              className="profile-container"
              onClick={(e) => (!userLoading ? setShowProfileDropdown(true) : null)}
            >
              {!userLoading ? (
                <LazyLoadedImage height={42} once>
                  <img
                    src={user?.argoProfile?.avatar}
                    alt="address-blockie"
                    className={`user-profile-blockie-icon ${
                      showProfileDropdown ? "selected-profile" : ""
                    }`}
                    height={42}
                    width={42}
                    loading="lazy"
                  />
                </LazyLoadedImage>
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
        <Navbar parent={parent} />
      </div>
    </header>
  );
};

export default Header;
