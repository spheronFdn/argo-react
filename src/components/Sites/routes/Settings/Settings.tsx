import React from "react";
import "./Settings.scss";
import { ProjectTopCard } from "../_SharedComponent";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";
import { SettingsGeneral, SettingsBuildDeploy, EnvironmentVariable } from "./routes";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams<any>();

  const urls = location.pathname.split("/");
  const lastPath = urls[urls.length - 1];

  return (
    <div className="Settings">
      <ProjectTopCard />
      <div className="settings-container">
        <div className="settings-left-side-bar">
          <div
            className={`settings-bar-item ${
              lastPath === "general" ? "selected" : ""
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
              lastPath === "deploys" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/settings/deploys`,
              )
            }
          >
            Build & Deploy
          </div>
          <div
            className={`settings-bar-item ${
              lastPath === "environment" ? "selected" : ""
            }`}
            onClick={(e) =>
              history.push(
                `/org/${params.orgid}/sites/${params.siteid}/settings/environment`,
              )
            }
          >
            Environment Variables
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
        <Route
          path="/org/:orgid/sites/:siteid/settings/environment"
          exact
          render={() => <EnvironmentVariable />}
        />
      </div>
    </div>
  );
};

export default Settings;
