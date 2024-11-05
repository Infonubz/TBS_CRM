import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import BinDelete from "./BinDelete";
import BinRestore from "./BinRestore";

export default function OffersDeals({ currentItems, selectedTab ,activePage, itemsPerPage }) {
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
        <div className="flex font-bold text-[1.2vw]">S.No</div>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        const pageNo = (activePage - 1) * itemsPerPage + index+1
        return (
          <div className="">
            <h1 className="pl-[1vw] text-[#1F4B7F]">{pageNo}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center  ">
          Name
        </h1>
      ),
      sorter: (a, b) =>
        a.deleted_data.offer_name.localeCompare(b.deleted_data.offer_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center  text-[#1F4B7F] ">
            {row?.deleted_data.offer_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.deleted_data.offer_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                <p className="text-[1.1vw]">
                  {" "}
                  {`${row?.deleted_data.offer_name?.slice(0, 15)}...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1.1vw] font-semibold">
                {row?.deleted_data.offer_name?.slice(0, 15)}
              </h1>
            )}
          </div>
        );
      },
      width: "20vw",
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center ">
          Code
        </h1>
      ),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center ">
            {row?.deleted_data.code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.deleted_data.code}
                className="cursor-pointer"
                color="#1F487C"
              >
                <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                  {`${row?.deleted_data.code?.slice(0, 15)}...`}{" "}
                </button>
              </Tooltip>
            ) : (
              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                {row?.deleted_data.code?.slice(0, 15)}
              </button>
            )}
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex font-bold text-[1.2vw]">
          Duration
        </div>
      ),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex  text-[#1F4B7F] ">
            <p className="text-[1.1vw]">{`${dayjs(
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
        <div className="flex  font-bold text-[1.2vw]">Usage</div>
      ),
      width: "7vw",
      render: (row) => {
        return (
          <div className="flex  text-[#1F4B7F] ">
            <p className="text-[1.1vw]">{row.deleted_data.usage}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center">
          Deleted Date
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.deleted_date).valueOf() - dayjs(b.deleted_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center  text-[#1F4B7F] ">
            <p className="text-[1.1vw]">{`${dayjs(row?.deleted_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex  font-bold text-[1.2vw]">Status</div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex  text-[#1F4B7F] ">
            <button
              className={`${
                row.deleted_data.status?.toLowerCase() === "active"
                  ? "bg-[#34AE2A]"
                  : row.deleted_data.status?.toLowerCase() == "draft"
                  ? "bg-[#FF9900]"
                  : "bg-[#FD3434] "
              } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] cursor-not-allowed py-[0.2vw]`}
            >
              {row.deleted_data.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      width: "10vw",
      render: (row) => {
        return (
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
              <TbRestore size={"1.6vw"} color="#1F4B7F" />
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
             want to delete <span style={{ fontWeight: 'bold' }}>{rowName}</span> offer Permenantly
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
             want to restore <span style={{ fontWeight: 'bold' }}>{rowName}</span> offer
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>
    </>
  );
}
