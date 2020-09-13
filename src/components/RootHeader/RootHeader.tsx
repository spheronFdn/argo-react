import React from "react";
import "./RootHeader.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ProfileDropdown } from "./components";

const RootHeader = () => {
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  return (
    <header className="RootHeader">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <div className="app-logo-container">
              <Link to="/">
                <img
                  src={require("../../assets/png/logo-white.png")}
                  alt="logo"
                  className="logo-image"
                />
              </Link>
            </div>
          </div>
          <div className="user-profile-container">
            <div className="menu-container">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </div>
            <div
              className="profile-container"
              onClick={(e) => setShowProfileDropdown(true)}
            >
              <img
                src="https://avatars0.githubusercontent.com/u/18068841?v=4"
                alt="address-blockie"
                className={`user-profile-blockie-icon ${
                  showProfileDropdown ? "selected-profile" : ""
                }`}
              />
            </div>
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
