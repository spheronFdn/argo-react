import React, { useContext, useState } from "react";
import "./AllDeployments.scss";
import { ProjectTopCard } from "../_SharedComponent";
import Switch from "react-switch";
import { StateContext } from "../../../../hooks";
import { IStateModel } from "../../../../model/hooks.model";
import { DeploymentItem } from "./components";
import moment from "moment";

const AllDeployments = () => {
  const [autoDeployment, setAutoDeployment] = useState<boolean>(true);
  const { projectLoading, selectedProject } = useContext<IStateModel>(StateContext);

  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );

  return (
    <div className="AllDeployments">
      <ProjectTopCard />
      <div className="site-deployment-card-container deploy-container">
        <div className="site-deployment-header-title">Deploy Info</div>
        <div className="deploy-summary-item">
          <div className="deploy-summary-body-item">
            <label>Deployments:</label>
            <span>{selectedProject?.deployments?.length}</span>
          </div>
          <div className="deploy-summary-body-item">
            <label>
              Auto Deployment:
              <br />
              <label>(Deploys from master are published automatically.)</label>
            </label>
            <Switch
              checked={autoDeployment}
              onChange={(checked) => setAutoDeployment(checked)}
              onColor="#3677e9"
              onHandleColor="#0a3669"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
            />
          </div>
        </div>
      </div>
      <div className="site-deployment-card-container deploy-container">
        <div className="site-deployment-header-title">
          <span>Deployments</span>
          <button className="trigger-deploy-button">Trigger deploy</button>
        </div>
        <div className="deploy-summary-item">
          {!projectLoading ? (
            (sortedDeployments ? sortedDeployments : []).map((deployment, index) => (
              <DeploymentItem index={index} type="filled" deployment={deployment} />
            ))
          ) : (
            <>
              <DeploymentItem index={1} type="skeleton" deployment={null} />
              <DeploymentItem index={2} type="skeleton" deployment={null} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDeployments;
