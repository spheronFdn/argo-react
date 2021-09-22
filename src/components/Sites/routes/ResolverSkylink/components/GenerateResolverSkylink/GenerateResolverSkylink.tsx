/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import "./GenerateResolverSkylink.scss";
import {
  genKeyPairFromSeed,
  MySky,
  PermCategory,
  Permission,
  PermType,
  SkynetClient,
} from "skynet-js";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import moment from "moment";
import animationData from "../../../../../../assets/lotties/58028-tick.json";
import Lottie from "react-lottie";
import { ApiService } from "../../../../../../services";
import BounceLoader from "react-spinners/BounceLoader";
import {
  faChevronDown,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GridLoader } from "react-spinners";
import IGenerateResolverSkylinkProps from "./model";
import { RAW_SKYLINK_SIZE } from "skynet-js/dist/cjs/skylink/sia";
import config from "../../../../../../config";

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = "https://siasky.net";

// Initiate the SkynetClient
const client = new SkynetClient(portal);
const dataDomain = config.skynet.DATA_DOMAIN;

const GenerateResolverSkylink: React.FC<IGenerateResolverSkylinkProps> = ({
  type,
  resolver,
  close,
}) => {
  const { projectLoading, selectedProject, selectedOrg } =
    useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const skylinksList = !projectLoading
    ? selectedProject
      ? selectedProject?.deployments
          .filter((deployment) => deployment.status.toLowerCase() === "deployed")
          .filter(
            (deployment) => deployment.sitePreview.indexOf("siasky.net") !== -1,
          )
          .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
      : []
    : [];

  const [mySky, setMySky] = useState<MySky>();
  const [skynetSeed, setSkynetSeed] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [resolverSkylink, setResolverSkylink] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [userID, setUserID] = useState<string>("");
  const [useSeed, setUseSeed] = useState<boolean>(false);
  const [popupLoading, setPopupLoading] = useState<boolean>(true);
  const [skylinkLoading, setSkylinkLoading] = useState<boolean>(false);
  const [errorWarning, setErrorWarning] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [latestSkylink, setLatestSkylink] = useState<string>("");
  const componentIsMounted = useRef<boolean>(true);

  useEffect(() => {
    async function initMySky() {
      setPopupLoading(true);
      try {
        const mySky = await client.loadMySky(dataDomain);
        const loggedIn = await mySky.checkLogin();
        if (componentIsMounted.current) {
          setMySky(mySky);
          if (loggedIn) {
            setUseSeed(false);
            setUserID(await mySky.userID());
            setStep(2);
            setPopupLoading(false);
          } else {
            setPopupLoading(false);
          }
        }
      } catch (e) {
        console.error(e);
        setPopupLoading(false);
      }
    }

    initMySky();

    return () => {
      handleMySkyLogout();
      componentIsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resolver && type !== "create") {
      setName(resolver.name);
      setLatestSkylink(`https://siasky.net/${resolver.targetSkylink}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolver]);

  const loginMySky = async () => {
    if (mySky) {
      await mySky.addPermissions(
        new Permission(
          window.location.hostname,
          dataDomain,
          PermCategory.Discoverable,
          PermType.Write,
        ),
      );
      const status = await mySky.requestLoginAccess();
      if (componentIsMounted.current) {
        if (status) {
          setUserID(await mySky.userID());
          setStep(2);
        }
      }
    }
  };

  const handleMySkyLogout = async () => {
    if (componentIsMounted.current) {
      setUserID("");
      setStep(1);
      setUseSeed(false);
    }
  };

  const generateResolverSkylink = async () => {
    try {
      setSkylinkLoading(true);
      if (!useSeed) {
        if (mySky) {
          await mySky.setDataLink(
            `${dataDomain}/${name}`,
            latestSkylink.split("https://siasky.net/")[1].slice(0, -1),
          );
          const resolverSkylink = await mySky.getEntryLink(`${dataDomain}/${name}`);
          if (type === "create") {
            addResolverSkylinks(resolverSkylink);
          } else {
            editResolverSkylinks(resolverSkylink);
          }
        }
      } else {
        const { publicKey, privateKey } = genKeyPairFromSeed(skynetSeed);
        await client.db.setDataLink(
          privateKey,
          `${dataDomain}/${name}`,
          latestSkylink.split("https://siasky.net/")[1].slice(0, -1),
        );
        const resolverSkylink = await client.registry.getEntryLink(
          publicKey,
          `${dataDomain}/${name}`,
        );
        if (type === "create") {
          addResolverSkylinks(resolverSkylink);
        } else {
          editResolverSkylinks(resolverSkylink);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log((err as Error).message);
      setErrorWarning(true);
      setErrorMessage((err as Error).message);
      setTimeout(() => {
        setErrorWarning(false);
        setErrorMessage("");
      }, 5000);
      setSkylinkLoading(false);
    }
  };

  const addResolverSkylinks = (resolverSkylink: string) => {
    const details = {
      orgId: selectedOrg?._id,
      projectId: selectedProject!._id,
      name,
      resolverSkylink: resolverSkylink.split("sia://")[1],
      targetSkylink: latestSkylink.split("https://siasky.net/")[1].slice(0, -1),
    };

    ApiService.addResolverSkylinks(details).subscribe(
      (result) => {
        if (result.success) {
          setName("");
          setResolverSkylink(resolverSkylink);
          setSkylinkLoading(false);
          setStep(3);
          fetchProject(`${selectedProject?._id}`);
        } else {
          setName("");
          setSkylinkLoading(false);
          setErrorWarning(true);
          setErrorMessage(result.message);
          setTimeout(() => {
            setErrorWarning(false);
            setErrorMessage("");
          }, 5000);
        }
      },
      (err) => {
        setErrorWarning(true);
        setErrorMessage(err.message);
        setTimeout(() => {
          setErrorWarning(false);
          setErrorMessage("");
        }, 5000);
      },
    );
  };

  const editResolverSkylinks = (resolverSkylink: string) => {
    const details = {
      orgId: selectedOrg?._id,
      projectId: selectedProject!._id,
      resolverSkylink: resolverSkylink.split("sia://")[1],
      targetSkylink: latestSkylink.split("https://siasky.net/")[1].slice(0, -1),
    };

    ApiService.editResolverSkylinks(resolver?._id || "", details).subscribe(
      (result) => {
        if (result.success) {
          setName("");
          setResolverSkylink(resolverSkylink);
          setSkylinkLoading(false);
          setStep(3);
          fetchProject(`${selectedProject?._id}`);
        } else {
          setSkylinkLoading(false);
          setErrorWarning(true);
          setErrorMessage(result.message);
          setTimeout(() => {
            setErrorWarning(false);
            setErrorMessage("");
          }, 5000);
        }
      },
      (err) => {
        setErrorWarning(true);
        setErrorMessage(err.message);
        setTimeout(() => {
          setErrorWarning(false);
          setErrorMessage("");
        }, 5000);
      },
    );
  };

  const deleteResolverSkylink = async () => {
    try {
      setSkylinkLoading(true);
      if (!useSeed) {
        if (mySky) {
          await mySky.setEntryData(
            `${dataDomain}/${name}`,
            new Uint8Array(RAW_SKYLINK_SIZE),
          );
          removeResolverSkylink(resolver?._id || "");
        }
      } else {
        const { publicKey, privateKey } = genKeyPairFromSeed(skynetSeed);
        const reg = await client.registry.getEntry(
          publicKey,
          `${dataDomain}/${name}`,
        );
        const revision = reg.entry ? reg.entry.revision + BigInt(1) : BigInt(1);
        await client.registry.setEntry(privateKey, {
          dataKey: `${dataDomain}/${name}`,
          data: new Uint8Array(RAW_SKYLINK_SIZE),
          revision,
        });
        removeResolverSkylink(resolver?._id || "");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log((err as Error).message);
      setErrorWarning(true);
      setErrorMessage((err as Error).message);
      setTimeout(() => {
        setErrorWarning(false);
        setErrorMessage("");
      }, 5000);
      setSkylinkLoading(false);
    }
  };

  const removeResolverSkylink = async (id: string) => {
    ApiService.deleteResolverSkylinks(id, {
      orgId: selectedOrg?._id,
      projectId: selectedProject?._id,
    }).subscribe(
      (result) => {
        if (result.success) {
          setName("");
          setResolverSkylink(resolverSkylink);
          setSkylinkLoading(false);
          setStep(3);
          fetchProject(`${selectedProject?._id}`);
        } else {
          setSkylinkLoading(false);
          setErrorWarning(true);
          setErrorMessage(result.message);
          setTimeout(() => {
            setErrorWarning(false);
            setErrorMessage("");
          }, 5000);
        }
      },
      (err) => {
        setSkylinkLoading(false);
        setErrorWarning(true);
        setErrorMessage(err.message);
        setTimeout(() => {
          setErrorWarning(false);
          setErrorMessage("");
        }, 5000);
      },
    );
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  return (
    <div className="GenerateResolverSkylink">
      <div className="close-button" onClick={(e) => close()}>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </div>
      <div className="modal-container">
        {!popupLoading ? (
          <div className="modal-body">
            {type === "create" && (
              <h3 className="modal-title">Generate Resolver Skylink</h3>
            )}
            {type === "update" && (
              <h3 className="modal-title">Update Resolver Skylink</h3>
            )}
            {type === "remove" && (
              <h3 className="modal-title">Remove Resolver Skylink</h3>
            )}
            {step !== 3 ? (
              <p className="modal-content">
                Resolver skylinks are a special type of skylink that enables skylinks
                whose underlying data changes. When resolver skylinks are accessed on
                Skynet, they "resolve" to other skylinks whose data is returned to
                the requester.
              </p>
            ) : null}
            {step === 1 && (
              <div className="connect-container">
                <div className="seed-phrase-container">
                  <input
                    type="text"
                    placeholder="Enter your seed phrase..."
                    className="text-input"
                    value={skynetSeed}
                    onChange={(e) => setSkynetSeed(e.target.value)}
                  />
                </div>
                <button
                  className="connect-mysky-button"
                  onClick={(e) => {
                    setUseSeed(true);
                    setStep(2);
                  }}
                  type="button"
                >
                  Login with Seed
                </button>
                <div className="or-text">Or</div>
                <div>
                  <button
                    className="connect-mysky-button"
                    onClick={loginMySky}
                    type="button"
                  >
                    Login with MySky
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="connect-container">
                {!useSeed && (
                  <div className="skylink-name-container">
                    <label>User ID</label>
                    <div className="skylink-name">{userID.substring(0, 51)}...</div>
                  </div>
                )}
                <div className="skylink-name-container">
                  <label>Name</label>
                  <div className="skylink-name">
                    {type === "create" && (
                      <input
                        type="text"
                        placeholder="eg: 'argoapp.hns' or 'my custom name'"
                        className="text-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    {(type === "update" || type === "remove") && name}
                  </div>
                </div>
                <div className="skylink-name-container">
                  <label>Skylink</label>
                  <div className="skylink-select-container">
                    <select
                      className="skylink-select"
                      value={latestSkylink}
                      disabled={type === "remove"}
                      onChange={(e) => setLatestSkylink(e.target.value)}
                    >
                      <option value="">Select Skylinks</option>
                      {(skylinksList ? skylinksList : []).map((dep, index) => (
                        <option value={dep.sitePreview} key={index}>
                          {dep.sitePreview}
                        </option>
                      ))}
                    </select>
                    <span className="select-down-icon">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </div>
                </div>
                <div>
                  {type === "create" && (
                    <button
                      className="connect-mysky-button"
                      onClick={generateResolverSkylink}
                      disabled={!name || !latestSkylink}
                      type="button"
                    >
                      {skylinkLoading && (
                        <span className="space-between">
                          <BounceLoader size={20} color={"#fff"} loading={true} />
                        </span>
                      )}
                      Generate
                    </button>
                  )}
                  {type === "update" && (
                    <button
                      className="connect-mysky-button"
                      onClick={generateResolverSkylink}
                      disabled={!name || !latestSkylink}
                      type="button"
                    >
                      {skylinkLoading && (
                        <span className="space-between">
                          <BounceLoader size={20} color={"#fff"} loading={true} />
                        </span>
                      )}
                      Update
                    </button>
                  )}
                  {type === "remove" && (
                    <button
                      className="connect-mysky-button"
                      onClick={deleteResolverSkylink}
                      disabled={!name || !latestSkylink}
                      type="button"
                    >
                      {skylinkLoading && (
                        <span className="space-between">
                          <BounceLoader size={20} color={"#fff"} loading={true} />
                        </span>
                      )}
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="success-container">
                <div className="check-container">
                  <Lottie options={defaultOptions} height={170} />
                </div>
                <div className="header-container">Success!</div>
                <div className="text-description">
                  {type === "create" &&
                    "Resolver Skylink has been generated successfully."}
                  {type === "update" &&
                    "Resolver Skylink has been updated successfully."}
                  {type === "remove" &&
                    "Resolver Skylink has been removed successfully."}
                </div>
                <a
                  className="resolver-link"
                  href={`http://siasky.net/${resolverSkylink.split("sia://")[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resolverSkylink}
                </a>
              </div>
            )}
            {errorWarning && (
              <div className="warning-container">
                <div className="warning-header">
                  <FontAwesomeIcon icon={faExclamationCircle} /> {errorMessage}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="loading-container">
            <GridLoader size={32} color={"#3664ae"} loading={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateResolverSkylink;
