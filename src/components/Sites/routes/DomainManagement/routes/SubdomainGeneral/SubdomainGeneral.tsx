import React, { useContext, useState } from "react";
import "./SubdomainGeneral.scss";
// import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import { DomainItem } from "../../components";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";

const SubdomainGeneral = () => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);
  const [subdomainName, setSubdomainName] = useState<string>("");
  const [deployedSite, setDeployedSite] = useState<string>("");
  const [isLatest, setIsLatest] = useState<boolean>(false);
  const [domainLoading, setDomainLoading] = useState<boolean>(false);
  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((dep) => dep.sitePreview)
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

  const sortedResolverSkylinks = projectLoading
    ? []
    : selectedProject?.resolverSkylinks.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );

  const addSubdomainDetails = () => {
    setDomainLoading(true);
    const domain = {
      orgId: selectedOrg?._id,
      projectId: selectedProject?._id,
      name: subdomainName,
      link: isLatest
        ? sortedDeployments?.length
          ? sortedDeployments[0].sitePreview
          : ""
        : deployedSite,
      isLatest,
      type: "subdomain",
    };
    ApiService.addDomain(domain).subscribe((result) => {
      if (result.success) {
        setSubdomainName("");
        setDeployedSite("");
        setIsLatest(false);
        fetchProject(`${selectedProject?._id}`);
      } else {
        setSubdomainName("");
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
                <div className="add-domain-select-container">
                  <select
                    className="add-domain-select"
                    value={deployedSite}
                    onChange={(e) => setTransaction(e.target.value)}
                  >
                    <option value="">Select deployment</option>
                    <option value="latest">Latest Deployed</option>
                    {(sortedResolverSkylinks ? sortedResolverSkylinks : []).map(
                      (dep, index) => (
                        <option
                          value={`https://siasky.net/${dep.resolverSkylink}`}
                          key={index}
                        >
                          Resolver Skylink - {dep.name}
                        </option>
                      ),
                    )}
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
                  disabled={!subdomainName || !deployedSite}
                  onClick={addSubdomainDetails}
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
                  selectedProject?.subdomains.length ? (
                    selectedProject?.subdomains.map((subdomain, index) => (
                      <div key={index}>
                        <DomainItem
                          index={1}
                          type="filled"
                          domainId={`${subdomain._id}`}
                          domain={`${subdomain.name}`}
                          link={`${subdomain.link}`}
                          isSubdomain={true}
                          autoDns={!!subdomain.isLatest}
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

export default SubdomainGeneral;
