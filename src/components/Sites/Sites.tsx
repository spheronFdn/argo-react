import React, { useContext, useEffect } from "react";
import "./Sites.scss";
import { Header } from "../_SharedComponents";
import { Redirect, Route, useParams } from "react-router-dom";
import { AllDeployments, Deployment, Overview, Settings } from "./routes";
import { ActionContext, StateContext } from "../../hooks";
import { IActionModel, IStateModel } from "../../model/hooks.model";
import DomainManagement from "./routes/DomainManagement";

function Sites() {
  const params = useParams<any>();

  const { setSelectedOrganization, fetchProject } = useContext<IActionModel>(
    ActionContext,
  );
  const { selectedProject, selectedOrg } = useContext<IStateModel>(StateContext);

  useEffect(() => {
    if (params.slug1 && !selectedProject?._id) {
      fetchProject(params.slug1);
    }
    if (params.orgid !== selectedOrg?._id) {
      setSelectedOrganization({ _id: params.orgid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Sites">
      <Header parent="sites" />
      <main className="app-main">
        <div className="home-container">
          <Route
            path="/org/:orgid/sites/:siteid/overview"
            exact
            render={() => <Overview />}
          />
          <Route
            path="/org/:orgid/sites/:siteid/deployments/"
            exact
            render={() => <AllDeployments />}
          />
          <Route
            path="/org/:orgid/sites/:siteid/domain/:slug"
            exact
            render={() => <DomainManagement />}
          />
          <Route
            path="/org/:orgid/sites/:siteid/domain/"
            exact
            render={() => (
              <Redirect
                to={`/org/${params.orgid}/sites/${params.slug1}/domain/domains`}
              />
            )}
          />
          <Route
            path="/org/:orgid/sites/:siteid/settings/:slug"
            exact
            render={() => <Settings />}
          />
          <Route
            path="/org/:orgid/sites/:siteid/settings/"
            exact
            render={() => (
              <Redirect
                to={`/org/${params.orgid}/sites/${params.slug1}/settings/general`}
              />
            )}
          />

          <Route
            path="/org/:orgid/sites/:siteid/deployments/:deploymentid"
            exact
            render={() => <Deployment />}
          />
        </div>
      </main>
    </div>
  );
}

export default Sites;
