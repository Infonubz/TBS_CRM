import React, { useState, useEffect } from "react";
import image from "../../asserts/checked.png";
import {
  GetRequestManagementData
} from "../../Api/RequestManagement/RequestManagement";

import {
  GetRequestDataById
} from "../../Api/RequestManagement/RequestManagement";


export default function Success_Modal({ actionType, verifyData, setVerifyData, setRequestData, requestData }) {

  const fetchGetRequest = async () => {
    try {
      const data = await GetRequestDataById(verifyData, setVerifyData, setRequestData);
      console.log(verifyData, "data data data")
      console.log(data, "Data........");
      setRequestData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (verifyData != null) {
      fetchGetRequest();
    }
  }, [verifyData, setVerifyData, setRequestData]);

  return (
    <div>
      {actionType === "download" ? (
        <div className=" w-auto h-auto">
          <div className="flex justify-center">
            <p className="text-[1.5vw] pl-[1.5vw] font-bold">
              Downloded Successfully
            </p>
          </div>
          <div className="flex justify-center mt-[0.5vw]">
            <img src={image} className="h-[5vw] w-[5vw]"></img>
          </div>
          <p className="pt-[0.5vw] text-[1vw]">
            The Documents Has Been Successfully Downloaded!          </p>
        </div>
      ) : (
        <div className=" w-auto h-auto">
          <div className="flex justufy-center">
            <p className="text-[1.5vw] pl-[1.5vw] font-bold">
              Activated successfully
            </p>
          </div>
          <div className="flex justify-center mt-[0.5vw]">
            <img src={image} className="h-[5vw] w-[5vw]"></img>
          </div>
          <div className="text-[#1F487C] text-[1.1vw] w-full">
            {`${requestData?.owner_name} has been successfully activated !`}
          </div>
        </div>
      )}
    </div>
  );
}
