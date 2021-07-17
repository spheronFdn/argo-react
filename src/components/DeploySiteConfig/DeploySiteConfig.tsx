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
  faInfoCircle,
  faTimesCircle,
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
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from "react-tooltip";

const MemoRepoOrgDropdown = React.memo(RepoOrgDropdown);
const MemoRepoItem = React.memo(RepoItem);

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function DeploySiteConfig() {
  const history = useHistory();

  const {
    user,
    selectedOrg,
    selectedRepoForTriggerDeployment,
    orgLoading,
    userLoading,
  } = useContext<IStateModel>(StateContext);
  const { setLatestDeploymentConfig, setSelectedOrganization } =
    useContext<IActionModel>(ActionContext);

  const [createDeployProgress, setCreateDeployProgress] = useState(1);
  const [showRepoOrgDropdown, setShowRepoOrgDropdown] = useState<boolean>(false);
  const [reposOwnerDetails, setReposOwnerDetails] = useState<any[]>([]);
  const [reposSelectedOwnerRepoDetails, setReposSelectedOwnerRepoDetails] = useState<
    any[]
  >([]);
  const [selectedRepoOwner, setSelectedRepoOwner] = useState<any>();
  const [currentRepoOwner, setCurrentRepoOwner] = useState<string>("");
  const [ownerLoading, setOwnerLoading] = useState<boolean>(true);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const [repoBranches, setRepoBranches] = useState<any[]>([]);
  const [buildEnv, setBuildEnv] = useState<any[]>([]);
  const [repoBranchesLoading, setRepoBranchesLoading] = useState<boolean>(true);

  // const [autoPublish, setAutoPublish] = useState<boolean>(true);
  const [selectedRepo, setSelectedRepo] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [branch, setBranch] = useState<string>("master");
  const [workspace, setWorkspace] = useState<string>();
  const [framework, setFramework] = useState<string>("react");
  const [packageManager, setPackageManager] = useState<string>("npm");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  const [startDeploymentLoading, setStartDeploymentLoading] =
    useState<boolean>(false);
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
      framework !== "static" &&
      packageManager &&
      buildCommand &&
      publishDirectory &&
      protocol &&
      selectedOrg?.wallet &&
      !orgLoading
    ) {
      setDeployDisabled(false);
    } else {
      if (
        selectedRepo &&
        owner &&
        branch &&
        framework === "static" &&
        protocol &&
        selectedOrg?.wallet &&
        !orgLoading
      ) {
        setDeployDisabled(false);
      } else {
        setDeployDisabled(true);
      }
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
    selectedOrg,
    orgLoading,
    protocol,
  ]);

  useEffect(() => {
    if (framework === "static") {
      setPackageManager("");
      setBuildCommand("");
      setPublishDirectory("");
    } else if (framework === "react") {
      setPackageManager("npm");
      setBuildCommand("build");
      setPublishDirectory("build");
    } else if (framework === "vue") {
      setPackageManager("npm");
      setBuildCommand("build");
      setPublishDirectory("dist");
    } else if (framework === "angular") {
      setPackageManager("npm");
      setBuildCommand("build");
      setPublishDirectory("dist/your-app-name");
    } else if (framework === "next") {
      setPackageManager("yarn");
      setBuildCommand("next build && next export");
      setPublishDirectory("out");
    }
  }, [framework]);

  useEffect(() => {
    if (selectedOrg) {
      setOwner(selectedOrg);
    } else if (user?.organizations && user.organizations[0]) {
      setOwner(user.organizations[0]);
    }
  }, [user, selectedOrg]);

  useEffect(() => {
    if (selectedRepoForTriggerDeployment) {
      const repoName = selectedRepoForTriggerDeployment.github_url
        .substring(19, selectedRepoForTriggerDeployment.github_url.length - 4)
        .split("/")[1];
      const ownerName = selectedRepoForTriggerDeployment.github_url
        .substring(19, selectedRepoForTriggerDeployment.github_url.length - 4)
        .split("/")[0];

      setSelectedRepo({
        name: repoName,
        clone_url: selectedRepoForTriggerDeployment.github_url,
      });
      setCurrentRepoOwner(ownerName);
      setFramework(selectedRepoForTriggerDeployment.framework);
      setWorkspace(selectedRepoForTriggerDeployment.workspace);
      setPackageManager(selectedRepoForTriggerDeployment.package_manager);
      setBuildCommand(selectedRepoForTriggerDeployment.build_command);
      setPublishDirectory(selectedRepoForTriggerDeployment.publish_dir);
      setProtocol(selectedRepoForTriggerDeployment.protocol);
      setCreateDeployProgress(3);

      const branchUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
      ApiService.getGithubRepoBranches(branchUrl).subscribe((res) => {
        if (componentIsMounted.current) {
          setRepoBranches(res.branches);
          setBranch(selectedRepoForTriggerDeployment.branch);
          setRepoBranchesLoading(false);
        }
      });
    }
  }, [selectedRepoForTriggerDeployment]);

  useEffect(() => {
    if (currentRepoOwner && selectedRepoForTriggerDeployment) {
      ApiService.getAllGithubAppInstallation().subscribe((res) => {
        if (componentIsMounted.current) {
          const repoOwners: any[] = res.installations.map((installation: any) => ({
            name: installation.account.login,
            avatar: installation.account.avatar_url,
            installationId: installation.id,
          }));
          if (repoOwners.length) {
            const newRepoOwner = repoOwners.filter(
              (repoOwner) => repoOwner.name === currentRepoOwner,
            )[0];
            setSelectedRepoOwner(newRepoOwner);
          }
        }
      });
    }
  }, [currentRepoOwner, selectedRepoForTriggerDeployment]);

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
        if (repoOwners.length) {
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
        } else {
          setOwnerLoading(false);
        }
      }
    });
  };

  const getOwnerRepos = (installationId: string) => {
    setRepoLoading(true);
    ApiService.getAllOwnerRepos(installationId).subscribe((res) => {
      if (componentIsMounted.current) {
        const repositories: any[] = res.repositories.map((repo: any) => ({
          clone_url: repo.clone_url,
          branches_url: repo.branches_url.split("{")[0],
          name: repo.name,
          fullName: repo.full_name,
          private: repo.private,
          repositoryId: repo.id,
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
    setRepoBranchesLoading(true);
    ApiService.getGithubRepoBranches(repo.branches_url).subscribe((res) => {
      if (componentIsMounted.current) {
        setRepoBranches(res.branches);
        setBranch(res.branches[0].name);
        setRepoBranchesLoading(false);
      }
    });
  };

  const startDeployment = async () => {
    setStartDeploymentLoading(true);
    const configuration = {
      framework,
      workspace,
      packageManager,
      buildCommand,
      publishDir: publishDirectory,
      branch,
      protocol,
    };
    ApiService.createConfiguration(configuration).subscribe((result) => {
      if (componentIsMounted.current) {
        const uniqueTopicId = uuidv4();

        const deployment = {
          githubUrl: selectedRepo.clone_url,
          folderName: selectedRepo.name,
          owner: selectedRepoOwner.name,
          installationId: selectedRepoOwner.installationId,
          repositoryId: selectedRepo.repositoryId,
          organizationId: owner._id,
          uniqueTopicId,
          auto_publish: false,
          configurationId: result._id,
          env: mapBuildEnv(buildEnv),
        };

        ApiService.startDeployment(deployment).subscribe((result) => {
          if (componentIsMounted.current) {
            setLatestDeploymentConfig(deployment);
            setStartDeploymentLoading(false);
            history.push(
              `/org/${selectedOrg?._id}/sites/${result.projectId}/deployments/${result.deploymentId}`,
            );
          }
        });
      }
    });
  };

  const mapBuildEnv = (buildEnv: any[]): any => {
    const buildEnvObj = {};
    buildEnv.forEach((env) => {
      Object.assign(buildEnvObj, { [env.key]: env.value });
    });
    return buildEnvObj;
  };

  const openGithubAppAuth = async () => {
    const githubSignInUrl = `${window.location.origin}/#/github/app/${user?._id}`;
    window.open(githubSignInUrl, "_blank");
  };

  const goBackAction = () => {
    if (createDeployProgress === 1) {
      history.goBack();
    } else if (createDeployProgress === 2) {
      setCreateDeployProgress(1);
    } else {
      setCreateDeployProgress(2);
    }
  };

  let buildCommandPrefix: string = "";
  if (packageManager === "npm") {
    buildCommandPrefix = "npm run";
  } else {
    buildCommandPrefix = "yarn";
  }

  const selectProtocol = (selectedProtocol: string) => {
    setProtocol(selectedProtocol);
    setCreateDeployProgress(3);
  };

  const addBuildEnv = () => {
    setBuildEnv([...buildEnv, { key: "", value: "" }]);
  };

  const removeBuildEnvItem = (id: number) => {
    setBuildEnv(buildEnv.filter((item, i) => i !== id));
  };

  const fillEnvKey = (value: string, id: number) => {
    setBuildEnv(
      buildEnv.map((item, i) =>
        i === id ? { key: value, value: item.value } : item,
      ),
    );
  };

  const fillEnvValue = (value: string, id: number) => {
    setBuildEnv(
      buildEnv.map((item, i) => (i === id ? { key: item.key, value } : item)),
    );
  };

  return (
    <div className="DeploySiteConfig">
      <RootHeader parent={"DeploySiteConfig"} />
      <main className="app-main">
        <div className="deploy-site-container">
          <div className="deploy-site-card">
            <div className="deploy-site-card-inner">
              <div className="go-back" onClick={goBackAction}>
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
                    Pick a Protocol
                  </div>
                </div>
                <div className="deploy-site-progress-number-container">
                  {createDeployProgress <= 3 ? (
                    <div
                      className={`deploy-site-progress-number ${
                        createDeployProgress === 3 ? "active" : ""
                      }`}
                    >
                      3
                    </div>
                  ) : (
                    <div className="deploy-site-progress-done">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                  <div
                    className={`deploy-site-progress-text ${
                      createDeployProgress === 3
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
                            disabled={userLoading}
                            onClick={openGithubAppAuth}
                          >
                            <span className="github-icon">
                              <GithubIcon />
                            </span>
                            <span>Github</span>
                          </button>
                        </div>
                      </div>
                    ) : reposOwnerDetails.length || ownerLoading ? (
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
                    ) : (
                      <div className="deployment-provider-container">
                        <div className="deployment-provider-title">
                          You don't have any configured owner, Configure it now to
                          view your repositories
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
                    )}
                  </div>
                )}
                {createDeployProgress === 2 && (
                  <>
                    <div className="deploy-site-form-item">
                      <label className="deploy-site-item-title">
                        Select the protocol to deploy {selectedRepo.name}
                      </label>
                      <label className="deploy-site-item-subtitle">
                        Click on the protocol in which you want ArGo to deploy your
                        site.
                      </label>
                      <div className="deploy-protocol-list-container">
                        <ul className="deploy-protocol-list">
                          <div
                            className="deploy-protocol-image"
                            onClick={(e) => selectProtocol("arweave")}
                          >
                            <LazyLoadedImage height={50} once>
                              <img
                                src={require("../../assets/png/arweave_logo.png")}
                                alt="Arweave"
                                className="deploy-protocol-item-avatar"
                                height={50}
                                width={200}
                                loading="lazy"
                              />
                            </LazyLoadedImage>
                          </div>
                          <div
                            className="deploy-protocol-image"
                            onClick={(e) => selectProtocol("skynet")}
                          >
                            <LazyLoadedImage height={50} once>
                              <img
                                src={require("../../assets/png/skynet_logo.png")}
                                alt="Skynet"
                                className="deploy-protocol-item-avatar"
                                height={50}
                                width={200}
                                loading="lazy"
                              />
                            </LazyLoadedImage>
                            <div className="new-protocol-tag">New</div>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <div className="button-container">
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
                {createDeployProgress === 3 && (
                  <>
                    <ReactTooltip />
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
                          <div className="deploy-site-item-select-container">
                            <select
                              className="deploy-site-item-select"
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                            >
                              {repoBranches.map((branch, index) => (
                                <option value={branch.name} key={index}>
                                  {branch.name}
                                </option>
                              ))}
                            </select>
                            <span className="select-down-icon">
                              {!repoBranchesLoading ? (
                                <FontAwesomeIcon icon={faChevronDown} />
                              ) : (
                                <BounceLoader
                                  size={20}
                                  color={"#0a3669"}
                                  loading={true}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="deploy-site-item-form-item">
                          <label>
                            Workspace to deploy
                            <span
                              className="tooltip"
                              data-tip="If your app is a monorepo, then you can specify your app directory you want to deploy using the workspace."
                            >
                              <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                            </span>
                          </label>
                          <input
                            type="text"
                            className="deploy-site-item-input"
                            value={workspace}
                            onChange={(e) => setWorkspace(e.target.value)}
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
                          <label>
                            Framework
                            <span
                              className="tooltip"
                              data-tip="The framework that your app is built upon."
                            >
                              <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                            </span>
                          </label>
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
                              <option value="angular">Angular App</option>
                              {protocol !== "skynet" && (
                                <option value="next">Next.js App</option>
                              )}
                            </select>
                            <span className="select-down-icon">
                              <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                          </div>
                        </div>
                        {framework !== "static" && (
                          <>
                            <div className="deploy-site-item-form-item">
                              <label>
                                Package Manager
                                <span
                                  className="tooltip"
                                  data-tip="The package manager that you want your app to be built with."
                                >
                                  <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                                </span>
                              </label>
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
                              <label>
                                Build command
                                <span
                                  className="tooltip"
                                  data-tip="The command your frontend framework provides for compiling your code."
                                >
                                  <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                                </span>
                              </label>
                              {framework !== "next" ? (
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
                                <input
                                  type="text"
                                  className="deploy-site-item-input"
                                  value={buildCommand}
                                  onChange={(e) => setBuildCommand(e.target.value)}
                                />
                              )}
                            </div>
                            <div className="deploy-site-item-form-item">
                              <label>
                                Publish directory
                                <span
                                  className="tooltip"
                                  data-tip="The directory in which your compiled frontend will be located."
                                >
                                  <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                                </span>
                              </label>
                              <input
                                type="text"
                                className="deploy-site-item-input"
                                value={publishDirectory}
                                onChange={(e) => setPublishDirectory(e.target.value)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="deploy-site-form-item">
                      <label className="deploy-site-item-title">
                        Advanced build settings
                      </label>
                      <label className="deploy-site-item-subtitle">
                        Define environment variables for more control and flexibility
                        over your build.
                      </label>
                      <div className="deploy-site-item-form">
                        <div className="deploy-site-item-form-item">
                          <label>Environment Variables</label>
                          <label className="deploy-site-item-subtitle">
                            Note that adding environment variables here won't work if
                            project already exists, you have to add environment
                            variables by going to your Project Settings {"->"}{" "}
                            Environment Variables
                          </label>
                        </div>
                        {buildEnv.length !== 0 && (
                          <div className="deploy-site-item-form-item">
                            <div className="deploy-site-env-title">
                              <label className="deploy-site-env-title-item">
                                Key
                              </label>
                              <label className="deploy-site-env-title-item">
                                Value
                              </label>
                            </div>
                            {buildEnv.map((env, i) => (
                              <div
                                className="deploy-site-item-env-container"
                                key={i}
                              >
                                <input
                                  type="text"
                                  className="deploy-site-env-input"
                                  placeholder="VARIABLE_NAME"
                                  value={env.key}
                                  onChange={(e) => fillEnvKey(e.target.value, i)}
                                />
                                <input
                                  type="text"
                                  className="deploy-site-env-input"
                                  placeholder="somevalue"
                                  value={env.value}
                                  onChange={(e) => fillEnvValue(e.target.value, i)}
                                />
                                <span
                                  className="remove-env-item"
                                  onClick={(e) => removeBuildEnvItem(i)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTimesCircle}
                                  ></FontAwesomeIcon>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          className="add-new-var-button"
                          onClick={(e) => addBuildEnv()}
                        >
                          New Variable
                        </button>
                      </div>
                      {!selectedOrg?.wallet && !orgLoading ? (
                        <div className="wallet-details-container">
                          <div className="wallet-details-items">
                            <span className="exclamation-icon">
                              <FontAwesomeIcon
                                icon={faExclamationCircle}
                              ></FontAwesomeIcon>
                            </span>
                            <span>
                              You have to enable your organization wallet before you
                              can deploy your project.
                              <Link to="/dashboard/wallet">Enable now</Link>
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
                        onClick={(e) => setCreateDeployProgress(2)}
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
