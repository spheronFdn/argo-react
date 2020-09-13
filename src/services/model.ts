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

/**
 * @export
 * @interface IUser
 */
export interface IUser {
  profile: IProfile;
  provider: IProvider;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  organizations?: [string[]];
}
