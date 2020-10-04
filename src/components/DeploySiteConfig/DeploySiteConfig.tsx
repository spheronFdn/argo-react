import React, { useContext, useEffect, useState } from "react";
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
import { ActionContext, StateContext } from "../../hooks";
import { IActionModel, IStateModel } from "../../model/hooks.model";
import BounceLoader from "react-spinners/BounceLoader";

function DeploySiteConfig() {
  const history = useHistory();

  const { user, selectedOrg, selectedRepoForTriggerDeployment } = useContext<
    IStateModel
  >(StateContext);
  const {
    setLatestDeploymentSocketTopic,
    setSelectedProject,
    setLatestDeploymentConfig,
    setSelectedOrganization,
  } = useContext<IActionModel>(ActionContext);

  const [createDeployProgress, setCreateDeployProgress] = useState(1);
  const [showRepoOrgDropdown, setShowRepoOrgDropdown] = useState<boolean>(false);
  const [reposDetails, setReposDetails] = useState<any[]>([]);
  const [selectedRepoOwner, setSelectedRepoOwner] = useState<any>();
  const [repoLoading, setRepoLoading] = useState<boolean>(true);

  // const [autoPublish, setAutoPublish] = useState<boolean>(true);
  const [selectedRepo, setSelectedRepo] = useState<any>();
  const [projectName, setProjectName] = useState<string>("");
  const [owner, setOwner] = useState<any>();
  const [branch, setBranch] = useState<string>("master");
  const [framework, setFramework] = useState<string>("Create React App");
  const [packageManager, setPackageManager] = useState<string>("npm");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");
  const [startDeploymentLoading, setStartDeploymentLoading] = useState<boolean>(
    false,
  );

  useEffect(() => {
    ApiService.getAllRepos().subscribe((repos: any) => {
      const repositories: any[] = repos.data.map((repo: any) => ({
        clone_url: repo.clone_url,
        name: repo.name,
        fullName: repo.full_name,
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

  useEffect(() => {
    if (selectedOrg) {
      setOwner(selectedOrg);
    } else if (user?.organizations && user.organizations[0]) {
      setOwner(user.organizations[0]);
    }
  }, [user, selectedOrg]);

  useEffect(() => {
    if (selectedRepoForTriggerDeployment) {
      setSelectedRepo({
        name: selectedRepoForTriggerDeployment
          .substring(19, selectedRepoForTriggerDeployment.length - 4)
          .split("/")[1],
        clone_url: selectedRepoForTriggerDeployment,
      });
      setCreateDeployProgress(2);
    }
  }, [selectedRepoForTriggerDeployment]);

  const selectRepoOwner = (repoOwner: any) => {
    setSelectedRepoOwner(repoOwner);
    setShowRepoOrgDropdown(false);
  };

  const selectRepositories = (repo: any) => {
    setSelectedRepo(repo);
    setProjectName(repo.name);
    setCreateDeployProgress(2);
  };

  const startDeployment = () => {
    setStartDeploymentLoading(true);
    const deployment = {
      github_url: selectedRepo.clone_url,
      folder_name: selectedRepo.name,
      orgId: owner._id,
      project_name: projectName,
      branch,
      framework,
      package_manager: packageManager,
      build_command: buildCommand,
      publish_dir: publishDirectory,
      auto_publish: false,
    };
    ApiService.startDeployment(deployment).subscribe((result) => {
      setLatestDeploymentSocketTopic(result.topic);
      setSelectedProject({ name: projectName });
      setLatestDeploymentConfig(deployment);
      setStartDeploymentLoading(false);
      history.push(
        `/org/${selectedOrg?._id}/sites/${result.repositoryId}/deployments/${result.deploymentId}`,
      );
    });
  };

  let buildCommandPrefix: string = "";
  if (packageManager === "npm") {
    buildCommandPrefix = "npm run";
  } else {
    buildCommandPrefix = "yarn";
  }

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
                  {createDeployProgress <= 1 ? (
                    <div
                      className={`deploy-site-progress-number ${
                        createDeployProgress === 1 ? "active" : ""
                      }`}
                      onClick={(e) => setCreateDeployProgress(1)}
                    >
                      1
                    </div>
                  ) : (
                    <div
                      className="deploy-site-progress-done"
                      onClick={(e) => setCreateDeployProgress(1)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                  <div
                    className={`deploy-site-progress-text ${
                      createDeployProgress === 1
                        ? "deploy-site-progress-text-active"
                        : ""
                    }`}
                  >
                    Pick a repository
                  </div>
                </div>
                <div className="deploy-site-progress-number-container">
                  {createDeployProgress <= 2 ? (
                    <div
                      className={`deploy-site-progress-number ${
                        createDeployProgress === 2 ? "active" : ""
                      }`}
                      onClick={(e) => setCreateDeployProgress(2)}
                    >
                      2
                    </div>
                  ) : (
                    <div
                      className="deploy-site-progress-done"
                      onClick={(e) => setCreateDeployProgress(2)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                  <div
                    className={`deploy-site-progress-text ${
                      createDeployProgress === 2
                        ? "deploy-site-progress-text-active"
                        : ""
                    }`}
                  >
                    Build options, and deploy!
                  </div>
                </div>
              </div>
              <div className="deploy-site-form-container">
                {createDeployProgress === 1 && (
                  <div className="deploy-site-form-item">
                    <label className="deploy-site-item-title">
                      {/* Continuous Deployment: GitHub Webhook */}
                      Choose repository
                    </label>
                    <label className="deploy-site-item-subtitle">
                      Choose the repository you want to link to your site on ArGo.
                    </label>
                    {/* <div className="webhook-confirm-container">
                      <span className="confirm-checkbox">
                        <input
                          type="checkbox"
                          checked={autoPublish}
                          onChange={(e) => setAutoPublish(e.target.checked)}
                        />
                      </span>
                      <span>
                        Do you want to setup github webhook? When you push to Git we
                        run your build tool on our services and deploy the result.
                      </span>
                    </div> */}
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
                              icon={
                                showRepoOrgDropdown ? faChevronUp : faChevronDown
                              }
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
                              name={repo.fullName}
                              privateRepo={repo.private}
                              key={index}
                              onClick={() => selectRepositories(repo)}
                            />
                          ))
                        ) : (
                          <>
                            <RepoItem
                              skeleton={true}
                              name={""}
                              privateRepo={false}
                              onClick={() => null}
                            />
                            <RepoItem
                              skeleton={true}
                              name={""}
                              privateRepo={false}
                              onClick={() => null}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {createDeployProgress === 2 && (
                  <>
                    <div className="deploy-site-form-item">
                      <label className="deploy-site-item-title">
                        Deploy settings for {selectedRepo.name}
                      </label>
                      <label className="deploy-site-item-subtitle">
                        Get more control over how ArGo builds and deploys your site
                        with these settings.
                      </label>
                      <div className="deploy-site-item-form">
                        {/* <div className="deploy-site-item-form-item">
                          <label>Project Name</label>
                          {true ? (
                            <input
                              type="text"
                              className="deploy-site-item-input"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                            />
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div> */}
                        <div className="deploy-site-item-form-item">
                          <label>Owner</label>
                          {true ? (
                            <div className="deploy-site-item-select-container">
                              <select
                                className="deploy-site-item-select"
                                value={owner._id}
                                onChange={(e) => {
                                  const selOrg = user
                                    ? user.organizations
                                      ? user.organizations.filter(
                                          (org) => org._id === e.target.value,
                                        )[0]
                                      : null
                                    : null;
                                  setSelectedOrganization(selOrg as any);
                                  setOwner(e.target.value);
                                }}
                              >
                                {user?.organizations &&
                                  user?.organizations.map((organization, index) => (
                                    <option value={organization._id} key={index}>
                                      {organization.profile.name}
                                    </option>
                                  ))}
                              </select>
                              <span className="select-down-icon">
                                <FontAwesomeIcon icon={faChevronDown} />
                              </span>
                            </div>
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Branch to deploy</label>
                          {true ? (
                            <input
                              type="text"
                              className="deploy-site-item-input"
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                            />
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="deploy-site-form-item">
                      <label className="deploy-site-item-title">
                        Basic build settings
                      </label>
                      <label className="deploy-site-item-subtitle">
                        If you’re using a static site generator or build tool, we’ll
                        need these settings to build your site.
                      </label>
                      <div className="deploy-site-item-form">
                        <div className="deploy-site-item-form-item">
                          <label>Framework</label>
                          {true ? (
                            <div className="deploy-site-item-select-container">
                              <select
                                className="deploy-site-item-select"
                                value={framework}
                                onChange={(e) => setFramework(e.target.value)}
                              >
                                <option value="Create React App">
                                  Create React App
                                </option>
                              </select>
                              <span className="select-down-icon">
                                <FontAwesomeIcon icon={faChevronDown} />
                              </span>
                            </div>
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Package Manager</label>
                          {true ? (
                            <div className="deploy-site-item-select-container">
                              <select
                                className="deploy-site-item-select"
                                value={packageManager}
                                onChange={(e) => setPackageManager(e.target.value)}
                              >
                                <option value="npm">NPM</option>
                                <option value="yarn">YARN</option>
                              </select>
                              <span className="select-down-icon">
                                <FontAwesomeIcon icon={faChevronDown} />
                              </span>
                            </div>
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Build command</label>
                          {true ? (
                            <div className="deploy-site-item-input-container">
                              <input
                                type="text"
                                className="deploy-site-item-input-disabled"
                                value={buildCommandPrefix}
                                disabled
                              />
                              <input
                                type="text"
                                className="deploy-site-item-input-build"
                                value={buildCommand}
                                onChange={(e) => setBuildCommand(e.target.value)}
                              />
                            </div>
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Publish directory</label>
                          {true ? (
                            <input
                              type="text"
                              className="deploy-site-item-input"
                              value={publishDirectory}
                              onChange={(e) => setPublishDirectory(e.target.value)}
                            />
                          ) : (
                            <Skeleton width={326} height={36} duration={2} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="button-container">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={startDeployment}
                      >
                        {startDeploymentLoading && (
                          <BounceLoader size={20} color={"#fff"} loading={true} />
                        )}
                        Deploy
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={(e) => setCreateDeployProgress(1)}
                      >
                        Back
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeploySiteConfig;
