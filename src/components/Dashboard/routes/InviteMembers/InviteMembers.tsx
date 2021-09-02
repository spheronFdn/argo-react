import React, { useContext, useState } from "react";
import "./InviteMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
import { useHistory } from "react-router-dom";
import { concat } from "rxjs";
import BounceLoader from "react-spinners/BounceLoader";
import Popup from "reactjs-popup";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const InviteMembers = () => {
  const history = useHistory();
  const { selectedOrg, orgLoading, user } = useContext(StateContext);
  const [inviteMembers, setInviteMembers] = useState<string>("");
  const [inviteMemberLoading, setInviteMembersLoading] = useState<boolean>(false);
  const [inviteSent, setInviteSent] = useState<boolean>(false);

  setInviteSent(true); //to be removed

  const sendInvite = () => {
    setInviteMembersLoading(true);
    const members = inviteMembers.split(",").map((member) => member.trim());
    const invites = members.map((member) => ({
      organization: selectedOrg?._id,
      orgName: selectedOrg?.profile.name,
      userEmail: member,
      invitingUser: user?.argoProfile.name,
    }));
    concat(invites.map((invite) => ApiService.sendMemberInvite(invite))).subscribe(
      (res) =>
        res.subscribe((data) => {
          setInviteMembersLoading(false);
          // history.push("/dashboard/members");
        }),
    );
  };

  const handleClick = () => {
    history.push("/dashboard/members");
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
              <Popup
                trigger={
                  <div>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={sendInvite}
                      disabled={orgLoading}
                    >
                      {inviteMemberLoading && (
                        <BounceLoader size={20} color={"#fff"} loading={true} />
                      )}
                      Send
                    </button>
                  </div>
                }
                position="center center"
                modal
                nested
              >
                <div className="modal-container">
                  <div className="close-btn-container">
                    <button className="close-modal" onClick={handleClick}>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="close-icon"
                      ></FontAwesomeIcon>
                    </button>
                  </div>
                  {inviteSent ? (
                    <div className="success-container">
                      <div className="check-container">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="check-icon"
                        ></FontAwesomeIcon>
                      </div>
                      <div className="header-container">Success!</div>
                      <div className="text-description">
                        Invite mail successfully sent to the provided email id.
                        <br />
                        <br />
                        Please check your mail and confirm to add as a member in this
                        organization.
                      </div>
                    </div>
                  ) : (
                    <div className="failure-container">
                      <div className="check-container">
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="check-icon"
                        ></FontAwesomeIcon>
                      </div>
                      <div className="header-container">Uh Oh!</div>
                      <div className="text-description">
                        Please check the entered email and try again.
                        <br />
                        <br /> You can contact ArGo team on discord for help if it
                        fails again.
                      </div>
                    </div>
                  )}
                </div>
              </Popup>

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
