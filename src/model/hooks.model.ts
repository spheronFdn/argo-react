/**
 * @export
 * @interface IProfile
 */
export interface IProfile {
  id: number;
  argo_username: string;
  provider_username: string;
  avatar_url: string;
  name: string;
  email: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  is_active: boolean;
}

export interface IArgoUser {
  username: string;
  avatar: string;
  is_active?: boolean;
  name: string;
  email: string;
}

export interface IProvider {
  name: string;
}

export interface IArgoWalletModel {
  wallet_address: string;
  wallet_balance: number;
}

export interface IUser {
  _id: string;
  provider_profile: IProfile;
  argo_profile: IArgoUser;
  argo_wallet: IArgoWalletModel;
  provider: IProvider;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  organizations?: IOrganization[];
  totalDepTime?: number;
}

export interface IRepository {
  _id?: string;
  name: string;
  url: string;
  webHook: string;
  deployments: IDeployment[];
  updateDate: Date;
  createDate: Date;
  orgId: string;
  package_manager: string;
  build_command: string;
  publish_dir: string;
  branch: string;
  workspace: string;
  sitePreview: string;
  framework: string;
  domains: IDomain[];
  subDomains: IDomain[];
}

export interface IDomain {
  _id?: string;
  name: string;
  transactionId: string;
}
export interface IDeployment {
  _id?: string;
  sitePreview: string;
  commitId: string;
  log: string[];
  createdAt: any;
  topic: string;
  branch: string;
  deploymentStatus: string;
  package_manager: string;
  build_command: string;
  publish_dir: string;
}

export interface IOrganization {
  _id?: string;
  profile: {
    name: string;
    image: string;
    username: string;
  };
  repositories?: IRepository[];
  users?: string[];
}

export interface IModalConfig {
  type: string;
}

export interface IModalModel {
  openModal: boolean;
  modalConfig: IModalConfig;
}

export interface IStateModel {
  openModal: boolean;
  modalConfig: IModalConfig;
  user: IUser | null;
  selectedOrg: IOrganization | null;
  userLoading: boolean;
  orgLoading: boolean;
  projectLoading: boolean;
  currentSiteDeployConfig: any;
  currentSiteDeployLogs: any[];
  selectedProject: IRepository | null;
  currentSiteDeploySocketTopic: string;
  selectedDeployment: IDeployment | null;
  selectedRepoForTriggerDeployment: any | null;
}

export interface IActionModel {
  toggleModal: (modal: IModalModel) => void;
  fetchUser: (id?: string) => void;
  setSelectedOrganization: (organization: any) => void;
  resetUser: () => void;
  setLatestDeploymentConfig: (config: any) => void;
  setLatestDeploymentLogs: (logs: any[]) => void;
  setLatestDeploymentSocketTopic: (topic: string) => void;
  setSelectedProject: (project: any) => void;
  setPojectLoading: (loading: boolean) => void;
  setOrgLoading: (loading: boolean) => void;
  setSelectedDeployment: (deployment: boolean) => void;
  fetchProject: (projectId: string) => void;
  setRepoForTriggerDeployment: (repo: any) => void;
}
