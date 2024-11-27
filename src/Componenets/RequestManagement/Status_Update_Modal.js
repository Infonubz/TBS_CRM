import React, { useState, useEffect } from "react";
import image from "../../asserts/direction.png";
import ModalPopup from "../Common/Modal/Modal";
import Activate_Modal from "./Activate_Modal";
import { GetReqPartnerData, PartnerStatusChange, statuschange } from "../../Api/RequestManagement/RequestManagement";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetRequestManagementData
} from "../../Api/RequestManagement/RequestManagement";

export default function Status_Update_Modal({ currentid, setIsSaveModal, setIsVerifyModal, verifyData, setVerifyData, setRequestData, requestData, comments ,tabfilter}) {
  const [isActivate, setIsActivate] = useState(false);
  const [showError, setShowError] = useState()
  const [inputValue, setInputValue] = useState(comments)
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsActivate(false);
  };
  console.log(currentid, "currentidcurrentid ithu value");

  const handlechange = async (valueid, valuedata) => {
    if (valueid == 5 || valueid == 6 && showError == true || valueid == 4 && showError == true || inputValue?.length > 0) {
      if (currentid.startsWith("tbs-op")) {
        try {
          const data = await statuschange(valueid, valuedata, currentid, inputValue, dispatch);
          console.log(valueid, valuedata, currentid, "currentidcurrentid ithu value");
          toast.success(data?.message);
          GetRequestManagementData(dispatch,tabfilter);
          console.log(data);
        } catch (error) {
          console.error("Error uploading data", error);
        }
      }
      else{
        try{
          const data = await PartnerStatusChange(valueid,valuedata,currentid,inputValue)
          toast.success(data?.message);
         GetReqPartnerData(dispatch,tabfilter) 
        }
        catch(err){
          console.log(err);
          
        }
        
      }

      if (valueid == 6 || valueid == 4) {
        setIsSaveModal(false)
      }
    }
    else {
      setShowError(false)
    }

  };

  console.log(currentid, "currentidcurrentid");
  return (
    <>
    {
      isActivate === false ? (
        <div className="flex flex-col items-center justify-center">
        <p className="text-[1.5vw] text-[]">Update the status of Operator</p>
        <img src={image} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
        <div className="mt-[1vw] w-[100%] relative">
          <label className="text-[#1F487C] text-[1.3vw]">Comments <span className="text-[.9vw] text-gray-600">{`(optional)`}</span> </label>
          <input
            type="text"
            name="comments"
            placeholder="Write your comments"
            // value={capitalizeFirstLetter(values?.owner_name)}
            // disabled
            value={inputValue}
            onChange={(e) => {
              e.target.value.trim()
              setShowError(e.target.value.trim() !== '')
              // setShowError(inputValue?.trim() !=="")
              setInputValue(e.target.value)
            }}
            className="border-r-[0.3vw] pl-[1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none "
          />
          {
            showError === false && <span className="text-[.9vw] text-red-600 absolute bottom-[-1.2vw] left-[.5vw]"> Comments is required for Reject and On Hold</span>
          }

        </div>


        <div className="flex gap-2 mt-[1.6vw]">
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
            onClick={() => {
              handlechange(4, "On Hold");
              // setIsSaveModal(false);
            }
            }
          >
            On Hold
          </button>
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[10vw] h-[2vw]  bg-[#34AE2A] rounded-[0.5vw]"
            // onClick={() => setIsActivate(true)}
            onClick={() => {
              handlechange(5, "Approved");
              // setInputValue("All Documents are Good")
              if (currentid.startsWith("tbs-op")){
                setIsActivate(true);
              }
              else{
                setIsSaveModal(false)
              }
            }
            }
          >
            Approved
          </button>
          <button
            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
            onClick={() => {
              handlechange(6, "Rejected")
              // setIsSaveModal(false);
            }
            }
          >
            Rejected
          </button>
        </div>
      </div>
      )
      :
      (
        <Activate_Modal
        isActivate={setIsActivate}
        currentid={currentid}
        setIsSaveModal={setIsSaveModal}
        verifyData={verifyData}
        setVerifyData={setVerifyData}
        setRequestData={setRequestData}
        requestData={requestData}
      />
      )
    }
    
    
{/* 
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isActivate}
        closeicon={false}
        onClose={closeModal}
        height="300px"
        width="600px"
      > */}
        {/* <Activate_Modal
          isActivate={setIsActivate}
          currentid={currentid}
          setIsSaveModal={setIsSaveModal}
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
        /> */}
      {/* </ModalPopup> */}
    </>
  );
}
