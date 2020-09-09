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
      <Route path="/dashboard" exact render={() => <Dashboard />} />
    </div>
  );
}

export default App;
