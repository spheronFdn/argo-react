import React, { useContext } from "react";
import "./RootHeader.scss";
import { Link, useHistory } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { MenuDropdown, ProfileDropdown } from "./components";
import { StateContext } from "../../../hooks";
import Skeleton from "react-loading-skeleton";
import { IRootHeaderModel } from "./model";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadedImage } from "..";

const RootHeader: React.FC<IRootHeaderModel> = ({ parent }) => {
  const history = useHistory();
  const { user, userLoading } = useContext(StateContext);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = React.useState(false);
  return (
    <header className="RootHeader">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <div className="app-logo-container">
              <Link to="/">
                <img
                  src={require("../../../assets/png/logo_text.png")}
                  alt="logo"
                  className="logo-image"
                  height={32}
                  loading="lazy"
                />
                <span className="logo-badge">Beta</span>
              </Link>
            </div>
          </div>
          <div className="user-profile-container">
            {user || (parent !== "Login" && parent !== "Landing") ? (
              <>
                {/* <div className="menu-container">
                  <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                </div> */}
                <div
                  className="profile-container"
                  onClick={(e) =>
                    !userLoading ? setShowProfileDropdown(true) : null
                  }
                >
                  {!userLoading ? (
                    <LazyLoadedImage height={42} once>
                      <img
                        src={user?.argo_profile.avatar}
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
              </>
            ) : (
              <>
                <a
                  className={`login-container`}
                  href="https://discord.gg/ahxuCtm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
                <Link
                  className={`login-container ${
                    parent === "Login" ? "disable-login" : ""
                  }`}
                  to={`/login`}
                >
                  Login
                </Link>
                <button
                  type="button"
                  className="primary-button"
                  onClick={(e) => history.push("/signup")}
                >
                  Signup
                </button>
                <div
                  className="menu-button"
                  onClick={(e) => setShowMenuDropdown(true)}
                >
                  <FontAwesomeIcon icon={showMenuDropdown ? faTimes : faBars} />
                </div>
                {showMenuDropdown && (
                  <MenuDropdown setShowDropdown={setShowMenuDropdown} />
                )}
              </>
            )}
          </div>
          {showProfileDropdown && (
            <ProfileDropdown setShowDropdown={setShowProfileDropdown} />
          )}
        </div>
      </div>
    </header>
  );
};

export default RootHeader;
