import React from "react";
import "./UserSettings.scss";
import { SettingsGeneral, SettingsWallet } from "./routes";
import { Route, useHistory, useLocation } from "react-router-dom";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));
const UserDetailsCard = React.lazy(() => import("./components/UserDetailsCard"));

function UserSettings() {
  const location = useLocation();
  const history = useHistory();

  const urls = location.pathname.split("/");
  const lastPath = urls[urls.length - 1];

  return (
    <div className="UserSettings">
      <RootHeader parent={"UserSettings"} />
      <main className="app-main">
        <div className="user-settings-container">
          <UserDetailsCard />
          <div className="settings-container">
            <div className="settings-left-side-bar">
              <div
                className={`settings-bar-item ${
                  lastPath === "general" ? "selected" : ""
                }`}
                onClick={(e) => history.push("/user/settings/general")}
              >
                General
              </div>
              <div
                className={`settings-bar-item ${
                  lastPath === "wallet" ? "selected" : ""
                }`}
                onClick={(e) => history.push("/user/settings/wallet")}
              >
                Wallet
              </div>
            </div>
            <Route
              path="/user/settings/general"
              exact
              render={() => <SettingsGeneral />}
            />
            <Route
              path="/user/settings/wallet"
              exact
              render={() => <SettingsWallet />}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserSettings;
