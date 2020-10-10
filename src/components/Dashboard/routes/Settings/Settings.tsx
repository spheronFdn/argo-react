import React from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import { SettingsGeneral } from "./routes";
import "./Settings.scss";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="OrgSettings">
      <div className="settings-container">
        <div className="settings-left-side-bar">
          <div
            className={`settings-bar-item ${
              location.pathname.indexOf("general") !== -1 ? "selected" : ""
            }`}
            onClick={(e) => history.push("/dashboard/settings/general")}
          >
            General
          </div>
          {/* <div className="settings-bar-item">OAuth</div>
          <div className="settings-bar-item">Git Integration</div>
          <div className="settings-bar-item">Billing</div>
          <div className="settings-bar-item">Tokens</div> */}
        </div>
        <Route
          path="/dashboard/settings/general"
          exact
          render={() => <SettingsGeneral />}
        />
      </div>
    </div>
  );
};

export default Settings;
