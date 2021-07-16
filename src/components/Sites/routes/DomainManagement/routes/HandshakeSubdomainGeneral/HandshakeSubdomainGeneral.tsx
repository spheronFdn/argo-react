import React, { useContext, useState } from "react";
import "./HandshakeSubdomainGeneral.scss";
import { DomainItem } from "../../components";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";

const HandshakeSubdomainGeneral = () => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);
  const [domainName, setDomainName] = useState<string>("");
  const [deployedSite, setDeployedSite] = useState<string>("");
  const [domainLoading, setDomainLoading] = useState<boolean>(false);
  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((dep) => dep.sitePreview)
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

  const addDomainDetails = () => {
    setDomainLoading(true);
    const domain = {
      orgId: selectedOrg?._id,
      projectId: selectedProject?._id,
      name: domainName,
      link: deployedSite,
      type: "handshake-subdomain",
    };
    ApiService.addDomain(domain).subscribe((result) => {
      if (result.success) {
        setDomainName("");
        setDeployedSite("");
        fetchProject(`${selectedProject?._id}`);
      } else {
        setDomainName("");
        setDeployedSite("");
      }
      setDomainLoading(false);
    });
  };

  const setTransaction = (tx: string) => {
    setDeployedSite(tx);
  };

  return (
    <div className="DomainGeneral">
      <div className="domain-general-right-container">
        <div className="domain-general-project-details">
          <div className="domain-general-project-header">
            Handshake Subdomains
            <span className="beta-badge">Beta</span>
          </div>
          <div className="domain-general-project-body">
            <div className="domain-general-project-item">
              <label className="domain-general-project-item-title">
                Configure your Handshake Subdomains
              </label>
              <label className="domain-general-project-item-subtitle">
                By default, your site is always accessible via arweave gateway based
                on transaction hash. Handshake is decentralized naming and
                certificate authority that allow you to access your site in a
                decentralized peer-to-peer root naming system.
              </label>
              <label className="domain-general-project-item-subtitle label-note">
                To resolve your Handshake Domains, connect to{" "}
                <a href="https://hdns.io" rel="noopener noreferrer" target="_blank">
                  HDNS.io
                </a>{" "}
                or use a gateway like hns.io
              </label>
              {/* <a href="https://docs.argoapp.live/">
                Learn more about custom domains in our docs
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </a> */}
              <div className="domain-general-add-domain-container">
                <input
                  type="text"
                  className="add-domain-input"
                  placeholder="mywebsite.hns"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                />
                <div className="add-domain-select-container">
                  <select
                    className="add-domain-select"
                    value={deployedSite}
                    onChange={(e) => setTransaction(e.target.value)}
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
                <button
                  className="add-domain-button"
                  disabled={!domainName || !deployedSite}
                  onClick={addDomainDetails}
                >
                  {domainLoading ? (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
              <div className="domain-general-domain-list">
                {!projectLoading ? (
                  selectedProject?.handshakeSubdomains.length ? (
                    selectedProject?.handshakeSubdomains.map((subdomain, index) => (
                      <div key={index}>
                        <DomainItem
                          index={index}
                          type="filled"
                          domainId={`${subdomain._id}`}
                          domain={`${subdomain.name}`}
                          link={`${subdomain.link}`}
                          isSubdomain={true}
                          isHandshake={subdomain.type.indexOf("handshake") !== -1}
                          autoDns={subdomain.isLatest}
                          uuid={`${subdomain.argoKey}`}
                          ownerVerified={subdomain.verified}
                          domainType={subdomain.type}
                        />
                      </div>
                    ))
                  ) : null
                ) : (
                  <>
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domainId=""
                      domain=""
                      link=""
                      uuid=""
                      isSubdomain={true}
                      isHandshake={true}
                      autoDns={false}
                      ownerVerified={true}
                      domainType=""
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

export default HandshakeSubdomainGeneral;
