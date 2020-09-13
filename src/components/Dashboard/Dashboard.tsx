import React, { useContext, useEffect } from "react";
import "./Dashboard.scss";
import { Header } from "./components";
import { Route } from "react-router-dom";
import { Overview, Settings } from "./routes";
import { ActionContext } from "../../hooks";

function Dashboard() {
  const { fetchUser } = useContext(ActionContext);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Dashboard">
      <Header />
      <main className="app-main">
        <div className="home-container">
          <Route path="/dashboard/overview" exact render={() => <Overview />} />
          <Route path="/dashboard/settings" exact render={() => <Settings />} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
