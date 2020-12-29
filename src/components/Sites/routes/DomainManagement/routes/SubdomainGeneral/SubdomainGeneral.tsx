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

const SubdomainGeneral = () => {
  const { projectLoading, selectedProject } = useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);
  const [subdomainName, setSubdomainName] = useState<string>("");
  const [deployedSite, setDeployedSite] = useState<string>("");
  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments
        .filter((dep) => dep.sitePreview)
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

  const addDomainDetails = () => {
    const domain = {
      repositoryId: selectedProject?._id,
      subdomain: subdomainName,
      transactionId: deployedSite.split("/")[deployedSite.split("/").length - 1],
    };
    ApiService.addDomain(domain).subscribe((result) => {
      if (result.success) {
        fetchProject(`${selectedProject?._id}`);
      } else {
        setSubdomainName("");
        setDeployedSite("");
      }
    });
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
                    onChange={(e) => setDeployedSite(e.target.value)}
                  >
                    <option value="">Select deployment</option>
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
                  onClick={addDomainDetails}
                >
                  Add
                </button>
              </div>
              <div className="domain-general-domain-list">
                {!projectLoading ? (
                  selectedProject?.subdomain && (
                    <DomainItem
                      index={1}
                      type="filled"
                      domain={`${selectedProject?.subdomain}`}
                      transactionId={`${selectedProject?.subdomainTransactionId}`}
                      isSubdomain={true}
                    />
                  )
                ) : (
                  <>
                    <DomainItem
                      index={1}
                      type="skeleton"
                      domain=""
                      transactionId=""
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
