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

/**
 * @export
 * @interface IProvider
 */
export interface IProvider {
  name: string;
}

export interface IUser {
  profile: IProfile;
  provider: IProvider;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  organizations?: IOrganization[];
}

export interface IRepository {
  name: string;
  url: string;
  webHook: string;
  deployments: IDeployment[];
}

export interface IDeployment {
  sitePreview: string;
  commitId: string;
  log: string;
  createdAt: Date;
}

export interface IOrganization {
  _id?: string;
  name: string;
  image: string;
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
}

export interface IActionModel {
  toggleModal: (modal: IModalModel) => void;
  fetchUser: () => void;
  setSelectedOrganization: (organization: IOrganization) => void;
}
