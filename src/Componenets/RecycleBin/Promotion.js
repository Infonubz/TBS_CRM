import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import BinDelete from "./BinDelete";
import BinRestore from "./BinRestore";

export default function Promotion({currentItems}) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [tbsId , setTbsId] = useState()
  const [deleteModalOpen,setDeleteModalOpen] = useState(false)
  const [restoreModalOpen,SetRestoreModalOpen] = useState(false)
  const [rowName,SetRowName] = useState()

  const closeDeleteModal = () =>{
    setDeleteModalOpen(false)
    SetRestoreModalOpen(false)
  }

  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">S.No</div>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        return (
          <div className="">
            <h1 className="pl-[1vw]">{index + 1}</h1>
          </div>
        );
      },
    },
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Name</div>
    //   ),
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex items-center">
    //         <h1 className="text-[1.1vw]">{row?.deleted_data.offer_name}</h1>
    //       </div>
    //     );
    //   },
    //   width: "14vw",
    // },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Name</h1>,
      sorter: (a, b) => a.deleted_data.promo_name.localeCompare(b.deleted_data.promo_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center justify-center text-[1.2vw]">
            {row?.deleted_data.promo_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.deleted_data.promo_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.deleted_data.promo_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.deleted_data.promo_name?.slice(0, 15)
            )}{" "}
          </div>
        );
      },
      width: "14vw",
    },
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Code</div>
    //   ),
    //   width: "17vw",
    //   render: (row) => {
    //     return (
    //       <div>
    //         <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
    //           {row?.deleted_data.code}
    //         </button>
    //       </div>
    //     );
    //   },
    // },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Description</h1>,
      sorter: (a, b) => a.deleted_data.promo_description.localeCompare(b.deleted_data.promo_description),
      render: (row, rowdta, index) => {
        return (
          // <div className="flex items-center">
          //   <h1 className="text-[1.1vw]">{row.promo_description}</h1>
          // </div>
          <div className="flex items-center justify-center">
            <h1 className="text-[1.1vw]">
              {/* {row.promo_description} */}
              {row?.deleted_data?.promo_description?.length > 15 ? (
                <Tooltip
                  placement="bottom"
                  title={row?.deleted_data.promo_description}
                  className="cursor-pointer"
                  color="#1F487C"
                >
                  {`${row?.deleted_data.promo_description?.slice(0, 15)}...`}
                </Tooltip>
              ) : (
                row?.deleted_data.promo_description?.slice(0, 15)
              )}
            </h1>
          </div>
        );
      },
      width: "14vw",
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Operator Name</h1>,
      sorter: (a, b) => a.deleted_data.operator_details.localeCompare(b.deleted_data.operator_details),
      width: "17vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw]">{row.deleted_data.operator_details}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Duration
        </div>
      ),
      width: "15vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw]">{`${dayjs(row?.deleted_data.start_date).format(
              "MMM DD"
            )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Usage</div>
      ),
      width: "7vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw]">{row?.deleted_data.usage}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Deleted Date</h1>,
      sorter: (a, b) =>
        dayjs(a.deleted_date).valueOf() - dayjs(b.deleted_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw]">{`${dayjs(row?.deleted_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div>
            <button
              className={`${
                row?.deleted_data?.promo_status?.toLowerCase() === "active"
                  ? "bg-[#34AE2A]"
                  : row.status == "Draft"
                  ? "bg-[#FD3434]"
                  : "bg-[#FF9900]"
              } rounded-[0.5vw] text-[1vw]  font-semibold text-white w-[7vw] py-[0.2vw]`}
            >
              {row?.deleted_data.promo_status}
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
      width: "10vw",
      render: (row) => {
        // promoidsetPromoId(row.offer_id);
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center">
            <span>
            <TbRestore size={"1.6vw"} color="#1F4B7F"
            onClick={()=>{
              SetRestoreModalOpen(true)
              setTbsId(row?.tbs_recycle_id)
              SetRowName(row?.deleted_data.promo_name)
             }} />
            </span>
            <span>
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              // onClick={() => setDeleteModalIsOpen(true)}
              onClick={() => {
                setDeleteModalOpen(true)
                setTbsId(row?.tbs_recycle_id)
                SetRowName(row?.deleted_data.promo_name)
              }}
            />
            </span>
          </div>
        );
      },
    },
  ];

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
        <BinDelete setDeleteModalOpen={setDeleteModalOpen}  deleteid={tbsId} url={`${apiUrl}/permanent-delete-promotions/${tbsId}`} title={`want to delete ( ${rowName} ) offer Permenantly`} getId={2} />
            </ModalPopup>
            <ModalPopup
             show={restoreModalOpen}
             onClose={closeDeleteModal}
             height="21vw"
             width="30vw"
             closeicon={false}>
              <BinRestore SetRestoreModalOpen={SetRestoreModalOpen} url={`${apiUrl}/restore-promotions/${tbsId}`} title={`want to restore ( ${rowName} ) offer`} getId={2}/>

            </ModalPopup>
    </>
  );
}
