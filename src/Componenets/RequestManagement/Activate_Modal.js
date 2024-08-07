import React, { useState, useEffect } from "react";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import Success_Modal from "./Success_Modal";
import { userStatusActivate } from "../../Api/RequestManagement/RequestManagement";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetRequestManagementData } from "../../Api/RequestManagement/RequestManagement";

import { GetRequestDataById } from "../../Api/RequestManagement/RequestManagement";
import dayjs from "dayjs";

export default function Activate_Modal({
  currentid,
  setIsSaveModal,
  verifyData,
  setVerifyData,
  setRequestData,
  requestData,
}) {
  const [isActivateModal, setIsActivateModal] = useState(false);
  const dispatch = useDispatch();

  const handlechange = async (valuedata) => {
    console.log(valuedata, currentid, "currentidcurrentid");
    try {
      const data = await userStatusActivate(valuedata, currentid, dispatch);
      console.log(valuedata, currentid, "currentidcurrentid");
      toast.success(data?.message);
      GetRequestManagementData(dispatch);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const fetchGetRequest = async () => {
    try {
      const data = await GetRequestDataById(
        verifyData,
        setVerifyData,
        setRequestData
      );
      console.log(verifyData, "data data data");
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

  const closeModal = () => {
    setIsActivateModal(false);
    setIsSaveModal(false);
  };

  return (
    <>
      <div>
        <div className="relative">
          <div className="scroll-bar h-[29.5vw]">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-5">
                <label className="text-[#6C717B]">Operator Id</label>
                <p className="font-bold pt-[0.3vw]">
                  {requestData?.operator_id}
                </p>
              </div>
              <div className="col-span-4">
                <label className="text-[#6C717B]">Operator Name</label>
                <p className="font-bold pt-[0.3vw]">
                  {requestData?.owner_name}
                </p>
              </div>
              <div className="col-span-3">
                <label className="text-[#6C717B]">Operator Phone</label>
                <p className="font-bold pt-[0.3vw]">{requestData?.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-12 pt-[2vw] gap-5">
              <div className="col-span-5">
                <label className="text-[#6C717B]">Operator Email ID</label>
                <p className="font-bold pt-[0.3vw]">{requestData?.emailid}</p>
              </div>
              <div className="col-span-4">
                <label className="text-[#6C717B]">Requested Date</label>
                <p className="font-bold pt-[0.3vw]">{`${dayjs(
                  requestData?.created_date
                ).format("DD MMM, YY")}`}</p>
              </div>
              <div className="col-span-3">
                <label className="text-[#6C717B]">Documents</label>
                <p className="font-bold pt-[0.3vw]">
                  {requestData?.req_status}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 pt-[1vw] mt-[1vw]">
              <div className="col-span-4">
                <p className="font-bold pt-[0.3vw] text-[1vw] text-[#28C76F]">
                  Generate Key
                </p>
              </div>
              <div className="col-span-1">
                <TbCircleArrowRightFilled
                  color="#0D99FF"
                  className="h-[2vw] w-[2vw]"
                />
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-3 ml-[0.4vw]">
                <button className="w-[6.5vw] h-[1.8vw] bg-[#34AE2A] rounded-2xl">
                  <div
                    className="text-[0.8vw] text-white "
                    onClick={() => {
                      handlechange("Active");
                      setIsActivateModal(true);
                    }}
                  >
                    Activate
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isActivateModal}
        closeicon={false}
        onClose={closeModal}
        height="13vw"
        width="23vw"
      >
        <Success_Modal
          setIsActivateModal={setIsActivateModal}
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
        />
      </ModalPopup>
    </>
  );
}
