import React, { useState } from "react";
import "./DomainItem.scss";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DomainItem: React.FC<IDeploymentItemProps> = ({
  index,
  type,
  domain,
  isSubdomain,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDomainName, setEditDomainName] = useState<string>(domain);
  return (
    <div className="domain-item" key={index}>
      {type === "filled" &&
        (!editMode ? (
          <>
            <div className="domain-general-domain-item-header-container">
              <div className="domain-general-domain-item-header">
                <div className="domain-general-domain-item-header-left">
                  <a href={`https://${domain}`}>
                    {domain}
                    <span>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </span>
                  </a>
                </div>
                <div className="domain-general-domain-item-header-right">
                  <button className="edit-button" onClick={(e) => setEditMode(true)}>
                    Edit
                  </button>
                  <button className="remove-button">Remove</button>
                </div>
              </div>
            </div>
            <div className="domain-general-domain-item-body-container">
              <div className="domain-general-domain-item-body">
                {!isSubdomain ? (
                  <div className="domain-general-domain-item-body-item">
                    <h3>Domain Configuration</h3>
                    <p>
                      Set the following record on your DNS provider to configure your
                      domain:
                    </p>
                    <div className="configure-domain-records-table">
                      <div className="thead">
                        <div className="tr">
                          <div className="th">Type</div>
                          <div className="th">Name</div>
                          <div className="th">Value</div>
                        </div>
                      </div>
                      <div className="tbody">
                        <div className="tr">
                          <div className="td">A</div>
                          <div className="td">@</div>
                          <div className="td">76.76.21.21</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">arweavetx.mydomain.com</div>
                          <div className="td">
                            bW4dD3ozqGTADVGGHJF5DlXzCH3cj2mzV2Oc1h8cgQM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="domain-general-domain-item-body-item">
                    <h3>Subdomain Configuration</h3>
                    <p>
                      Set the following record on your DNS provider to configure your
                      subdomain:
                    </p>
                    <div className="configure-domain-records-table">
                      <div className="thead">
                        <div className="tr">
                          <div className="th">Type</div>
                          <div className="th">Name</div>
                          <div className="th">Value</div>
                        </div>
                      </div>
                      <div className="tbody">
                        <div className="tr">
                          <div className="td">CNAME</div>
                          <div className="td">subdomain.mydomain.com</div>
                          <div className="td">dns.perma.online</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">arweavetx.subdomain.mydomain.com</div>
                          <div className="td">
                            bW4dD3ozqGTADVGGHJF5DlXzCH3cj2mzV2Oc1h8cgQM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="domain-general-domain-item-edit">
            <div className="domain-general-domain-item-edit-container">
              <div className="domain-general-domain-item-edit-form">
                <span className="form-label">Domain</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="mywebsite.com"
                  value={editDomainName}
                  onChange={(e) => setEditDomainName(e.target.value)}
                />
              </div>
              <div className="domain-general-domain-item-edit-button">
                <button className="save-button">Save</button>
                <button
                  className="cancel-button"
                  onClick={(e) => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      {type === "skeleton" && (
        <>
          <div className="domain-general-domain-item-header-container">
            <div className="domain-general-domain-item-header">
              <div className="domain-general-domain-item-header-left">
                <Skeleton width={300} duration={2} />
              </div>
              <div className="domain-general-domain-item-header-right">
                <Skeleton width={120} duration={2} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DomainItem;
