import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Navbar } from "..";
import { UpDownArrow } from "../SVGIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
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
              <img
                src="https://avatars1.githubusercontent.com/u/70075140?s=200&v=4"
                alt="org"
                className="team-avatar"
              ></img>
              <h4 className="team-name">ArGoAppLive</h4>
              <div className="team-up-down-arrow">
                <UpDownArrow />
              </div>
            </div>
          </div>
          <div className="user-profile-container">
            <div className="menu-container">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </div>
            <div
              className="profile-container"
              onClick={(e) => setShowDropdown(true)}
            >
              <img
                src="https://avatars0.githubusercontent.com/u/18068841?v=4"
                alt="address-blockie"
                className="user-profile-blockie-icon"
              />
            </div>
          </div>
          {showDropdown && (
            <div
              className="dropdown-overlay"
              onClick={(e) => setShowDropdown(false)}
            ></div>
          )}
          {showDropdown && (
            <div className="dropdown-box">
              <div className="dropdown-triangle"></div>
              <div className="dropdown-item">Dashboard</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
