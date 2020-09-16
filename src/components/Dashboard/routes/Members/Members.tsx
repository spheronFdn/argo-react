import React, { useContext } from "react";
import "./Members.scss";
import { StateContext } from "../../../../hooks";
// import Skeleton from "react-loading-skeleton";
// import { useHistory } from "react-router-dom";

const Members = () => {
  // const history = useHistory();
  const { userLoading } = useContext(StateContext);

  return (
    <div className="Members">
      <div className="members-container">
        <div className="members-profile-details">
          <div className="members-profile-header">
            <span>Organisation members</span>
            <button type="button" className="primary-button" disabled={userLoading}>
              Add Members
            </button>
          </div>
          <div className="members-profile-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Members;
