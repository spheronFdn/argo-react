import React, { useContext, useState } from "react";
import "./InviteMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
import { useHistory } from "react-router-dom";
import { concat } from "rxjs";
// import Skeleton from "react-loading-skeleton";

const InviteMembers = () => {
  const history = useHistory();
  const { selectedOrg } = useContext(StateContext);
  const [inviteMembers, setInviteMembers] = useState("");

  const sendInvite = () => {
    const members = inviteMembers.split(",").map((member) => member.trim());
    const invites = members.map((member) => ({
      organization: selectedOrg?._id,
      userEmail: member,
    }));
    concat(invites.map((invite) => ApiService.sendMemberInvite(invite))).subscribe(
      (res) =>
        res.subscribe((data) => {
          history.goBack();
        }),
    );
  };

  return (
    <div className="InviteMembers">
      <div className="invite-members-container">
        <div className="invite-members-details">
          <div className="invite-members-inner">
            <h1 className="invite-members-title">Add team members</h1>
            <div className="invite-members-form">
              <label className="invite-members-form-title">
                Emails of the new members
              </label>
              <label className="invite-members-form-subtitle">
                New team members will get an email with a link to accept the
                invitation.
              </label>
              <div className="invite-input-container">
                <span className="mail-icon">
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </span>
                <input
                  type="text"
                  className="invite-members-form-input"
                  placeholder="you@domain.com"
                  value={inviteMembers}
                  onChange={(e) => setInviteMembers(e.target.value)}
                />
              </div>
              <label className="invite-members-form-subtitle-bottom">
                You can enter several email addresses separated by commas <br />
                (without spaces).
              </label>
            </div>
            <div className="button-container">
              <button type="button" className="primary-button" onClick={sendInvite}>
                Send
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={(e) => history.goBack()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMembers;
