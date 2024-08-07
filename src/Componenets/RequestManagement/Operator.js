import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalPopup from "../Common/Modal/Modal";
import Verify_Modal from "./Verify_Modal";
import { capitalizeFirstLetter } from "../Common/Captilization";
import { userStatusActivate } from "../../Api/RequestManagement/RequestManagement";
import { FaEye } from "react-icons/fa";
import Status_Update_Modal from "./Status_Update_Modal";

export default function Operator({ data }) {
  const [operatorId, setOperatorId] = useState(null);
  const [verifyData, setVerifyData] = useState("");
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const [requestData, setRequestData] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState("");
  const [statusFromEdit,SetStatusFromEdit]= useState(false)

  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Id
        </div>
      ),
      render: (row) => {
        //console.log("statuus", row.tbs_operator_id);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1vw] text-[#1F4B7F]">
              {row?.tbs_operator_id}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Name
        </div>
      ),
      sorter: (a, b) => a.owner_name.localeCompare(b.owner_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[1vw] text-[#1F4B7F]">
            {/* <p className="text-[1vw] text-[#1F4B7F]">{row?.owner_name}</p> */}
            {row?.owner_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.owner_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.owner_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.owner_name?.slice(0, 15)
            )}
          </div>
        );
      },
      // width:"14vw"
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Phone Number
        </div>
      ),
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.phone}</p>
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Email Id
        </div>
      ),
      sorter: (a, b) => a.emailid.localeCompare(b.emailid),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.emailid}</p>
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Request Date
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{`${dayjs(
              row?.created_date
            ).format("DD MMM YY - hh:mm a")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Documents
        </div>
      ),
      render: (row) => {
        console.log(row.tbs_operator_id, "row.tbs_operator_id");
        return (
          <div className="flex gap-[0.7vw] justify-center">
            {/* <button
            type="button"
            class="text-white font-bold text-[0.9vw] bg-[#41C6FF]  rounded-[0.5vw]  w-[5vw] py-[0.1vw]"
            onClick={() => {
              setIsVerifyModal(true);
              setVerifyData(row.operator_id);
            }}
          >
            {capitalizeFirstLetter("Verify")}
          </button> */}
            <button
              type="button"
              className="text-white bg-[#727070] flex items-center justify-center rounded-[0.5vw]  text-[1vw] w-[6vw] py-[0.2vw]  
             "
              onClick={() => {
                setIsVerifyModal(true);
                setVerifyData(row.tbs_operator_id);
                SetStatusFromEdit(false)
              }}
            >
              <span>
                <FaEye size={"1vw"} color="white" />
              </span>
              <span className="pl-[0.5vw]">
                {" "}
                {capitalizeFirstLetter("Verify")}
              </span>
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      render: (row) => {
        // console.log("statuus", row.req_status);
        return (
          <div className="flex justify-center">
            <button
              className={`${
                // row?.req_status_id == 2
                //   ? "bg-[#34AE2A]"
                //   : row?.req_status_id == 0
                //   ? "bg-[#FFD600]"
                //   : row?.req_status_id == 3
                //   ? "bg-[#e60f00]"
                //   : row?.req_status_id == 1
                //   ? "bg-[#FF6B00]"
                //   : "bg-blue"
                row?.req_status_id == 0
                  ? "bg-[#FF6B00]"
                  : row?.req_status_id == 1
                  ? "bg-[#2A99FF]"
                  : row?.req_status_id == 2
                  ? "bg-[#34AE2A]"
                  : row?.req_status_id == 3
                  ? "bg-[#e60f00]"
                  : "bg-[#646262]"
              } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[8vw] py-[0.2vw]`}
            >
              {capitalizeFirstLetter(row?.req_status)}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      render: (row) => {
        setOperatorId(row.tbs_operator_id);
        //console.log(row.tbs_operator_id, "------operator Id");
        return (
          <div className="flex gap-[0.7vw] justify-center items-center">
            {/* {row?.req_status_id==1?( <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />):(row?.req_status_id==2)?(<MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />):(row?.req_status_id==3)?(<MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />):("")} */}
            {row?.req_status_id === 1 ||
            row?.req_status_id === 2 ||
            row?.req_status_id === 3 ? (
              <MdEdit
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                // onClick={() => setOpenStatusModal(true)}
                onClick={() => {
                  setIsVerifyModal(true);
                  setVerifyData(row.tbs_operator_id);
                  SetStatusFromEdit(true)

                }}
              />
            ) : (
              ""
            )}

            {/* <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            /> */}
            {/* <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            /> */}
          </div>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsVerifyModal(false);
    setOpenStatusModal(false);
    setVerifyData("");
  };

  return (
    <>
      <div className="">
        <Table
          className="custom-table"
          pagination={false}
          dataSource={data}
          columns={columns}
          rowClassName={(record, index) =>
            index % 2 === 1 ? "bg-white" : "bg-[#1F487C]/[10%]"
          }
        />
      </div>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isVerifyModal}
        closeicon={false}
        onClose={closeModal}
        height="35vw"
        width="60vw"
      >
        <Verify_Modal
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
          setIsVerifyModal={setIsVerifyModal}
          statusFromEdit={statusFromEdit}
        />
      </ModalPopup>

      <ModalPopup show={openStatusModal} onClose={closeModal}>
        <Status_Update_Modal
          currentid
          setIsSaveModal
          setIsVerifyModal
          verifyData
          setVerifyData
          setRequestData
          requestData
        />
      </ModalPopup>
    </>
  );
}
