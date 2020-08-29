import { Log, User, UserManager } from "oidc-client";

export default class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: "https://localhost:5001/",
      client_id: "js",
      redirect_uri: `http://localhost:3000/signin`,
      // silent_redirect_uri: `http://localhost:3000/`,
      post_logout_redirect_uri: `http://localhost:3000/`,
      response_type: "code",
      scope: "openid profile clientapi",
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
