import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { ActionContext } from "../../hooks";
import { ApiService } from "../../services";
import "./InviteCallback.scss";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function InviteCallback() {
  const location = useLocation();
  const history = useHistory();

  const { fetchUser } = useContext(ActionContext);
  const [inviteStatus, setInviteStatus] = useState<string>("");
  const [errorWarning, setErrorWarning] = useState<boolean>(false);
  const [inviteLoading, setInviteLoading] = useState<boolean>(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (!jwtToken) {
      const query = new URLSearchParams(location.search);
      const ref = query.get("ref");
      const orgName = query.get("orgName");
      localStorage.setItem("inviteRef", `${ref}`);
      localStorage.setItem("orgName", `${orgName}`);
      history.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const sendInvitation = (pValue: string) => {
    if (pValue === "accepts") {
      setInviteLoading(true);
    }
    const query = new URLSearchParams(location.search);
    const ref = query.get("ref") || localStorage.getItem("inviteRef");
    const inviteReply = {
      id: ref,
      status: pValue,
    };
    ApiService.updateInvite(inviteReply).subscribe(
      (res) => {
        if (componentIsMounted.current) {
          if (!res.error) {
            setInviteStatus(res.message);
            setErrorWarning(false);
            localStorage.removeItem("inviteRef");
            fetchUser();
            history.push("/dashboard");
          } else {
            setInviteStatus(res.message);
            setErrorWarning(true);
          }
        }
        setInviteLoading(false);
        setTimeout(() => {
          setErrorWarning(false);
          setInviteStatus("");
        }, 5000);
      },
      (err) => {
        setErrorWarning(true);
        setInviteStatus(err.message);
      },
    );
  };

  return (
    <div className="InviteCallback">
      <RootHeader parent={"InviteCallback"} />
      <main className="app-main">
        <div className="invite-callback-container">
          <div className="invite-callback-card">
            <div className="invite-callback-card-inner">
              <h1 className="invite-callback-title">Accept the invitation</h1>
              <div className="create-org-form">
                <label className="create-org-form-title">
                  Invitation from {localStorage.getItem("orgName")} Organization
                </label>
                <label className="create-org-form-subtitle">
                  You have been invited to join the {localStorage.getItem("orgName")}{" "}
                  organization on ArGo.
                </label>
                <label className="create-org-form-subtitle">
                  By joining, your name, email address and username will be visible
                  to other members of the organization. You will also be able to
                  access all the projects on the Organization.
                </label>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="accept-button"
                  onClick={(e) => sendInvitation("accepts")}
                >
                  {inviteLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                  Accept
                </button>
                <button
                  type="button"
                  className="decline-button"
                  onClick={(e) => sendInvitation("decline")}
                >
                  Decline
                </button>
              </div>
              {errorWarning && (
                <div className="warning-container">
                  <div className="warning-header">
                    <FontAwesomeIcon icon={faExclamationCircle} /> {inviteStatus}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InviteCallback;
