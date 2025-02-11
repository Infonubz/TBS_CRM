import React, { useState, useEffect } from "react";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import Success_Modal from "./Success_Modal";
import { userStatusActivate } from "../../Api/RequestManagement/RequestManagement";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetRequestManagementData } from "../../Api/RequestManagement/RequestManagement";
import { Tooltip } from "antd";
import { GetRequestDataById } from "../../Api/RequestManagement/RequestManagement";
import dayjs from "dayjs";
import { TfiEmail } from "react-icons/tfi";
import { FaRegAddressCard } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { PiUserFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";

export default function Activate_Modal({
  currentid,
  setIsSaveModal,
  verifyData,
  setVerifyData,
  setRequestData,
  requestData,
  setIsVerifyModal,
  setSpinning
}) {
  const [isActivateModal, setIsActivateModal] = useState(false);
  const dispatch = useDispatch();

  console.log(isActivateModal, "activate_modal");

  const handlechange = async (valuedata) => {
    console.log(valuedata, currentid, "currentidcurrentid");
    setSpinning(true)
    try {
      const data = await userStatusActivate(valuedata, currentid, dispatch,setSpinning);
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
          <div className="scroll-bar ">
            <div className="grid grid-cols-3 gap-[1.5vw]">
              <div className="">
                <label className="text-[1.1vw] font-bold">Operator Id</label>
                <div className="flex items-center  gap-[0.5vw]">
                  <FaRegAddressCard size={"1.2vw"} color="#1F487C" />
                  <p className=" text-[1vw] text-[#1F487C]">
                    {requestData?.tbs_operator_id}
                  </p>
                </div>
              </div>
              <div className="">
                <label className="text-[1.1vw] font-bold">Operator Name</label>
                <div className="flex items-center  gap-[0.5vw]">
                  <PiUserFill size={"1.2vw"} color="#1F487C" />
                  <p className=" text-[1vw] text-[#1F487C]">
                    {requestData?.owner_name}
                  </p>
                </div>
              </div>
              <div className="">
                <label className="text-[1.1vw] font-bold">
                  Operator Phone
                </label>
                <div className="flex items-center text-[#1F487C]  gap-[0.5vw]">
                  <FaPhoneAlt size={"1.1vw"} color="#1F487C" />
                  <p className=" text-[1vw] text-[#1F487C]">
                    {requestData?.phone}
                  </p>
                </div>
              </div>
              <div className="">
                <label className="text-[1.1vw] font-semibold">
                  Operator Email ID
                </label>
                <Tooltip
                  placement="bottom"
                  title={
                    requestData?.emailid?.length > 15
                      ? requestData?.emailid
                      : ""
                  }
                  className={
                    requestData?.emailid?.length > 15
                      ? "cursor-pointer"
                      : "cursor-auto"
                  }
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  <div className="flex items-center text-[#1F487C]  gap-[0.5vw]">
                    <TfiEmail size={"1.1vw"} color="#1F487C" />
                    <p className=" text-[1vw] 1F487C ">
                      {requestData?.emailid?.length > 15
                        ? `${requestData?.emailid.slice(0, 12)}...`
                        : requestData?.emailid}
                    </p>
                  </div>
                </Tooltip>
              </div>
              <div className=" ">
                <label className="text-[1.1vw]  font-semibold">
                  Requested Date
                </label>
                <div className="flex items-center text-[#1F487C]  gap-[0.5vw]">
                  <BsCalendar2DateFill size={"1.1vw"} />
                  <p className=" text-[1vw] ">{`${dayjs(
                    requestData?.created_date
                  ).format("DD MMM, YY")}`}</p>
                </div>
              </div>
              <div className=" ">
                <label className="text-[1.1vw] font-bold">Documents</label>
                <div className="flex items-center  gap-[0.5vw]">
                  <HiClipboardDocumentList size={"1.2vw"} color="#1F487C" />
                  <p className="text-[#1F487C] text-[1vw]">
                    {requestData?.req_status}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="col-span-4">
<p className="font-bold pt-[0.3vw] text-[1vw] text-[#28C76F]">
                  Generate Key
</p>
</div> */}
            {/* <div className="col-span-1">
<TbCircleArrowRightFilled
                  color="#0D99FF"
                  className="h-[2vw] w-[2vw]"
                />
</div> */}

            <div className=" flex items-center justify-center mt-[2vw]">
              <button className=" bg-[#34AE2A] rounded-[0.5vw]  px-[1.5vw] py-[0.25vw]">
                <div
                  className="text-[1.2vw] text-white "
                  onClick={() => {
                    handlechange("Active");
                    // setIsActivateModal(true);
                    setIsSaveModal(false);
                    setIsVerifyModal(false);
                  }}
                >
                  Activate
                </div>
              </button>
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