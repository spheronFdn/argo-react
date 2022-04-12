import React from "react";
import "./AquaModal.scss";
import IModalProps from "./model";

const AquaModal: React.FC<IModalProps> = ({ setOpenModal }) => {
  return (
    <div className="modal__outer__con">
      <div className="modal__inner__con">
        <div className="x_container">
          <button
            className="x_button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="header"> This is inside the Modal Component</div>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default AquaModal;
