import React, { useContext, useEffect, useState } from "react";
import "./DomainItem.scss";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import { faChevronDown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";

const DomainItem: React.FC<IDeploymentItemProps> = ({
  index,
  type,
  domainId,
  domain,
  transactionId,
  isSubdomain,
}) => {
  const { projectLoading, selectedProject } = useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDomainLoading, setEditDomainLoading] = useState<boolean>(false);
  const [editDomainName, setEditDomainName] = useState<string>(domain);
  const [deployedSite, setDeployedSite] = useState<string>("");
  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((dep) => dep.sitePreview)
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

  useEffect(() => {
    if (domain) {
      setEditDomainName(domain);
    }
    if (transactionId) {
      setDeployedSite(`https://arweave.net/${transactionId}`);
    }
  }, [domain, transactionId]);

  const editDomainDetails = () => {
    setEditDomainLoading(true);
    const domain = {
      domainId,
      domain: editDomainName,
      transactionId: deployedSite.split("/")[deployedSite.split("/").length - 1],
    };
    if (!isSubdomain) {
      ApiService.editDomain(domain).subscribe((result) => {
        if (result.success) {
          setEditMode(false);
          setEditDomainName("");
          setDeployedSite("");
          fetchProject(`${selectedProject?._id}`);
        } else {
          setEditMode(false);
          setEditDomainName("");
          setDeployedSite("");
        }
        setEditDomainLoading(false);
      });
    } else {
      ApiService.editSubdomain(domain).subscribe((result) => {
        if (result.success) {
          setEditMode(false);
          setEditDomainName("");
          setDeployedSite("");
          fetchProject(`${selectedProject?._id}`);
        } else {
          setEditMode(false);
          setEditDomainName("");
          setDeployedSite("");
        }
        setEditDomainLoading(false);
      });
    }
  };

  const deleteDomain = () => {
    const domain = {
      domainId,
    };
    if (!isSubdomain) {
      ApiService.deleteDomain(domain).subscribe((result) => {
        if (result.success) {
          setEditDomainName("");
          setDeployedSite("");
          fetchProject(`${selectedProject?._id}`);
        } else {
          setEditDomainName("");
          setDeployedSite("");
        }
        setEditDomainLoading(false);
      });
    } else {
      ApiService.deleteSubdomain(domain).subscribe((result) => {
        if (result.success) {
          setEditDomainName("");
          setDeployedSite("");
          fetchProject(`${selectedProject?._id}`);
        } else {
          setEditDomainName("");
          setDeployedSite("");
        }
        setEditDomainLoading(false);
      });
    }
  };

  return (
    <div className="domain-item" key={index}>
      {type === "filled" &&
        (!editMode ? (
          <>
            <div className="domain-general-domain-item-header-container">
              <div className="domain-general-domain-item-header">
                <div className="domain-general-domain-item-header-left">
                  <a
                    href={`https://${domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  <button className="remove-button" onClick={deleteDomain}>
                    Remove
                  </button>
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
                          <div className="td">52.191.214.142</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">arweavetx.{domain}</div>
                          <div className="td">{transactionId}</div>
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
                          <div className="td">{domain}</div>
                          <div className="td">dns.perma.online</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">arweavetx.{domain}</div>
                          <div className="td">{transactionId}</div>
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
              <div className="domain-general-domain-item-edit-form">
                <span className="form-label">Site</span>
                <div className="form-select-container">
                  <select
                    className="form-select"
                    value={deployedSite}
                    onChange={(e) => setDeployedSite(e.target.value)}
                  >
                    <option value="">Select Site</option>
                    {(sortedDeployments ? sortedDeployments : []).map(
                      (dep, index) => (
                        <option value={dep.sitePreview} key={index}>
                          {dep.sitePreview}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="select-down-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </div>
              </div>
              <div className="domain-general-domain-item-edit-button">
                <button
                  className="save-button"
                  disabled={!editDomainName || !deployedSite}
                  onClick={editDomainDetails}
                >
                  {editDomainLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                  Save
                </button>
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
