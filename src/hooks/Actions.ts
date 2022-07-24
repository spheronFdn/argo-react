import { IModalModel, IOrganization } from "../model/hooks.model";

export default class Actions {
  static TOGGLE_MODAL = "[Actions] TOGGLE_MODAL";
  static SET_USER = "[Actions] SET_USER";
  static SET_SELECTED_ORG = "[Actions] SET_SELECTED_ORG";
  static SET_USER_LOADING = "[Actions] SET_USER_LOADING";
  static SET_PROJECT_LOADING = "[Actions] SET_PROJECT_LOADING";
  static SET_ORG_LOADING = "[Actions] SET_ORG_LOADING";
  static SET_LATEST_DEPLOY_CONFIG = "[Actions] SET_LATEST_DEPLOY_CONFIG";
  static SET_LATEST_DEPLOY_LOGS = "[Actions] SET_LATEST_DEPLOY_LOGS";
  static SET_LATEST_DEPLOY_SOCKET_TOPIC = "[Actions] SET_LATEST_DEPLOY_SOCKET_TOPIC";
  static SET_SELECTED_PROJECT = "[Actions] SET_SELECTED_PROJECT";
  static SET_SELECTED_DEPLOYMENT = "[Actions] SET_SELECTED_DEPLOYMENT";
  static SET_REPO_FOR_TRIGGER_DEPLOYMENT =
    "[Actions] SET_REPO_FOR_TRIGGER_DEPLOYMENT";
}
export const actionInitialValue = {
  toggleModal: (modal: IModalModel) => {},
  fetchUser: () => {},
  setSelectedOrganization: (organization: IOrganization) => {},
  resetUser: () => {},
  setLatestDeploymentConfig: (config: any) => {},
  setLatestDeploymentLogs: (logs: any[]) => {},
  setSelectedProject: (project: any) => {},
  setPojectLoading: (loading: boolean) => {},
  setOrgLoading: (loading: boolean) => {},
  setSelectedDeployment: (deployment: boolean) => {},
  fetchProject: (projectId: string) => {},
  setRepoForTriggerDeployment: (repo: any) => {},
};
