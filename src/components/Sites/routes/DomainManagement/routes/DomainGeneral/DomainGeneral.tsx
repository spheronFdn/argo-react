import React, { useContext, useState } from "react";
import "./DomainGeneral.scss";
// import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DomainItem } from "../../components";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";

const DomainGeneral = () => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);
  const [domainName, setDomainName] = useState<string>("");
  const [deployedSite, setDeployedSite] = useState<string>("");
  const [isLatest, setIsLatest] = useState<boolean>(false);
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
      link: isLatest
        ? sortedDeployments?.length
          ? sortedDeployments[0].sitePreview
          : ""
        : deployedSite,
      isLatest,
      type: "domain",
    };
    ApiService.addDomain(domain).subscribe((result) => {
      if (result.success) {
        setDomainName("");
        setDeployedSite("");
        setIsLatest(false);
        fetchProject(`${selectedProject?._id}`);
      } else {
        setDomainName("");
        setDeployedSite("");
        setIsLatest(false);
      }
      setDomainLoading(false);
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
                on transaction hash. Custom domains allow you to access your site via
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
                <div className="add-domain-select-container">
                  <select
                    className="add-domain-select"
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
                  selectedProject?.domains.length ? (
                    selectedProject?.domains.map((domain, index) => (
                      <div key={index}>
                        <DomainItem
                          index={index}
                          type="filled"
                          domainId={`${domain._id}`}
                          domain={`${domain.name}`}
                          link={`${domain.link}`}
                          isSubdomain={false}
                          isHandshake={domain.type.indexOf("handshake") !== -1}
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
                      isHandshake={false}
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

export default DomainGeneral;
