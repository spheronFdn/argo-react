import React from "react";
import "./SignIn.scss";
import { AuthService } from "../../services/AuthService";

function SignIn() {
  const authService = new AuthService();
  const signInUsingGoogle = () => {
    authService.login();
  };
  return (
    <div className="SignIn">
      <div>
        <button type="button" onClick={signInUsingGoogle}>
          Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
