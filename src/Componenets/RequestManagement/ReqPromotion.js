import { render } from "@testing-library/react";
import { Table, Pagination, Tooltip } from "antd";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "../../App.css";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import DeleteList from "../Offers/DeleteList";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ViewPromotion from "./ViewPromotion";
import ReqPromoStatusUpdate from "./ReqPromoStatusUpdate";
import { FaEye } from "react-icons/fa";

export default function ReqPromotion({
  currentData,
  setModalIsOpen,
  SetUpdateData,
}) {
  const [eyeModalIsOpen, setEyeModalIsOpen] = useState(false);
  const [viewstatus, setViewStatus] = useState(false);

  const closeModal = () => {
    setEyeModalIsOpen(false);
    setViewPromoModal(false);
    setViewStatus(false);
  };

  const [promotionId, setPromotionId] = useState(null);
  const [viewmodal, setViewPromoModal] = useState(false);
  const [viewid, setViewID] = useState(null);
  const [promoId, setPromoId] = useState("");
  const columns = [
    {
      title: <h1 className="text-[1.2vw] font-semibold">S.No</h1>,
      width: "5vw",
      render: (row, rowdta, index) => {
        return (
          <div className="">
            <h1 className="pl-[1vw]">{index + 1}</h1>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Name</h1>,
      sorter: (a, b) => a.promo_name.localeCompare(b.promo_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center">
            {/* <h1 className="text-[1.1vw]">{row.promo_name}</h1> */}
            {row?.promo_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.promo_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.promo_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.promo_name?.slice(0, 15)
            )}
          </div>
        );
      },
      width: "14vw",
    },

    {
      title: <h1 className="text-[1.2vw] font-semibold">Description</h1>,
      sorter: (a, b) => a.promo_description.localeCompare(b.promo_description),
      render: (row, rowdta, index) => {
        return (
          // <div className="flex items-center">
          //   <h1 className="text-[1.1vw]">{row.promo_description}</h1>
          // </div>
          <div className="flex items-center">
            <h1 className="text-[1.1vw]">
              {/* {row.promo_description} */}
              {row?.promo_description?.length > 15 ? (
                <Tooltip
                  placement="bottom"
                  title={row?.promo_description}
                  className="cursor-pointer"
                  color="#1F487C"
                >
                  {`${row?.promo_description?.slice(0, 15)}...`}
                </Tooltip>
              ) : (
                row?.promo_description?.slice(0, 15)
              )}
            </h1>
          </div>
        );
      },
      width: "14vw",
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Operator</h1>,
      width: "17vw",
      render: (row) => {
        return (
          <div>
            {/* {row?.promo_code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.promo_code}
                className="cursor-pointer"
                color="#1F487C"
              >
                <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
                  {`${row?.promo_code?.slice(0, 15)}...`}
                </button>
              </Tooltip>
            ) : (
              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
                {`${row?.promo_code?.slice(0, 15)}`}
              </button>
            )} */}
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Duration</h1>,
      sorter: (a, b) =>
        dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw]">{`${dayjs(row?.start_date).format(
              "MMM DD"
            )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Usage</h1>,
      sorter: (a, b) => a.usage - b.usage,
      width: "7vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw]">{row.usage}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Card
        </div>
      ),
      width: "10vw",
      render: (row) => {
        setPromoId(row.promo_id);
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex  justify-center">
            <button
              type="button"
              className="text-white bg-[#727070] flex items-center justify-center rounded-[0.5vw]  text-[1vw] w-[5vw] py-[0.2vw]  
               "
              onClick={() => {
                setViewPromoModal(true);
                setViewID(row.tbs_operator_id);
              }}
            >
              <span>
                <FaEye size={"1vw"} color="white" />
              </span>
              <span className="pl-[0.5vw]">View</span>
            </button>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Status</h1>,
      width: "10vw",
      render: (row) => {
        return (
          <div>
            {row?.user_id != null ? (
              <button
                className={`${
                  row.user_id == 0
                    ? "bg-[#FF9900]"
                    : row.user_id == 1
                    ? "bg-[#34AE2A]"
                    : row.user_id == 2
                    ? "bg-[#FD3434]"
                    : row.user_id == 3
                    ? "bg-[#2A99FF]"
                    : "bg-[#646262]"
                } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[8vw] py-[0.2vw]`}
                onClick={() => setViewStatus(true)}
              >
                {capitalizeFirstLetter(row.user_status)}
              </button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold">Actions</h1>,
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw]  items-center">
            {/* <div><IoMdEye size={"1.6vw"} color="#1F4B7F" onClick={() => { setEyeModalIsOpen(true) }} /></div> */}
            {/* <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setModalIsOpen(true);
                SetUpdateData(row.promo_id);
              }}
            /> */}
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setDeleteModalIsOpen(true);
                setPromotionId(row.promo_id);
              }}
            />
          </div>
        );
      },
    },
  ];
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  //   const
  console.log(currentData, "currentData4848");
  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <Table
        // dataSource={data}
        dataSource={currentData?.length > 0 ? currentData : []}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete this Promotion"}
          api={`http://192.168.90.47:4000/api/promo/${promotionId}`}
          module={"promotion"}
        />
      </ModalPopup>
      <ModalPopup
        show={eyeModalIsOpen}
        onClose={closeModal}
        closeicon={false}
        // height="40vw"
        width="50vw"
      >
        {
          <img
            api={`http://192.168.90.47:4000/${promotionId}`}
            className="rounded-[0.5vw]"
          />
        }
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={viewmodal}
        closeicon={false}
        onClose={closeModal}
        height="300px"
        width="600px"
      >
        {/* <Activate_Modal
          isActivate={setIsActivate}
          currentid={currentid}
          setIsSaveModal={setIsSaveModal}
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
        /> */}
        <ViewPromotion promoId={promoId} />
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={viewstatus}
        closeicon={false}
        onClose={closeModal}
        height="16vw"
        width="30vw"
      >
        <ReqPromoStatusUpdate promoId={promoId} setViewStatus={setViewStatus} />
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}

// :where(.custom-table).ant-table-wrapper .ant-table-thead th.ant-table-column-sort {
//   background: #1f4b7f;
// }
