import React from "react";
import "./Sites.scss";
import { Header } from "./components";
import { Route } from "react-router-dom";
import { AllDeployments, Deployment, Overview, Settings } from "./routes";

function Sites() {
  return (
    <div className="Sites">
      <Header />
      <main className="app-main">
        <div className="home-container">
          <Route path="/sites/:siteid/overview" exact render={() => <Overview />} />
          <Route
            path="/sites/:siteid/deployments/:deploymentid"
            exact
            render={() => <Deployment />}
          />
          <Route
            path="/sites/:siteid/deployments/"
            exact
            render={() => <AllDeployments />}
          />
          <Route path="/sites/:siteid/settings" exact render={() => <Settings />} />
        </div>
      </main>
    </div>
  );
}

export default Sites;
