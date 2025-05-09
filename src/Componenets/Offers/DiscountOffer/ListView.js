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
  GetUsageDetail,
} from "../../../Api/Offers/Offers";
import Direction from "../../../asserts/direction.png";
import { useDispatch } from "react-redux";
import NOIMAGE from "../../../asserts/NOIMAGE.png";
import { CiImageOff } from "react-icons/ci";
import { capitalizeFirstLetter } from "../../Common/Captilization";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import day from "dayjs";
import ReactPaginate from "react-js-pagination";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  console.log(comment, "comment_comment");
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [maxError, setMaxError] = useState();
  const [usageOpen, setUsageOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [activePages, setActivePages] = useState(1);
  const [isView, setIsView] = useState("Desktop");
  // const [deviceid,setDeviceId]=useState(1);
  const [device1id, setDevice1Data] = useState();
  const [device2id, setDevice2Data] = useState();

  const itemsper = 5;
  console.log(itemsper, "itemperpage");

  const handlePageChange = (selectedPage) => {
    setActivePages(selectedPage);
    console.log("Selected page:", selectedPage);
  };

  const indexOfLastItem = activePages * itemsper;
  const indexOfFirstItem = indexOfLastItem - itemsper;

  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems, "CurrentItems");
  useEffect(() => {
    setActivePages(1);
  }, [data]);

  useEffect(() => {
    if (device1id === 1) {
      setIsView("Desktop");
    } else {
      setIsView("Mobile");
    }
  });
  useEffect(() => {
    setDevice1Data(1);
  }, [data]);

  // const formattedDateTime = (dateStr) => {
  //   const [date, timeWithMs] = dateStr.split('T');
  //   const [year, month, day] = date.split('-');
  //   const [time] = timeWithMs.split('.');
  //   const monthShort = "JanFebMarAprMayJunJulAugSepOctNovDec".slice((+month - 1) * 3, (+month) * 3);
  //   return `${day} ${monthShort} ${year} (${time})`;
  // };

  const formatDateTime = (dateStr) => {
    const [datePart, timePart] = dateStr.split("T");
    const [year, month, day] = datePart.split("-");
    let [hour, min] = timePart.split(":");

    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // handle midnight (0 => 12)

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hour}:${min} ${ampm}`;

    return `${formattedDate} (${formattedTime})`;
  };
  // const formatDateTime = (dateStr) => {
  //   const date = new Date(dateStr);

  //   const day = String(date.getDate()).padStart(2, '0');
  //   const monthShort = date.toLocaleString('en-US', { month: 'short' });
  //   const year = date.getFullYear();

  //   let hour = date.getHours();
  //   const min = String(date.getMinutes()).padStart(2, '0');
  //   const ampm = hour >= 12 ? "PM" : "AM";
  //   hour = hour % 12;
  //   hour = hour ? hour : 12;

  //   const formattedDate = `${day}-${monthShort}-${year}`;
  //   const formattedTime = `${hour}:${min} ${ampm}`;

  //   return `${formattedDate} (${formattedTime})`;
  // };

  // const formatTime = (timeStr) => {
  //   const [hours, minutes, seconds] = timeStr?.split(":");
  //   const hours24 = parseInt(hours, 10);
  //   const period = hours24 >= 12 ? "PM" : "AM";
  //   const hours12 = hours24 > 12 ? hours24 - 12 : hours24 === 0 ? 12 : hours24;
  //   return `${hours12}:${minutes} ${period}`;
  // };

  const formatTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
      return ""; // or return timeStr, or a default value
    }

    const [hours, minutes] = timeStr.split(":");
    const hours24 = parseInt(hours, 10);

    if (isNaN(hours24) || !minutes) return ""; // additional safety

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 > 12 ? hours24 - 12 : hours24 === 0 ? 12 : hours24;

    return `${hours12}:${minutes} ${period}`;
  };

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

    if ((id === 3 || id === 4) && (!comment || comment.length > 25)) {
      setMaxError(true);
      return;
    } else {
      setMaxError(false);
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

  const handleFetchUsageDetails = async (couponcode) => {
    try {
      const result = await GetUsageDetail(couponcode);
      console.log("Full API result:", result);

      if (!result) {
        console.warn("API result is null or undefined");
        setData([]);
        setDevice1Data([]);
        setDevice2Data([]);
        setActivePages(1);

        return;
      }
      if (result.message === "No data found") {
        console.warn("API responded with no data found");
        setData([]);
        setActivePages(1);
        return;
      }
      if (typeof result === "object" && !Array.isArray(result)) {
        console.log("Single object received:", result);
        setData([result]);
      } else if (Array.isArray(result)) {
        setData(result);
        console.log(result, "setDataaaaaa");
      }
      setDevice1Data(result.filter((item) => item.device_id === 1));
      setDevice2Data(result.filter((item) => item.device_id === 2));
    } catch (error) {
      console.error("Error fetching usage details:", error);
      setData([]);
      setDevice1Data([]);
      setDevice2Data([]);
      setActivePages(1);
    }
  };

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
                placement="top"
                title={row?.offer_name}
                className="cursor-pointer text-[#1F487C]"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <p className="text-[1vw] font-bold text-[#1F487C]">
                  {" "}
                  {`${
                    row?.offer_name?.charAt(0) ===
                    row?.offer_name?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(row?.offer_name).slice(0, 15)
                      : row?.offer_name?.slice(0, 15)
                  }...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1vw] font-bold text-[#1F487C]">
                {row?.offer_name?.charAt(0) ===
                row?.offer_name?.charAt(0).toLowerCase()
                  ? capitalizeFirstLetter(row?.offer_name).slice(0, 15)
                  : row?.offer_name?.slice(0, 15)}
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
            {row?.code?.length > 8 ? (
              <Tooltip
                placement="top"
                title={row?.code}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <div className="border-[0.1vw] font-bold border-[#1F487C] rounded-[0.5vw]">
                  <div className="border-dashed text-[1vw] font-bold bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center">
                    {`${row?.code?.slice(0, 8)}...`}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                <div className="border-dashed text-[1vw] font-bold bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center ">
                  {row?.code}
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
          <div className="flex items-center pl-[2vw]">
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
          <div className="flex items-center pl-[2vw]">
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
            <p className="text-[1vw] text-[#1F487C] flex pl-[1.5vw]">{`${dayjs(
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
        <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
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
        const hasUsage = row.offerusedcount || row.usage;
        const isClickable = row.offerusedcount > 0;
        return (
          <div>
            {hasUsage ? (
              <div
                className="cursor-pointer text-[#1F487C]"
                onClick={() => {
                  if (isClickable) {
                    setUsageOpen(true);
                    setSelectedRow(row);
                    handleFetchUsageDetails(row?.code);
                  }
                }}
              >
                <p className="text-[1vw] text-[#1F487c] flex items-center pl-[2.55vw]">
                  {`${row.offerusedcount}/${row.usage}`}
                </p>
              </div>
            ) : (
              <p className="text-[1vw] text-[#1F487c] flex items-center pl-[2.55vw]">
                -
              </p>
            )}
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
                  {row?.req_status === "Active" ||
                  row?.req_status === "Draft" ? (
                    <div className="flex items-center justify-center">-</div>
                  ) : row.comments ? (
                    <div className="flex items-center pl-[1vw]">
                      {row?.comments?.length > 10 ? (
                        <Tooltip
                          placement="top"
                          title={row?.comments}
                          className="cursor-pointer text-[#1F487C]"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <p className="text-[1vw] text-[#1F487C]">
                            {" "}
                            {`${capitalizeFirstLetter(
                              row?.comments?.slice(0, 10)
                            )}...`}
                          </p>
                        </Tooltip>
                      ) : (
                        <h1 className="text-[1vw] text-[#1F487C]">
                          {capitalizeFirstLetter(row?.comments?.slice(0, 10))}
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
                statusUpdate(row?.status_id, row?.tbs_offer_id);
                setComment(row?.comments);
              }}
              className={`${
                row?.status_id == 2
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
        // console.log(row, "rowrowrowrow");
        return (
          <div className="grid grid-cols-3 gap-[0.4vw] items-center justify-center px-[1vw]">
            <FaEye
              size={"1.3vw"}
              color="#1F4B7F"
              className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
                console.log(row, "offer image row");
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
  const columnsUsage = [
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          S.No
        </div>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePages - 1) * itemsper + (index + 1);

        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {serialNumber}
          </div>
        );
      },
    },

    {
      title: (
        <div className="text-[1.1vw] font-bold text-center">Ticket Number</div>
      ),
      key: "ticket_no",
      dataIndex: "ticket_no",
      align: "center",
      render: (ticket_no) => (
        <div className="text-[1vw] text-[#1F487C] font-bold">{ticket_no}</div>
      ),
    },
    {
      title: <div className="text-[1.1vw] font-bold text-center">Email</div>,
      key: "email",
      dataIndex: "email",
      align: "center",
      render: (email) => (
        <div className="text-[1vw] text-[#1F487C] font-bold">{email}</div>
      ),
    },
    {
      title: <div className="text-[1.1vw] font-bold text-center">Mobile</div>,
      key: "mobile",
      dataIndex: "mobile",
      align: "center",
      render: (mobile) => (
        <div className="text-[1vw] text-[#1F487C] font-bold">{mobile}</div>
      ),
    },
    {
      title: (
        <div className="text-[1.1vw] font-bold text-center">Booking D/T</div>
      ),
      key: "booking_date_time",
      dataIndex: "booking_date_time",
      align: "center",
      render: (booking_date_time) => {
        console.log(booking_date_time, "date");
        return (
          <div className="ml-[0.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw]">
            <p>{formatDateTime(booking_date_time)}</p>

            {/* {`${formatDate(booking_date_time?.split("-")[0])} (${formatTime(booking_date_time?.split("T")[1])})`} */}
            {console.log(formatDateTime(booking_date_time), "blocking date")}
          </div>
        );
      },
    },

    {
      title: <div className="text-[1.1vw] font-bold text-center">Device</div>,
      key: "device_type",
      dataIndex: "device_type",
      align: "center",
      width: "5vw",
      render: (device_type, row) => {
        const device_id = row.device_id;
        const isNull = device_id === "null" || device_type === "null";
        const isWeb = device_id === 1 || device_type === "website";
        const isMobile = device_id === 2 || device_type === "mobile";

        return (
          <div className="flex justify-center items-center text-[#1F4B7F]">
            {isNull ? null : isWeb ? (
              <FaDesktop className="text-[1.3vw]" />
            ) : isMobile ? (
              <FaMobileAlt className="text-[1.5vw]" />
            ) : null}
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
            <p className="text-[1.5vw] font-bold text-[#1F487C]">
              Update Discount Offer Status
            </p>
            <img src={Direction} className="h-[6vw] w-[6vw] mt-[1vw]"></img>
            <div className="mt-[1vw] w-[100%]  flex flex-col relative">
              <label className="text-[#1F487C] font-bold text-[1.3vw]">
                Comments{" "}
                <span className="text-[.9vw] text-gray-600">{`(Optional for active)`}</span>
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
                  setMaxError(e.target.value.length > 25);
                }}
                className="border-r-[0.3vw] pl-[1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none placeholder:font-sans placeholder:text-[1vw]"
              />
              {error && (
                <span className="text-[.9vw] text-red-600 absolute bottom-[-1.4vw] left-[0vw]">
                  Comments is required for Reject and Hold
                </span>
              )}

              {maxError === true && (
                <span className="text-[.9vw] text-red-600 absolute bottom-[-1.4vw] left-[0vw]">
                  Comments should not exceed 25 characters
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
          <img
            src={`${apiImgUrl}${offerimage}`}
            className="w-full h-[15vw] rounded-[0.5vw] mt-[1vw]"
          />
        )}
      </ModalPopup>
      {/* Modal */}

      <ModalPopup
        show={usageOpen}
        onClose={() => setUsageOpen(false)}
        data={selectedRow}
        height="auto"
        width="60vw"
        closeicon={false}
      >
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-[1.5vw] font-bold text-[#1F487C] ">
              USAGE DETAILS
            </p>
          </div>

          {/* <div className="flex border-[#1F487C] h-[5vh]  justify-end">
            <Tooltip
              placement="top"
              title={
                <div className="flex items-center gap-x-[0.5vw] justify-center">
                  <FaDesktop color={"#1F487C"} size={"1vw"} />
                  <label className="text-[1vw] font-semibold">Website</label>
                </div>
              }
              className="cursor-pointer"
              color="white"
              overlayInnerStyle={{
                color: "#1F487C",
              }}
            >
              <button
                className={`${
                  isView === "Desktop" ? "bg-[#1F487C]" : "bg-[white]"
                } px-[0.75vw] rounded-l-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C]`}
                style={{
                  transition: "all 1s",
                }}
                onClick={() => {
                  setIsView("Desktop");
                  setDevice1Data(1);
                  //  setDeviceId(1);
                  //  setActivePage(1);
                  //  GetBookingDetails(dispatch, setSpinning, 1);
                }}
              >
                <FaDesktop
                  color={`${isView === "Desktop" ? "white" : "#1F487C"}`}
                />
              </button>
            </Tooltip>
            <Tooltip
              placement="top"
              title={
                <div className="flex items-center gap-x-[0.5vw] justify-center">
                  <FaMobileAlt color={"#1F487C"} size={"1vw"} />
                  <label className="text-[1vw] font-semibold">Mobile</label>
                </div>
              }
              className="cursor-pointer"
              color="white"
              overlayInnerStyle={{
                color: "#1F487C",
              }}
            >
              <button
                className={`${
                  isView === "Mobile" ? "bg-[#1F487C]" : "bg-[white]"
                } px-[0.75vw] rounded-r-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0  border-[#1F487C]`}
                style={{
                  transition: "all 1s",
                }}
                onClick={() => {
                  setIsView("Mobile");
                  setDevice2Data(2);

                  // setDeviceId(2);
                  // setActivePage(1);
                }}
              >
                <FaMobileAlt
                  color={`${isView === "Mobile" ? "white" : "#1F487C"}`}
                />
              </button>
            </Tooltip>
          </div> */}
        </div>

        <div>
          <Table
            className="custom-table mt-[0.5vw] h-auto  w-auto "
            columns={columnsUsage}
            dataSource={currentItems}
            rowKey={(row, index) => row?.ticket_no}
            pagination={false}
          />

          <div>
            {data?.length > itemsper && (
              <div className="flex justify-end pt-4 pr-2">
                <ReactPaginate
                  activePage={activePages}
                  itemsCountPerPage={itemsper}
                  totalItemsCount={data?.length}
                  pageRangeDisplayed={3}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link "
                  activeClass="active"
                  prevPageText={
                    <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                  }
                  nextPageText={
                    <FontAwesomeIcon icon={faChevronRight} size="1x" />
                  }
                  firstPageText={
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />
                  }
                  lastPageText={
                    <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
                  }
                />
              </div>
            )}
          </div>
        </div>
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}
