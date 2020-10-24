import React, { useContext, useEffect, lazy, Suspense } from "react";
import "./App.scss";
import { Route, Redirect, useHistory, useLocation, Switch } from "react-router-dom";
import { ActionContext } from "./hooks";
import { SkeletonTheme } from "react-loading-skeleton";
import { BroadcastChannel } from "broadcast-channel";
import Loading from "./components/Loading";

const Landing = lazy(() => import("./components/Landing"));
const SignUp = lazy(() => import("./components/SignUp"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const SignupWorkflows = lazy(() => import("./components/SignupWorkflows"));
const Login = lazy(() => import("./components/Login"));
const UserSettings = lazy(() => import("./components/UserSettings"));
const CreateOrg = lazy(() => import("./components/CreateOrg"));
const InviteCallback = lazy(() => import("./components/InviteCallback"));
const DeploySiteConfig = lazy(() => import("./components/DeploySiteConfig"));
const Sites = lazy(() => import("./components/Sites"));
const NotFound = lazy(() => import("./components/NotFound"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));

function App() {
  const history = useHistory();
  const location = useLocation();
  const { fetchUser } = useContext(ActionContext);

  useEffect(() => {
    const bc = new BroadcastChannel("signin_channel");
    bc.onmessage = (msg) => {
      if (msg === "signedup") {
        fetchUser();
        history.push("/dashboard");
      }
    };
    return () => {
      bc.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isJWTPresent = localStorage.getItem("jwt-token");
    if (isJWTPresent) {
      const urls = location.pathname.split("/");
      if (urls[1] === "org") {
        fetchUser(urls[2]);
      } else {
        fetchUser();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SkeletonTheme color="#ebebeb" highlightColor="#787878">
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return !localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Landing />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/dashboard" />
                );
              }}
            />
            <Route
              path="/signup"
              exact
              render={() => {
                return !localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <SignUp />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/dashboard" />
                );
              }}
            />
            <Route
              path="/login"
              exact
              render={() => {
                return !localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Login />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/dashboard" />
                );
              }}
            />

            <Route
              path="/signup/:slug"
              exact
              render={() => (
                <ErrorBoundary>
                  <SignupWorkflows />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/callback/:slug"
              exact
              render={() => (
                <ErrorBoundary>
                  <SignupWorkflows />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/github/app/:id"
              exact
              render={() => (
                <ErrorBoundary>
                  <SignupWorkflows />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/github/callback/app"
              exact
              render={() => (
                <ErrorBoundary>
                  <SignupWorkflows />
                </ErrorBoundary>
              )}
            />

            <Route
              path="/dashboard/:slug"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/dashboard/:slug1/:slug2"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/dashboard"
              exact
              render={() =>
                localStorage.getItem("inviteRef") ? (
                  <Redirect to="/invite/callback" />
                ) : (
                  <Redirect to="/dashboard/overview" />
                )
              }
            />

            <Route
              path="/user/settings"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <Redirect to={`/user/settings/general`} />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route
              path="/user/settings/:slug"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <UserSettings />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route
              path="/org/new"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <CreateOrg />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/deploy/new"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <DeploySiteConfig />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route path="/invite/callback" exact render={() => <InviteCallback />} />

            <Route
              path="/org/:orgid/sites/:slug"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Sites />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/org/:orgid/sites/:slug1/:slug2"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Sites />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/org/:orgid/sites/:slug1/:slug2/:slug3"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Sites />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/org/:orgid/sites/:slug1/:slug2/:slug3/:slug4"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Sites />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/org/:orgid/sites/:slug1/:slug2/:slug3/:slug4/:slug5"
              exact
              render={() => {
                return localStorage.getItem("jwt-token") ? (
                  <ErrorBoundary>
                    <Sites />
                  </ErrorBoundary>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="*"
              exact
              render={() => (
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              )}
            />
          </Switch>
        </Suspense>
      </div>
    </SkeletonTheme>
  );
}

export default App;
