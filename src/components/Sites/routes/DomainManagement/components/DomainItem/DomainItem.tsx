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
  isHandshake,
  domainType,
}) => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDomainLoading, setEditDomainLoading] = useState<boolean>(false);
  const [verifyDomainLoading, setVerifyDomainLoading] = useState<boolean>(false);
  const [updateDomainLoading, setUpdateDomainLoading] = useState<boolean>(false);
  const [deleteDomainLoading, setDeleteDomainLoading] = useState<boolean>(false);
  const [editDomainName, setEditDomainName] = useState<string>(domain);
  const [isLatest, setIsLatest] = useState<boolean>(false);
  const [deployedSite, setDeployedSite] = useState<string>("");
  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((dep) => dep.sitePreview)
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

  let separator = {
    base: "",
    sep: "",
  };

  if (link.indexOf("arweave.net") !== -1) {
    separator = {
      base: "arweave",
      sep: "https://arweave.net/",
    };
  } else if (link.indexOf("siasky.net") !== -1) {
    separator = {
      base: "sia",
      sep: "https://siasky.net/",
    };
  }

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
      link: deployedSite !== link ? deployedSite : undefined,
      isLatest,
      projectId: selectedProject?._id,
      type: domainType,
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
    setDeleteDomainLoading(true);
    ApiService.deleteDomain(domainId).subscribe((result) => {
      if (result.success) {
        setEditDomainName("");
        setDeployedSite("");
        fetchProject(`${selectedProject?._id}`);
      } else {
        setEditDomainName("");
        setDeployedSite("");
      }
      setDeleteDomainLoading(false);
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
        setVerifyDomainLoading(false);
        fetchProject(`${selectedProject?._id}`);
      } else {
        setEditDomainName("");
        setDeployedSite("");
        setVerifyDomainLoading(false);
      }
    });
  };

  const updateDomain = () => {
    setUpdateDomainLoading(true);
    let records: string = "";
    if (!isSubdomain) {
      const records_json = [
        {
          type: "TXT",
          host: "_contenthash",
          value: `${separator.base}://${link.split(separator.sep)[1]}`,
          ttl: 60,
        },
        {
          type: "ALIAS",
          host: "@",
          value: `${separator.base}.namebase.io.`,
          ttl: 3600,
        },
      ];

      records = btoa(JSON.stringify(records_json));
    } else {
      const records_json = [
        {
          type: "TXT",
          host: `_contenthash.${domain.substring(0, domain.lastIndexOf("."))}`,
          value: `${separator.base}://${link.split(separator.sep)[1]}`,
          ttl: 60,
        },
        {
          type: "CNAME",
          host: domain.substring(0, domain.lastIndexOf(".")),
          value: `${separator.base}.namebase.io.`,
          ttl: 3600,
        },
      ];

      records = btoa(JSON.stringify(records_json));
    }
    const url = new URL(
      `https://namebase.io/next/domain-manager/${domain.substring(
        domain.lastIndexOf(".") + 1,
        domain.length,
      )}/records`,
    );
    const redirectUrl = window.location.href;
    const encodedRedirectUrl = encodeURIComponent(
      encodeURIComponent(redirectUrl.toString()),
    );

    url.searchParams.append("records", records);
    url.searchParams.append("redirect", encodedRedirectUrl);
    setUpdateDomainLoading(false);

    // console.log(url)
    window.location.href = url.toString();
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
                      href={`${isHandshake ? "http" : "https"}://${domain}`}
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
                  <button
                    className="remove-button"
                    disabled={deleteDomainLoading}
                    onClick={deleteDomain}
                  >
                    <span>Remove</span>
                    {deleteDomainLoading ? (
                      <BounceLoader size={20} color={"#ee0902"} loading={true} />
                    ) : null}
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
                      {!isHandshake ? (
                        <p>
                          Set the following record on your DNS provider to configure
                          your domain and verify your ownership:
                        </p>
                      ) : (
                        <p>
                          Update the following record on Namebase to configure your
                          HNS domain and verify domain records:
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <h3>Subdomain Configuration</h3>
                      {!isHandshake ? (
                        <p>
                          Set the following record on your DNS provider to configure
                          your subdomain and verify your ownership:
                        </p>
                      ) : (
                        <p>
                          Update the following record on Namebase to configure your
                          HNS subdomain and verify subdomain records:
                        </p>
                      )}
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
                    {!isHandshake ? (
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
                    ) : !isSubdomain ? (
                      <div className="tbody">
                        <div className="tr">
                          <div className="td">A</div>
                          <div className="td">@</div>
                          <div className="td">{separator.base}.namebase.io.</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">_contenthash</div>
                          <div className="td">
                            {separator.base}://{link.split(separator.sep)[1]}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="tbody">
                        <div className="tr">
                          <div className="td">CNAME</div>
                          <div className="td">{domain}</div>
                          <div className="td">{separator.base}.namebase.io.</div>
                        </div>
                        <div className="tr">
                          <div className="td">TXT</div>
                          <div className="td">
                            _contenthash.
                            {domain.substring(0, domain.lastIndexOf("."))}
                          </div>
                          <div className="td">
                            {separator.base}://{link.split(separator.sep)[1]}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {!ownerVerified ? (
                    <div className="verify-domain-container">
                      <div className="verify-domain-text">
                        <span>
                          <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                        </span>
                        <span>Update Records and Verify</span>
                      </div>
                      <div className="verify-domain-button-container">
                        {isHandshake ? (
                          <button
                            className="update-domain-button"
                            disabled={updateDomainLoading}
                            onClick={updateDomain}
                          >
                            Update
                            {updateDomainLoading ? (
                              <BounceLoader
                                size={20}
                                color={"#fff"}
                                loading={true}
                              />
                            ) : null}
                          </button>
                        ) : null}
                        <button
                          className="verify-domain-button"
                          disabled={verifyDomainLoading}
                          onClick={verifyDomain}
                        >
                          Verify
                          {verifyDomainLoading ? (
                            <BounceLoader size={20} color={"#fff"} loading={true} />
                          ) : null}
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
                    {!isHandshake && <option value="latest">Latest Deployed</option>}
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
