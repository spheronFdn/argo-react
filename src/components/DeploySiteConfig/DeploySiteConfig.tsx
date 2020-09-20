import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RootHeader } from "..";
import { ApiService } from "../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./DeploySiteConfig.scss";
import { RepoOrgDropdown, RepoItem } from "./components";
import Skeleton from "react-loading-skeleton";

function DeploySiteConfig() {
  const history = useHistory();
  const [donationRegistrationProgress, setDonationRegistrationProgress] = useState(
    1,
  );
  const [showRepoOrgDropdown, setShowRepoOrgDropdown] = useState<boolean>(false);
  const [reposDetails, setReposDetails] = useState<any[]>([]);
  const [selectedRepoOwner, setSelectedRepoOwner] = useState<any>();
  const [repoLoading, setRepoLoading] = useState<boolean>(true);

  useEffect(() => {
    ApiService.getAllRepos().subscribe((repos: any) => {
      const repositories: any[] = repos.data.map((repo: any) => ({
        clone_url: repo.clone_url,
        name: repo.full_name,
        private: repo.private,
        owner: { name: repo.owner.login, avatar: repo.owner.avatar_url },
      }));
      const owners = repositories.flatMap((repo) => repo.owner);
      const uniqueOwners = owners.filter(
        (owner, index) =>
          owners.map((owner) => owner.name).indexOf(owner.name) === index,
      );
      const completeRepoData = uniqueOwners.map((owner) => ({
        ...owner,
        repos: repositories.filter((repo) => repo.owner.name === owner.name),
      }));
      setReposDetails(completeRepoData);
      setSelectedRepoOwner(completeRepoData[0]);
      setRepoLoading(false);
    });
  }, []);

  const selectRepoOwner = (repoOwner: any) => {
    setSelectedRepoOwner(repoOwner);
    setShowRepoOrgDropdown(false);
  };
  return (
    <div className="DeploySiteConfig">
      <RootHeader parent={"DeploySiteConfig"} />
      <main className="app-main">
        <div className="deploy-site-container">
          <div className="deploy-site-card">
            <div className="deploy-site-card-inner">
              <div className="go-back" onClick={(e) => history.goBack()}>
                <span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                <span>Back</span>
              </div>
              <h1 className="deploy-site-title">Create a new site</h1>
              <div className="deploy-site-subtitle">
                Just follow these 2 step to deploy your website to ArGo
              </div>
              <div className="deploy-site-progress-bar">
                <div className="deploy-site-progress-number-container">
                  {donationRegistrationProgress <= 1 ? (
                    <div
                      className={`deploy-site-progress-number ${
                        donationRegistrationProgress === 1 ? "active" : ""
                      }`}
                      onClick={(e) => setDonationRegistrationProgress(1)}
                    >
                      1
                    </div>
                  ) : (
                    <div
                      className="deploy-site-progress-done"
                      onClick={(e) => setDonationRegistrationProgress(1)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                  <div
                    className={`deploy-site-progress-text ${
                      donationRegistrationProgress === 1
                        ? "deploy-site-progress-text-active"
                        : ""
                    }`}
                  >
                    Pick a repository
                  </div>
                </div>
                <div className="deploy-site-progress-number-container">
                  {donationRegistrationProgress <= 2 ? (
                    <div
                      className={`deploy-site-progress-number ${
                        donationRegistrationProgress === 2 ? "active" : ""
                      }`}
                      onClick={(e) => setDonationRegistrationProgress(2)}
                    >
                      2
                    </div>
                  ) : (
                    <div
                      className="deploy-site-progress-done"
                      onClick={(e) => setDonationRegistrationProgress(2)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                  <div
                    className={`deploy-site-progress-text ${
                      donationRegistrationProgress === 2
                        ? "deploy-site-progress-text-active"
                        : ""
                    }`}
                  >
                    Build options, and deploy!
                  </div>
                </div>
              </div>
              <div className="deploy-site-form-container">
                <div className="deploy-site-form-item">
                  <label className="deploy-site-item-title">
                    Continuous Deployment: GitHub Webhook
                  </label>
                  <label className="deploy-site-item-subtitle">
                    Choose the repository you want to link to your site on ArGo. When
                    you push to Git we run your build tool on our services and deploy
                    the result.
                  </label>
                  <div className="deploy-site-item-repo-list-container">
                    <div className="deploy-site-item-repo-header">
                      <div
                        className="deploy-site-item-repo-header-left"
                        onClick={(e) =>
                          !repoLoading ? setShowRepoOrgDropdown(true) : null
                        }
                      >
                        {!repoLoading ? (
                          <img
                            src={selectedRepoOwner.avatar}
                            alt="camera"
                            className="deploy-site-item-repo-org-avatar"
                          />
                        ) : (
                          <Skeleton
                            circle={true}
                            height={32}
                            width={32}
                            duration={2}
                          />
                        )}
                        <span className="deploy-site-item-repo-org-name">
                          {!repoLoading ? (
                            selectedRepoOwner.name
                          ) : (
                            <Skeleton width={140} height={24} duration={2} />
                          )}
                        </span>
                        <span className="deploy-site-item-repo-down">
                          <FontAwesomeIcon
                            icon={showRepoOrgDropdown ? faChevronUp : faChevronDown}
                          />
                        </span>
                      </div>
                      <div className="deploy-site-item-repo-header-right">
                        <div className="deploy-site-item-repo-search-container">
                          <span className="deploy-site-item-repo-search-icon">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                          </span>
                          <input
                            type="text"
                            className="deploy-site-item-repo-search-input"
                            placeholder="Search repos"
                          />
                        </div>
                      </div>
                      {showRepoOrgDropdown && (
                        <RepoOrgDropdown
                          setShowDropdown={setShowRepoOrgDropdown}
                          repoOwner={reposDetails}
                          selectedRepoOwner={selectedRepoOwner}
                          setSelectedRepoOwner={selectRepoOwner}
                        />
                      )}
                    </div>
                    <div className="deploy-site-item-repo-body">
                      {!repoLoading ? (
                        selectedRepoOwner.repos.map((repo: any, index: number) => (
                          <RepoItem
                            skeleton={false}
                            name={repo.name}
                            privateRepo={repo.private}
                            key={index}
                          />
                        ))
                      ) : (
                        <>
                          <RepoItem skeleton={true} name={""} privateRepo={false} />
                          <RepoItem skeleton={true} name={""} privateRepo={false} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="button-container">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={(e) => history.goBack()}
                >
                  Cancel
                </button>
                <button type="button" className="primary-button">
                  Continue
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeploySiteConfig;
