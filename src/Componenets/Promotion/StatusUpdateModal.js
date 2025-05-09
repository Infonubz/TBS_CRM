import React, { useState } from "react";
import image from "../../asserts/direction.png";
import { useDispatch } from "react-redux";
import {
  UpdateStatus,
  GetPromotionDataByStatus,
  GetPromoDataByEmp
} from "../../Api/Promotion/Promotion";
import { toast } from "react-toastify";
import { ErrorMessage } from "formik";

export default function StatusUpdateModal({
  setStatusUpdateModal,
  promotionId,
  CurrentTab,
  comments,
  listType
}) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState();
  const [inputValue, setInputValue] = useState(comments);
  const type_Id = sessionStorage.getItem("type_id");
  const [maxError, setMaxError] = useState()

  const handlechange = async (valueid, valuedata) => {
    // Check if comments are required for On Hold or Rejected
    if (
      (valueid === 3 || valueid === 4) &&
      (!inputValue || inputValue.trim() === "")
    ) {
      setShowError(false); // Show the error
      return; // Stop execution
    } else {
      setShowError(true); // Hide the error
    }

    if((valueid === 3 || valueid === 4) &&
    (!inputValue || inputValue.length > 25)) {
      setMaxError(true)
      return
    } else {
      setMaxError(false)
    }

    try {
      setStatusUpdateModal(false);
      console.log(promotionId, "promotionId");
      const data = await UpdateStatus({
        valueid,
        promotionId,
        dispatch,
        CurrentTab,
        inputValue,
      });
      if(listType === "operator" && CurrentTab){
        GetPromotionDataByStatus(dispatch, CurrentTab);
      }else{
        GetPromoDataByEmp(dispatch, CurrentTab);
      }
      console.log(data, promotionId, "datadatadatadata");
      // toast.success(data);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[1.5vw] font-bold text-[#1F487C]">Update The Promotion Status</p>
      <img
        src={image}
        className="h-[6vw] w-[6vw] mt-[1vw]"
        alt="Status Update"
      />
      <div className="mt-[1vw] w-[100%] relative">
        <label className="text-[#1F487C] font-bold text-[1.3vw]">
          Comments{" "}
          <span className="text-[.9vw] text-gray-600">{`(Optional for active)`}</span>{" "}
        </label>
        <input
          type="text"
          name="comments"
          placeholder="Write your comments"
          value={inputValue}
          onChange={(e) => {
            e.target.value.trim();
            setShowError(e.target.value.trim() !== "");
            setInputValue(e.target.value);
            setMaxError(e.target.value.length > 25)
          }}
          className="border-r-[0.3vw] pl-[1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none placeholder:font-sans placeholder:text-[1vw]"
        />
        {showError === false && (
          <span className="text-[.9vw] text-red-600 absolute bottom-[-1.4vw] left-[0vw]">
            {" "}
            Comments is required for Reject and Hold
          </span>
        )}

        {maxError === true && (
          <span className="text-[.9vw] text-red-600 absolute bottom-[-1.4vw] left-[0vw]">
          Comments should not exceed 25 characters
        </span>
        )}
      </div>

      <div className="flex gap-x-[2.5vw] mt-[1.5vw]">
        <button
          className="items-center text-[1vw] text-white shadow-md shadow-black font-extrabold space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
          onClick={() => handlechange(3, "Hold")}
        >
         Hold
        </button>
        {type_Id === "PRO101" ? (
          <button
            className="items-center text-[1vw] text-white shadow-md shadow-black font-extrabold space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#34AE2B] rounded-[0.5vw]"
            onClick={() => {
              handlechange(2, "Approved");
             
            }}
          >
            Active
          </button>
        ) : (
          <button
            className="items-center text-[1vw] text-white font-extrabold shadow-md shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#FF9900] rounded-[0.5vw]"
            onClick={() => {
              handlechange(6, "Repost");
              setStatusUpdateModal(false);
            }}
          >
            Repost
          </button>
        )}

        <button
          className="items-center text-[1vw] text-white font-extrabold shadow-md shadow-black space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FD3434] rounded-[0.5vw]"
          onClick={() => handlechange(4, "Rejected")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
