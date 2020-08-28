import React from "react";
import "./SignIn.scss";

function SignIn() {
  const signInUsingGoogle = () => {
    fetch("https://localhost:5001").then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
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
