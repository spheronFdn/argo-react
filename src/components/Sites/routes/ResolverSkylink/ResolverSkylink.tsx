import React, { useContext, useEffect, useRef, useState } from "react";
import "./ResolverSkylink.scss";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import Popup from "reactjs-popup";
import { StateContext } from "../../../../hooks";
import { IResolverSkylink, IStateModel } from "../../../../model/hooks.model";
import GenerateResolverSkylink from "./components/GenerateResolverSkylink";
import { SkynetClient } from "skynet-js";
import moment from "moment";
import { ProjectTopCard } from "../_SharedComponent";

const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;
// Initiate the SkynetClient
const client = new SkynetClient(portal);
const dataDomain = "localhost";

const ResolverSkylink = () => {
  const { projectLoading, selectedProject, orgLoading } =
    useContext<IStateModel>(StateContext);

  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
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
              Generate resolver skylinks
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
                  {resolverSkylinks.map(
                    (resolverSkylink: IResolverSkylink, index: number) => (
                      <div className="tr" key={index}>
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
                                projectLoading || orgLoading ? "icon-disabled" : ""
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
                                projectLoading || orgLoading ? "icon-disabled" : ""
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
                    ),
                  )}
                </div>
              ) : (
                <div className="tbody">
                  <div className="tr">
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
                  <div className="tr">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolverSkylink;
