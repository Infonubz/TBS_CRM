import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import BinDelete from "./BinDelete";
import BinRestore from "./BinRestore";
import { capitalizeFirstLetter } from "../Common/Captilization";

export default function OffersDeals({
  currentItems,
  selectedTab,
  activePage,
  itemsPerPage,
}) {
  const [tbsId, setTbsId] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, SetRestoreModalOpen] = useState(false);
  const [rowName, SetRowName] = useState();

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    SetRestoreModalOpen(false);
  };

  const columns = [
    {
      title: (
        <div className="flex font-bold  justify-center text-[1.1vw]">S.No</div>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        const pageNo = (activePage - 1) * itemsPerPage + index + 1;
        return (
          <div className="">
            <h1 className="pl-[.5vw] text-[#1F4B7F] text-[1vw] text-center">
              {pageNo}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center  ">
          Name
        </h1>
      ),
      sorter: (a, b) =>
        a.deleted_data.offer_name.localeCompare(b.deleted_data.offer_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center pl-[1vw] font-bold  text-[#1F4B7F] ">
            {row?.deleted_data.offer_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.deleted_data.offer_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                <p className="text-[1vw]">
                  {" "}
                  <span>
                    {`${row?.deleted_data?.offer_name?.charAt(0) === row?.deleted_data?.offer_name?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(row?.deleted_data?.offer_name.slice(0, 15))
                      : row?.deleted_data?.offer_name.slice(0, 15)}...`}
                  </span>
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1vw] font-bold">
                <span>
                  {console.log(row.deleted_data.offer_name, "offer name")}
                  {row?.deleted_data?.offer_name === null ? "-" : row?.deleted_data?.offer_name?.charAt(0) === row?.deleted_data?.offer_name?.charAt(0).toLowerCase()
                    ? capitalizeFirstLetter(row?.deleted_data?.offer_name?.length > 15 ? (row?.deleted_data?.offer_name.slice(0, 15)) : (row?.deleted_data?.offer_name))
                    : row?.deleted_data?.offer_name?.length > 15 ? (row?.deleted_data?.offer_name.slice(0, 15)) : (row?.deleted_data?.offer_name)}
                </span>
              </h1>
            )}
          </div>
        );
      },
      width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold justify-center  flex items-center ">
          Code
        </h1>
      ),
      width: "18vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center ">
          //   {row?.deleted_data.code?.length > 15 ? (
          //     <Tooltip
          //       placement="right"
          //       title={row?.deleted_data.code}
          //       className="cursor-pointer"
          //       color="#1F487C"
          //     >
          //       <button className="border-dashed text-[1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
          //         {`${row?.deleted_data.code?.slice(0, 15)}...`}{" "}
          //       </button>
          //     </Tooltip>
          //   ) : (
          //     <button className="border-dashed text-[1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
          //       {row?.deleted_data.code?.slice(0, 15)}
          //     </button>
          //   )}
          // </div>
          <div className="flex items-center justify-center">
            {row?.deleted_data?.code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.deleted_data?.code}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                  <div className="border-dashed text-[1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center">
                    {`${row?.deleted_data?.code?.slice(0, 15)}...`}{" "}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                <div className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center ">
                  {row?.deleted_data?.code?.slice(0, 15)}
                </div>
              </div>
            )}
            {/* <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                        {row.code}
                      </button> */}
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex font-bold justify-center text-[1.1vw]">
          Duration
        </div>
      ),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] ">
            <p className="text-[1vw]">{`${dayjs(
              row?.deleted_data.start_date
            ).format("MMM DD")} - ${dayjs(row?.deleted_data.expiry_date).format(
              "MMM DD"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex  justify-center font-bold text-[1.1vw]">Usage</div>
      ),
      width: "8vw",
      render: (row) => {
        return (
          <div className="flex items-center pl-[1.2vw] text-[#1F4B7F] ">
            <p className="text-[1vw]">{row.deleted_data.usage}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold justify-center  flex items-center">
          Deleted Date
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.deleted_date).valueOf() - dayjs(b.deleted_date).valueOf(),
      width: "12vw",
      render: (row) => {
        return (
          <div className="flex items-center pl-[3vw]  text-[#1F4B7F] ">
            <p className="text-[1vw]">{`${dayjs(row?.deleted_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.1vw]">Status</div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex justify-center  text-[#1F4B7F] ">
            <button
              className={`${row.deleted_data.status_id === 0
                ? "bg-[#646262]"
                : row.deleted_data.status_id === 1
                  ? "bg-[#FF9900]"
                  : row.deleted_data.status_id === 2
                    ? "bg-[#34AE2b]"
                    : row.deleted_data.status_id === 3
                      ? "bg-[#2A99FF]"
                      : "bg-[#FD3434]"
                } h-[1.8vw] shadow-md shadow-[black] font-extrabold text-[1vw] cursor-not-allowed text-white w-[7vw] rounded-[0.5vw]`}
            >
              {row.deleted_data.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.1vw]">
          Actions
        </div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex justify-center">
            <div className="flex gap-[0.7vw] items-center">
              <span
                className="cursor-pointer"
                onClick={() => {
                  SetRestoreModalOpen(true);
                  setTbsId(row?.tbs_recycle_id);
                  SetRowName(row?.deleted_data.offer_name);
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
                    SetRowName(row?.deleted_data.offer_name);
                  }}
                />
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  console.log(selectedTab, "tabtabtba");

  return (
    <>
      <div className="h-[72vh] w-full">
        <Table
          dataSource={currentItems}
          columns={columns}
          pagination={false}
          className="custom-table"
        />
      </div>
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
          // title={`want to delete ( ${rowName} ) offer Permenantly`}
          title={
            <>
              want to delete{" "}
              <span style={{ fontWeight: "bold" }}>{capitalizeFirstLetter(rowName)}</span> offer
              Permenantly
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
          // title={`want to restore ( ${rowName} ) offer`}
          title={
            <>
              want to restore{" "}
              <span style={{ fontWeight: "bold" }}>{capitalizeFirstLetter(rowName)}</span> offer
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>
    </>
  );
}
