import React from "react";
import "./Logo.scss";
import ILogoProps from "./model";

const Logo: React.FC<ILogoProps> = ({ theme }) => {
  return (
    <div className="Logo">
      <img
        src={require(theme === "light"
          ? "../../assets/png/logo-colored.png"
          : "../../assets/png/logo-white.png")}
        alt={`ArGo ${theme === "light" ? "light" : "dark"} version`}
        className="logo-image"
        height={42}
        loading="lazy"
      />
      <span
        className={`logo-text ${theme === "light" ? "logo-light" : "logo-dark"}`}
      >
        ArGo.
      </span>
    </div>
  );
};

export default Logo;
