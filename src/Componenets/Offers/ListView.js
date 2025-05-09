import { render } from "@testing-library/react";
import { Table, Pagination, Tooltip } from "antd";
import React, { useState } from "react";
// import { FaEye } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "../../App.css";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import DeleteList from "./DeleteList";
// import Pagination from "../Common/Pagination";
export default function ListView({
  currentData,
  setModalIsOpen,
  
  SetUpdateData,
  activePage,
  itemsPerPage
}) {
  const [promotionid, setPromoId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [offerview, setOfferView] = useState(false);
  const [offerimage, setOfferImage] = useState("");
  const columns = [
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">S.No</h1>,
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="">
            {/* <h1 className="pl-[1vw] text-[1.1vw]">{index + 1}</h1> */}
            <h1 className="pl-[1vw] text-[1.1vw]">{serialNumber}</h1>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center ">Name</h1>,
      sorter: (a, b) => a.offer_name.localeCompare(b.offer_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center">
            {/* <h1 className="text-[1.1vw]">{row.offer_name}</h1> */}
            {row?.offer_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.offer_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                <p className="text-[1.1vw]">
                  {" "}
                  {`${row?.offer_name?.slice(0, 15)}...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1.1vw]">{row?.offer_name?.slice(0, 15)}</h1>
            )}
          </div>
        );
      },
      width: "20vw",
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Code</h1>,
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            {row?.code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.code}
                className="cursor-pointer"
                color="#1F487C"
              >
                <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                  {`${row?.code?.slice(0, 15)}...`}{" "}
                </button>
              </Tooltip>
            ) : (
              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                {row?.code?.slice(0, 15)}
              </button>
            )}
            {/* <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
              {row.code}
            </button> */}
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Occupation</h1>,
      width: "18vw",
      onHeaderCell: () => ({
        style: { transform: 'none', transition: 'none' },
      }),
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw]">{row.occupation}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Created Date</h1>,
      sorter: (a, b) =>
        dayjs(a.created_date).valueOf() - dayjs(b.created_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw]">{`${dayjs(row?.created_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Updated Date</h1>,
      sorter: (a, b) =>
        dayjs(a.updated_date).valueOf() - dayjs(b.updated_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw]">{`${dayjs(row?.updated_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Duration</h1>,
      sorter: (a, b) => dayjs(a?.start_date).diff(dayjs(b?.start_date)),
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
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Usage</h1>,
      width: "5vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw] flex items-center justify-center">{row.usage}</p>
          </div>
        );
      },
    },

    {
      title: <h1 className="text-[1.2vw] font-semibold text-center  flex items-center justify-center">Status</h1>,
      width: "9vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              className={`${row.status_id == 3
                ? "bg-[#34AE2A]"
                : row.status_id == 1
                  ? "bg-[#FD3434]"
                  : null
                } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] py-[0.2vw]`}
            >
              {row.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold text-center  flex items-center justify-center">Actions</h1>
      ),
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center justify-center">
            <FaEye
              size={"1.6vw"}
              color="#1F4B7F"
              className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
              }}
            />
            <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setModalIsOpen(true);
                SetUpdateData(row.tbs_offer_id);
              }}
            />
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setDeleteModalIsOpen(true);
                setPromoId(row.tbs_offer_id);
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
  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <Table
        dataSource={currentData}
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
          title={"Want to delete this Offers & Deals"}
          api={`${apiUrl}/offers-deals/${promotionid}`}
          module={"offer"}
        />
      </ModalPopup>
      <ModalPopup
        show={offerview}
        onClose={() => setOfferView(false)}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <img
          src={`http://192.168.90.47:4000${offerimage}`}
          className="w-full h-full"
        />
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}
