import { render } from "@testing-library/react";
import { Table, Pagination, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
// import { FaEye } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "../../../App.css";
import dayjs from "dayjs";
import ModalPopup from "../../Common/Modal/Modal";
import DeleteList from "../DeleteList";
import {
  ChangeRedeemStatus,
  GetRedeemOffersData,
} from "../../../Api/Offers/RedeemOffers";
import { useDispatch } from "react-redux";
import Direction from "../../../asserts/direction.png";
// import Pagination from "../Common/Pagination";
export default function RedeemListView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  activePage,
  itemsPerPage,
  offerimage,
  setOfferImage,
  setOfferView,
  offerview,
  offerFilter,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const typeId = sessionStorage.getItem("type_id")
    ? sessionStorage.getItem("type_id")
    : localStorage.getItem("type_id");

  const [promotionid, setPromoId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [comment, setComment] = useState();
  const [error, setError] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState();
  const [offId, setOffId] = useState();
  const [id, setId] = useState();
  const statusUpdate = (statusid, offerid) => {
    if (typeId === "PRO101") {
      setStatusModal(true);
      setStatusId(statusid);
      setOffId(offerid);
    }
  };

  const showComment =
    typeId === "PRO101"
      ? offerFilter === "rejected" ||
        offerFilter === "hold" ||
        offerFilter === "active"
      : false;

  const CloseStatusModal = () => {
    setStatusModal(false);
    if (statusModal === false) {
      setError("");
    }
  };

  useEffect(() => {
    if (statusModal === false) {
      setError("");
      setComment("");
    }
  }, [statusModal]);

  const dispatch = useDispatch();

  const handleStatusChange = async (id) => {
    setId(id);
    if ((id === 3 || id === 4) && (!comment || comment.trim().length === 0)) {
      setError("Reason required for On Hold or Reject");
      return;
    }

    ChangeRedeemStatus(id, offId, dispatch, offerFilter);
    GetRedeemOffersData(dispatch, offerFilter);
    console.log("call 1");
    setStatusModal(false);
    setComment("");
  };

  const columns = [
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          S.No
        </h1>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="">
            {/* <h1 className="pl-[1vw] text-[1.1vw]">{index + 1}</h1> */}
            <h1 className="pl-[1vw] text-[1vw] text-[#1F487C]">
              {serialNumber}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center ">
          Offer Title
        </h1>
      ),
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
                <p className="text-[1.1vw] text-[#1F487C]">
                  {" "}
                  {`${row?.offer_name?.slice(0, 15)}...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1vw] text-[#1F487C]">
                {row?.offer_name?.slice(0, 15)}
              </h1>
            )}
          </div>
        );
      },
      width: "18vw",
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          Offer Code
        </h1>
      ),
      width: "15vw",
      sorter: (a, b) => a.code.localeCompare(b.code),
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
                <button className="border-dashed text-[1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] ">
                  {`${row?.code?.slice(0, 15)}...`}{" "}
                </button>
              </Tooltip>
            ) : (
              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] ">
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
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          Category
        </h1>
      ),
      width: "15vw",
      sorter: (a, b) => a.occupation.localeCompare(b.occupation),
      onHeaderCell: () => ({
        style: { transform: "none", transition: "none" },
      }),
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1vw] text-[#1F487C]">{row.occupation}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          Created Date
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.created_date).valueOf() - dayjs(b.created_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1vw] text-[#1F487C]">{`${dayjs(
              row?.created_date
            ).format("DD MMM, YY")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          Duration
        </h1>
      ),
      sorter: (a, b) => dayjs(a?.start_date).diff(dayjs(b?.start_date)),
      width: "15vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] text-[#1F487C] flex justify-center">{`${dayjs(
              row?.start_date
            ).format("MMM DD")} - ${dayjs(row?.expiry_date).format(
              "MMM DD"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">
          Usage
        </h1>
      ),
      width: "10vw",
      sorter: (a, b) => {
        const usageA =
          typeof a?.usage === "string" ? a.usage : String(a?.usage || "");
        const usageB =
          typeof b?.usage === "string" ? b.usage : String(b?.usage || "");
        return usageA.localeCompare(usageB);
      },
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] text-[#1F487c] flex items-center justify-center">
              {row.usage}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold text-center  flex items-center justify-center">
          Status
        </h1>
      ),
      width: "9vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              onClick={() => statusUpdate(row?.status_id, row?.tbs_offer_id)}
              className={`${
                row?.status_id == 2
                  ? "bg-[#34AE2A]"
                  : row?.status_id == 0
                  ? "bg-[#646262]"
                  : row?.status_id == 1
                  ? "bg-[#FF6B00]"
                  : row?.status_id == 3
                  ? "bg-[#2A99FF]"
                  : "bg-[#FF0000]"
              } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] py-[0.2vw]`}
            >
              {typeId === "PRO101" ? row?.req_status : row?.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold text-center  flex items-center justify-center">
          Actions
        </h1>
      ),
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="grid grid-cols-3 gap-[0.4vw] items-center justify-center px-[1vw]">
            <div className="col-span-1">
              {typeId === "PROEMP101" ? (
                row.status_id === 0 || row.status_id === 1 ? (
                  <MdEdit
                    size={"1.3vw"}
                    color="#1F4B7F"
                    className=" cursor-pointer"
                    onClick={() => {
                      setModalIsOpen(true);
                      SetUpdateData(row.tbs_offer_id);
                    }}
                  />
                ) : (
                  ""
                )
              ) : (
                <MdEdit
                  size={"1.3vw"}
                  color="#1F4B7F"
                  className=" cursor-pointer"
                  onClick={() => {
                    setModalIsOpen(true);
                    SetUpdateData(row.tbs_offer_id);
                  }}
                />
              )}
            </div>

            <FaEye
              size={"1.3vw"}
              color="#1F4B7F"
              className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
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
    ...(showComment
      ? [
          {
            title: (
              <h1 className="text-[1.2vw] font-semibold text-center  flex items-center justify-center">
                Comments
              </h1>
            ),
            width: "9vw",
            render: (row) => {
              return (
                <div className="flex items-center justify-center">
                  {row?.comments?.length > 10 ? (
                    <Tooltip
                      placement="bottom"
                      title={row?.comments}
                      className="cursor-pointer text-[#1F487C]"
                      color="#1F487C"
                    >
                      <p className="text-[1vw] text-[#1F487C]">
                        {" "}
                        {`${row?.comments?.slice(0, 10)}...`}
                      </p>
                    </Tooltip>
                  ) : (
                    <h1 className="text-[1vw] text-[#1F487C]">
                      {row?.comments?.slice(0, 10)}
                    </h1>
                  )}
                </div>
              );
            },
          },
        ]
      : ""),
  ];
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <ModalPopup
        show={statusModal}
        onClose={CloseStatusModal}
        height="22vw"
        width="auto"
        closeicon={false}
      >
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1.5vw] text-[]">Update Redeem Offer status</p>
            <img src={Direction} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
            <div className="mt-[1vw] w-[100%] relative">
              <label className="text-[#1F487C] text-[1.3vw]">
                Comments{" "}
                <span className="text-[.9vw] text-gray-600">{`(Optional for Approval)`}</span>{" "}
              </label>
              <input
                type="text"
                name="comments"
                placeholder="Write your comments"
                value={comment}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setComment(value);
                  setError(value === "" && (id === 3 || id === 4));
                }}
                className="border-r-[0.3vw] pl-[1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
              />
              {error && (
                <span className="text-[.9vw] text-red-600 absolute bottom-[-1.2vw] left-[.5vw]">
                  Comments is required for Reject and On Hold
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-[1.6vw]">
              <button
                className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw]"
                // onClick={() => {
                //   handlechange(4, "On Hold");

                // }}
                onClick={() => handleStatusChange(3)}
              >
                On Hold
              </button>
              <button
                className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[10vw] h-[2vw]  bg-[#34AE2A] rounded-[0.5vw]"
                // onClick={() => {
                //   handlechange(5, "Approved");
                // }}
                onClick={() => handleStatusChange(2)}
              >
                Active
              </button>
              <button
                className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw]"
                // onClick={() => {
                //   handlechange(6, "Rejected");
                // }}
                onClick={() => handleStatusChange(4)}
              >
                Reject
              </button>
            </div>
          </div>
        </>
      </ModalPopup>

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
          api={`${apiUrl}/redeem-offers-deals/${promotionid}`}
          module={"redeemoffer"}
        />
      </ModalPopup>
      <ModalPopup
        show={offerview}
        onClose={() => setOfferView(false)}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <img src={`${apiImgUrl}${offerimage}`} className="w-full h-full" />
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}
