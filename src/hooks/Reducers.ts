import { ApiService } from "../services";
import { IUserResponse } from "../model/service.model";
import Actions from "./Actions";
import { IModalModel } from "../model/hooks.model";

const Reducers = (dispatch: any, history: any) => ({
  toggleModal: (modal: IModalModel) => {
    dispatch({ type: Actions.TOGGLE_MODAL, modal });
  },
  fetchUser: (orgId?: string) => {
    dispatch({ type: Actions.SET_USER_LOADING, userLoading: true });
    dispatch({ type: Actions.SET_ORG_LOADING, orgLoading: true });

    ApiService.fetchUser("1234").subscribe((response: IUserResponse) => {
      // eslint-disable-next-line no-console
      if (response.user) {
        dispatch({ type: Actions.SET_USER, user: response.user });
        // dispatch({
        //   type: Actions.SET_SELECTED_ORG,
        //   selectedOrg: response.user.organizations
        //     ? orgId
        //       ? response.user.organizations.filter((org) => org._id === orgId)[0]
        //       : response.user.organizations[0]
        //     : null,
        // });
        ApiService.getOrganization(
          `${
            orgId
              ? orgId
              : response.user.organizations?.length
              ? response.user.organizations[0]._id
              : ""
          }`,
        ).subscribe((res) => {
          dispatch({
            type: Actions.SET_SELECTED_ORG,
            selectedOrg: res,
          });
          dispatch({ type: Actions.SET_ORG_LOADING, orgLoading: false });
        });
      } else {
        localStorage.removeItem("jwt-token");
        history.push("/login");
      }
      dispatch({ type: Actions.SET_USER_LOADING, userLoading: false });
    });
  },
  setSelectedOrganization: (organization: any) => {
    dispatch({ type: Actions.SET_ORG_LOADING, orgLoading: true });
    ApiService.getOrganization(`${organization._id}`).subscribe((res) => {
      dispatch({
        type: Actions.SET_SELECTED_ORG,
        selectedOrg: res,
      });
      dispatch({ type: Actions.SET_ORG_LOADING, orgLoading: false });
    });
  },
  resetUser: () => {
    dispatch({
      type: Actions.SET_USER,
      user: null,
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
  setPojectLoading: (loading: boolean) => {
    dispatch({
      type: Actions.SET_PROJECT_LOADING,
      projectLoading: loading,
    });
  },
  setOrgLoading: (loading: boolean) => {
    dispatch({
      type: Actions.SET_ORG_LOADING,
      orgLoading: loading,
    });
  },
  setSelectedDeployment: (deployment: boolean) => {
    dispatch({
      type: Actions.SET_SELECTED_DEPLOYMENT,
      orgLoading: deployment,
    });
  },
  fetchProject: (projectId: string) => {
    dispatch({
      type: Actions.SET_PROJECT_LOADING,
      projectLoading: true,
    });
    ApiService.getProject(projectId).subscribe((project) => {
      dispatch({
        type: Actions.SET_SELECTED_PROJECT,
        selectedProject: project,
      });
      dispatch({
        type: Actions.SET_PROJECT_LOADING,
        projectLoading: false,
      });
    });
  },
  setRepoForTriggerDeployment: (repo: string) => {
    dispatch({
      type: Actions.SET_REPO_FOR_TRIGGER_DEPLOYMENT,
      selectedRepoForTriggerDeployment: repo,
    });
  },
});

export const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
  user: null,
  userLoading: false,
  orgLoading: false,
  projectLoading: false,
  selectedOrg: null,
  currentSiteDeployConfig: null,
  currentSiteDeployLogs: [],
  selectedProject: null,
  currentSiteDeploySocketTopic: "",
  selectedDeployment: null,
  selectedRepoForTriggerDeployment: null,
};

export default Reducers;
