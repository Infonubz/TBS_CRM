import React from "react";
import image from "../../../asserts/direction.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
    PartnerStatusUpdateApi,
    GetPartnerData,
} from "../../../Api/UserManagement/Partner";

export default function PartnerStatusUpdate({
  clientid,
  PartnerID,
  setViewModal,
  partnerStatusId,
  setSpinning
}) {
  const dispatch = useDispatch();

  const handlechange = async () => {
    console.log(PartnerID, "employeeid");
    setSpinning(true)
    try {
      const data = await PartnerStatusUpdateApi(
        partnerStatusId,
        PartnerID,
        setSpinning,
        dispatch
      );
     // console.log(valueid, valuedata, employeeid, "currentidcurrentid");
      console.log(data, "datadatadatadata");
      toast.success(data);
      setViewModal(false);
      GetPartnerData(dispatch);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[1.5vw] font-bold">Update The Partner Status</p>
      <img src={image} className="h-[6vw] w-[6vw] my-[1vw]"></img>
      <div className="flex ">
        {/* <button
          className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
          onClick={() => handlechange(3, "Under Review")}
        >
          Under review
        </button> */}
        <button
          className={`items-center text-[1vw] shadow-md shadow-black font-extrabold text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] ${partnerStatusId == 2 ? "bg-[#FD3434]" :"bg-[#34AE2B]"} rounded-[0.5vw]`}
          onClick={handlechange}
        >
          {partnerStatusId == 2 ? "Inactive" : "Active"}
        </button>
        {/* <button
          className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
          onClick={() => handlechange(2, "InActive")}
        >
          Inactive
        </button> */}
      </div>
    </div>
  );
}
