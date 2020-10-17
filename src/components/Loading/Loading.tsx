import React from "react";
import { BounceLoader } from "react-spinners";
import "./Loading.scss";

function Loading() {
  return (
    <div className="Loading">
      <BounceLoader size={150} color={"#fff"} loading={true} />
    </div>
  );
}

export default Loading;
