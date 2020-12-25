import React, { useContext, useState } from "react";
import "./SubdomainGeneral.scss";
// import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "../../../../../../hooks";
import { IStateModel } from "../../../../../../model/hooks.model";
import { DomainItem } from "../../components";

const SubdomainGeneral = () => {
  const { projectLoading } = useContext<IStateModel>(StateContext);
  const [subdomainName, setSubdomainName] = useState<string>("");

  return (
    <div className="SubdomainGeneral">
      <div className="domain-general-right-container">
        <div className="domain-general-project-details">
          <div className="domain-general-project-header">Subdomains</div>
          <div className="domain-general-project-body">
            <div className="domain-general-project-item">
              <label className="domain-general-project-item-title">
                Custom Subdomains
              </label>
              <label className="domain-general-project-item-subtitle">
                By default, your site is always accessible via a arweave gateway
                based on transaction id. Custom subdomains allow you to access your
                site via one or more non-ArGo domain names.
              </label>
              {/* <a href="https://github.com/">
                Learn more about custom domains in our docs
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </a> */}
              <div className="domain-general-add-domain-container">
                <input
                  type="text"
                  className="add-domain-input"
                  placeholder="subdomain.mywebsite.com"
                  value={subdomainName}
                  onChange={(e) => setSubdomainName(e.target.value)}
                />
                <button className="add-domain-button" disabled={!subdomainName}>
                  Add
                </button>
              </div>
              <div className="domain-general-domain-list">
                {!projectLoading ? (
                  <DomainItem
                    index={1}
                    type="filled"
                    domain="subdomain.contactprashant.xyz"
                    isSubdomain={true}
                  />
                ) : (
                  <>
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domain=""
                      isSubdomain={true}
                    />
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domain=""
                      isSubdomain={true}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainGeneral;
