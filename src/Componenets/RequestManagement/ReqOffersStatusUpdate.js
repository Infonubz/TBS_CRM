import React from "react";
import image from "../../asserts/direction.png";
import { toast } from "react-toastify";
// import {
//   GetAllReqManOffers,
//   ReqManStatusChange,
// } from "../../Api/RequestManagement/RequestManagementOffers";
import { useDispatch } from "react-redux";
import { ReqManStatusChange } from "../../Api/RequestManagement/RequestManagement";

const ReqOffersStatusUpdate = ({ updateData, setStatusupdateModal }) => {
  const dispatch = useDispatch();
  const handlechange = (statusid, status) => {
    console.log(statusid, status, updateData, "ABCDSDIUFHDF");
    ReqManStatusChange(updateData, statusid, status, dispatch);
    toast.success("Status Updated Successfully");
    setStatusupdateModal(false);
    // GetAllReqManOffers(dispatch,"All")
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[1.5vw] font-bold">Update The Offer Status</p>
      <img src={image} className="h-[6vw] w-[6vw] my-[1vw]"></img>
      <div className="flex gap-x-[1.5vw] mt-[1.5vw]">
        <button
          className="items-center text-[1vw] text-white shadow-md font-extrabold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw] cursor-pointer"
          // onClick={() => {
          //   handlechange(4, "On Hold");

          // }}
          onClick={() => handlechange(2, 'Under Review')}
        >
          Hold
        </button>
        <button
          className="items-center text-[1vw] text-white font-extrabold shadow-md font-bold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw]  bg-[#34AE2B] rounded-[0.5vw] cursor-pointer"
          // onClick={() => {
          //   handlechange(5, "Approved");
          // }}
          onClick={() => handlechange(3, 'Approved')}
        >
          Active
        </button>
        <button
          className="items-center text-[1vw] text-white font-extrabold shadow-md shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw] cursor-pointer"
          // onClick={() => {
          //   handlechange(6, "Rejected");
          // }}
          onClick={() => handlechange (5, 'Rejected')}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ReqOffersStatusUpdate;
