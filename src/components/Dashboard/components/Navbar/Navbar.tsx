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
                  location.pathname.indexOf("site") !== -1 ? "selected" : ""
                }`}
                to="/site"
              >
                Sites
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
