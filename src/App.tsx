import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Route, Redirect, useHistory } from "react-router-dom";
import {
  Landing,
  SignUp,
  Dashboard,
  SignupWorkflows,
  Login,
  UserSettings,
  CreateOrg,
  InviteCallback,
} from "./components";
import { ActionContext } from "./hooks";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const history = useHistory();
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
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SkeletonTheme color="#ebebeb" highlightColor="#787878">
      <div className="App">
        <Route path="/" exact render={() => <Landing />} />
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
        <Route path="/invite/callback" exact render={() => <InviteCallback />} />
      </div>
    </SkeletonTheme>
  );
}

export default App;
