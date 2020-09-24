import { ApiService } from "../services";
import { IUserResponse } from "../model/service.model";
import Actions from "./Actions";
import { IModalModel, IOrganization } from "../model/hooks.model";

const Reducers = (dispatch: any, history: any) => ({
  toggleModal: (modal: IModalModel) => {
    dispatch({ type: Actions.TOGGLE_MODAL, modal });
  },
  fetchUser: (orgId?: string) => {
    dispatch({ type: Actions.SET_USER_LOADING, userLoading: true });

    ApiService.fetchUser("1234").subscribe((response: IUserResponse) => {
      // eslint-disable-next-line no-console
      console.log(response.user, orgId);
      if (response.user) {
        dispatch({ type: Actions.SET_USER, user: response.user });
        dispatch({
          type: Actions.SET_SELECTED_ORG,
          selectedOrg: response.user.organizations
            ? orgId
              ? response.user.organizations.filter((org) => org._id === orgId)[0]
              : response.user.organizations[0]
            : null,
        });
      } else {
        localStorage.removeItem("jwt-token");
        history.push("/login");
      }
      dispatch({ type: Actions.SET_USER_LOADING, userLoading: false });
    });
  },
  setSelectedOrganization: (organization: IOrganization) => {
    dispatch({
      type: Actions.SET_SELECTED_ORG,
      selectedOrg: organization,
    });
  },
  resetUser: () => {
    dispatch({
      type: Actions.SET_USER,
      selectedOrg: null,
    });
  },
  setLatestDeploymentConfig: (config: any) => {
    dispatch({
      type: Actions.SET_LATEST_DEPLOY_CONFIG,
      currentSiteDeployConfig: config,
    });
    dispatch({
      type: Actions.SET_LATEST_DEPLOY_LOGS,
      currentSiteDeployLogs: [],
    });
  },
  setSelectedProject: (project: any) => {
    dispatch({
      type: Actions.SET_SELECTED_PROJECT,
      selectedProject: project,
    });
  },
  setLatestDeploymentLogs: (logs: any[]) => {
    dispatch({
      type: Actions.SET_LATEST_DEPLOY_LOGS,
      currentSiteDeployLogs: logs,
    });
  },
  setLatestDeploymentSocketTopic: (topic: string) => {
    dispatch({
      type: Actions.SET_LATEST_DEPLOY_SOCKET_TOPIC,
      currentSiteDeploySocketTopic: topic,
    });
  },
});

export const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
  user: null,
  userLoading: false,
  selectedOrg: null,
  currentSiteDeployConfig: null,
  currentSiteDeployLogs: [],
  selectedProject: null,
  currentSiteDeploySocketTopic: "",
};

export default Reducers;
