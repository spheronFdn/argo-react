import React from "react";
import "./Navbar.scss";
import { Link, useLocation, useParams } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const param = useParams<any>();

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
                to={`/sites/${param.slug1}/overview`}
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("deployments") !== -1 ? "selected" : ""
                }`}
                to={`/sites/${param.slug1}/deployments`}
              >
                Deploys
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("domains") !== -1 ? "selected" : ""
                }`}
                to="/dashboard/domains"
              >
                Domains
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname.indexOf("settings") !== -1 ? "selected" : ""
                }`}
                to={`/sites/${param.slug1}/settings`}
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
