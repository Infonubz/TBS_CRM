import React from "react";
import image from "../../../asserts/direction.png";
import { useDispatch } from "react-redux";
import {
  GetReqPromotionData,
  GetRequestManagementData,
  ReqAdsStatusChange,
  GetRequestAdsData,
} from "../../../Api/RequestManagement/RequestManagement";
import { toast } from "react-toastify";

export default function ReqAdsStatusUpdate({ adId, setViewStatus }) {
  const dispatch = useDispatch();

  const handlechange = async (valueid, valuedata) => {
    try {
      const data = await ReqAdsStatusChange(valueid, valuedata, adId, dispatch);
      console.log(valueid, valuedata, adId, "currentidcurrentid");
      console.log(data, "datadatadatadata");
      toast.success(data);
      setViewStatus(false);
      GetRequestAdsData(dispatch);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[1.5vw] text-[]">Update the Promotion Status</p>
      <img src={image} className="h-[6vw] w-[6vw] my-[1vw]"></img>
      <div className="flex gap-2 mt-[1vw]">
        <button
          className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
          onClick={() => handlechange(2, "Under Review")}
        >
          Under review
        </button>
        <button
          className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[10vw] h-[2vw]  bg-[#34AE2A] rounded-[0.5vw]"
          onClick={() => handlechange(3, "Approved")}
        >
          Approved
        </button>
        <button
          className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
          onClick={() => handlechange(5, "Rejected")}
        >
          Rejected
        </button>
      </div>
    </div>
  );
}
