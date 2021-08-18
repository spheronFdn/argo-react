import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { StateContext } from "../../../../../../hooks";
import "./SettingsArchive.scss";
import IDeploymentItemProps from "../../../../../Sites/routes/AllDeployments/components/DeploymentItem/model";
import { IStateModel } from "../../../../../../model/hooks.model";
import moment from "moment";
import config from "../../../../../../config";

const SettingsArchive: React.FC<IDeploymentItemProps> = ({
  index,
  type,
  deployment,
}) => {
  const { selectedProject, projectLoading } = useContext<IStateModel>(StateContext);

  // const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  const lastPublishedDate = moment(selectedProject?.updatedAt).format(
    "MMM DD, YYYY hh:mm A",
  );

  // let displayGithubRepo = "";
  // if (selectedProject) {
  //   displayGithubRepo = selectedProject.githubUrl.substring(
  //     19,
  //     selectedProject.githubUrl.length - 4,
  //   );
  // }

  const imageUrl = (imageUrl: string | undefined) => {
    if (imageUrl) {
      return imageUrl;
    }
    return config.urls.IMAGE_NOT_FOUND;
  };

  return (
    <div className="OrgSettingsGeneral">
      <div className="settings-right-container">
        <div className="settings-profile-details">
          <div className="settings-profile-header">Archived Projects</div>
          <div className="settings-profile-body">
            <div className="settings-deployment-item">
              <>
                <div className="settings-deployment-left">
                  {!projectLoading ? (
                    <img
                      className="deployment-screenshot"
                      src={imageUrl(
                        selectedProject?.latestDeployment?.screenshot?.url,
                      )}
                      alt={"Preview not Available"}
                    />
                  ) : (
                    <Skeleton height={100} width={190} duration={2} />
                  )}
                  <div className="deployment-left-detail">
                    <div className="deployment-publish-detail">
                      <div className="deployment-header-title">
                        Title
                        {!projectLoading ? (
                          selectedProject?.name
                        ) : (
                          <Skeleton width={400} duration={2} />
                        )}
                      </div>

                      <div className="deployment-header-description">
                        {!projectLoading ? (
                          <>Last updated at {lastPublishedDate}</>
                        ) : (
                          <Skeleton width={400} duration={2} />
                        )}
                      </div>
                      <span className="archive-tag">Archived</span>
                    </div>
                  </div>
                  <div className="deployment-right-detail">
                    <button className="unarchive-button">Unarchive</button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsArchive;
