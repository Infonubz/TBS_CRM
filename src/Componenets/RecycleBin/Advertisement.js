import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { TbRestore } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import BinRestore from "./BinRestore";
import BinDelete from "./BinDelete";
import { capitalizeFirstLetter } from "../Common/Captilization";
import { FaEye } from "react-icons/fa";

export default function Advertisement({ currentItems, selectedTab, activePage, itemsPerPage }) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [viewModal, setViewModalIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState({
    type: "",
    url: "",
  });

  const [tbsId, setTbsId] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, SetRestoreModalOpen] = useState(false);
  const [rowName, SetRowName] = useState();

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    SetRestoreModalOpen(false);
  };

  const openModal = (ad) => {
    setViewModalIsOpen(true);
  };

  const closeModal = () => {
    setViewModalIsOpen(false);
  };

  const columns = [
    {
      title: <div className="flex font-bold text-[1.1vw] justify-center">S.No</div>,
      width: "5vw",
      render: (row, rowdta, index) => {
        const pageNo = (activePage - 1) * itemsPerPage + index + 1
        return (
          <div className="">
            <h1 className="pl-[.5vw] text-center text-[1vw] text-[#1F4B7F]">{pageNo}</h1>
          </div>
        )
      },
    },
    {
      title: <div className="flex font-bold justify-center  text-[1.1vw]">Title</div>,
      render: (row) => (
        <div className="flex py-[.3vw] h-[12.8vh] items-center pl-[1vw]">
          <div className="flex  flex-col text-[#1F4B7F] gap-y-[.4vw] ">
            {/* <h1 className="text-[1vw] font-bold">{row?.deleted_data?.client_details}</h1>
          <p className="text-[.9vw]">{row?.emailid}</p>
          <p className="text-[.9vw]">{row?.phone}</p> */}
            {
              row?.deleted_data?.client_details?.length > 20 ? (
                <Tooltip color="white" overlayInnerStyle={{ color: "#1F4B7F" }} title={capitalizeFirstLetter(row?.deleted_data?.client_details)}>
                  <span className="font-bold text-[1vw]"><span>
                    {`${row?.deleted_data?.client_details?.charAt(0) === row?.deleted_data?.client_details?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(row?.deleted_data?.client_details.slice(0, 20))
                      : row?.deleted_data?.client_details.slice(0, 20)}...`}
                  </span>
                  </span>
                </Tooltip>
              ) : (
                <span className="font-bold text-[1vw]">
                {row?.deleted_data?.client_details?.charAt(0) === row?.deleted_data?.client_details?.charAt(0).toLowerCase() 
                  ? capitalizeFirstLetter(row?.deleted_data?.client_details) 
                  : row?.deleted_data?.client_details}
              </span>              
              )
            }

            <p>
              {row?.emailid?.length > 20 ? (
                <Tooltip color="white" overlayInnerStyle={{ color: "#1F4B7F" }} title={row?.emailid}>
                  <span className="text-[.9vw]">{`${row?.emailid.slice(0, 20)}...`}</span>
                </Tooltip>
              ) : (
                <span className="text-[.9vw]">{row?.emailid}</span>
              )}
            </p>

            <p>
              {row?.phone?.length > 20 ? (
                <Tooltip color="white" overlayInnerStyle={{ color: "#1F4B7F" }} title={row?.phone}>
                  <span className="text-[.9vw]">{`${row?.phone.slice(0, 20)}...`}</span>
                </Tooltip>
              ) : (
                <span className="text-[.9vw]">{row?.phone}</span>
              )}
            </p>

          </div>
        </div>
      ),
      width: "14vw",
    },
    {
      title: <div className="flex font-bold justify-center text-[1.1vw]">Description</div>,
      width: "17vw",
      render: (row) => (
        <div className="flex pl-[2vw]">
          <div className="text-[#1F4B7F]">
            {/* <h1 className="text-[1.1vw]  font-bold">
            {row?.deleted_data?.ad_title}
          </h1> */}
            <h1 className="text-[1vw] font-bold">
              {row?.deleted_data?.ad_title?.length > 20 ? (
                <Tooltip color="white" overlayInnerStyle={{ color: "#1F4B7F" }} title={row?.deleted_data?.ad_title}>
                  <span>{`${row?.deleted_data?.ad_title.slice(0, 20)}...`}</span>
                </Tooltip>
              ) : (
                <span>{row?.deleted_data?.ad_title}</span>
              )}
            </h1>
            <p className="text-[0.9vw]">Usage Per day - {row?.deleted_data?.usage_per_day}</p>
            <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
              {`${dayjs(row?.deleted_data.created_date).format("DD MMM, YY")}`} -{" "}
              {`${dayjs(row?.deleted_data?.end_date).format("DD MMM, YY")}`}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex  font-bold justify-center text-[1.1vw]">Status</div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex justify-center">
            <button
              className={`${row.deleted_data.ads_status_id == 0
                ? "bg-[#646262]"
                : row.deleted_data.ads_status_id == 1
                  ? " bg-[#FF9900]"
                  : row.deleted_data.ads_status_id == 2
                    ? "bg-[#38ac2c]"
                    : row.deleted_data.ads_status_id == 3
                      ? "bg-[#2A99FF]"
                      : "bg-[#FD3434]"
                } h-[1.8vw] shadow-md shadow-[black] font-extrabold text-[1vw] cursor-not-allowed text-white w-[7vw] rounded-[0.5vw]`}
            >
              {row.deleted_data.ads_status}
            </button>

          </div>
        );
      },
    },
    {
      title: <div className="flex font-bold justify-center text-[1.1vw]">Deleted Date</div>,
      width: "15vw",
      render: (row) => (
        <div className="flex justify-center text-[#1F4B7F]">
          <p className="text-[1vw]">{`${dayjs(row?.deleted_date).format(
            "DD MMM, YY"
          )}`}</p>
        </div>
      ),
    },
    {
      title: <div className="flex font-bold justify-center text-[1.1vw]">Actions</div>,
      width: "15vw",
      render: (row) => (
        <div className="flex justify-center">
          <div className="flex gap-[1vw] items-center">
            <FaEye
              className="cursor-pointer"
              size={"1.3vw"}
              color="#1F4B7F"
              onClick={() => {
                openModal(row);
                setImgUrl({
                  type: row?.deleted_data?.ad_file_type,
                  url: row?.deleted_data?.ad_video,
                });
              }}
            />
            <span
              className="cursor-pointer"
              onClick={() => {
                SetRestoreModalOpen(true);
                setTbsId(row?.tbs_recycle_id);
                SetRowName(row?.deleted_data.ad_title);
                console.log(selectedTab, "heifhjbdfh");
              }}
            >
              <TbRestore size={"1.3vw"} color="#1F4B7F" />
            </span>
            <span>
              <MdDelete
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                onClick={() => {
                  setDeleteModalOpen(true);
                  setTbsId(row?.tbs_recycle_id);
                  SetRowName(row?.deleted_data.ad_title);
                }}
              />
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="h-[75vh] w-full">
        <Table
          dataSource={currentItems}
          columns={columns}
          pagination={false}
          className="custom-table"
        />
      </div>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 rounded-md"
        show={viewModal}
        onClose={closeModal}
        setIsModalOpen={setViewModalIsOpen}
        height="auto"
        width="65vw"
        closeicon={false}
      >
        {imgUrl.type && imgUrl.type.startsWith("image/") ? (
          <img
            src={`${apiImgUrl}${imgUrl.url}`}
            alt="Ad"
            className="p-[0.4] w-full h-full"
            style={{
              objectFit: "fill",
              borderRadius: "1.4vw",
            }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full"
            style={{
              objectFit: "cover",
              borderRadius: "1.2vw",
            }}
          >
            <source src={`${apiImgUrl}${imgUrl.url}`} />
          </video>
        )}
      </ModalPopup>
      <ModalPopup
        show={deleteModalOpen}
        onClose={closeDeleteModal}
        height="21vw"
        width="30vw"
        closeicon={false}
      >
        <BinDelete
          setDeleteModalOpen={setDeleteModalOpen}
          deleteid={tbsId}
          // title={`want to delete ( ${rowName} ) Ad Permenantly`}
          title={
            <>
              want to delete <span style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(rowName)}</span> Ad Permenantly
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>

      <ModalPopup
        show={restoreModalOpen}
        onClose={closeDeleteModal}
        height="21vw"
        width="30vw"
        closeicon={false}
      >
        <BinRestore
          SetRestoreModalOpen={SetRestoreModalOpen}
          // title={`want to restore ( ${rowName} ) Ad`}
          title={
            <>
              want to restore <span style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(rowName)}</span>
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>
    </>
  );
}
