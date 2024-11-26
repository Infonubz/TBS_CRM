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
  activePage,
  itemsPerPage,
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
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          S.No
        </h1>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="flex items-center justify-center">
            <h1 className="pl-[1vw] text-[#1F487C]">{serialNumber}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Operator Name
        </h1>
      ),
      sorter: (a, b) => a.operator_details.localeCompare(b.operator_details),
      render: (row, rowdta, index) => {
        console.log(row, "rowqwertyuiop");

        return (
          <div className="flex items-center justify-center text-[#1F487C] text-[1.1vw]">
            {row?.operator_details?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.operator_details}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.operator_details?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.operator_details?.slice(0, 15)
            )}{" "}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Promo Title
        </h1>
      ),
      sorter: (a, b) => a.promo_name.localeCompare(b.promo_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center text-[#1F487C] justify-center text-[1.1vw]">
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
              capitalizeFirstLetter(row?.promo_name?.slice(0, 15))
            )}{" "}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Promo Code
        </h1>
      ),
      sorter: (a, b) => a.promo_description.localeCompare(b.promo_description),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center text-[#1F487C] justify-center">
            {/* <h1 className="text-[1.1vw]">
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
            </h1> */}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Promo Value
        </h1>
      ),
      sorter: (a, b) => a.promo_description.localeCompare(b.promo_description),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center text-[#1F487C] justify-center">
            {/* <h1 className="text-[1.1vw]">
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
            </h1> */}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Created Date
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      // width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F487C]">{`${dayjs(row?.start_date).format(
              "MMM DD"
            )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Duration
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      // width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F487C]">{`${dayjs(row?.start_date).format(
              "MMM DD"
            )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Usage
        </h1>
      ),
      sorter: (a, b) => a.usage - b.usage,
      // width: "11vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F487C]">{row.usage}</p>
          </div>
        );
      },
    },

    {
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Status
        </h1>
      ),
      // width: "11vw",
      render: (row) => {
        console.log(row.promo_status_id == 0, "schjbsdc");
        return (
          <div className="flex items-center justify-center">
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
                } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[9vw] py-[0.2vw]`}
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
      title: (
        <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">
          Actions
        </h1>
      ),
      // width: "11vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center justify-center">
            {/* <div><IoMdEye size={"1.6vw"} color="#1F4B7F" onClick={() => { setEyeModalIsOpen(true) }} /></div> */}
            <FaEye
              className="text-[1.5vw] text-[#1F487C]"
              onClick={() => {
                setEyeModalIsOpen(true);
                setPromoImage(row.background_image);
                console.log(row.background_image, "bg image");
              }}
            />
            {/* {(row?.promo_status_id === 1 || row?.promo_status_id === 0) && ( */}
              <MdEdit
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                onClick={() => {
                  setPromotionId(row.promo_id);
                  SetUpdateData(row.promo_id);
                  setModalIsOpen(true);
                }}
              />
            {/* // )} */}
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
