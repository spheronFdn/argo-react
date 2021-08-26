import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { SettingsGeneral } from "./routes";
import SettingsArchive from "./routes/SettingsArchive";
import "./Settings.scss";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();

  const urls = location.pathname.split("/");
  const lastPath = urls[urls.length - 1];

  return (
    <div className="OrgSettings">
      <div className="settings-container">
        <div className="settings-left-side-bar">
          <div
            className={`settings-bar-item ${
              lastPath === "general" ? "selected" : ""
            }`}
            onClick={(e) => history.push("/dashboard/settings/general")}
          >
            General
          </div>
          <div
            className={`settings-bar-item ${
              lastPath === "archive" ? "selected" : ""
            }`}
            onClick={(e) => history.push("/dashboard/settings/archive")}
          >
            Archived Projects
          </div>
          {/* <div className="settings-bar-item">OAuth</div>
          <div className="settings-bar-item">Git Integration</div>
          <div className="settings-bar-item">Billing</div>
          <div className="settings-bar-item">Tokens</div> */}
        </div>
        <Switch>
          <Route
            path="/dashboard/settings/general"
            exact
            render={() => <SettingsGeneral />}
          />
          <Route
            path="/dashboard/settings/archive"
            exact
            render={() => <SettingsArchive />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Settings;
