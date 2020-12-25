import React, { useContext, useState } from "react";
import "./DomainGeneral.scss";
// import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DomainItem } from "../../components";
import { StateContext } from "../../../../../../hooks";
import { IStateModel } from "../../../../../../model/hooks.model";

const DomainGeneral = () => {
  const { projectLoading } = useContext<IStateModel>(StateContext);
  const [domainName, setDomainName] = useState<string>("");

  return (
    <div className="DomainGeneral">
      <div className="domain-general-right-container">
        <div className="domain-general-project-details">
          <div className="domain-general-project-header">Domains</div>
          <div className="domain-general-project-body">
            <div className="domain-general-project-item">
              <label className="domain-general-project-item-title">
                Custom Domains
              </label>
              <label className="domain-general-project-item-subtitle">
                By default, your site is always accessible via arweave gateway based
                on transaction id. Custom domains allow you to access your site via
                one or more non-ArGo domain names.
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
                  placeholder="mywebsite.com"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                />
                <button className="add-domain-button" disabled={!domainName}>
                  Add
                </button>
              </div>
              <div className="domain-general-domain-list">
                {!projectLoading ? (
                  <DomainItem
                    index={1}
                    type="filled"
                    domain="contactprashant.xyz"
                    isSubdomain={false}
                  />
                ) : (
                  <>
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domain=""
                      isSubdomain={false}
                    />
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domain=""
                      isSubdomain={false}
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

export default DomainGeneral;
