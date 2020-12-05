import React from "react";
import "./NotFound.scss";
import animationData from "../../assets/lotties/404.json";
import Lottie from "react-lottie";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };
  return (
    <div className="NotFound">
      <RootHeader parent={"Landing"} />
      <div className="not-found-container">
        <Lottie options={defaultOptions} height={380} />
        <h1>Ooops!</h1>
        <p>That page does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
