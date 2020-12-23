import React from "react";
import "./Dashboard.scss";
import { Redirect, Route } from "react-router-dom";
import { InviteMembers, Members, Overview, Settings } from "./routes";

const Header = React.lazy(() => import("../_SharedComponents/Header"));
const MemoedHeader = React.memo(Header);

function Dashboard() {
  return (
    <div className="Dashboard">
      <MemoedHeader parent="dashboard" />
      <main className="app-main">
        <div className="home-container">
          <Route path="/dashboard/overview" exact render={() => <Overview />} />
          <Route path="/dashboard/settings" exact render={() => <Settings />} />
          <Route path="/dashboard/members" exact render={() => <Members />} />
          <Route
            path="/dashboard/members/new"
            exact
            render={() => <InviteMembers />}
          />
          <Route
            path="/dashboard/settings/:slug"
            exact
            render={() => <Settings />}
          />
          <Route
            path="/dashboard/settings"
            exact
            render={() => <Redirect to={`/dashboard/settings/general`} />}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
