// src/Modal.js
import React from "react";
import { RxCross2 } from "react-icons/rx";
import "../../Common/Modal/Modal.css";
const ModalPopup = ({ show, onClose, children, height, width, closeicon }) => {
  if (!show) {
    return null;
  }

  const modalStyle = {
    height: height || "auto",
    width: width || "auto",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {closeicon == false ? (
          ""
        ) : (
          <div className="bg-[#1F4B7F] w-[2.5vw] h-[2.5vw] items-center justify-center flex rounded-full modal-close">
            <RxCross2
              className=""
              color="white"
              onClick={onClose}
              size={"1.5vw"}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalPopup;
