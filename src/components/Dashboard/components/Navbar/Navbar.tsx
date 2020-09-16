import React from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="NavBar">
      <div className="navigation-container">
        <div className="navbar-container">
          <ul className="nav">
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("overview") !== -1 ? "selected" : ""
                }`}
                to="/dashboard/overview"
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("domains") !== -1 ? "selected" : ""
                }`}
                to="/dashboard/domains"
              >
                Domains
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("members") !== -1 ? "selected" : ""
                }`}
                to="/dashboard/members"
              >
                Members
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("settings") !== -1 ? "selected" : ""
                }`}
                to="/dashboard/settings"
              >
                Settings
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link>Builds</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("billing") !== -1 ? "selected" : ""
                }`}
                to="/billing"
              >
                Billing
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
