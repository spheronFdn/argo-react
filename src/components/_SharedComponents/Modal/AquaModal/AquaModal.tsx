import React, { useContext, useEffect, useState } from "react";
import config from "../../../../config";
import { StateContext } from "../../../../hooks";
import "./AquaModal.scss";
import IModalProps from "./model";

const AquaModal: React.FC<IModalProps> = ({ setOpenModal }) => {
  const { user } = useContext(StateContext);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const modal_status = localStorage.getItem("showModal");
    if (modal_status === "false") {
      setOpenModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setUserName(user.argoProfile.username);
    }
  }, [user]);

  const showCoupon = () => {
    return (
      <span className="">
        {"{"}
        <strong>{config.couponCode.FREE_PRO.toUpperCase()}</strong>
        {"}"}
      </span>
    );
  };

  return (
    <div className="modal__outer__con">
      <div className="modal__inner__con">
        <button
          className="x_button"
          onClick={() => {
            setOpenModal(false);
            localStorage.setItem("showModal", "false");
          }}
        >
          X
        </button>
        <div className="header"> Hola {userName} !!</div>
        <div className="body">
          Prashant And Mitra's vision was to bring the next million developers
          onboarded in Web3 by providing best-in-class dev tooling. <br />
          <br />
          The journey you onboarded to reach that vision was the first step to
          validating the product and market fit. Now we are at a stage where we have
          tested our new version, 'AQUA', and more than 400+ projects have onboarded
          during the launch phase. At this stage of 'AQUA', we have decided to make
          it an official app. <br />
          <br />
          We will discontinue this app version from September 15th, 2022. <br />
          <br />
          Prashant and Mitra would love to invite you to the new app currently hosted
          at{" "}
          <a
            className="link"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://aqua.spheron.network"}
          >
            https://aqua.spheron.network
          </a>
          . After September 15th, our older app, hosted at{" "}
          <a
            className="link"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://app.spheron.network"}
          >
            https://app.spheron.network
          </a>
          , will be migrated to the new 'AQUA' version. <br />
          <br />
          With your help, we were able to reach this milestone, and here is your
          unique COUPON CODE TO GET FREE PRO VERSION OF AQUA FOR 3 MONTHS{" "}
          {showCoupon()} <br /> <br />
          We are looking forward to seeing you at the new app. <br /> <br />
          Please join our{" "}
          <a
            className="link"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://discord.com/invite/ahxuCtm"}
          >
            Discord
          </a>{" "}
          group for personalised guidance for accessing the new release. <br />
          <br />
          Gracias!!!
        </div>

        <div className="button_container">
          <button
            className="visit_btn"
            onClick={() => {
              window.open("https://aqua.spheron.network/");
            }}
          >
            Visit
          </button>
          <button
            className="cancel_btn"
            onClick={() => {
              setOpenModal(false);
              localStorage.setItem("showModal", "false");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default AquaModal;
