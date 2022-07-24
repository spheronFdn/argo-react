import React, { createContext, useMemo } from "react";
import Actions, { actionInitialValue } from "./Actions";
import { IActionModel, IStateModel } from "../model/hooks.model";
import Reducers, { stateInitialValue } from "./Reducers";
import { useHistory } from "react-router-dom";

export const ActionContext = createContext<IActionModel>(actionInitialValue);
export const StateContext = createContext<IStateModel>(stateInitialValue);

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

export const AppProvider = (props: any) => {
  const history = useHistory();
  // const query = useQuery();
  const [state, dispatch] = React.useReducer((prevState: any, action: any) => {
    switch (action.type) {
      case Actions.TOGGLE_MODAL:
        return {
          ...prevState,
          openModal: action.modal.openModal,
          modalConfig: action.modal.modalConfig,
        };
      case Actions.SET_USER:
        return {
          ...prevState,
          user: action.user,
        };
      case Actions.SET_SELECTED_ORG:
        return {
          ...prevState,
          selectedOrg: action.selectedOrg,
        };
      case Actions.SET_USER_LOADING:
        return {
          ...prevState,
          userLoading: action.userLoading,
        };
      case Actions.SET_ORG_LOADING:
        return {
          ...prevState,
          orgLoading: action.orgLoading,
        };
      case Actions.SET_LATEST_DEPLOY_CONFIG:
        return {
          ...prevState,
          currentSiteDeployConfig: action.currentSiteDeployConfig,
        };
      case Actions.SET_LATEST_DEPLOY_LOGS:
        return {
          ...prevState,
          currentSiteDeployLogs: action.currentSiteDeployLogs,
        };
      case Actions.SET_SELECTED_PROJECT:
        return {
          ...prevState,
          selectedProject: action.selectedProject,
        };
      case Actions.SET_PROJECT_LOADING:
        return {
          ...prevState,
          projectLoading: action.projectLoading,
        };
      case Actions.SET_SELECTED_DEPLOYMENT:
        return {
          ...prevState,
          selectedDeployment: action.selectedDeployment,
        };
      case Actions.SET_REPO_FOR_TRIGGER_DEPLOYMENT:
        return {
          ...prevState,
          selectedRepoForTriggerDeployment: action.selectedRepoForTriggerDeployment,
        };
      default:
        return {
          prevState,
        };
    }
  }, stateInitialValue);

  const actionContext = useMemo(
    () => Reducers(dispatch, history),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>{props.children}</StateContext.Provider>
    </ActionContext.Provider>
  );
};
