import React from "react";
import "./NotificationPopup.css";
import { RxCross2 } from "react-icons/rx";


const NotificationPopup = ({ show, onClose, children,  closeicon }) => {
  if (!show) {
    return null;
  }

  // const modalStyle = {
  //   height: height || "66vw",
  //   width: width || "30vw",
   
  //   margin:"100px"
  // };

  return (
    <div className="modal-overlayn" onClick={onClose}>
      <div
        className="modal-contentn"
        // style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
       
          <button className="modal-closen" onClick={onClose}>
            <RxCross2 color="white" size={"1.5vw"} />
          </button>
       
        {children}
      </div>
    </div>
  );
};

export default NotificationPopup;
