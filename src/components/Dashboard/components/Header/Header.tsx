import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Navbar } from "..";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <Link to="/">
              <img
                src={require("../../../../assets/png/logo-white.png")}
                alt="logo"
                className="logo-image"
              />
            </Link>
          </div>
          <div className="user-profile-container">
            <div>
              {/* <img
                src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
                alt="address-blockie"
                className="user-profile-blockie-icon"
              /> */}
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
