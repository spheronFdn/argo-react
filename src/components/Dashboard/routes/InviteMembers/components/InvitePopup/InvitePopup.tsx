import React, { useContext } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "react-lottie";
import { useHistory } from "react-router";
import { Popup } from "reactjs-popup";
import animationData from "../../../../../../assets/lotties/58028-tick.json";
import animationDataX from "../../../../../../assets/lotties/wrong-sign.json";
import { ActionContext } from "../../../../../../hooks";
import { IActionModel } from "../../../../../../model/hooks.model";
import IInviteProps from "./model";
import "./InvitePopup.scss";

const InvitePopup: React.FC<IInviteProps> = ({ isOpen, memberLoading, isData }) => {
  const history = useHistory();
  const { fetchUser } = useContext<IActionModel>(ActionContext);

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

  return (
    <Popup
      open={isOpen && !memberLoading}
      position="center center"
      className="invite-popup"
      modal
      nested
    >
      <div className="modal-container">
        <div className="close-btn-container">
          <button
            className="close-modal"
            onClick={() => {
              history.push("/dashboard/members");
              fetchUser();
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="close-icon"></FontAwesomeIcon>
          </button>
        </div>
        {isData ? (
          <div className="success-container">
            <div className="check-container">
              <Lottie options={defaultOptions} height={170} />
            </div>
            <div className="header-container">Success!</div>
            <div className="text-description">
              Invite mail sent successfully.
              <br />
              <br />
              Ask member to check his mail and confirm, to add as a member of this
              organization.
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
    </Popup>
  );
};

export default InvitePopup;
