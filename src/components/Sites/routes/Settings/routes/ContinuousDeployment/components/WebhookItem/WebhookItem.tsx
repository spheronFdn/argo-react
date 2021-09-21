import React, { useContext, useEffect, useRef, useState } from "react";
import "./WebhookItem.scss";
import IWebhookItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "../../../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";
import {
  IActionModel,
  IStateModel,
} from "../../../../../../../../model/hooks.model";
import { ActionContext, StateContext } from "../../../../../../../../hooks";
import ReactTooltip from "react-tooltip";
import { LazyLoadedImage } from "../../../../../../../_SharedComponents";

const WebhookItem: React.FC<IWebhookItemProps> = ({
  id,
  name,
  branch,
  protocol,
  workspace,
  framework,
  packageManager,
  buildCommand,
  publishDirectory,
  selectedProject,
  type,
}) => {
  const { selectedOrg } = useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [editMode, setEditMode] = useState<boolean>(false);

  const [removeWebhookLoading, setRemoveWebhookLoading] = useState<boolean>(false);
  const [updateWebhookLoading, setUpdateWebhookLoading] = useState<boolean>(false);

  const [repoBranches, setRepoBranches] = useState<any[]>([]);
  const [repoBranchesLoading, setRepoBranchesLoading] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [editBranch, setEditBranch] = useState<string>("");
  const [editProtocol, setEditProtocol] = useState<string>("");
  const [editWorkspace, setEditWorkspace] = useState<string>("");
  const [editPackageManager, setEditPackageManager] = useState<string>("");
  const [editBuildCommand, setEditBuildCommand] = useState<string>("");
  const [editPublishDirectory, setEditPublishDirectory] = useState<string>("");

  const [webhookDisabled, setWebhookDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      setEditName(name);
    }
    if (branch) {
      setEditBranch(branch);
    }
    if (protocol) {
      setEditProtocol(protocol);
    }
    if (workspace) {
      setEditWorkspace(workspace);
    }
    if (packageManager) {
      setEditPackageManager(packageManager);
    }
    if (buildCommand) {
      setEditBuildCommand(buildCommand);
    }
    if (publishDirectory) {
      setEditPublishDirectory(publishDirectory);
    }
  }, [
    name,
    branch,
    protocol,
    workspace,
    packageManager,
    buildCommand,
    publishDirectory,
  ]);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      framework !== "static" &&
      (name !== editName ||
        branch !== editBranch ||
        packageManager !== editPackageManager ||
        buildCommand !== editBuildCommand ||
        publishDirectory !== editPublishDirectory ||
        protocol !== editProtocol ||
        workspace !== editWorkspace)
    ) {
      setWebhookDisabled(false);
    } else {
      if (
        framework === "static" &&
        (name !== editName ||
          branch !== editBranch ||
          protocol !== editProtocol ||
          workspace !== editWorkspace)
      ) {
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
    editName,
    editBranch,
    editPackageManager,
    editBuildCommand,
    editPublishDirectory,
    editProtocol,
    workspace,
    editWorkspace,
  ]);

  useEffect(() => {
    if (selectedProject && editMode) {
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
          setRepoBranchesLoading(false);
        }
      });
    }
  }, [selectedProject, editMode]);

  let buildCommandPrefix: string = "";
  if (packageManager === "npm") {
    buildCommandPrefix = "npm run";
  } else {
    buildCommandPrefix = "yarn";
  }

  const removeWebhook = () => {
    setRemoveWebhookLoading(true);
    ApiService.removeWebhook(id, { orgId: selectedOrg?._id }).subscribe((result) => {
      if (result.success) {
        setEditName("");
        setEditBranch("");
        setEditProtocol("");
        setEditWorkspace("");
        setEditPackageManager("");
        setEditBuildCommand("");
        setEditPublishDirectory("");
        fetchProject(`${selectedProject?._id}`);
      } else {
        setEditName("");
        setEditBranch("");
        setEditProtocol("");
        setEditWorkspace("");
        setEditPackageManager("");
        setEditBuildCommand("");
        setEditPublishDirectory("");
      }
      setRemoveWebhookLoading(false);
    });
  };

  const updateWebhook = () => {
    setUpdateWebhookLoading(true);
    const configuration = {
      framework,
      workspace: editWorkspace,
      packageManager: editPackageManager,
      buildCommand: editBuildCommand,
      publishDir: editPublishDirectory,
      branch: editBranch,
      protocol: editProtocol,
    };
    ApiService.createConfiguration(configuration).subscribe((confResult) => {
      if (componentIsMounted.current) {
        const webhookMeta = {
          orgId: selectedOrg?._id,
          name: editName !== name ? editName : undefined,
          branch: editBranch !== branch ? editBranch : undefined,
          configurationId: confResult._id,
        };
        ApiService.editWebhook(id, webhookMeta).subscribe((result) => {
          if (result.success) {
            setEditName("");
            setEditBranch("");
            setEditProtocol("");
            setEditWorkspace("");
            setEditPackageManager("");
            setEditBuildCommand("");
            setEditPublishDirectory("");
            fetchProject(`${selectedProject?._id}`);
          } else {
            setEditName("");
            setEditBranch("");
            setEditProtocol("");
            setEditWorkspace("");
            setEditPackageManager("");
            setEditBuildCommand("");
            setEditPublishDirectory("");
          }
          setUpdateWebhookLoading(false);
        });
      }
    });
  };

  return (
    <div className="webhook-item" key={id}>
      {type === "filled" && (
        <div className="webhook-item-container">
          <ReactTooltip />
          <div className="webhook-header">
            <div className="webhook-header-left">
              <div>
                <LazyLoadedImage height={24} once>
                  <img
                    src={require("../../../../../../../../assets/svg/cd.svg")}
                    alt="webhook-icon"
                    className="webhook-icon"
                    height={24}
                    width={24}
                    loading="lazy"
                  />
                </LazyLoadedImage>
              </div>
              <div>{!editMode ? name.toUpperCase() : "Edit"}</div>
            </div>
            <div className="webhook-header-right">
              {!editMode ? (
                <button className="edit-button" onClick={(e) => setEditMode(true)}>
                  Edit
                </button>
              ) : (
                <button
                  className="save-button"
                  disabled={webhookDisabled}
                  onClick={updateWebhook}
                >
                  <span style={{ marginRight: 4 }}>Save</span>
                  {updateWebhookLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                </button>
              )}
              {!editMode ? (
                <button
                  className="remove-button"
                  disabled={removeWebhookLoading}
                  onClick={removeWebhook}
                >
                  <span>Remove</span>
                  {removeWebhookLoading ? (
                    <BounceLoader size={20} color={"#ee0902"} loading={true} />
                  ) : null}
                </button>
              ) : (
                <button
                  className="cancel-button"
                  onClick={(e) => setEditMode(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          <div className="deploy-site-item-form">
            {editMode && (
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
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
            )}
            <div className="deploy-site-item-form-item">
              <label>Branch to deploy</label>
              {!editMode ? (
                <span>{branch}</span>
              ) : (
                <div className="deploy-site-item-select-container">
                  <select
                    className="deploy-site-item-select"
                    value={editBranch}
                    onChange={(e) => setEditBranch(e.target.value)}
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
              )}
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
              {!editMode ? (
                <span>{protocol}</span>
              ) : (
                <div className="deploy-site-item-select-container">
                  <select
                    className="deploy-site-item-select"
                    value={editProtocol}
                    onChange={(e) => setEditProtocol(e.target.value)}
                  >
                    <option value="arweave">Arweave</option>
                    <option value="skynet">Skynet</option>
                    <option value="skynet">filecoin</option>
                  </select>
                  <span className="select-down-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </div>
              )}
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
              {!editMode ? (
                <span>{workspace ? workspace : "N.A"}</span>
              ) : (
                <input
                  type="text"
                  className="deploy-site-item-input"
                  value={editWorkspace}
                  onChange={(e) => setEditWorkspace(e.target.value)}
                />
              )}
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
                  {!editMode ? (
                    <span>{packageManager}</span>
                  ) : (
                    <div className="deploy-site-item-select-container">
                      <select
                        className="deploy-site-item-select"
                        value={editPackageManager}
                        onChange={(e) => setEditPackageManager(e.target.value)}
                      >
                        <option value="npm">NPM</option>
                        <option value="yarn">YARN</option>
                      </select>
                      <span className="select-down-icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </div>
                  )}
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
                  {!editMode ? (
                    <span>
                      {packageManager === "npm" ? "npm run " : "yarn "}{" "}
                      {buildCommand}
                    </span>
                  ) : framework !== "next" ? (
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
                        value={editBuildCommand}
                        onChange={(e) => setEditBuildCommand(e.target.value)}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="deploy-site-item-input"
                      value={editBuildCommand}
                      onChange={(e) => setEditBuildCommand(e.target.value)}
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
                  {!editMode ? (
                    <span>{publishDirectory}</span>
                  ) : (
                    <input
                      type="text"
                      className="deploy-site-item-input"
                      value={editPublishDirectory}
                      onChange={(e) => setEditPublishDirectory(e.target.value)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {type === "skeleton" && (
        <div className="webhook-item-container">
          <div className="webhook-header">
            <Skeleton width={250} duration={2} />
          </div>
          <div className="deploy-site-item-form">
            <div className="deploy-site-item-form-item">
              <label>
                <Skeleton width={80} duration={2} />
              </label>
              <span>
                <Skeleton width={150} duration={2} />
              </span>
            </div>
            <div className="deploy-site-item-form-item">
              <label>
                <Skeleton width={80} duration={2} />
              </label>
              <span>
                <Skeleton width={150} duration={2} />
              </span>
            </div>
            <div className="deploy-site-item-form-item">
              <label>
                <Skeleton width={80} duration={2} />
              </label>
              <span>
                <Skeleton width={150} duration={2} />
              </span>
            </div>
            {framework !== "static" && (
              <>
                <div className="deploy-site-item-form-item">
                  <label>
                    <Skeleton width={80} duration={2} />
                  </label>
                  <span>
                    <Skeleton width={150} duration={2} />
                  </span>
                </div>
                <div className="deploy-site-item-form-item">
                  <label>
                    <Skeleton width={80} duration={2} />
                  </label>
                  <span>
                    <Skeleton width={150} duration={2} />
                  </span>
                </div>
                <div className="deploy-site-item-form-item">
                  <label>
                    <Skeleton width={80} duration={2} />
                  </label>
                  <span>
                    <Skeleton width={150} duration={2} />
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhookItem;
