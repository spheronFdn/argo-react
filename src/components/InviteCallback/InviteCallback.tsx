import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RootHeader } from "..";
import { ApiService } from "../../services";
import "./InviteCallback.scss";

function InviteCallback() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (!jwtToken) {
      const query = new URLSearchParams(location.search);
      const ref = query.get("ref");
      localStorage.setItem("inviteRef", `${ref}`);
      history.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendInvitation = (pValue: string) => {
    const query = new URLSearchParams(location.search);
    const ref = query.get("ref") || localStorage.getItem("inviteRef");
    const inviteReply = {
      id: ref,
      status: pValue,
    };
    ApiService.updateInvite(inviteReply).subscribe((res) => {
      localStorage.removeItem("inviteRef");
      history.push("/dashboard");
    });
  };
  return (
    <div className="InviteCallback">
      <RootHeader />
      <main className="app-main">
        <div className="invite-callback-container">
          <div className="invite-callback-card">
            <div className="invite-callback-card-inner">
              <h1 className="invite-callback-title">Accept the invitation</h1>
              <div className="create-org-form">
                <label className="create-org-form-title">
                  Invitation from Team 1 Organization
                </label>
                <label className="create-org-form-subtitle">
                  You have been invited to join the Team 1 organization on ArGo.
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InviteCallback;
