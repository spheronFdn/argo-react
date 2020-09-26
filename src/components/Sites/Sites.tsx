import React, { useContext, useEffect } from "react";
import "./Sites.scss";
import { Header } from "./components";
import { Redirect, Route, useParams } from "react-router-dom";
import { AllDeployments, Deployment, Overview, Settings } from "./routes";
import { ApiService } from "../../services";
import { ActionContext, StateContext } from "../../hooks";
import { IActionModel, IStateModel } from "../../model/hooks.model";

function Sites() {
  const params = useParams<any>();

  const { setSelectedProject, setPojectLoading } = useContext<IActionModel>(
    ActionContext,
  );
  const { selectedProject } = useContext<IStateModel>(StateContext);

  useEffect(() => {
    if (params.slug1 && !selectedProject?._id) {
      setPojectLoading(true);
      ApiService.getProject(params.slug1).subscribe((project) => {
        setSelectedProject(project);
        setPojectLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <Route
            path="/sites/:siteid/settings/"
            exact
            render={() => (
              <Redirect to={`/sites/${params.slug1}/settings/general`} />
            )}
          />
          <Route
            path="/sites/:siteid/settings/:slug"
            exact
            render={() => <Settings />}
          />
        </div>
      </main>
    </div>
  );
}

export default Sites;
