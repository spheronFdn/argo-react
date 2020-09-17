import React, { useContext, useEffect } from "react";
import "./Members.scss";
import { StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
// import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

const Members = () => {
  const history = useHistory();
  const { userLoading, selectedOrg } = useContext(StateContext);

  useEffect(() => {
    if (selectedOrg) {
      ApiService.getOrganization(`${selectedOrg?._id}`).subscribe((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
      });
    }
  }, [selectedOrg]);

  return (
    <div className="Members">
      <div className="members-container">
        <div className="members-details">
          <div className="members-header">
            <span>Organisation members</span>
            <button
              type="button"
              className="primary-button"
              disabled={userLoading}
              onClick={(e) => history.push("/dashboard/members/new")}
            >
              Add Members
            </button>
          </div>
          <div className="members-body">
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th"></div>
                  <div className="th">User</div>
                </div>
              </div>
              <div className="tbody">
                <div className="tr">
                  <div className="td">
                    <div className="avatar-container">
                      <img
                        src={require("../../../../assets/svg/camera_grad.svg")}
                        alt="avatar"
                        className="profile-avatar"
                      />
                    </div>
                  </div>
                  <div className="td">
                    <div className="user-container">
                      <div className="user-email">mmitrasish97@gmail.com</div>
                      <div className="user-username">rekpero</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
