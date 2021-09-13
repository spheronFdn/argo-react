import React from "react";
import Lottie from "react-lottie";
import { Popup } from "reactjs-popup";
import IPopupProps from "./model";
import animationData from "../../../../../../assets/lotties/trophy-winner.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTelegramPlane,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./SharePopup.scss";

const SharePopup: React.FC<IPopupProps> = ({ isOpen, link, paymentStatus }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  return (
    <Popup
      trigger={
        <button className="share-button" disabled={paymentStatus !== "success"}>
          Share
        </button>
      }
      position="center center"
      open={isOpen}
      className="popup-container"
      modal
    >
      <div className="modal-container">
        <div className="content">
          <div className="share-form">
            <label className="share-form-title">
              <Lottie options={defaultOptions} height={150} />
            </label>
            <label className="share-form-subtitle">
              You have successfully deployed your app!
              <br /> Let your friends know by sharing this achievement.
            </label>
          </div>
          <div className="share-container">
            <a
              href={`https://twitter.com/share?url=${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon icon={faTwitter} className="share-button-icon" />
              </button>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon icon={faFacebookF} className="share-button-icon" />
              </button>
            </a>
            <a
              href={`https://t.me/share/url?url=${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  className="share-button-icon"
                />
              </button>
            </a>
            <a
              href={`mailto:?subject=Check out my latest App &body=Check out this site ${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon icon={faEnvelope} className="share-button-icon" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SharePopup;
