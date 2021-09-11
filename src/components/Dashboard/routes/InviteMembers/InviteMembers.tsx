import React, { useContext, useEffect, useState } from "react";
import "./InviteMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { ActionContext, StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
import { useHistory } from "react-router-dom";
import { concat } from "rxjs";
import BounceLoader from "react-spinners/BounceLoader";
import Popup from "reactjs-popup";
import { faExclamationCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../../../assets/lotties/58028-tick.json";
import animationDataX from "../../../../assets/lotties/wrong-sign.json";
import Lottie from "react-lottie";
import { IActionModel } from "../../../../model/hooks.model";

const InviteMembers = () => {
  const history = useHistory();
  const { selectedOrg, user } = useContext(StateContext);
  const [inviteMembers, setInviteMembers] = useState<string>("");
  const [inviteMemberLoading, setInviteMembersLoading] = useState<boolean>();
  const [inviteData, setInviteData] = useState<boolean>();
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const { fetchUser } = useContext<IActionModel>(ActionContext);

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  const defaultOptionsX = {
    loop: true,
    autoplay: true,
    animationData: animationDataX,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

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

  // const emailChecker = () => {
  //   const members = inviteMembers.split(",").map((member) => member.trim());
  //   const invites = members.map((member) => ({
  //     orgId: selectedOrg?._id,
  //     orgName: selectedOrg?.profile.name,
  //     userEmail: member,
  //     invitingUser: user?.argoProfile.name,
  //   }));
  //   var i = 0;
  //   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   while (invites.length) {
  //     if (invites[i].userEmail.match(mailformat)) setValidateEmail(true);
  //     else setValidateEmail(false);
  //   }
  // };

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
              <Popup
                trigger={
                  <div>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={sendInvite}
                      disabled={!validateEmail}
                    >
                      {inviteMemberLoading && (
                        <BounceLoader size={20} color={"#fff"} loading={true} />
                      )}
                      Send
                    </button>
                  </div>
                }
                position="center center"
                className="invite-popup"
                modal
                nested
              >
                {!inviteMemberLoading ? (
                  <div className="modal-container">
                    <div className="close-btn-container">
                      <button
                        className="close-modal"
                        onClick={() => {
                          history.push("/dashboard/members");
                          fetchUser();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="close-icon"
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                    {inviteData ? (
                      <div className="success-container">
                        <div className="check-container">
                          <Lottie options={defaultOptions} height={170} />
                        </div>
                        <div className="header-container">Success!</div>
                        <div className="text-description">
                          Invite mail sent successfully.
                          <br />
                          <br />
                          Please check your mail and confirm, to add as a member of
                          this organization.
                        </div>
                      </div>
                    ) : (
                      <div className="failure-container">
                        <div className="check-container">
                          <Lottie options={defaultOptionsX} height={170} />
                        </div>
                        <div className="header-container">Uh Oh!</div>
                        <div className="text-description">
                          Please check the entered email and try again.
                          <br />
                          <br />
                          You can reach out to the ArGo team if the problem persists.
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
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
