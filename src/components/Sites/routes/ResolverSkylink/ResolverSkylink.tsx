import React, { useContext, useEffect, useRef, useState } from "react";
import "./ResolverSkylink.scss";
import { faClipboard, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import Popup from "reactjs-popup";
import { StateContext } from "../../../../hooks";
import { IResolverSkylink, IStateModel } from "../../../../model/hooks.model";
import GenerateResolverSkylink from "./components/GenerateResolverSkylink";
import { SkynetClient } from "skynet-js";
import moment from "moment";
import { ProjectTopCard } from "../_SharedComponent";
import config from "../../../../config";

const portal = "https://siasky.net";
// Initiate the SkynetClient
const client = new SkynetClient(portal);
const dataDomain = config.skynet.DATA_DOMAIN;

const ResolverSkylink = () => {
  const { projectLoading, selectedProject, orgLoading } =
    useContext<IStateModel>(StateContext);

  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [resolverSkylinkLoading, setResolverSkylinkLoading] =
    useState<boolean>(false);
  const [resolverSkylinks, setResolverSkylinks] = useState<IResolverSkylink[]>([]);
  const [selectedResolver, setSelectedResolver] = useState<IResolverSkylink>();
  const componentIsMounted = useRef<boolean>(true);

  useEffect(() => {
    if (selectedProject && !projectLoading) {
      if (componentIsMounted.current) {
        const resolverSkylinks: IResolverSkylink[] =
          selectedProject.resolverSkylinks;
        setResolverSkylinks(resolverSkylinks);
        setResolverSkylinkLoading(false);
      }
    } else {
      if (projectLoading) {
        setResolverSkylinkLoading(true);
      } else {
        setResolverSkylinkLoading(false);
      }
    }
  }, [selectedProject, projectLoading]);

  useEffect(() => {
    logoutMySky();
  }, [showCreatePopup]);

  useEffect(() => {
    logoutMySky();
  }, [showUpdatePopup]);

  useEffect(() => {
    logoutMySky();
  }, [showRemovePopup]);

  const logoutMySky = async () => {
    const mySky = await client.loadMySky(dataDomain);
    const loggedIn = await mySky.checkLogin();
    if (loggedIn) {
      await mySky.logout();
    }
  };

  return (
    <div className="ResolverSkylink">
      <ProjectTopCard />
      <div className="skylinks-container">
        <div className="skylinks-details">
          <div className="skylinks-header">
            <span>Resolver Skylinks</span>
            <button
              type="button"
              className="primary-button"
              disabled={projectLoading || orgLoading}
              onClick={(e) => setShowCreatePopup(true)}
            >
              Generate Resolver Skylinks
            </button>
            <Popup
              trigger={<></>}
              position="center center"
              open={showCreatePopup}
              className="popup-container"
              modal
            >
              <GenerateResolverSkylink
                type="create"
                close={() => setShowCreatePopup(false)}
              />
            </Popup>
            <Popup
              trigger={<></>}
              position="center center"
              open={showUpdatePopup}
              className="popup-container"
              modal
            >
              <GenerateResolverSkylink
                type="update"
                resolver={selectedResolver}
                close={() => setShowUpdatePopup(false)}
              />
            </Popup>
            <Popup
              trigger={<></>}
              position="center center"
              open={showRemovePopup}
              className="popup-container"
              modal
            >
              <GenerateResolverSkylink
                type="remove"
                resolver={selectedResolver}
                close={() => setShowRemovePopup(false)}
              />
            </Popup>
          </div>
          <div className="skylinks-body">
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th">Name</div>
                  <div className="th">Resolver Skylink</div>
                  <div className="th">Target Skylink</div>
                  <div className="th">Last Updated</div>
                  <div className="th"></div>
                </div>
              </div>
              {!resolverSkylinkLoading ? (
                <div className="tbody">
                  {resolverSkylinks.length > 0 ? (
                    resolverSkylinks.map(
                      (resolverSkylink: IResolverSkylink, index: number) => (
                        <div className="tr" key={index}>
                          <div className="tr-first">
                            <div className="td">
                              <div className="skylinks-td-container">
                                <div className="skylinks-title">
                                  {resolverSkylink.name}
                                </div>
                              </div>
                            </div>
                            <div className="td">
                              <div className="skylinks-td-container">
                                <a
                                  className="skylinks-links"
                                  href={`https://siasky.net/${resolverSkylink.resolverSkylink}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  sia://{resolverSkylink.resolverSkylink}
                                </a>
                              </div>
                            </div>
                            <div className="td">
                              <div className="skylinks-td-container">
                                <a
                                  className="skylinks-links"
                                  href={`https://siasky.net/${resolverSkylink.resolverSkylink}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  sia://{resolverSkylink.targetSkylink}
                                </a>
                              </div>
                            </div>
                            <div className="td">
                              <div className="skylinks-td-container">
                                <div className="skylinks-text">
                                  {moment(resolverSkylink.updatedAt).format(
                                    "DD-MM-YYYY hh:mm A",
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="td">
                              <div className="skylinks-td-container">
                                <div
                                  className={`trash-icon-container ${
                                    projectLoading || orgLoading
                                      ? "icon-disabled"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    setSelectedResolver(resolverSkylink);
                                    setShowUpdatePopup(true);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="trash-icon"
                                  ></FontAwesomeIcon>
                                </div>

                                <div
                                  className={`trash-icon-container ${
                                    projectLoading || orgLoading
                                      ? "icon-disabled"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    setSelectedResolver(resolverSkylink);
                                    setShowRemovePopup(true);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="trash-icon"
                                  ></FontAwesomeIcon>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tr-second">
                            <div
                              className="badge-container"
                              onClick={() =>
                                window.open(
                                  `https://homescreen.hns.siasky.net/#/skylink/${resolverSkylink.resolverSkylink}`,
                                  "_blank",
                                )
                              }
                            >
                              <img
                                src="https://img.shields.io/badge/Skynet-Add%20To%20Homescreen-00c65e?style=for-the-badge&labelColor=0d0d0d&logo=data:image/png;base64,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"
                                alt="homescreen badge"
                              />
                            </div>
                            <div
                              className="copy-badge-container"
                              onClick={() => {
                                setIsCopied(true);
                                setTimeout(() => {
                                  setIsCopied(false);
                                }, 2000);
                                navigator.clipboard.writeText(
                                  `[![Add to Homescreen](https://img.shields.io/badge/Skynet-Add%20To%20Homescreen-00c65e?style=for-the-badge&labelColor=0d0d0d&logo=data:image/png;base64,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)](https://homescreen.hns.siasky.net/#/skylink/${resolverSkylink.resolverSkylink})`,
                                );
                              }}
                            >
                              <div className="copy-badge-text">
                                {isCopied ? "Copied" : "Copy"} Homescreen Badge Code
                              </div>
                              <div className="clipboard-icon-container">
                                <FontAwesomeIcon
                                  icon={faClipboard}
                                  className="clipboard-icon"
                                ></FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <div className="tr" key={1}>
                      <div className="tr-first no-item">
                        No resolver skylinks to show
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="tbody">
                  <div className="tr">
                    <div className="tr-first">
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-text">
                            <Skeleton width={80} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-text">
                            <Skeleton width={80} duration={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr">
                    <div className="tr-first">
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-title">
                            <Skeleton width={100} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-text">
                            <Skeleton width={80} duration={2} />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="skylinks-td-container">
                          <div className="skylinks-text">
                            <Skeleton width={80} duration={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolverSkylink;
