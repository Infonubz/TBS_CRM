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
  ChangeDisscountStatus,
  GetOffersData,
} from "../../../Api/Offers/Offers";
import Direction from "../../../asserts/direction.png";
import { useDispatch } from "react-redux";
import NOIMAGE from "../../../asserts/NOIMAGE.png";
import { CiImageOff } from "react-icons/ci";
import { capitalizeFirstLetter } from "../../Common/Captilization";

// import Pagination from "../Common/Pagination";
export default function ListView({
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
  setValueSymbol,
  valueSymbol,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [promotionid, setPromoId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const typeId = sessionStorage.getItem("type_id")
    ? sessionStorage.getItem("type_id")
    : localStorage.getItem("type_id");

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState();
  const [offId, setOffId] = useState();
  const [comment, setComment] = useState();
  console.log(comment, 'comment_comment')
  const [error, setError] = useState();
  const [id, setId] = useState();

  const showComment =
    typeId === "PRO101"
      ? offerFilter === "rejected" ||
      offerFilter === "hold" ||
      offerFilter === "approved" ||
      offerFilter === "all"
      : false;

  console.log(showComment, "show_comment_column");

  const statusUpdate = (statusid, offerid) => {
    if (typeId === "PRO101") {
      setStatusModal(true);
      setStatusId(statusid);
      setOffId(offerid);
    }
  };

  const CloseStatusModal = () => {
    setStatusModal(false);
  };

  const dispatch = useDispatch();

  const handleStatusChange = async (id) => {
    setId(id);
    if ((id === 3 || id === 4) && (!comment || comment.trim().length === 0)) {
      setError("Reason required for Hold or Reject");
      return;
    }

    ChangeDisscountStatus(id, offId, dispatch, offerFilter, comment);
    GetOffersData(dispatch, offerFilter);
    console.log("call 1");
    setStatusModal(false);
    setComment("");
  };

  useEffect(() => {
    if (statusModal === false) {
      setError("");
      setComment("");
    }
  }, [statusModal]);

  const columns = [
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          S.No
        </h1>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="">
            {/* <h1 className="pl-[2vw] text-[1.1vw]">{index + 1}</h1> */}
            <h1 className="flex justify-center font-bold items-center text-[1vw] text-[#1F487C]">
              {serialNumber}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center ">
          Offer Title
        </h1>
      ),
      sorter: (a, b) => a.offer_name.localeCompare(b.offer_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center pl-[1vw]">
            {/* <h1 className="text-[1.1vw]">{row.offer_name}</h1> */}
            {row?.offer_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.offer_name}
                className="cursor-pointer text-[#1F487C]"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <p className="text-[1vw] font-bold text-[#1F487C]">
                  {" "}
                  {`${row?.offer_name?.charAt(0) === row?.offer_name?.charAt(0).toLowerCase()
                    ? capitalizeFirstLetter(row?.offer_name).slice(0, 15)
                    : row?.offer_name?.slice(0, 15)}...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1vw] font-bold text-[#1F487C]">
                {
                  row?.offer_name?.charAt(0) === row?.offer_name?.charAt(0).toLowerCase()
                    ? capitalizeFirstLetter(row?.offer_name).slice(0, 15)
                    : row?.offer_name?.slice(0, 15)
                }
              </h1>
            )}
          </div>
        );
      },
      width: "18vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Offer Code
        </h1>
      ),
      sorter: (a, b) => a.code.localeCompare(b.code),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            {row?.code?.length > 13 ? (
              <Tooltip
                placement="right"
                title={row?.code}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <div className="border-[0.1vw] font-bold border-[#1F487C] rounded-[0.5vw]">
                  <div className="border-dashed text-[1vw] font-bold bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center">
                    {`${row?.code?.slice(0, 13)}..`}{" "}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                <div className="border-dashed text-[1vw] font-bold bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center ">
                  {row?.code?.slice(0, 15)}
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
    // {
    //   title: <h1 className="text-[1.1vw] font-semibold  flex items-center justify-center">Offer Value</h1>,
    //   width: "12vw",
    //   sorter: (a, b) => a.offer_value.localeCompare(b.offer_value),
    //   onHeaderCell: () => ({
    //     style: { transform: 'none', transition: 'none' },
    //   }),
    //   render: (row) => {
    //     return (
    //       <div className="flex items-center justify-center">
    //         <p className="text-[1vw] text-[#1F487C]">₹ {row.offer_value}</p>
    //       </div>
    //     );
    //   },
    // },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
          Offer Value
        </h1>
      ),
      width: "12vw",
      sorter: (a, b) => {
        if (
          typeof a?.offer_value === "number" &&
          typeof b?.offer_value === "number"
        ) {
          return a?.offer_value - b?.offer_value;
        }
        const valueA = String(a?.offer_value || "");
        const valueB = String(b?.offer_value || "");
        return valueA.localeCompare(valueB);
      },
      onHeaderCell: () => ({
        style: { transform: "none", transition: "none" },
      }),
      render: (row) => {
        return (
          <div className="flex items-center pl-[1.5vw]">
            <p className="text-[1vw] font-bold text-[#1F487C]">
              {row?.value_symbol === "₹"
                ? `${row?.value_symbol} ${row?.offer_value}`
                : `${row?.offer_value} ${row?.value_symbol}`}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Category
        </h1>
      ),
      sorter: (a, b) => a.occupation.localeCompare(b.occupation),
      width: "15vw",
      onHeaderCell: () => ({
        style: { transform: "none", transition: "none" },
      }),
      render: (row) => {
        return (
          <div className="flex items-center pl-[1vw]">
            <p className="text-[1vw] font-bold text-[#1F487C]">
              {row.occupation}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Created Date
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.created_date).valueOf() - dayjs(b.created_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center pl-[1vw]">
            <p className="text-[1vw] text-[#1F487C]">{`${dayjs(
              row?.created_date
            ).format("DD MMM, YY")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Duration
        </h1>
      ),
      sorter: (a, b) => dayjs(a?.start_date).diff(dayjs(b?.start_date)),
      width: "15vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] text-[#1F487C] flex pl-[1vw]">{`${dayjs(
              row?.start_date
            ).format("DD MMM")} - ${dayjs(row?.expiry_date).format(
              "DD MMM"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
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
            <p className="text-[1vw] text-[#1F487c] flex items-center pl-[2.55vw]">
              {`0/${row.usage}`}
            </p>
          </div>
        );
      },
    },
    ...(showComment
      ? [
        {
          title: (
            <h1 className="text-[1.1vw] font-bold text-center  flex items-center justify-center">
              Comments
            </h1>
          ),
          width: "9vw",
          render: (row) => {
            return (
              <>
                {row.comments ? (
                  <div className="flex items-center pl-[1vw]">
                    {row?.comments?.length > 10 ? (
                      <Tooltip
                        placement="bottom"
                        title={row?.comments}
                        className="cursor-pointer text-[#1F487C]"
                        color="white"
                        overlayInnerStyle={{
                          color: "#1F487C",
                        }}
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
                ) : (
                  <div className="flex items-center justify-center">-</div>
                )}
              </>
            );
          },
        },
      ]
      : ""),
    {
      title: (
        <h1 className="text-[1.1vw] font-bold text-center  flex items-center justify-center">
          Status
        </h1>
      ),
      width: "9vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                statusUpdate(row?.status_id, row?.tbs_offer_id)
                setComment(row?.comments)
              }}
              className={`${row?.status_id == 2
                ? "bg-[#34AE2B]"
                : row?.status_id == 0
                  ? "bg-[#646262]"
                  : row?.status_id == 1
                    ? "bg-[#FF9900]"
                    : row?.status_id == 3
                      ? "bg-[#2A99FF]"
                      : "bg-[#FD3434]"
                } rounded-[0.5vw] text-[1vw] font-extrabold shadow-md shadow-black  text-white w-[7vw] py-[0.2vw]`}
            >
              {/* {typeId === "PRO101"
                ? row?.req_status_id === 1
                  ? row?.req_status
                  : row?.status
                : row?.status} */}
              {typeId === "PRO101" && row?.req_status_id === 6
                ? row?.req_status
                : row?.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold text-center  flex items-center justify-center">
          Actions
        </h1>
      ),
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="grid grid-cols-3 gap-[0.4vw] items-center justify-center px-[1vw]">
            <FaEye
              size={"1.3vw"}
              color="#1F4B7F"
              className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
              }}
            />

            {typeId === "PROEMP101" ? (
              row.status_id === 0 || row.status_id === 1 ? (
                <MdEdit
                  size={"1.3vw"}
                  color="#1F4B7F"
                  className=" cursor-pointer"
                  onClick={() => {
                    setModalIsOpen(true);
                    SetUpdateData(row.tbs_offer_id);
                    setValueSymbol("₹");
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
                  setValueSymbol("₹");
                }}
              />
            )}
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setDeleteModalIsOpen(true);
                setPromoId(row);
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
      <ModalPopup
        show={statusModal}
        onClose={CloseStatusModal}
        height="22vw"
        width="auto"
        closeicon={false}
      >
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1.5vw] font-bold">
              Update Discount Offer status
            </p>
            <img src={Direction} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
            <div className="mt-[1vw] w-[100%]  flex flex-col relative">
              <label className="text-[#1F487C] font-bold text-[1.3vw]">
                Comments{" "}
                <span className="text-[.9vw] text-gray-600">{`(optional)`}</span>
              </label>
              <input
                type="text"
                name="comments"
                placeholder="Write your comments"
                value={comment}
                onChange={(e) => {
                  const value = e.target.value;
                  setComment(value);
                  setError(value === "" && (id === 3 || id === 4));
                }}
                className="border-r-[0.3vw] pl-[1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
              />
              {error && (
                <span className="text-[.9vw] text-red-600 absolute bottom-[-1.2vw] left-[.5vw]">
                  Comments is required for Reject and Hold
                </span>
              )}
            </div>

            <div className="flex gap-x-[1.5vw] mt-[1.5vw]">
              <button
                className="items-center text-[1vw] text-white shadow-md font-extrabold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#2A99FF] rounded-[0.5vw] cursor-pointer"
                // onClick={() => {
                //   handlechange(4, "On Hold");

                // }}
                onClick={() => handleStatusChange(3)}
              >
                Hold
              </button>
              <button
                className="items-center text-[1vw] text-white font-extrabold shadow-md font-bold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw]  bg-[#34AE2B] rounded-[0.5vw] cursor-pointer"
                // onClick={() => {
                //   handlechange(5, "Approved");
                // }}
                onClick={() => handleStatusChange(2)}
              >
                Active
              </button>
              <button
                className="items-center text-[1vw] text-white font-extrabold shadow-md shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] bg-[#FF1100] rounded-[0.5vw] cursor-pointer"
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
          title={`Want to delete this ${promotionid?.offer_name}`}
          api={`${apiUrl}/offers-deals/${promotionid?.tbs_offer_id}`}
          module={"offer"}
          filter={offerFilter}
        />
      </ModalPopup>

      <ModalPopup
        show={offerview}
        onClose={() => setOfferView(false)}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        {console.log(offerimage, "offerss_image")}
        {offerimage === null ? (
          <div className="flex flex-col justify-center items-center w-full h-full pb-[1vw]">
            <CiImageOff size={"6.5vw"} color="#1F487C" />
            <span className="text-[#1F487C] text-[1.3vw] font-semibold mt-[1vw]">
              Image not available
            </span>
          </div>
        ) : (
          <img src={`${apiImgUrl}${offerimage}`} className="w-full h-full" />
        )}
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}
