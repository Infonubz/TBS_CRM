import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "./Dashboard.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import PowerBi from "./PowerBi";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationData,
  UnreadNotification,
} from "../../Api/Notification/Notification";
import PowerBIReport from "./PowerBIReport";
import NewPowerbi from "./NewPowerbi";
// import NewPowerbi from "./NewPowerBi";
import {
  GetBookingDetails,
  GetBookingDetailsById,
  GetBookingDetailsByDate,
  handleBookingDetailsSearch,
} from "../../Api/Dashboard/Dashboard";
import {
  Table,
  Spin,
  Tooltip,
  Popover,
  ConfigProvider,
  DatePicker,
} from "antd";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import dayjs from "dayjs";
import bus from "../../asserts/umbuslogo.png";
import { LiaSearchSolid } from "react-icons/lia";
import { BsExclamationCircle } from "react-icons/bs";
import moment from "moment";
import {
  MdLocationOn,
  MdDateRange,
  MdOutlineAccessTime,
  MdOutlineEmail,
  MdOutlineWhatsapp,
  MdOutlinePending,
} from "react-icons/md";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import { GetBlockedDetails } from "../../Api/Dashboard/Dashboard";
import { FaDesktop,FaMobileAlt } from "react-icons/fa";

export default function BlockTable({ activePage, setActivePage,deviceid }) {
  const [spinning, setSpinning] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [operatorData, setOperatorData] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sortOrderDate, setSortOrderDate] = useState(null);
  const [sortOrderFare, setSortOrderFare] = useState(null);

  const dispatch = useDispatch();
  const getBlockedDetails =
    useSelector((state) => state.crm.blocked_details) || [];
  console.log(getBlockedDetails, "blocked details dashboard");

  const handleFareSort = () => {
    if (!getBlockedDetails || getBlockedDetails.message === "No passengers found") {
      console.warn("No data available for sorting.");
      return; // Exit function if there’s no data
  }
    let sorted = [...getBlockedDetails];
    if (sortOrderFare === "ascend") {
      sorted.sort((a, b) => b.total_fare - a.total_fare);
      setSortOrderFare("descend");
    } else if (sortOrderFare === "descend") {
      sorted = [...getBlockedDetails]; // Reset to original order
      setSortOrderFare(null);
    } else {
      sorted.sort((a, b) => a.total_fare - b.total_fare);
      setSortOrderFare("ascend");
    }

    console.log(getBlockedDetails, "sort details");
    setSortedData(sorted);
  };

  const handleDateSort = () => {
    if (!getBlockedDetails || getBlockedDetails.message === "No passengers found") {
      console.warn("No data available for sorting.");
      return; // Exit function if there’s no data
  }
    let sorted = [...getBlockedDetails];
    if (sortOrderDate === "ascend") {
      sorted.sort(
        (a, b) =>
          new Date(b.booking_date_time?.slice(0, 10)) -
          new Date(a.booking_date_time?.slice(0, 10))
      );
      setSortOrderDate("descend");
    } else if (sortOrderDate === "descend") {
      sorted = [...getBlockedDetails]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.booking_date_time?.slice(0, 10)) -
          new Date(b.booking_date_time?.slice(0, 10))
      );
      setSortOrderDate("ascend");
    }

    console.log(getBlockedDetails, "sort details");
    setSortedData(sorted);
  };

  const infos = [
    {
      title: "Ticket Number",
    },
    {
      title: "PNR Number",
    },
    {
      title: "Mobile Number",
    },
    // {
    //   title: "Activated Date",
    //   description: "DD MMM (e.g. 01 Jan) - Format",
    // },
    // {
    //   title: "Expiry Date",
    //   description: "DD MMM (e.g. 01 Jan) - Format",
    // },
  ];

  const handleRowClick = (record) => {
    console.log(record, "record");
    SetUpdateData(record.ticket_no);
    const newExpandedKey = record.key === expandedRowKey ? null : record.key;
    setExpandedRowKey(newExpandedKey);
    console.log(expandedRowKey, "record record");
    setIsRowExpanded(newExpandedKey !== null);
  };

  const itemsPerPage = 10; // Number of items to display per page
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    console.log(activePage, "active page");
    console.log(itemsPerPage, "page items");
    setIsRowExpanded(false);
    // SetUpdateData(null);
    setExpandedRowKey(null);
  };
  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems =
  //   sortedData.length > 0
  //     ? sortedData?.slice(indexOfFirstItem, indexOfLastItem)
  //     : getBlockedDetails?.slice(indexOfFirstItem, indexOfLastItem) : [];
      const currentItems =
      Array.isArray(sortedData) && sortedData.length > 0
        ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
        : Array.isArray(getBlockedDetails)
          ? getBlockedDetails.slice(indexOfFirstItem, indexOfLastItem)
          : [];
  console.log(currentItems, "leeeeeength");

  const formatDate = (dateStr) => {
    // console.log(dateStr, "datedatedate")
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatTime = (timeStr) => {
    // console.log(timeStr,"timetimetime")
    const [hours, minutes, seconds] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);

    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  const columns = [
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          S.No
        </div>
      ),
      width: "3vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + index + 1;
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {serialNumber}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Reference ID
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row?.reference_id ? (
              row?.reference_id?.length > 12 ? (
                <Tooltip
                  placement="top"
                  title={row?.reference_id}
                  className="cursor-pointer"
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  {`${row?.reference_id?.slice(0, 12)}...`}
                </Tooltip>
              ) : (
                <div>{row.reference_id}</div>
              )
            ) : (
              <div>-</div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Ticket No
        </div>
      ),
      width: "6vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row?.ticket_no ? (
              row?.ticket_no?.length > 12 ? (
                <Tooltip
                  placement="top"
                  title={row?.ticket_no}
                  className="cursor-pointer"
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  {`${row?.ticket_no?.slice(0, 12)}...`}
                </Tooltip>
              ) : (
                <div>{row.ticket_no}</div>
              )
            ) : (
              <div className="ml-[3vw]">-</div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          PNR Number
        </div>
      ),
      width: "8vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw] font-bold">
            {row?.pnr_no ? (
              row?.pnr_no?.length >= 10 ? (
                <Tooltip
                  placement="top"
                  title={row?.pnr_no}
                  className="cursor-pointer"
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  {`${row?.pnr_no?.slice(0, 10)}...`}
                </Tooltip>
              ) : (
                <div>{row.pnr_no}</div>
              )
            ) : (
              <div>-</div>
            )}
          </div>
        );
      },
    },
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] text-center font-bold"
    //       style={{ color: "white" }}
    //     >
    //       Source Name
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row.source_name}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] text-center font-bold"
    //       style={{ color: "white" }}
    //     >
    //       Destination Name
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row?.destination_name?.length > 9 ? (
    //           <Tooltip
    //             placement="right"
    //             title={row?.destination_name}
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             {`${row?.destination_name?.slice(0, 8)}...`}
    //           </Tooltip>
    //         ) : (
    //           <div>{row?.destination_name?.slice(0, 9)}</div>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Operator 
        </div>
      ),
      width: "8vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw] font-bold">
            {row.operator_name.length > 10 ? (
              <Tooltip
                placement="top"
                title={row.operator_name}
                className="cursor-pointer text-[#1F487C]"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <p>{`${row.operator_name.slice(0, 10)}...`}</p>
              </Tooltip>
            ) : (
              <p>{row.operator_name}</p>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Mobile
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.mobile}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Email
        </div>
      ),
      width: "6vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw]">
            {row?.email?.length >= 15 ? (
              <Tooltip
                placement="top"
                title={row?.email}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                {`${row?.email?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              <div>{row.email}</div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="text-[1.2vw]  font-bold text-white flex items-center  justify-evenly">
          <Tooltip
            placement="top"
            title="Booking Date / Time"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            Blocking D / T
          </Tooltip>
          <button onClick={handleDateSort}>
          {sortOrderDate === "ascend" ? (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            ) : sortOrderDate === "descend" ? (
              <Tooltip
                placement="top"
                title="Descending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedDown />
              </Tooltip>
            ) : sortOrderDate === null ? (
              <Tooltip
                placement="top"
                title="Unsorted"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowUnsorted />
              </Tooltip>
            ) : (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            )}
          </button>
        </div>
      ),
      key: "booking_date_time",
      // sorter: (a, b) =>
      //   new Date(a.booking_date_time.slice(0, 10)) -
      //   new Date(b.booking_date_time.slice(0, 10)),
      // sortOrder:
      //   sortedInfo.columnKey === "booking_date_time" && sortedInfo.order,
      width: "11vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[0.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw]">
            {/* {`${(row.booking_date_time.slice(0, 13))} (${(row.booking_date_time.slice(15,23))})`} */}
            {`${formatDate(row.booking_date_time.split(",")[0].trim())} (${(row.booking_date_time.split(",")[1].trim())})`}
            {console.log(row.booking_date_time, "blocking date")}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.5vw] flex justify-center"
          style={{ color: "white" }}
        >
          <Tooltip
            placement="top"
            title="Email Service"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            <MdOutlineEmail />
          </Tooltip>
        </div>
      ),
      width: "3vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
            {row.email_service === "null" ? (
              "-"
            ) : row.email_service === "Yes" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.email_service === "No" ? (
              <IoMdCloseCircleOutline className="text-red-600" />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.5vw] flex justify-center font-bold"
          style={{ color: "white" }}
        >
          <Tooltip
            placement="top"
            title="Whatsapp Service"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            <MdOutlineWhatsapp />
          </Tooltip>
        </div>
      ),
      width: "3vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
            {row.whatsapp_service === "null" ? (
              "-"
            ) : row.whatsapp_service === "Yes" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.whatsapp_service === "No" ? (
              <IoMdCloseCircleOutline className="text-red-600" />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.5vw] flex justify-center font-bold"
          style={{ color: "white" }}
        >
          <Tooltip
            placement="top"
            title="Payment Status"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            <RiMoneyRupeeCircleLine />
          </Tooltip>
        </div>
      ),
      width: "3vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
            {row.payment_status === "null" ? (
              "-"
            ) : row.payment_status === "Success" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.payment_status === "success" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.payment_status === "Pending" ? (
              // <MdOutlinePending className="text-blue-600" />
              <IoMdCloseCircleOutline className="text-red-600" />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    // {
    //       title: (
    //         <div
    //           className="text-[1.2vw] text-center font-bold"
    //           style={{ color: "white" }}
    //         >
    //       <Tooltip
    //          placement="top"
    //          title="Device"
    //          className="cursor-pointer"
    //          color="white"
    //          overlayInnerStyle={{
    //            color:"#1F487C",
    //       }}
    //       >
    //           Device
    //       </Tooltip>
    //         </div>
          
    //       ),
    //       width:"5vw",
    //       render: (row, rowdta, index) => {
    //       return(
            
    //     <div className="flex justify-center text-[#1F4B7F] text-[1vw]">
    //             {(row.device_id === "null"||row.device_type=== "null") ? (
    //               "-"
    //             ) : (row.device_id === 1||row.device_type=== "website") ? (
    //               < FaDesktop className="text-bold text-center text-[1.3vw] font-black stroke-2 "/>
    //             ) : (row.device_id === 2 ||row.device_type=== "mobile")? (
    //               < FaMobileAlt className="text-bold text-center text-[1.5vw] font-black stroke-2"/>
    //             ) : (
    //               "-"
    //             )}
    //           </div>
    
    //         )
    //       }
    // },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold flex justify-evenly items-center"
          style={{ color: "white" }}
        >
          <p>Total Fare</p>
          <button onClick={handleFareSort}>
          {sortOrderFare === "ascend" ? (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            ) : sortOrderFare === "descend" ? (
              <Tooltip
                placement="top"
                title="Descending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedDown />
              </Tooltip>
            ) : sortOrderFare === null ? (
              <Tooltip
                placement="top"
                title="Unsorted"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowUnsorted />
              </Tooltip>
            ) : (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            )}
          </button>
        </div>
      ),
      key: "total_fare",
      // sorter: (a, b) => a.total_fare - b.total_fare,
      // sortOrder: sortedInfo.columnKey === "total_fare" && sortedInfo.order,
      width: "10vw",
      render: (row, rowdta, index) => {
        return (
          <div className="grid grid-cols-3 text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            <p className="col-span-2 ml-[1.2vw]">
              ₹
              {row?.total_fare % 1 === 0
                ? row.total_fare
                    .replace(/(\.\d*?[1-9])0+$/, "$1")
                    .replace(/\.0+$/, "")
                : parseFloat(row.total_fare).toFixed(2)}
                            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick(row);
              }}
              className="col-span-1"
            >
              {row.key === expandedRowKey ? (
                <IoIosArrowDropupCircle
                  style={{ height: "1.3vw", width: "1.3vw" }}
                />
              ) : (
                <IoIosArrowDropdownCircle
                  style={{ height: "1.3vw", width: "1.3vw" }}
                />
              )}
            </button>
            {/* {console.log(row.total_fare,"total fare")} */}
          </div>
        );
      },
    },
  ];

  const passengers = currentItems.map((pass) => pass.passenger_details)
  const passengerName = Object.values(passengers).map(entry => entry?.user_name);
  console.log(passengers,"passengers object")
  // const passengerName = passengers.map((pass)=>pass?.user_name)
  console.log(passengerName,"passenger names")
  const data =
    currentItems?.length > 0 &&
    currentItems?.map((item) => ({
      key: item.id,
      s_no: 1,
      email: item.email,
      mobile: item.mobile,
      ticket_no: item.ticket_no,
      pnr_no: item.pnr_no,
      source_name: item.source_name,
      destination_name: item.destination_name,
      operator_name: item.operator_name,
      total_fare: item.total_fare,
      booking_date_time: item.booking_date_time,
      email_service: item.email_service,
      whatsapp_service: item.whatsapp_service,
      payment_status: item.payment_status,
      reference_id: item.reference_id,
      device_id:item.device_id,
      device_type:item.device_type,
      hidden_details: (
        <div className="grid grid-cols-5">
          <div className=" col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center">
            <div className="px-[2vw] pt-[0.5vw] text-[#1F487C] w-[35vw]">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[1.25vw]">{item.source_name}</p>
                <img src={bus} alt="bus" className="w-[2.5vw]" />
                <p className="font-bold text-[1.25vw]">
                  {item.destination_name}
                </p>
              </div>
              <div className="bg-[#1F487C] h-[0.1vh] my-[0.5vw]" />
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-[0.25vw]">
                    <MdLocationOn />
                    <p className="font-bold text-[1vw]">
                      {item.pickup_point_name.length >= 15 ? (
                        <Tooltip
                          placement="right"
                          title={item.pickup_point_name}
                          className="cursor-pointer text-[#1F487C]"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <p>{`${item.pickup_point_name.slice(0, 15)}...`}</p>
                        </Tooltip>
                      ) : (
                        <p>{item.pickup_point_name}</p>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-[0.25vw] text-[1vw]">
                    <MdDateRange />
                    <p>{formatDate(item.depature_date)}</p>
                  </div>
                  <div className="flex items-center gap-[0.25vw] text-[1vw]">
                    <MdOutlineAccessTime />
                    <p>
                      {item.depature_time === null ? "-" : item.depature_time}
                    </p>
                  </div>
                  {/* <div className="flex justify-between"><p>GST</p><p>{item.source_id}</p></div> */}
                  {/* <div className="flex justify-between"><p>GST</p><p>{item.pickup_point_id}</p></div> */}
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-[0.25vw]">
                    <p className="font-bold text-[1vw] text-right">
                      {item.droping_point_name.length >= 15 ? (
                        <Tooltip
                          placement="left"
                          title={item.droping_point_name}
                          className="cursor-pointer text-[#1F487C]"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <p>{`${item.droping_point_name.slice(0, 15)}...`}</p>
                        </Tooltip>
                      ) : (
                        <p>{item.droping_point_name}</p>
                      )}
                    </p>
                    <MdLocationOn />
                  </div>

                  <div className="flex items-center gap-[0.25vw] text-[1vw]">
                    <p>{formatDate(item.arrival_date.slice(0, 10))}</p>
                    <MdDateRange />
                  </div>
                  <div className="flex items-center gap-[0.25vw] text-[1vw]">
                    <p>{item.arraival_time}</p>
                    <MdOutlineAccessTime />
                  </div>
                  {/* <div className="flex"><p>GST</p><p>{item.destination_id}</p></div> */}
                  {/* <div className="flex"><p>GST</p><p>{item.droping_point_id}</p></div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center">
            <div className="bg-[#1F487C] rounded-lg">
              <div className="grid grid-cols-4 border-b-[0.1vw] border-white py-[0.75vw] ">
                <span className="text-white font-semibold text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  Seat No
                </span>
                <span className="text-white font-semibold text-[1vw] w-full border-r-[0.1vw] text-center border-white px-[0.5vw]">
                  Passengers
                </span>
                <span className="text-white font-semibold text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  Age
                </span>
                <span className="text-white font-semibold text-[1vw] w-full text-center">
                  Gender
                </span>
              </div>
              <div className="grid grid-cols-4 gap-x-[1.5vw] justify-items-center py-[0.25vw]">
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => (
                        <p>{pass.seat}</p>
                      ))}

                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => <p>{pass.user_name}</p>)}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => <p>{pass.age}</p>)}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => (
                        <p>{pass.gender}</p>
                      ))}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-center py-[0.5vw] text-[0.9vw]">
          <div className="border-2 border-dotted border-zinc-800 rounded-[0.5vw] px-[0vw] py-[0vw] w-[15vw]">
              <div className="px-[0.1vw]">
              <div className="flex justify-between px-[1vw] pt-3">
                <p className="font-semibold">Base Fare</p>
                <p >₹ {Number(item.base_fare).toFixed(2)}</p>
                {/* <p>₹ {item?.base_fare.endsWith('0') ? item.base_fare.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : item.base_fare}</p> */}
              </div>
              <div className="flex justify-between px-[1vw] pb-2 ">
                <p className="font-semibold text-green-600">TBS Deal</p>
                <p className="text-green-600">- ₹ {Number(item.tbs_deal_amount).toFixed(2)}</p>
                {/* <p>- ₹ {item?.tbs_deal_amount.endsWith('0') ? item.tbs_deal_amount.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : item.tbs_deal_amount}</p> */}
              </div>
              <hr class="border-t-2 border-dotted border-black ml-3 w-[13vw]" />

              <div className="flex justify-between px-[1vw] pt-2">
                <p className="font-semibold">TBS Fare</p>
                <p>₹ {Number(item.tbs_fare).toFixed(2)}</p>
              </div>

              <div className={`flex justify-between px-[1vw] ${item.discount_amt ? "pb-3" : "pb-3"}`}>
                  <p className="font-semibold">GST</p>
                  <p>₹ {Number(item.gst).toFixed(2)}</p>
              </div>

              
              {item.discount_amt ? (
                <div className="flex justify-between px-[1vw]">
                  <p className="font-semibold text-green-600">Discount</p>
                  <p className="text-green-600">- ₹ {Number(item.discount_amt).toFixed(2)}</p>
                  {/* <p>- ₹ {item?.discount_amt.endsWith('0') ? item.discount_amt.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : item.discount_amt}</p> */}
                </div>
              ) : (
                ""
              )}
              </div>
              {/* <div className="flex justify-between">
            <p>Offer Code</p>
            <p>{item.offer_code}</p>
          </div> */}
              {/* <div className="flex justify-between border-b-[0.1vw] border-zinc-800">
            <p>TBS Deal %</p>
            <p>{item.tbs_deal_percentage}</p>
          </div> */}
              <div  >
              <div className="flex justify-between flex-row w-full bg-[#1F487C] text-white rounded-b-md  p-2 px-[1vw]">
                <p className="font-bold ml-1">Total Fare</p>
                <p >₹ {Number(item.total_fare).toFixed(2)}</p>
                {/* <p className="font-bold">₹ {item.total_fare.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')}</p> */}
              </div>
              </div>
              {/* <div className="flex justify-between">
            <p>Status</p>
            <p>{item.payment_status}</p>
          </div> */}
            </div>
          </div>
        </div>
      ),
    }));

  // useEffect(() => {
  //   setSpinning(true);
  //   GetBlockedDetails(dispatch, setSpinning);
  // }, []);
  useEffect(() => {
    setSpinning(true);
    if(deviceid===0) {
      GetBlockedDetails(dispatch,setSpinning,deviceid)
    } else if (deviceid===1) {
      console.log("BookingTable deviceId:", deviceid);
      GetBlockedDetails(dispatch,setSpinning,deviceid);
    } else if (deviceid === 2) {
      console.log("BookingTable deviceId:", deviceid);
      GetBlockedDetails(dispatch,setSpinning,deviceid);
    }
  }, [deviceid]);

  const fetchGetBookingDetails = async () => {};

  useEffect(() => {
    // if (updatedata != null) {
    //   fetchGetBookingDetails();
    // }
  }, [updatedata]);

  return (
    <div>
      <div
        className={`h-[72.3vh] custom-table-container ${
          isRowExpanded ? "mb-[vh]" : ""
        } overflow-y-auto`}
      >
        {spinning ? (
          <div className="absolute top-[50vh] left-[50vw] flex justify-center items-center  z-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            // onChange={handleChange}
            pagination={false}
            locale={{ emptyText: "No Data Available" }}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record?.hidden_details}</p>
              ),
            }}
            // expandedRowRender={(record) => (
            //   <p style={{ margin: 0 }}>{record?.hidden_details}</p>
            // )}
            expandRowByClick={true}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowClassName={(row) =>
              row?.key === expandedRowKey ? "expanded-row" : ""
            }
            expandIcon={() => null}
            expandIconColumnIndex={-1}
            expandedRowKeys={expandedRowKey ? [expandedRowKey] : []}
          />
        )}
      </div>
      <div className={`${isRowExpanded ? "mb-[10vh]" : ""}`}>
        {getBlockedDetails?.length > 10 && (
          <div className=" mt-[1vw]  flex justify-between items-center ">
            <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
              <span>Showing</span>
              <span className="font-bold">
                {currentItems && currentItems?.length > 0 ? (
                  <div>
                    {indexOfFirstItem + 1} -{" "}
                    {indexOfFirstItem + currentItems?.length}
                  </div>
                ) : (
                  "0"
                )}
              </span>
              <span>from</span>
              <span className="font-bold">
                {" "}
                {getBlockedDetails?.length > 0 ? getBlockedDetails?.length : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={getBlockedDetails?.length}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                prevPageText={
                  <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                }
                nextPageText={
                  <FontAwesomeIcon icon={faChevronRight} size="1vw" />
                }
                firstPageText={
                  <FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />
                }
                lastPageText={
                  <FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />
                }
              />
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}
