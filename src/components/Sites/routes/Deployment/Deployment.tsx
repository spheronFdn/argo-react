import React, { useContext, useEffect, useRef, useState } from "react";
import "./Deployment.scss";
import { ActionContext, StateContext } from "../../../../hooks";
// import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { IActionModel, IStateModel } from "../../../../model/hooks.model";
import animationData from "../../../../assets/lotties/rotating-settings.json";
import socketIOClient from "socket.io-client";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { ApiService } from "../../../../services";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "javascript-time-ago";
import Lottie from "react-lottie";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";
import config from "../../../../config";
import { LazyLoadedImage } from "../../../_SharedComponents";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

const Deployment = () => {
  const timeAgo = new TimeAgo("en-US");

  const history = useHistory();
  const params = useParams<any>();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  const { currentSiteDeployConfig, currentSiteDeployLogs } = useContext<IStateModel>(
    StateContext,
  );
  const {
    setLatestDeploymentLogs,
    setLatestDeploymentConfig,
    fetchProject,
  } = useContext<IActionModel>(ActionContext);

  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [buildTime, setBuildTime] = useState<any>({ min: 0, sec: 0 });
  const [deployedLink, setDeployedLink] = useState<string>("");
  const [deploymentLoading, setDeploymentLoading] = useState<boolean>(true);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    setLatestDeploymentLogs([]);
    const socket = socketIOClient(config.urls.BACKEND_URL);
    const deploymentSvc = ApiService.getDeployment(params.deploymentid).subscribe(
      (result) => {
        if (componentIsMounted.current) {
          const deployment = {
            github_url: result.deployment.github_url,
            branch: result.deployment.branch,
            createdAt: result.deployment.createdAt,
          };
          setLatestDeploymentConfig(deployment);
          currentSiteDeployLogs.splice(0, currentSiteDeployLogs.length);
          result.deployment.logs.forEach((logItem: any) => {
            logItem.log.split("\n").forEach((line: string) => {
              if (line.trim()) {
                currentSiteDeployLogs.push({
                  log: line,
                  time: moment(logItem.time).format("hh:mm:ss A MM-DD-YYYY"),
                });
              }
            });
            setLatestDeploymentLogs(currentSiteDeployLogs);
            scrollToWithContainer(currentSiteDeployLogs.length - 1);
          });
          if (result.deployment.deploymentStatus.toLowerCase() === "pending") {
            socket.on(result.deployment.topic, (data: any) => {
              data.split("\n").forEach((line: string) => {
                if (line.trim()) {
                  currentSiteDeployLogs.push({
                    log: line,
                    time: moment().format("hh:mm:ss A MM-DD-YYYY"),
                  });
                }
              });
              setLatestDeploymentLogs(currentSiteDeployLogs);
              scrollToWithContainer(currentSiteDeployLogs.length - 1);
              if (
                currentSiteDeployLogs.length &&
                currentSiteDeployLogs[currentSiteDeployLogs.length - 1].log.indexOf(
                  "https://arweave.net/",
                ) !== -1
              ) {
                setIsDeployed(true);
                const arweaveLink = currentSiteDeployLogs[
                  currentSiteDeployLogs.length - 1
                ].log.trim();
                setDeployedLink(arweaveLink);
                const buildMins = Number.parseInt(
                  `${
                    moment
                      .duration(moment().diff(moment(currentSiteDeployLogs[0].time)))
                      .asSeconds() / 60
                  }`,
                );
                const buildSecs = Number.parseInt(
                  `${
                    moment
                      .duration(moment().diff(moment(currentSiteDeployLogs[0].time)))
                      .asSeconds() % 60
                  }`,
                );
                setBuildTime({ min: buildMins, sec: buildSecs });
              }
            });
            // CLEAN UP THE EFFECT
          } else {
            setDeployedLink(result.deployment.sitePreview);
            setIsDeployed(true);
            const buildMins = Number.parseInt(
              `${
                moment
                  .duration(
                    moment(
                      currentSiteDeployLogs[currentSiteDeployLogs.length - 1].time,
                    ).diff(moment(currentSiteDeployLogs[0].time)),
                  )
                  .asSeconds() / 60
              }`,
            );
            const buildSecs = Number.parseInt(
              `${
                moment
                  .duration(
                    moment(
                      currentSiteDeployLogs[currentSiteDeployLogs.length - 1].time,
                    ).diff(moment(currentSiteDeployLogs[0].time)),
                  )
                  .asSeconds() % 60
              }`,
            );
            setBuildTime({ min: buildMins, sec: buildSecs });
          }
          setDeploymentLoading(false);
        }
      },
    );
    return () => {
      socket.disconnect();
      deploymentSvc.unsubscribe();
      componentIsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let displayGithubRepo = "";
  let githubBranchLink = "";
  if (currentSiteDeployConfig) {
    displayGithubRepo = currentSiteDeployConfig.github_url.substring(
      19,
      currentSiteDeployConfig.github_url.length - 4,
    );

    githubBranchLink = `${currentSiteDeployConfig.github_url.substring(
      0,
      currentSiteDeployConfig.github_url.length - 4,
    )}/tree/${currentSiteDeployConfig.branch}`;
  }

  const scrollToWithContainer = (index: number) => {
    window.scrollTo({
      top: document.getElementById("deploy-logs-container")?.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    var myElement = document.getElementById(`deploy-logs-items-${index}`);
    var topPos = myElement?.offsetTop;
    if (document && document.getElementById("deploy-logs-list")) {
      (document as any).getElementById("deploy-logs-list").scrollTop = topPos
        ? topPos
        : 0;
    }
  };

  return (
    <div className="SiteDeployment">
      <div
        className="site-deployment-back"
        onClick={(e) => {
          fetchProject(params.siteid);
          history.push(`/org/${params.orgid}/sites/${params.siteid}/deployments/`);
        }}
      >
        <span>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>All Deploys</span>
      </div>
      <div className="site-deployment-card-container max-width-set">
        <div className="site-deployment-card-header">
          <h2 className="site-deployment-card-header-title">
            {!deploymentLoading ? (
              <>
                <span>{isDeployed ? "Published deploy" : "Deploy in Progress"}</span>
                {!isDeployed ? (
                  <Lottie options={defaultOptions} height={54} width={76} />
                ) : (
                  <LazyLoadedImage height={24} once>
                    <img
                      src={require("../../../../assets/svg/rocket_background.svg")}
                      alt="rocket"
                      className="rocket-icon"
                      height={24}
                      width={24}
                      loading="lazy"
                    />
                  </LazyLoadedImage>
                )}
              </>
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </h2>
          <p className="site-deployment-card-header-description">
            {!deploymentLoading ? (
              <>
                <u>Production</u>: {currentSiteDeployConfig?.branch}
                {!isDeployed
                  ? currentSiteDeployLogs[0]?.time
                    ? ` - Deployment started ${timeAgo.format(
                        moment(`${currentSiteDeployLogs[0]?.time}`).toDate(),
                      )}`
                    : null
                  : ` - Deployed at ${moment(
                      currentSiteDeployConfig.createdAt,
                    ).format("MMM DD, YYYY hh:mm a")}`}
              </>
            ) : (
              <Skeleton width={400} duration={2} />
            )}
          </p>
        </div>
        <div className="site-deployment-card-content">
          <div className="site-deployment-card-fields">
            <span className="site-deployment-github-icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            {!deploymentLoading ? (
              <a
                href={githubBranchLink}
                className="site-deployment-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {displayGithubRepo} (branch: {currentSiteDeployConfig?.branch})
              </a>
            ) : (
              <Skeleton width={300} duration={2} />
            )}
          </div>
          <div className="site-deployment-card-fields">
            <LazyLoadedImage height={24} once>
              <img
                src={require("../../../../assets/png/ar_light.png")}
                alt="github"
                className="site-deployment-logo"
                height={24}
                width={24}
                loading="lazy"
              />
            </LazyLoadedImage>

            {!deploymentLoading ? (
              isDeployed ? (
                <a
                  href={deployedLink}
                  className="site-deployment-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview deploy on Arweave
                </a>
              ) : (
                <span className="site-deployment-link">
                  Deploying on Arweave, Preview in a minute
                </span>
              )
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </div>
        </div>
      </div>
      {isDeployed && (
        <div className="site-deployment-card-container deploy-container">
          <div className="site-deployment-header-title">Deploy Summary</div>
          <div className="deploy-summary-item">
            <div className="deploy-summary-item-info-icon">
              <FontAwesomeIcon icon={faInfoCircle} />
            </div>
            <div className="deploy-summary-item-info-container">
              <div className="deploy-summary-item-info-title">
                Total time to Build & Deploy: {buildTime?.min}m {buildTime?.sec}s
              </div>
              <div className="deploy-summary-item-info-description">
                Build started at {currentSiteDeployLogs[0]?.time} and ended at{" "}
                {currentSiteDeployLogs[currentSiteDeployLogs.length - 1]?.time}.
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="site-deployment-card-container deploy-container"
        id="deploy-logs-container"
      >
        <div className="card-header-title deploy-logs-card-title">
          <span className="card-header-deploy-title">Deploy Logs</span>
          {/* <button className="copy-to-clipboard-button">Copy to clipboard</button> */}
        </div>
        <div className="deploy-logs-container" id="deploy-logs-list">
          {
            <div className="deploy-logs-items" id={`deploy-logs-items-${1}`} key={1}>
              {currentSiteDeployLogs?.map((currLog, i) => (
                <div
                  className="deploy-logs-items"
                  id={`deploy-logs-items-${i}`}
                  key={i}
                >
                  {currLog.time}:{" "}
                  {currLog.log.indexOf("https://arweave.net/") !== -1 ? (
                    <a
                      href={currLog.log.trim()}
                      className="log-site-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {currLog.log}
                    </a>
                  ) : (
                    currLog.log
                  )}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Deployment;
