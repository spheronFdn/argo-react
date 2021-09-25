import React, { useContext, useEffect, useRef, useState } from "react";
import "./ContinuousDeployment.scss";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import WebhookItem from "./components/WebhookItem";
import BounceLoader from "react-spinners/BounceLoader";
import { ApiService } from "../../../../../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const ContinuousDeployment = () => {
  const { selectedProject, projectLoading, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [repoBranches, setRepoBranches] = useState<any[]>([]);
  const [repoBranchesLoading, setRepoBranchesLoading] = useState<boolean>(true);
  const [addWebhookLoading, setAddWebhookLoading] = useState<boolean>(false);

  const [installationId, setInstallationId] = useState<number>(0);

  const [branch, setBranch] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [workspace, setWorkspace] = useState<string>("");
  const [framework, setFramework] = useState<string>("static");
  const [packageManager, setPackageManager] = useState<string>("npm");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [publishDirectory, setPublishDirectory] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");

  const [webhookDisabled, setWebhookDisabled] = useState<boolean>(false);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  let buildCommandPrefix: string = "";
  if (packageManager === "npm") {
    buildCommandPrefix = "npm run";
  } else {
    buildCommandPrefix = "yarn";
  }

  useEffect(() => {
    if (
      name &&
      branch &&
      framework !== "static" &&
      packageManager &&
      buildCommand &&
      publishDirectory &&
      protocol &&
      installationId
    ) {
      setWebhookDisabled(false);
    } else {
      if (name && branch && framework === "static" && protocol && installationId) {
        setWebhookDisabled(false);
      } else {
        setWebhookDisabled(true);
      }
    }
  }, [
    branch,
    framework,
    packageManager,
    buildCommand,
    publishDirectory,
    selectedOrg,
    protocol,
    name,
    installationId,
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
    if (selectedProject) {
      const repoName = selectedProject?.githubUrl
        .substring(19, selectedProject?.githubUrl.length - 4)
        .split("/")[1];
      const ownerName = selectedProject?.githubUrl
        .substring(19, selectedProject?.githubUrl.length - 4)
        .split("/")[0];
      const branchUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;

      ApiService.getGithubRepoBranches(branchUrl).subscribe((res) => {
        if (componentIsMounted.current) {
          setRepoBranches(res.branches);
          setBranch(res.branches[0].name);
          setRepoBranchesLoading(false);
        }
      });

      ApiService.getAllGithubAppInstallation().subscribe((res) => {
        if (componentIsMounted.current) {
          const repoOwners: any[] = res.installations.map((installation: any) => ({
            name: installation.account.login,
            avatar: installation.account.avatar_url,
            installationId: installation.id,
          }));
          if (repoOwners.length) {
            const newRepoOwner = repoOwners.filter(
              (repoOwner) => repoOwner.name === ownerName,
            )[0];
            setInstallationId(newRepoOwner.installationId);
          }
        }
      });

      const framework = selectedProject.latestDeployment?.configuration.framework;
      const protocol = selectedProject.latestDeployment?.configuration.protocol;
      setFramework(framework ? framework : "");
      setProtocol(protocol ? protocol : "");
    }
  }, [selectedProject]);

  const addWebhook = () => {
    setAddWebhookLoading(true);
    const configuration = {
      framework,
      workspace,
      packageManager,
      buildCommand,
      publishDir: publishDirectory,
      branch,
      protocol,
    };
    ApiService.createConfiguration(configuration).subscribe((confResult) => {
      if (componentIsMounted.current) {
        const webhook = {
          orgId: selectedOrg?._id,
          projectId: selectedProject?._id,
          installationId,
        };
        ApiService.connectWebhook(webhook).subscribe((result) => {
          if (componentIsMounted.current) {
            const webhookMeta = {
              orgId: selectedOrg?._id,
              name,
              projectId: selectedProject?._id,
              configurationId: confResult._id,
              installationId,
            };
            ApiService.createWebhook(webhookMeta).subscribe((result) => {
              if (componentIsMounted.current) {
                setName("");
                setBranch(repoBranches[0].name);
                setWorkspace("");
                setFramework("static");
                setPackageManager("npm");
                setBuildCommand("");
                setPublishDirectory("");
                setProtocol("");
                setAddWebhookLoading(false);
                fetchProject(`${selectedProject?._id}`);
              }
            });
          }
        });
      }
    });
  };

  return (
    <div className="ContinuousDeployment">
      <ReactTooltip />
      <div className="settings-right-container">
        <div className="settings-project-details">
          <div className="settings-project-header">Continuous Deployment</div>
          <div className="settings-project-body">
            <div className="settings-project-header-subtitle">
              Settings for Continuous Deployment from a Git repository
            </div>
            <div className="settings-project-add-webhook-conf">
              <div className="webhook-header">Add new</div>
              <div className="deploy-site-item-form">
                <div className="deploy-site-item-form-item">
                  <label>
                    Name
                    <span
                      className="tooltip"
                      data-tip="name of your CD pipeline (e.g. PROD, DEV, TESTING)."
                    >
                      <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className="deploy-site-item-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                        <BounceLoader size={20} color={"#0a3669"} loading={true} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="deploy-site-item-form-item">
                  <label>
                    Protocol
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
                      value={protocol}
                      onChange={(e) => setProtocol(e.target.value)}
                    >
                      <option value="arweave">Arweave</option>
                      <option value="skynet">Skynet</option>
                      <option value="ipfs-filecoin">IPFS-Filecoin</option>
                      <option value="ipfs-pinata">IPFS-Pinata</option>
                    </select>
                    <span className="select-down-icon">
                      <FontAwesomeIcon icon={faChevronDown} />
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
              <div className="button-container">
                <button
                  type="button"
                  className="primary-button"
                  onClick={addWebhook}
                  disabled={webhookDisabled}
                >
                  {addWebhookLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                  Add
                </button>
              </div>
            </div>
            <div>
              {!projectLoading ? (
                selectedProject?.webHooks.length ? (
                  <>
                    <div className="continuous-deployment-list-heading">
                      Your Configured Continuous Deployments
                    </div>
                    {selectedProject?.webHooks.map((hook) => (
                      <WebhookItem
                        type="filled"
                        id={hook._id}
                        name={hook.name}
                        branch={hook.branch}
                        protocol={hook.configurationId.protocol}
                        framework={hook.configurationId.framework}
                        workspace={hook.configurationId.workspace}
                        buildCommand={hook.configurationId.buildCommand}
                        publishDirectory={hook.configurationId.publishDir}
                        packageManager={hook.configurationId.packageManager}
                        selectedProject={selectedProject}
                      />
                    ))}
                  </>
                ) : null
              ) : (
                <>
                  <div className="continuous-deployment-list-heading">
                    Your Configured Continuous Deployments
                  </div>
                  <WebhookItem
                    type="skeleton"
                    id={"1"}
                    name={""}
                    branch={""}
                    protocol={""}
                    framework={""}
                    workspace={""}
                    buildCommand={""}
                    publishDirectory={""}
                    packageManager={""}
                    selectedProject={selectedProject}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuousDeployment;
