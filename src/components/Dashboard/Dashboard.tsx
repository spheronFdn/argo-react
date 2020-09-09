import React from "react";
import "./Dashboard.scss";
import { Header } from "./components";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Header />
      <main className="app-main">
        <div className="home-container">
          {/* <Route path="/site" exact render={() => <DisplaySites />} />
          <Route path="/site/view/:id" exact render={() => <SiteView />} />
          <Route path="/site/start" exact render={() => <CreateSite />} />
          <Route
            path="/site/deploy/:id"
            exact
            render={() => {
              return currentSiteDeployConfig ? (
                <DeploySite />
              ) : (
                <Redirect to="/site" />
              );
            }}
          /> */}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
