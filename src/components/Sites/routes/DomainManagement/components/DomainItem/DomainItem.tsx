import React, { useContext, useEffect, useState } from "react";
import "./DomainItem.scss";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import {
  faChevronDown,
  faExternalLinkAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
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
  link,
  isSubdomain,
  autoDns,
  uuid,
  ownerVerified,
}) => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDomainLoading, setEditDomainLoading] = useState<boolean>(false);
  const [verifyDomainLoading, setVerifyDomainLoading] = useState<boolean>(false);
  const [editDomainName, setEditDomainName] = useState<string>(domain);
  const [isLatest, setIsLatest] = useState<boolean>(false);
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
    if (link) {
      setDeployedSite(autoDns ? "latest" : link);
    }
  }, [domain, link, autoDns]);

  const editDomainDetails = () => {
    setEditDomainLoading(true);
    const domainBody = {
      orgId: selectedOrg?._id,
      name: editDomainName !== domain ? editDomainName : undefined,
      link: deployedSite,
      isLatest,
      projectId: selectedProject?._id,
    };
    ApiService.editDomain(domainId, domainBody).subscribe((result) => {
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
  };

  const deleteDomain = () => {
    ApiService.deleteDomain(domainId).subscribe((result) => {
      if (result.success) {
        setEditDomainName("");
        setDeployedSite("");
        fetchProject(`${selectedProject?._id}`);
      } else {
        setEditDomainName("");
        setDeployedSite("");
      }
    });
  };

  const verifyDomain = () => {
    setVerifyDomainLoading(true);
    const verify = {
      id: domainId,
    };
    ApiService.verifyDomain(verify).subscribe((result) => {
      if (result.verified) {
        setEditDomainName("");
        setDeployedSite("");
        fetchProject(`${selectedProject?._id}`);
      } else {
        setEditDomainName("");
        setDeployedSite("");
      }
      setVerifyDomainLoading(false);
    });
  };

  const setTransaction = (tx: string) => {
    setDeployedSite(tx);

    if (tx === "latest") {
      setIsLatest(true);
    } else {
      setIsLatest(false);
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
                  <div>
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
                  {autoDns ? (
                    <div className="domain-tag-container">
                      <span className="domain-tag">Automated</span>
                    </div>
                  ) : null}
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
                <div className="domain-general-domain-item-body-item">
                  {!isSubdomain ? (
                    <>
                      <h3>Domain Configuration</h3>
                      <p>
                        Set the following record on your DNS provider to configure
                        your domain and verify your ownership:
                      </p>
                    </>
                  ) : (
                    <>
                      <h3>Subdomain Configuration</h3>
                      <p>
                        Set the following record on your DNS provider to configure
                        your subdomain and verify your ownership:
                      </p>
                    </>
                  )}
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
                        <div className="td">{domain}</div>
                        <div className="td">35.202.158.174</div>
                      </div>
                      <div className="tr">
                        <div className="td">TXT</div>
                        <div className="td">{domain}</div>
                        <div className="td">argo={uuid}</div>
                      </div>
                    </div>
                  </div>
                  {!ownerVerified ? (
                    <div className="verify-domain-container">
                      <div className="verify-domain-text">
                        <span>
                          <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                        </span>
                        <span>Owner Not Verified</span>
                      </div>
                      <div>
                        <button
                          className="verify-domain-button"
                          onClick={verifyDomain}
                        >
                          {verifyDomainLoading ? (
                            <BounceLoader size={20} color={"#fff"} loading={true} />
                          ) : (
                            "Verify"
                          )}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
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
                    onChange={(e) => setTransaction(e.target.value)}
                  >
                    <option value="">Select Site</option>
                    <option value="latest">Latest Deployed</option>
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
