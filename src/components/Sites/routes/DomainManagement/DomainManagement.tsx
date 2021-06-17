import React from "react";
import "./DomainManagement.scss";
import { ProjectTopCard } from "../_SharedComponent";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";
import {
  DomainGeneral,
  HandshakeDomainGeneral,
  HandshakeSubdomainGeneral,
  SubdomainGeneral,
} from "./routes";

const DomainManagement = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams<any>();

  const urls = location.pathname.split("/");
  const lastPath = urls[urls.length - 1];

  return (
    <div className="DomainManagement">
      <ProjectTopCard />
      <div className="domain-management-container">
        <div className="domain-management-left-side-bar">
          <div
            className={`domain-management-bar-item ${
              lastPath === "domains" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/domain/domains`,
              )
            }
          >
            Domains
          </div>
          <div
            className={`domain-management-bar-item ${
              lastPath === "subdomains" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/domain/subdomains`,
              )
            }
          >
            Subdomains
          </div>
          <div
            className={`domain-management-bar-item ${
              lastPath === "handshake-domain" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/domain/handshake-domain`,
              )
            }
          >
            HNS Domain
            <span className="item-badge">Beta</span>
          </div>
          <div
            className={`domain-management-bar-item ${
              lastPath === "handshake-subdomain" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/domain/handshake-subdomain`,
              )
            }
          >
            HNS Subdomain
            <span className="item-badge">Beta</span>
          </div>
        </div>
        <Route
          path="/org/:orgid/sites/:siteid/domain/domains"
          exact
          render={() => <DomainGeneral />}
        />
        <Route
          path="/org/:orgid/sites/:siteid/domain/subdomains"
          exact
          render={() => <SubdomainGeneral />}
        />
        <Route
          path="/org/:orgid/sites/:siteid/domain/handshake-domain"
          exact
          render={() => <HandshakeDomainGeneral />}
        />
        <Route
          path="/org/:orgid/sites/:siteid/domain/handshake-subdomain"
          exact
          render={() => <HandshakeSubdomainGeneral />}
        />
      </div>
    </div>
  );
};

export default DomainManagement;
