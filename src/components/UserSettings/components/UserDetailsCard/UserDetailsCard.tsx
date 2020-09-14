import React, { useContext } from "react";
import { StateContext } from "../../../../hooks";
import moment from "moment";
import "./UserDetailsCard.scss";
import TimeAgo from "javascript-time-ago";
import Skeleton from "react-loading-skeleton";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

const UserDetailsCard: React.FC<any> = () => {
  const timeAgo = new TimeAgo("en-US");
  const { user, userLoading } = useContext(StateContext);

  return (
    <div className="user-details-container">
      <div className="user-details-text">
        <h1 className="user-details-title">
          {!userLoading ? user?.profile.name : <Skeleton width={200} duration={2} />}
        </h1>
        <p className="user-details-subtitle">
          {!userLoading ? (
            user?.profile.argo_username
          ) : (
            <Skeleton width={100} duration={2} />
          )}
        </p>
        <p className="user-details-subtitle">
          {!userLoading ? (
            user?.profile.email
          ) : (
            <Skeleton width={150} duration={2} />
          )}
        </p>
        <p className="user-details-subtitle">
          {!userLoading ? (
            `Joined ArGo on ${moment(`${user?.dateOfEntry}`).format(
              "MMMM DD, YYYY",
            )} (
          ${timeAgo.format(new Date(`${user?.dateOfEntry}`))})`
          ) : (
            <Skeleton width={350} duration={2} />
          )}
        </p>
        <p className="user-details-subtitle">
          {!userLoading ? (
            `Created 4 projects. Collaborates on ${user?.organizations?.length} organization.`
          ) : (
            <Skeleton width={350} duration={2} />
          )}
        </p>
      </div>
      <div className="user-details-avatar-container">
        {!userLoading ? (
          <img
            src={user?.profile.avatar_url}
            alt="avatar"
            className="user-details-avatar"
          />
        ) : (
          <Skeleton circle={true} height={132} width={132} duration={2} />
        )}
      </div>
    </div>
  );
};

export default UserDetailsCard;
