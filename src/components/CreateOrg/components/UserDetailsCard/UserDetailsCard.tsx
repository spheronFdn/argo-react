import React from "react";
import "./UserDetailsCard.scss";

const UserDetailsCard: React.FC<any> = () => {
  return (
    <div className="user-details-container">
      <div className="user-details-text">
        <h1 className="user-details-title">Prashant</h1>
        <p className="user-details-subtitle">izrake</p>
        <p className="user-details-subtitle">er.mauryaprashant@gmail.com</p>
        <p className="user-details-subtitle">
          Joined ArGo on March 29, 2019 (5 months ago)
        </p>
        <p className="user-details-subtitle">
          Created 4 projects. Collaborates on 1 organization.
        </p>
      </div>
      <div className="user-details-avatar-container">
        <img
          src="https://avatars0.githubusercontent.com/u/18068841?v=4"
          alt="avatar"
          className="user-details-avatar"
        />
      </div>
    </div>
  );
};

export default UserDetailsCard;
