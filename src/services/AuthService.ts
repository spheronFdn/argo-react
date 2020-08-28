import { Log, User, UserManager } from "oidc-client";

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: "https://demo.identityserver.io/",
      client_id: "interactive.public",
      redirect_uri: `'http://localhost:4200/signin-callback`,
      silent_redirect_uri: `'http://localhost:4200/silent-renew`,
      post_logout_redirect_uri: `'http://localhost:4200/'`,
      response_type: "code",
      scope: "openid profile email api",
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
