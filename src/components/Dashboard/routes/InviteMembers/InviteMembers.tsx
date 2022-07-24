import React, { useContext, useEffect, useState } from "react";
import "./InviteMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
import { useHistory } from "react-router-dom";
import { concat } from "rxjs";
import BounceLoader from "react-spinners/BounceLoader";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import InvitePopup from "./components/InvitePopup/InvitePopup";

const InviteMembers = () => {
  const history = useHistory();
  const { selectedOrg, user } = useContext(StateContext);
  const [inviteMembers, setInviteMembers] = useState<string>("");
  const [inviteMemberLoading, setInviteMembersLoading] = useState<boolean>(false);
  const [inviteData, setInviteData] = useState<boolean>();
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (
      inviteMembers.match("^([a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+,?)*$") &&
      inviteMembers !== ""
    ) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  }, [inviteMembers]);

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
          setInviteData(data.success);
          setInviteMembersLoading(false);
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
              {!validateEmail && (
                <label className="invite-members-form-alert">
                  <span className="alert-icon-container">
                    <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                  </span>
                  Please enter the email in a valid format.
                </label>
              )}
              <label className="invite-members-form-subtitle-bottom">
                You can enter several email addresses separated by commas <br />
                (without spaces).
              </label>
            </div>
            <div className="button-container">
              <div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    sendInvite();
                    setPopupIsOpen(true);
                  }}
                  disabled={!validateEmail}
                >
                  {inviteMemberLoading && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                  Send
                </button>
              </div>
              <InvitePopup
                isOpen={popupIsOpen}
                memberLoading={inviteMemberLoading}
                isData={inviteData!}
              />
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
