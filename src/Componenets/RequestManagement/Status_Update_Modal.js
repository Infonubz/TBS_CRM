import React, { useState, useEffect } from "react";
import image from "../../asserts/direction.png";
import ModalPopup from "../Common/Modal/Modal";
import Activate_Modal from "./Activate_Modal";
import { statuschange } from "../../Api/RequestManagement/RequestManagement";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetRequestManagementData
} from "../../Api/RequestManagement/RequestManagement";

export default function Status_Update_Modal({ currentid, setIsSaveModal, setIsVerifyModal, verifyData, setVerifyData, setRequestData, requestData }) {
  const [isActivate, setIsActivate] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsActivate(false);
  };

  const handlechange = async (valueid, valuedata) => {
    try {
      const data = await statuschange(valueid, valuedata, currentid, dispatch);
      console.log(valueid, valuedata, currentid, "currentidcurrentid ithu value");
      toast.success(data?.message);
      GetRequestManagementData(dispatch);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  console.log(currentid, "currentidcurrentid");
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[1.5vw] text-[]">Update the status of Operator</p>
        <img src={image} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
        <div className="flex gap-2 mt-[1vw]">
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
            onClick={() => {
              handlechange(1, "Under review");
              setIsSaveModal(false);
            }
            }
          >
            Under review
          </button>
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[10vw] h-[2vw]  bg-[#34AE2A] rounded-[0.5vw]"
            // onClick={() => setIsActivate(true)}
            onClick={() => {
              handlechange(2, "Verified");
              setIsActivate(true);
            }
            }
          >
            Verified
          </button>
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
            onClick={() => {
              handlechange(3, "Rejected")
              setIsSaveModal(false);
            }
            }
          >
            Rejected
          </button>
        </div>
      </div>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isActivate}
        closeicon={false}
        onClose={closeModal}
        height="300px"
        width="600px"
      >
        <Activate_Modal
          isActivate={setIsActivate}
          currentid={currentid}
          setIsSaveModal={setIsSaveModal}
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
        />
      </ModalPopup>
    </>
  );
}
