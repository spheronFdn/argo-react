import React, { useContext, useEffect, useRef, useState } from "react";
import "./Deployment.scss";
import { ActionContext, StateContext } from "../../../../hooks";
// import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faGlobe,
  faInfoCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IActionModel, IDomain, IStateModel } from "../../../../model/hooks.model";
import animationData from "../../../../assets/lotties/rotating-settings.json";
import socketIOClient from "socket.io-client";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { ApiService } from "../../../../services";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "javascript-time-ago";
import Lottie from "react-lottie";
import PulseLoader from "react-spinners/PulseLoader";

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

  const { currentSiteDeployConfig, currentSiteDeployLogs, selectedProject } =
    useContext<IStateModel>(StateContext);
  const { setLatestDeploymentLogs, setLatestDeploymentConfig, fetchProject } =
    useContext<IActionModel>(ActionContext);

  const [deploymentStatus, setDeploymentStatus] = useState<string>("pending");
  const [buildTime, setBuildTime] = useState<{ min: number; sec: number }>({
    min: 0,
    sec: 0,
  });
  const [paymentStatus, setPaymentStatus] = useState<string>("waiting");
  const [paymentMessage, setPaymentMessage] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<{
    providerFee: number;
    argoFee: number;
    discount: number;
    finalArgoFee: number;
  }>({ providerFee: 0, argoFee: 0, discount: 0, finalArgoFee: 0 });
  const [deployedLink, setDeployedLink] = useState<string>("");
  const [deploymentLoading, setDeploymentLoading] = useState<boolean>(true);
  const componentIsMounted = useRef(true);

  let socket: any = null;
  let deploymentSvc: any = null;

  useEffect(() => {
    fetchProject(params.siteid);
    deploymentStartup();
    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (deploymentSvc) {
        deploymentSvc.unsubscribe();
      }
      componentIsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deploymentStartup = async () => {
    setDeploymentLoading(true);
    setLatestDeploymentLogs([]);
    setDeploymentStatus("pending");
    setPaymentStatus("waiting");
    setPaymentDetails({ providerFee: 0, argoFee: 0, discount: 0, finalArgoFee: 0 });
    setBuildTime({
      min: 0,
      sec: 0,
    });
    socket = socketIOClient(config.urls.API_URL);
    deploymentSvc = ApiService.getDeployment(params.deploymentid).subscribe(
      (result) => {
        if (componentIsMounted.current) {
          const deployment = {
            githubUrl: result.deployment.project.githubUrl,
            branch: result.deployment.configuration.branch,
            createdAt: result.deployment.createdAt,
            updatedAt: result.deployment.updatedAt,
            protocol: result.deployment.configuration.protocol,
            commitHash: result.deployment.commitId,
            commitMessage: result.deployment.commitMessage,
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
          if (result.deployment.status.toLowerCase() === "pending") {
            socket.on(`deployment.${result.deployment.topic}`, (stream: any) => {
              if (stream.type === 1) {
                stream.data.split("\n").forEach((line: string) => {
                  if (line.trim()) {
                    if (
                      currentSiteDeployLogs
                        .map((l) => l.log)
                        .indexOf(line.trim()) === -1
                    ) {
                      currentSiteDeployLogs.push({
                        log: line,
                        time: moment().format("hh:mm:ss A MM-DD-YYYY"),
                      });
                    }
                  }
                });
                setDeploymentStatus("pending");
                setLatestDeploymentLogs(currentSiteDeployLogs);
                scrollToWithContainer(currentSiteDeployLogs.length - 1);
              } else if (stream.type === 2) {
                const protocolLink = stream.data.logsToCapture.sitePreview;
                setDeployedLink(protocolLink);
                setDeploymentStatus(protocolLink ? "deployed" : "failed");
                const buildMins = Number.parseInt(`${stream.data.buildTime / 60}`);
                const buildSecs = Number.parseInt(`${stream.data.buildTime % 60}`);
                setBuildTime({ min: buildMins, sec: buildSecs });
              } else if (stream.type === 3) {
                setDeployedLink("");
                setDeploymentStatus("failed");
                setBuildTime({ min: 0, sec: 0 });
              }
            });
          } else {
            setDeployedLink(result.deployment.sitePreview);
            setDeploymentStatus(result.deployment.status.toLowerCase());
            const buildMins = Number.parseInt(`${result.deployment.buildTime / 60}`);
            const buildSecs = Number.parseInt(`${result.deployment.buildTime % 60}`);
            setBuildTime({ min: buildMins, sec: buildSecs });
          }
          const paymentSocketOpeningCondition = result.deployment.payment
            ? result.deployment.payment.status !== "success" &&
              result.deployment.payment.status !== "failed"
            : true;
          if (paymentSocketOpeningCondition) {
            if (result.deployment.payment) {
              setPaymentStatus(result.deployment.payment.status);
            }
            socket.on(`payment.${result.deployment.topic}`, (stream: any) => {
              if (stream.type === 1) {
                setPaymentStatus("started");
              } else if (stream.type === 2) {
                const paymentDetails = stream.payload;
                if (paymentDetails.status === "success") {
                  setPaymentDetails(paymentDetails);
                } else {
                  setPaymentMessage(paymentDetails.failedMessage);
                }
                setPaymentStatus(paymentDetails.status);
              }
            });
          } else {
            if (result.deployment.payment.status === "success") {
              const paymentDetails = {
                providerFee: result.deployment.payment.providerFee,
                argoFee: result.deployment.payment.argoFee,
                discount: result.deployment.payment.discount,
                finalArgoFee: result.deployment.payment.finalArgoFee,
              };
              setPaymentDetails(paymentDetails);
              setPaymentStatus("success");
            } else {
              setPaymentStatus("failed");
              setPaymentMessage(result.deployment.payment.failedMessage);
            }
          }
          setDeploymentLoading(false);
        }
      },
    );
  };

  let displayGithubRepo = "";
  let githubBranchLink = "";
  let githubCommitLink = "";
  if (currentSiteDeployConfig) {
    displayGithubRepo = currentSiteDeployConfig.githubUrl.substring(
      19,
      currentSiteDeployConfig.githubUrl.length - 4,
    );

    githubBranchLink = `${currentSiteDeployConfig.githubUrl.substring(
      0,
      currentSiteDeployConfig.githubUrl.length - 4,
    )}/tree/${currentSiteDeployConfig.branch}`;

    githubCommitLink = `${currentSiteDeployConfig.githubUrl.substring(
      0,
      currentSiteDeployConfig.githubUrl.length - 4,
    )}/commit/${currentSiteDeployConfig.commitHash}`;
  }

  const domains =
    selectedProject && deployedLink
      ? selectedProject.domains.filter((d) => deployedLink.indexOf(d.link) !== -1)
      : [];

  const subdomains =
    selectedProject && deployedLink
      ? selectedProject.subdomains.filter((d) => deployedLink.indexOf(d.link) !== -1)
      : [];

  const hnsDomains =
    selectedProject && deployedLink
      ? selectedProject.handshakeDomains.filter(
          (d) => deployedLink.indexOf(d.link) !== -1,
        )
      : [];

  const hnsSubdomains =
    selectedProject && deployedLink
      ? selectedProject.handshakeSubdomains.filter(
          (d) => deployedLink.indexOf(d.link) !== -1,
        )
      : [];

  const isDomainOrSubPresent =
    [...domains, ...subdomains, ...hnsDomains, ...hnsSubdomains].length > 0;

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

  const showProtocolImage = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return (
          <img
            src={require("../../../../assets/png/ar_light.png")}
            alt="arweave"
            className="site-deployment-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
      case "skynet":
        return (
          <img
            src={require("../../../../assets/png/skynet.png")}
            alt="skynet"
            className="site-deployment-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );

      default:
        return (
          <img
            src={require("../../../../assets/png/question_mark.png")}
            alt="?"
            className="site-deployment-logo"
            height={24}
            width={24}
            loading="lazy"
          />
        );
    }
  };

  const showProtocolText = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return (
          <span className="site-deployment-link">
            Deploying on Arweave, Preview in a minute
          </span>
        );
      case "skynet":
        return (
          <span className="site-deployment-link">
            Deploying on Skynet, Preview in a minute
          </span>
        );

      default:
        return (
          <span className="site-deployment-link">
            Cannot find Protocol to Deploy
          </span>
        );
    }
  };

  const showProtocolPrice = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return <span>{paymentDetails?.providerFee || 0} AR</span>;
      case "skynet":
        return <span>{paymentDetails?.providerFee || 0} SIA</span>;

      default:
        return <span>{paymentDetails?.providerFee || 0} ?</span>;
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
                <span>
                  {deploymentStatus === "pending"
                    ? "Deploy in Progress"
                    : deploymentStatus === "deployed"
                    ? "Deployment successful"
                    : "Deployment failed"}
                </span>
                {deploymentStatus === "pending" ? (
                  <Lottie options={defaultOptions} height={54} width={76} />
                ) : deploymentStatus === "deployed" ? (
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
                ) : deploymentStatus === "failed" ? (
                  <LazyLoadedImage height={24} once>
                    <img
                      src={require("../../../../assets/svg/error.svg")}
                      alt="rocket"
                      className="rocket-icon"
                      height={24}
                      width={24}
                      loading="lazy"
                    />
                  </LazyLoadedImage>
                ) : null}
              </>
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </h2>
          <p className="site-deployment-card-header-description">
            {!deploymentLoading ? (
              <>
                <u>Production</u>: {currentSiteDeployConfig?.branch}
                {currentSiteDeployConfig.commitHash ? (
                  <>
                    @
                    <a
                      href={githubCommitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="commit-link"
                    >
                      {currentSiteDeployConfig.commitHash.substr(0, 7)}{" "}
                      {currentSiteDeployConfig.commitMessage
                        ? `- ${currentSiteDeployConfig.commitMessage.substr(
                            0,
                            84,
                          )}...`
                        : ""}
                    </a>
                  </>
                ) : null}
              </>
            ) : (
              <Skeleton width={400} duration={2} />
            )}
          </p>
          <p className="site-deployment-card-header-description">
            {!deploymentLoading ? (
              <>
                {deploymentStatus === "pending"
                  ? currentSiteDeployLogs[0]?.time
                    ? `Deployment started ${timeAgo.format(
                        moment(`${currentSiteDeployConfig.createdAt}`).toDate(),
                      )}`
                    : null
                  : `Deployment done at ${moment(
                      currentSiteDeployConfig.updatedAt,
                    ).format("MMM DD, YYYY hh:mm a")}`}
              </>
            ) : (
              <Skeleton width={400} duration={2} />
            )}
          </p>
        </div>
        <div className="site-deployment-card-content">
          {isDomainOrSubPresent && (
            <div className="site-deployment-card-fields">
              <span className="site-deployment-github-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              {!deploymentLoading ? (
                <>
                  {domains.map((d: IDomain, i: number, a: IDomain[]) => (
                    <>
                      <a
                        href={`https://${d.name}`}
                        className="site-deployment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {d.name}
                      </a>
                      {(i !== a.length - 1 ||
                        subdomains.length > 0 ||
                        hnsDomains.length > 0 ||
                        hnsSubdomains.length > 0) && (
                        <span className="comma-sep">,</span>
                      )}
                    </>
                  ))}
                  {subdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                    <>
                      <a
                        href={`https://${s.name}`}
                        className="site-deployment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                      {(i !== a.length - 1 ||
                        hnsDomains.length > 0 ||
                        hnsSubdomains.length > 0) && (
                        <span className="comma-sep">,</span>
                      )}
                    </>
                  ))}
                  {hnsDomains.map((s: IDomain, i: number, a: IDomain[]) => (
                    <>
                      <a
                        href={`http://${s.name}`}
                        className="site-deployment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                      {(i !== a.length - 1 || hnsSubdomains.length > 0) && (
                        <span className="comma-sep">,</span>
                      )}
                    </>
                  ))}
                  {hnsSubdomains.map((s: IDomain, i: number, a: IDomain[]) => (
                    <>
                      <a
                        href={`http://${s.name}`}
                        className="site-deployment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                      {i !== a.length - 1 && <span className="comma-sep">,</span>}
                    </>
                  ))}
                </>
              ) : (
                <Skeleton width={300} duration={2} />
              )}
            </div>
          )}
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
              {showProtocolImage(currentSiteDeployConfig?.protocol)}
            </LazyLoadedImage>
            {!deploymentLoading ? (
              deploymentStatus === "deployed" ? (
                <a
                  href={deployedLink}
                  className="site-deployment-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview deploy
                </a>
              ) : deploymentStatus === "pending" ? (
                showProtocolText(currentSiteDeployConfig?.protocol)
              ) : (
                <span className="site-deployment-link">
                  Deploying failed, no link available
                </span>
              )
            ) : (
              <Skeleton width={200} duration={2} />
            )}
          </div>
        </div>
      </div>
      {deploymentStatus !== "pending" && (
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
              {(buildTime?.min !== 0 || buildTime?.sec !== 0) && (
                <div className="deploy-summary-item-info-description">
                  Build started at {currentSiteDeployLogs[0]?.time} and ended at{" "}
                  {currentSiteDeployLogs[currentSiteDeployLogs.length - 1]?.time}.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {deploymentStatus !== "pending" && (
        <div className="site-deployment-card-container deploy-container">
          <div className="site-deployment-header-title">Payment Summary</div>
          <div className="site-deployment-body">
            {paymentStatus === "waiting" && (
              <div className="payment-loading">
                <span>
                  <PulseLoader size={20} color={"#3664ae"} />
                </span>
                <span>Waiting for the payment to be processed...</span>
              </div>
            )}
            {paymentStatus === "started" && (
              <div className="payment-loading">
                <span>
                  <PulseLoader size={20} color={"#3664ae"} />
                </span>
                <span>Processing Payment...</span>
              </div>
            )}
            {paymentStatus === "failed" && (
              <div className="payment-failed">
                <span>
                  <LazyLoadedImage height={24} once>
                    <img
                      src={require("../../../../assets/svg/error.svg")}
                      alt="rocket"
                      className="rocket-icon"
                      height={36}
                      width={36}
                      loading="lazy"
                    />
                  </LazyLoadedImage>
                </span>
                <span>{paymentMessage}</span>
              </div>
            )}
            {paymentStatus === "success" && (
              <>
                <div className="site-deployment-body-item">
                  <label>Build Time:</label>
                  <span>
                    {buildTime?.min}m {buildTime?.sec}s
                  </span>
                </div>
                <div className="site-deployment-body-item">
                  <label>Provider Fee:</label>
                  {showProtocolPrice(currentSiteDeployConfig?.protocol)}
                </div>
                <div className="site-deployment-body-item">
                  <label>Total Fee:</label>
                  <span>{paymentDetails?.argoFee || 0} $DAI</span>
                </div>
                <div className="site-deployment-body-item">
                  <label>Discount:</label>
                  <span>{paymentDetails?.discount || 0} $DAI</span>
                </div>
                <div className="site-deployment-body-item">
                  <label>Final Payment:</label>
                  <span>{paymentDetails?.finalArgoFee || 0} $DAI</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div
        className="site-deployment-card-container deploy-container"
        id="deploy-logs-container"
      >
        <div className="card-header-title deploy-logs-card-title">
          <div className="card-header-deploy-title-container">
            <div className="card-header-deploy-title">Deploy Logs</div>
            <div className="card-header-deploy-subtitle">
              Please note that the realtime log streaming may not show all the logs
              based on your connection bandwidth. Please refresh if you don't see
              some logs
            </div>
          </div>
          {/* <button className="copy-to-clipboard-button">Copy to clipboard</button> */}
          <div className="refresh-control" onClick={deploymentStartup}>
            <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
          </div>
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
                  {currLog.log.indexOf("https://arweave.net/") !== -1 ||
                  currLog.log.indexOf("https://siasky.net/") !== -1 ? (
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
