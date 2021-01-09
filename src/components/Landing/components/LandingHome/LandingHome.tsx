import React from "react";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Particle } from "..";
import Typist from "react-typist";
import "./LandingHome.scss";

const LandingHome = () => {
  const history = useHistory();

  return (
    <div className="landing-home">
      <div className="gradient-layer"></div>
      <Particle type="home" />
      <div className="landing-home-body">
        <h1>Permaweb deployment.</h1>
        <h1 className="heading-sec">
          <Typist cursor={{ show: false }}>
            <Typist.Delay ms={500} />
            Simplified.
          </Typist>
        </h1>
        <button
          type="button"
          className="primary-button"
          onClick={(e) => history.push("/signup")}
        >
          <span className="button-icon">
            <FontAwesomeIcon icon={faSpaceShuttle} />
          </span>
          <span>Start Deploying</span>
        </button>
        <div className="alpha-text">Beta release now available</div>
      </div>
    </div>
  );
};

export default LandingHome;
