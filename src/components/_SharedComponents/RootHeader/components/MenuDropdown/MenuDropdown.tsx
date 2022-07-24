import React from "react";
import "./MenuDropdown.scss";
import { useHistory } from "react-router-dom";
import IMenuDropdownProps from "./model";

const MenuDropdown: React.FC<IMenuDropdownProps> = ({ setShowDropdown }) => {
  const history = useHistory();

  return (
    <>
      <div
        className="menu-dropdown-overlay"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="menu-dropdown-box">
        <div className="menu-dropdown-triangle"></div>
        <div
          className="menu-dropdown-item"
          onClick={(e) =>
            window.open("https://discord.gg/ahxuCtm", "_blank", "noopener")
          }
        >
          Contact
        </div>
        <div className="menu-dropdown-item" onClick={(e) => history.push("/login")}>
          Login
        </div>
        <div className="menu-dropdown-item" onClick={(e) => history.push("/signup")}>
          Signup
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;
