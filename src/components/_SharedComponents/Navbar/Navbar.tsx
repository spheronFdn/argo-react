import React from "react";
import "./Navbar.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import INavbarProps from "./model";

const Navbar: React.FC<INavbarProps> = ({ parent }) => {
  const location = useLocation();
  const params = useParams<any>();

  return (
    <nav className="NavBar">
      <div className="navigation-container">
        <div className="navbar-container">
          {parent.toLowerCase() === "sites" ? (
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname.indexOf("overview") !== -1 ? "selected" : ""
                  }`}
                  to={`/org/${params.orgid}/sites/${params.slug1}/overview`}
                >
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname.indexOf("deployments") !== -1 ? "selected" : ""
                  }`}
                  to={`/org/${params.orgid}/sites/${params.slug1}/deployments`}
                >
                  Deploys
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname.indexOf("domain") !== -1 ? "selected" : ""
                  }`}
                  to={`/org/${params.orgid}/sites/${params.slug1}/domain`}
                >
                  Domain
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname.indexOf("nft") !== -1 ? "selected" : ""
                  }`}
                  to={`/org/${params.orgid}/sites/${params.slug1}/nft`}
                >
                  NFT
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname.indexOf("settings") !== -1 ? "selected" : ""
                  }`}
                  to={`/org/${params.orgid}/sites/${params.slug1}/settings`}
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
          ) : (
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
                    location.pathname.indexOf("wallet") !== -1 ? "selected" : ""
                  }`}
                  to="/dashboard/wallet"
                >
                  Wallet
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
