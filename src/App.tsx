import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Landing,
  SignUp,
  Dashboard,
  SignupWorkflows,
  Login,
  UserSettings,
  CreateOrg,
  InviteCallback,
  Sites,
} from "./components";
import { ActionContext } from "./hooks";
import { SkeletonTheme } from "react-loading-skeleton";
import DeploySiteConfig from "./components/DeploySiteConfig";

function App() {
  const history = useHistory();
  const location = useLocation();
  const { fetchUser } = useContext(ActionContext);

  useEffect(() => {
    const bc = new BroadcastChannel("signin_channel");
    bc.onmessage = function (ev) {
      if (ev.data === "signedup") {
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
        <Route
          path="/"
          exact
          render={() => {
            return !localStorage.getItem("jwt-token") ? (
              <Landing />
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
              <SignUp />
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
              <Login />
            ) : (
              <Redirect to="/dashboard" />
            );
          }}
        />

        <Route path="/signup/:slug" exact render={() => <SignupWorkflows />} />
        <Route path="/callback/:slug" exact render={() => <SignupWorkflows />} />

        <Route
          path="/dashboard/:slug"
          exact
          render={() => {
            return localStorage.getItem("jwt-token") ? (
              <Dashboard />
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
              <Dashboard />
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
              <UserSettings />
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
              <CreateOrg />
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
              <DeploySiteConfig />
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
              <Sites />
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
              <Sites />
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
              <Sites />
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
              <Sites />
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
              <Sites />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
      </div>
    </SkeletonTheme>
  );
}

export default App;
