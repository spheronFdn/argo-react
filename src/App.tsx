import React from "react";
import "./App.scss";
import { Route, Redirect } from "react-router-dom";
import { Landing, SignUp, Dashboard } from "./components";
import { getCookie } from "./utils";

function App() {
  return (
    <div className="App">
      <Route path="/" exact render={() => <Landing />} />
      <Route path="/signup" exact render={() => <SignUp />} />
      <Route
        path="/login"
        exact
        render={() => {
          return !getCookie("connect.sid") ? (
            <SignUp />
          ) : (
            <Redirect to="/dashboard" />
          );
        }}
      />
      <Route path="/dashboard/:slug" exact render={() => <Dashboard />} />
      <Route
        path="/dashboard"
        exact
        render={() => <Redirect to="/dashboard/overview" />}
      />
    </div>
  );
}

export default App;
