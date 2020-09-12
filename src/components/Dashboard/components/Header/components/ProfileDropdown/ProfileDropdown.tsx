import React, { useState } from "react";
import "./ProfileDropdown.scss";
import IProfileDropdownProps from "./model";
import { useHistory } from "react-router-dom";
import { ApiService } from "../../../../../../services";

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({ setShowDropdown }) => {
  const history = useHistory();
  const [logoutText, setLogoutText] = useState("Logout");
  const logout = () => {
    setLogoutText("Logging out...");
    const logoutSvc = ApiService.logout().subscribe(() => {
      localStorage.removeItem("jwt-token");
      history.push("/login");
      setLogoutText("Logout");
    });

    return () => {
      logoutSvc.unsubscribe();
    };
  };
  return (
    <>
      <div
        className="dropdown-overlay"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="dropdown-box">
        <div className="dropdown-triangle"></div>
        <div className="dropdown-item">Dashboard</div>
        <div className="dropdown-item">User Settings</div>
        <div className="dropdown-item" onClick={logout}>
          {logoutText}
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
