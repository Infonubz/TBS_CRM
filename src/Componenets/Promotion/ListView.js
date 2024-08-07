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
import { FaEye } from "react-icons/fa";

export default function ListView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  promotionId,
  setPromotionId,
  setDeleteModalIsOpen,
}) {
  const [eyeModalIsOpen, setEyeModalIsOpen] = useState(false);
  const [promoImage, setPromoImage] = useState("");
  const closeModal = () => {
    setEyeModalIsOpen(false);
  };

  const handleDelete = (promo_id) => {
    setPromotionId(promo_id);
    setDeleteModalIsOpen(true);
  };

  const modalOpen = () => {};

  // const [promotionId, setPromotionId] = useState(null);
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
          <div className="flex items-center text-[1.2vw]">
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
            )}{" "}
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
      title: <h1 className="text-[1.2vw] font-semibold">Operator Details</h1>,
      sorter: (a, b) => a.operator_details.localeCompare(b.operator_details),
      width: "17vw",
      render: (row, rowdta, index) => {
        return (
          <div>
            <p className="text-[1.1vw]">{row.operator_details}</p>
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
      title: <h1 className="text-[1.2vw] font-semibold">Status</h1>,
      width: "10vw",
      render: (row) => {
        console.log(row.promo_status_id == 0, "schjbsdc");
        return (
          <div>
            {row?.promo_status_id != null ? (
              <button
                className={`${
                  row.promo_status_id == 0
                    ? "bg-[#777575]"
                    : row.promo_status_id == 1
                    ? "bg-[#FF9900]"
                    : row.promo_status_id == 2
                    ? "bg-[#34AE2A]"
                    : row.promo_status_id == 3
                    ? "bg-[#FD3434]"
                    : row.promo_status_id == 4
                    ? "bg-[#2A99FF]"
                    : "bg-[#646262]"
                } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[7vw] py-[0.2vw]`}
              >
                {capitalizeFirstLetter(row.promo_status)}
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
          <div className="flex gap-[0.7vw] items-center">
            {/* <div><IoMdEye size={"1.6vw"} color="#1F4B7F" onClick={() => { setEyeModalIsOpen(true) }} /></div> */}
            <FaEye
              className="text-[1.5vw] text-[#1F487C]"
              onClick={() => {
                setEyeModalIsOpen(true);
                setPromoImage(row.background_image);
                console.log(row.background_image, "bg image");
              }}
            />
            {(row?.promo_status_id === 1 || row?.promo_status_id === 0) && (
              <MdEdit
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                onClick={() => {
                  setPromotionId(row.promo_id);
                  setModalIsOpen(true);
                }}
              />
            )}
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                handleDelete(row.promo_id);
              }}
            />
          </div>
        );
      },
    },
  ];
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <Table
        // dataSource={data}
        dataSource={currentData}
        columns={columns}
        pagination={false}
        className="custom-table"
      />

      <ModalPopup
        show={eyeModalIsOpen}
        onClose={closeModal}
        closeicon={false}
        height="20vw"
        width="30vw"
      >
        {
          <div className="flex justofy-center mt-[1vw]">
            <img
              src={`http://192.168.90.47:4000${promoImage}`}
              className="rounded-[0.5vw]"
            />
          </div>
        }
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}

// :where(.custom-table).ant-table-wrapper .ant-table-thead th.ant-table-column-sort {
//   background: #1f4b7f;
// }
