import React, { useContext, useEffect, useState } from "react";
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
  }, []);

  useEffect(() => {
    if (user) {
      setUserName(user.argoProfile.username);
    }
  }, [user]);

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
          onboarded in Web3 by providing best in class dev tooling. <br />
          <br />
          The journey you onboarded to reach that vision was the first step to
          validating the product and market fit. Now we are at a stage where we want
          to improve your experience, and we are on the cusp of launching a new
          version of the app called 'AQUA'. <br />
          <br />
          We will be discontinuing this version of the app and giving out a free
          ticket to all of our active users to the 'AQUA'. <br />
          <br />
          To claim a complimentary ticket, copy this message and paste it either on
          Twitter or on our discord general chat, and we will allocate you the NEW
          NFT to access the app. <br />
          <br />
          Join our{" "}
          <a
            className="link"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://discord.gg/5p4XqrNhVB"}
          >
            Discord
          </a>{" "}
          group to get personalised guidance for accessing the new release.
        </div>
        <div className="body">
          Please fill out this{" "}
          <a
            className="link"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://forms.gle/43ekB8mJgJLQWq7s9"}
          >
            form
          </a>{" "}
          to get exclusive access to our new app.
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
