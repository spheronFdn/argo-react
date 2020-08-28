import React from "react";
import "./App.scss";
import Landing from "./components/Landing";
import { Route } from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Route path="/" exact render={() => <Landing />} />
      <Route path="/signIn" exact render={() => <SignIn />} />
    </div>
  );
}

export default App;
