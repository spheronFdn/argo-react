import React, { useContext, useState } from "react";
import "./EnsDomainGeneral.scss";
import { DomainItem } from "../../components";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";

const EnsDomainGeneral = () => {
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
      type: "ens-domain",
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
            ENS Domains
            <span className="beta-badge">Beta</span>
          </div>
          <div className="domain-general-project-body">
            <div className="domain-general-project-item">
              <label className="domain-general-project-item-title">
                Configure your ENS Domains/Subdomains
              </label>
              <label className="domain-general-project-item-subtitle">
                By default, your site is always accessible via arweave gateway based
                on transaction hash. ENS is an open source blockchain-based naming
                protocol.
              </label>
              <label className="domain-general-project-item-subtitle label-note">
                To resolve your ENS Domains, use a gateway like eth.link or eth.limo.
                Brave & Opera browsers have direct support for ENS Domains, so no
                gateway is required.
              </label>
              <a href="https://docs.spheron.network/">
                Learn more about ens domains from our docs
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </a>
              <div className="domain-general-add-domain-container">
                <input
                  type="text"
                  className="add-domain-input"
                  placeholder="eg: mywebsite.eth or dash.mywebsite.eth"
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
                  selectedProject?.ensDomains?.length ? (
                    selectedProject?.ensDomains?.map((domain, index) => (
                      <div key={index}>
                        <DomainItem
                          index={index}
                          type="filled"
                          domainId={`${domain._id}`}
                          domain={`${domain.name}`}
                          link={`${domain.link}`}
                          isSubdomain={false}
                          autoDns={domain.isLatest}
                          uuid={`${domain.argoKey}`}
                          ownerVerified={domain.verified}
                          domainType={domain.type}
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
                      isSubdomain={false}
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

export default EnsDomainGeneral;
