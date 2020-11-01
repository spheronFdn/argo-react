import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ApiService } from "../../services";
import { BroadcastChannel } from "broadcast-channel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faChevronDown,
  faChevronUp,
  faExclamationCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./DeploySiteConfig.scss";
import { ActionContext, StateContext } from "../../hooks";
import { IActionModel, IStateModel } from "../../model/hooks.model";
import BounceLoader from "react-spinners/BounceLoader";
import { GithubIcon } from "../SignUp/components";
import config from "../../config";
import Skeleton from "react-loading-skeleton";
import { RepoOrgDropdown, RepoItem } from "./components";
import { LazyLoadedImage } from "../_SharedComponents";

const MemoRepoOrgDropdown = React.memo(RepoOrgDropdown);
const MemoRepoItem = React.memo(RepoItem);

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function DeploySiteConfig() {
  const history = useHistory();

  const { user, selectedOrg, selectedRepoForTriggerDeployment } = useContext<
    IStateModel
  >(StateContext);
  const {
    setLatestDeploymentSocketTopic,
    setLatestDeploymentConfig,
    setSelectedOrganization,
  } = useContext<IActionModel>(ActionContext);

  const [createDeployProgress, setCreateDeployProgress] = useState(1);
  const [showRepoOrgDropdown, setShowRepoOrgDropdown] = useState<boolean>(false);
  const [reposOwnerDetails, setReposOwnerDetails] = useState<any[]>([]);
  const [reposSelectedOwnerRepoDetails, setReposSelectedOwnerRepoDetails] = useState<
    any[]
  >([]);
  const [selectedRepoOwner, setSelectedRepoOwner] = useState<any>();
  const [ownerLoading, setOwnerLoading] = useState<boolean>(true);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);

  // const [autoPublish, setAutoPublish] = useState<boolean>(true);
  const [selectedRepo, setSelectedRepo] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [branch, setBranch] = useState<string>("master");
  const [framework, setFramework] = useState<string>("react");
  const [packageManager, setPackageManager] = useState<string>("npm");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");
  const [startDeploymentLoading, setStartDeploymentLoading] = useState<boolean>(
    false,
  );
  const [deployDisabled, setDeployDisabled] = useState<boolean>(false);
  const [showGithubRepos, setShowGithubRepos] = useState<boolean>(false);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      selectedRepo &&
      owner &&
      branch &&
      framework &&
      packageManager &&
      buildCommand &&
      publishDirectory &&
      user?.argo_wallet?.wallet_balance &&
      user?.argo_wallet?.wallet_balance >= 0.2
    ) {
      setDeployDisabled(false);
    } else {
      setDeployDisabled(true);
    }
  }, [
    selectedRepo,
    owner,
    branch,
    framework,
    packageManager,
    buildCommand,
    publishDirectory,
    user,
  ]);

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
        name: selectedRepoForTriggerDeployment.github_url
          .substring(19, selectedRepoForTriggerDeployment.github_url.length - 4)
          .split("/")[1],
        clone_url: selectedRepoForTriggerDeployment.github_url,
      });
      setSelectedRepoOwner({
        name: selectedRepoForTriggerDeployment.github_url
          .substring(19, selectedRepoForTriggerDeployment.github_url.length - 4)
          .split("/")[0],
      });
      setBranch(selectedRepoForTriggerDeployment.branch);
      setPackageManager(selectedRepoForTriggerDeployment.package_manager);
      setBuildCommand(selectedRepoForTriggerDeployment.build_command);
      setPublishDirectory(selectedRepoForTriggerDeployment.publish_dir);
      setCreateDeployProgress(2);
    }
  }, [selectedRepoForTriggerDeployment]);

  useEffect(() => {
    const bc = new BroadcastChannel("github_app_auth");
    bc.onmessage = (msg: string) => {
      if (msg === "authorized") {
        setShowGithubRepos(true);
        getAllGithubInstallations();
      }
    };
    return () => {
      bc.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllGithubInstallations = () => {
    setOwnerLoading(true);
    setRepoLoading(true);
    ApiService.getAllGithubAppInstallation().subscribe((res) => {
      if (componentIsMounted.current) {
        const repoOwners: any[] = res.installations.map((installation: any) => ({
          name: installation.account.login,
          avatar: installation.account.avatar_url,
          installationId: installation.id,
        }));
        setReposOwnerDetails(repoOwners);
        let newRepoOwner = null;

        if (selectedRepoOwner) {
          newRepoOwner = repoOwners.filter(
            (repoOwner) => repoOwner.name === selectedRepoOwner.name,
          )[0];
        } else {
          newRepoOwner = repoOwners[0];
        }
        setSelectedRepoOwner(newRepoOwner);
        setOwnerLoading(false);
        getOwnerRepos(newRepoOwner.installationId);
      }
    });
  };

  const getOwnerRepos = (installationId: string) => {
    setRepoLoading(true);
    ApiService.getAllOwnerRepos(installationId).subscribe((res) => {
      if (componentIsMounted.current) {
        const repositories: any[] = res.repositories.map((repo: any) => ({
          clone_url: repo.clone_url,
          name: repo.name,
          fullName: repo.full_name,
          private: repo.private,
        }));
        setReposSelectedOwnerRepoDetails(repositories);
        setRepoLoading(false);
      }
    });
  };

  const selectRepoOwner = (repoOwner: any) => {
    getOwnerRepos(repoOwner.installationId);
    setSelectedRepoOwner(repoOwner);
    setShowRepoOrgDropdown(false);
  };

  const selectRepositories = (repo: any) => {
    setSelectedRepo(repo);
    setCreateDeployProgress(2);
  };

  const startDeployment = async () => {
    setStartDeploymentLoading(true);
    // await ArweaveService.payArgoFee(walletKey);
    const deployment = {
      github_url: selectedRepo.clone_url,
      folder_name: selectedRepo.name,
      owner: selectedRepoOwner.name,
      orgId: owner._id,
      // project_name: projectName,
      branch,
      framework,
      package_manager: packageManager,
      build_command: buildCommand,
      publish_dir: publishDirectory,
      auto_publish: false,
    };
    ApiService.startDeployment(deployment).subscribe((result) => {
      if (componentIsMounted.current) {
        setLatestDeploymentSocketTopic(result.topic);
        setLatestDeploymentConfig(deployment);
        setStartDeploymentLoading(false);
        history.push(
          `/org/${selectedOrg?._id}/sites/${result.repositoryId}/deployments/${result.deploymentId}`,
        );
      }
    });
  };

  const openGithubAppAuth = async () => {
    const githubSignInUrl = `${config.urls.BASE_URL}/github/app/${user?._id}`;
    window.open(githubSignInUrl, "_blank");
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
                    >
                      1
                    </div>
                  ) : (
                    <div className="deploy-site-progress-done">
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
                    >
                      2
                    </div>
                  ) : (
                    <div className="deploy-site-progress-done">
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
                    {!showGithubRepos ? (
                      <div className="deployment-provider-container">
                        <div className="deployment-provider-title">
                          Connect with your favorite provider
                        </div>
                        <div className="deployment-provider-buttons">
                          <button
                            className="github-button"
                            onClick={openGithubAppAuth}
                          >
                            <span className="github-icon">
                              <GithubIcon />
                            </span>
                            <span>Github</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="deploy-site-item-repo-list-container">
                        <div className="deploy-site-item-repo-header">
                          <div
                            className="deploy-site-item-repo-header-left"
                            onClick={(e) =>
                              !ownerLoading ? setShowRepoOrgDropdown(true) : null
                            }
                          >
                            {!ownerLoading ? (
                              <LazyLoadedImage height={32} once>
                                <img
                                  src={selectedRepoOwner.avatar}
                                  alt="camera"
                                  className="deploy-site-item-repo-org-avatar"
                                  height={32}
                                  width={32}
                                  loading="lazy"
                                />
                              </LazyLoadedImage>
                            ) : (
                              <Skeleton
                                circle={true}
                                height={32}
                                width={32}
                                duration={2}
                              />
                            )}
                            <span className="deploy-site-item-repo-org-name">
                              {!ownerLoading ? (
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
                            {/* <div className="deploy-site-item-repo-search-container">
                              <span className="deploy-site-item-repo-search-icon">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                              </span>
                              <input
                                type="text"
                                className="deploy-site-item-repo-search-input"
                                placeholder="Search repos"
                              />
                            </div> */}
                            <div
                              className="refresh-control"
                              onClick={getAllGithubInstallations}
                            >
                              <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
                            </div>
                          </div>
                          {showRepoOrgDropdown && (
                            <MemoRepoOrgDropdown
                              setShowDropdown={setShowRepoOrgDropdown}
                              repoOwner={reposOwnerDetails}
                              selectedRepoOwner={selectedRepoOwner}
                              setSelectedRepoOwner={selectRepoOwner}
                            />
                          )}
                        </div>
                        <div className="deploy-site-item-repo-body">
                          {!repoLoading ? (
                            reposSelectedOwnerRepoDetails.map(
                              (repo: any, index: number) => (
                                <MemoRepoItem
                                  skeleton={false}
                                  name={repo.fullName}
                                  privateRepo={repo.private}
                                  key={index}
                                  onClick={() => selectRepositories(repo)}
                                />
                              ),
                            )
                          ) : (
                            <>
                              <MemoRepoItem
                                skeleton={true}
                                name={""}
                                privateRepo={false}
                                onClick={() => null}
                              />
                              <MemoRepoItem
                                skeleton={true}
                                name={""}
                                privateRepo={false}
                                onClick={() => null}
                              />
                            </>
                          )}
                        </div>
                        <div className="deploy-site-item-repo-body">
                          Can’t see your repo here?
                          <a
                            href={`${config.urls.API_URL}/auth/github/app/new`}
                            // eslint-disable-next-line react/jsx-no-target-blank
                            target="_blank"
                          >
                            Configure the ArGo app on GitHub.
                          </a>
                        </div>
                      </div>
                    )}
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
                        <div className="deploy-site-item-form-item">
                          <label>Owner</label>
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
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Branch to deploy</label>
                          <input
                            type="text"
                            className="deploy-site-item-input"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                          />
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
                          <div className="deploy-site-item-select-container">
                            <select
                              className="deploy-site-item-select"
                              value={framework}
                              onChange={(e) => setFramework(e.target.value)}
                            >
                              <option value="static">
                                No Framework - Simple JavaScript App
                              </option>
                              <option value="react">Create React App</option>
                              <option value="vue">Vue App</option>
                            </select>
                            <span className="select-down-icon">
                              <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                          </div>
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Package Manager</label>
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
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Build command</label>
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
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>Publish directory</label>
                          <input
                            type="text"
                            className="deploy-site-item-input"
                            value={publishDirectory}
                            onChange={(e) => setPublishDirectory(e.target.value)}
                          />
                        </div>
                      </div>
                      {user?.argo_wallet?.wallet_balance &&
                      user?.argo_wallet?.wallet_balance < 0.2 ? (
                        <div className="wallet-details-container">
                          <div className="wallet-details-items">
                            <span className="exclamation-icon">
                              <FontAwesomeIcon
                                icon={faExclamationCircle}
                              ></FontAwesomeIcon>
                            </span>
                            <span>
                              You do not have enough balance to deploy your site. To
                              deploy a site you have to have minimum 0.2 AR in your
                              wallet.
                              <Link to="/wallet/recharge">Recharge here</Link>
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="button-container">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={startDeployment}
                        disabled={deployDisabled}
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
