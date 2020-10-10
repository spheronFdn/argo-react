import React, { useContext, useEffect, useState } from "react";
import "./ProfileDropdown.scss";
import IProfileDropdownProps from "./model";
import { useHistory } from "react-router-dom";
import { ApiService } from "../../../../../services";
import { Subscription } from "rxjs";
import { ActionContext } from "../../../../../hooks";

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({ setShowDropdown }) => {
  let logoutSvc: Subscription;
  const history = useHistory();
  const { resetUser } = useContext(ActionContext);

  const [logoutText, setLogoutText] = useState("Logout");

  const logout = () => {
    setLogoutText("Logging out...");
    logoutSvc = ApiService.logout().subscribe(() => {
      localStorage.removeItem("jwt-token");
      resetUser();
      history.push("/login");
      setLogoutText("Logout");
    });
  };

  useEffect(() => {
    return () => {
      if (logoutSvc) {
        logoutSvc.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectUrl = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <div
        className="dropdown-overlay"
        onClick={(e) => setShowDropdown(false)}
      ></div>
      <div className="dropdown-box">
        <div className="dropdown-triangle"></div>
        <div className="dropdown-item" onClick={(e) => redirectUrl("/dashboard")}>
          Dashboard
        </div>
        <div
          className="dropdown-item"
          onClick={(e) => redirectUrl("/user/settings")}
        >
          User Settings
        </div>
        <div className="dropdown-item" onClick={logout}>
          {logoutText}
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
