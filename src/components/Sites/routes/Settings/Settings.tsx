import React from "react";
import "./Settings.scss";
import { ProjectTopCard } from "../_SharedComponent";
import { SettingsBuildDeploy, SettingsGeneral } from "./components";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams<any>();

  return (
    <div className="Settings">
      <ProjectTopCard />
      <div className="settings-container">
        <div className="settings-left-side-bar">
          <div
            className={`settings-bar-item ${
              location.pathname.indexOf("general") !== -1 ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/settings/general`,
              )
            }
          >
            General
          </div>
          <div
            className={`settings-bar-item ${
              location.pathname.indexOf("deploys") !== -1 ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/settings/deploys`,
              )
            }
          >
            Build & Deploy
          </div>
        </div>
        <Route
          path="/org/:orgid/sites/:siteid/settings/general"
          exact
          render={() => <SettingsGeneral />}
        />
        <Route
          path="/org/:orgid/sites/:siteid/settings/deploys"
          exact
          render={() => <SettingsBuildDeploy />}
        />
      </div>
    </div>
  );
};

export default Settings;
