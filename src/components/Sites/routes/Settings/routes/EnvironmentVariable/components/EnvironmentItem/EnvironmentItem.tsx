import React, { useEffect, useState } from "react";
import "./EnvironmentItem.scss";
import IDeploymentItemProps from "./model";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BounceLoader from "react-spinners/BounceLoader";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const EnvironmentItem: React.FC<IDeploymentItemProps> = ({
  index,
  envKey,
  envValue,
  type,
  updateEnvs,
  removeEnvs,
  updateEnvLoading,
  removeEnvLoading,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showValue, setShowValue] = useState<boolean>(false);
  const [editEnvKey, setEditEnvKey] = useState<string>("");
  const [editEnvValue, setEditEnvValue] = useState<string>("");

  useEffect(() => {
    if (envKey) {
      setEditEnvKey(envKey);
    }
    if (envValue) {
      setEditEnvValue(envValue);
    }
  }, [envKey, envValue]);

  return (
    <div className="env-item" key={index}>
      {type === "filled" && (
        <div className="env-item-container">
          <div className="env-item-icon">{"<>"}</div>
          <div className="env-item-key-container">
            <div className="env-item-key-title">KEY</div>
            {!editMode ? (
              <div>{envKey}</div>
            ) : (
              <input
                type="text"
                className="env-form-input"
                placeholder="VARIABLE_NAME"
                value={editEnvKey}
                onChange={(e) => setEditEnvKey(e.target.value)}
              />
            )}
          </div>
          <div className="env-item-key-container">
            <div className="env-item-key-title">VALUE</div>
            {!editMode ? (
              <div className="env-item-value-container">
                <div
                  className="env-item-eye"
                  onClick={(e) => setShowValue(!showValue)}
                >
                  <FontAwesomeIcon icon={showValue ? faEyeSlash : faEye} />
                </div>
                <div>{showValue ? envValue : "•••••••••••••••"}</div>
              </div>
            ) : (
              <input
                type="text"
                className="env-form-input"
                placeholder="I343SFS33GDSDFS"
                value={editEnvValue}
                onChange={(e) => setEditEnvValue(e.target.value)}
              />
            )}
          </div>
          {!editMode ? (
            <button className="edit-button" onClick={(e) => setEditMode(true)}>
              Edit
            </button>
          ) : (
            <button
              className="save-button"
              disabled={editEnvKey === envKey && editEnvValue === envValue}
              onClick={(e) =>
                updateEnvs(index, editEnvKey, editEnvValue, setEditMode)
              }
            >
              <span style={{ marginRight: 4 }}>Save</span>
              {updateEnvLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
            </button>
          )}
          {!editMode ? (
            <button
              className="remove-button"
              disabled={removeEnvLoading}
              onClick={(e) => removeEnvs(index, setEditMode)}
            >
              <span style={{ marginRight: 4 }}>Remove</span>
              {removeEnvLoading ? (
                <BounceLoader size={20} color={"#ee0902"} loading={true} />
              ) : null}
            </button>
          ) : (
            <button className="cancel-button" onClick={(e) => setEditMode(false)}>
              Cancel
            </button>
          )}
        </div>
      )}
      {type === "skeleton" && (
        <div className="env-item-container">
          <div className="env-item-icon">{"<>"}</div>
          <div className="env-item-key-container">
            <div className="env-item-key-title">
              <Skeleton width={80} duration={2} />
            </div>
            <div>
              <Skeleton width={150} duration={2} />
            </div>
          </div>
          <div className="env-item-key-container">
            <div className="env-item-key-title">
              <Skeleton width={80} duration={2} />
            </div>
            <div>
              <Skeleton width={150} duration={2} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentItem;
