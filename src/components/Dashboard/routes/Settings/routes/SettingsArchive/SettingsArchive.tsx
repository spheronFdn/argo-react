import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { StateContext } from "../../../../../../hooks";
import "./SettingsArchive.scss";
import { IProject, IStateModel } from "../../../../../../model/hooks.model";
import moment from "moment";
import config from "../../../../../../config";
import { ApiService } from "../../../../../../services";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SettingsArchive = () => {
  const { selectedOrg, orgLoading } = useContext<IStateModel>(StateContext);

  const imageUrl = (imageUrl: string | undefined) => {
    if (imageUrl) {
      return imageUrl;
    }
    return config.urls.IMAGE_NOT_FOUND;
  };

  const orgId = selectedOrg?._id;

  const [archiveList, setArchiveList] = useState<IProject[]>([]);
  const [archiveLoading, setArchiveLoading] = useState<boolean>(true);

  const getArchived = (organizationId: string) => {
    setArchiveLoading(true);
    ApiService.getArchiveProject(organizationId).subscribe(
      (result) => {
        setArchiveList(result.archivedProjects);
        setArchiveLoading(false);
      },
      (error) => {
        setArchiveLoading(false);
        // eslint-disable-next-line
        console.log(error);
      },
    );
  };

  useEffect(() => {
    if (orgId) {
      getArchived(orgId);
    }
  }, [orgId]);

  const history = useHistory();

  const openDeployment = (siteId: string) => {
    history.push(`/org/${orgId}/sites/${siteId}/overview`);
  };

  return (
    <div className="OrgSettingsGeneral">
      <div className="settings-right-container">
        <div className="settings-profile-details">
          <div className="settings-profile-header">Archived Projects</div>
          <div className="settings-profile-body">
            {!archiveLoading && !orgLoading ? (
              archiveList.length > 0 ? (
                archiveList.map((archive: IProject, index: number) => (
                  <div
                    className="settings-deployment-item"
                    onClick={(e) => {
                      openDeployment(archive?._id!);
                    }}
                  >
                    <>
                      <div className="settings-deployment-left">
                        <img
                          className="deployment-screenshot"
                          src={imageUrl(archive?.latestDeployment?.screenshot?.url)}
                          alt={"Preview not Available"}
                        />
                        <div className="deployment-left-detail">
                          <div className="deployment-publish-detail">
                            <div className="deployment-header-title">
                              {archive.name}
                            </div>
                            <div className="deployment-header-description">
                              Last updated at{" "}
                              {moment(archive.updatedAt).format(
                                "MMM DD, YYYY hh:mm a",
                              )}
                            </div>
                            <span className="archive-tag">{archive.state}</span>
                          </div>
                        </div>
                        {/* <div className="deployment-right-detail">
                          <button
                            className="unarchive-button"
                            onClick={(e) => {
                              projectMaintain(archive?._id!);
                            }}
                          >
                            Unarchive
                          </button>
                        </div> */}
                      </div>
                    </>
                  </div>
                ))
              ) : (
                <div></div>
              )
            ) : (
              <div>
                <div className="settings-deployment-item">
                  <>
                    <div className="settings-deployment-left">
                      <Skeleton height={100} width={190} duration={2} />
                      <div className="deployment-left-detail">
                        <div className="deployment-publish-detail">
                          <div className="deployment-header-title">
                            <Skeleton width={400} duration={2} />
                          </div>
                          <div className="deployment-header-description">
                            <Skeleton width={400} duration={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsArchive;
