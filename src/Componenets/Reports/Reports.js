import React from "react";
import Backdrop from "../../asserts/CRMbg.png";

export default function Reports() {
  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[#1F4B7F] text-[4vw] flex items-center justify-center">
        Reports
      </h1>
    </div>
  );
}
