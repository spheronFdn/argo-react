import React, { useEffect } from "react";
import "./App.scss";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Landing, SignUp, Dashboard, SignupWorkflows, Login } from "./components";

function App() {
  const history = useHistory();
  useEffect(() => {
    const bc = new BroadcastChannel("signin_channel");
    bc.onmessage = function (ev) {
      if (ev.data === "signedup") {
        history.push("/dashboard");
      }
    };
    return () => {
      bc.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
      <Route path="/signup/:slug" exact render={() => <SignupWorkflows />} />
      <Route path="/callback/:slug" exact render={() => <SignupWorkflows />} />
      <Route
        path="/dashboard"
        exact
        render={() => <Redirect to="/dashboard/overview" />}
      />
    </div>
  );
}

export default App;
