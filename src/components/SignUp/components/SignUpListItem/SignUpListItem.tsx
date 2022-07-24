import React from "react";
import "./SignUpListItem.scss";
import ISignUpListItemProps from "./model";

const SignUpListItem: React.FC<ISignUpListItemProps> = ({
  index,
  title,
  description,
}) => {
  return (
    <div className="usage-list-item">
      <div className="usage-number">{index}</div>
      <div className="usage-details">
        <div className="usage-details-title">{title}</div>
        <div className="usage-details-description">{description}</div>
      </div>
    </div>
  );
};

export default SignUpListItem;
