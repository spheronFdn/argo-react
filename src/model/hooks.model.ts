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
  providerProfile: IProfile;
  argoProfile: IArgoUser;
  provider: IProvider;
  createdAt: Date;
  updatedAt: Date;
  organizations: IOrganization[];
}

export interface IConfiguration {
  branch: string;
  buildCommand: string;
  workspace: string;
  publishDir: string;
  packageManager: string;
  framework: string;
  protocol: string;
}

export interface IProject {
  _id?: string;
  name: string;
  githubUrl: string;
  latestDeployment: IDeployment | null;
  deployments: IDeployment[];
  organizationId: string;
  domains: IDomain[];
  subdomains: IDomain[];
  handshakeDomains: IDomain[];
  handshakeSubdomains: IDomain[];
  env: any;
  updatedAt: Date;
  createdAt: Date;
}

export interface IDomain {
  _id?: string;
  name: string;
  link: string;
  isLatest: boolean;
  argoKey: string;
  verified: boolean;
  projectId: string;
  type: string;
}

export interface IDeployment {
  _id?: string;
  sitePreview: string;
  commitId: string;
  commitMessage: string;
  log: string[];
  topic: string;
  status: string;
  paymentId: string;
  buildTime: string;
  configuration: IConfiguration;
  project: IProject;
  createdAt: any;
  updatedAt: any;
}

export interface IWallet {
  _id?: string;
  address: string;
  updateDate: Date;
  createDate: Date;
}

export interface IOrganization {
  _id: string;
  profile: {
    name: string;
    image: string;
    username: string;
  };
  projects: IProject[];
  users: IUser[];
  wallet: IWallet;
  payments: any[];
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
  selectedProject: IProject | null;
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
  setSelectedProject: (project: any) => void;
  setPojectLoading: (loading: boolean) => void;
  setOrgLoading: (loading: boolean) => void;
  setSelectedDeployment: (deployment: boolean) => void;
  fetchProject: (projectId: string) => void;
  setRepoForTriggerDeployment: (repo: any) => void;
}
