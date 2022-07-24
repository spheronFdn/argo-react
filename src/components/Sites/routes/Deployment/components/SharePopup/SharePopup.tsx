import React from "react";
import Lottie from "react-lottie";
import { Popup } from "reactjs-popup";
import IPopupProps from "./model";
import animationData from "../../../../../../assets/lotties/trophy-winner.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./SharePopup.scss";

const SharePopup: React.FC<IPopupProps> = ({
  isOpen,
  link,
  protocol,
  paymentStatus,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  const showProtocolText = (protocol: string, platform: string) => {
    switch (protocol) {
      case "arweave":
        switch (platform) {
          case "twitter":
            return "@ArweaveTeam";
          case "telegram":
            return "@arweavers";
          case "mail":
            return "Arweave";
          case "fb":
            return "Arweave";
          default:
            return "";
        }
      case "skynet":
        switch (platform) {
          case "twitter":
            return "@SkynetLabs";
          case "telegram":
            return "Skynet";
          case "mail":
            return "Skynet";
          case "fb":
            return "Skynet";
          default:
            return "";
        }
      case "neofs":
        switch (platform) {
          case "twitter":
            return "@Neo_Blockchain";
          case "telegram":
            return "@NEO_EN";
          case "mail":
            return "NeoFs";
          case "fb":
            return "NeoFs";
          default:
            return "";
        }
      default:
        return "";
    }
  };

  const shareAchievement = (platform: string) => {
    switch (platform) {
      case "twitter":
        return `I decentralized my web app using @SpheronHQ.%0a%0aCheck it out at ${link} deployed on ${showProtocolText(
          protocol,
          platform,
        )}. 🥳%0a%0a%23PoweredBySpheron`;
      case "fb":
        return `I decentralized my web app using Spheron Protocol.%0a%0aCheck it out at ${link} deployed on ${showProtocolText(
          protocol,
          platform,
        )}. 🥳%0a%0a%23PoweredBySpheron`;
      case "telegram":
        return `I decentralized my web app using @argoofficial.%0a%0aCheck it out at ${link} deployed on ${showProtocolText(
          protocol,
          platform,
        )}. 🥳%0a%0a%23PoweredBySpheron`;
      case "mail":
        return `I decentralized my web app using Spheron Protocol.%0a%0aCheck it out at ${link} deployed on ${showProtocolText(
          protocol,
          platform,
        )}. 🥳%0a%0a%23PoweredBySpheron`;
      default:
        return "";
    }
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
              href={`https://twitter.com/share?text=${shareAchievement(
                "twitter",
              )}&hashtag=PoweredByArGoApp`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon icon={faTwitter} className="share-button-icon" />
              </button>
            </a>
            <a
              href={`https://t.me/share/url?url=${shareAchievement("telegram")}`}
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
            {/* <a
              href={`https://www.facebook.com/sharer/sharer.php?quote=${shareAchievement(
                "fb",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-button">
                <FontAwesomeIcon icon={faFacebookF} className="share-button-icon" />
              </button>
            </a> */}
            <a
              href={`mailto:?subject=Check out my latest App &body=${shareAchievement(
                "mail",
              )}`}
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
