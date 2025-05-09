import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationData,
  UnreadNotification,
} from "../../Api/Notification/Notification";
import {
  GetBookingDetails,
  GetBookingDetailsById,
  GetBookingDetailsByDate,
  handleBookingDetailsSearch,
  GetPassengerDetails,
  handlePassengerDetailsSearch,
} from "../../Api/Dashboard/Dashboard";
import {
  Table,
  Spin,
  Tooltip,
  Popover,
  ConfigProvider,
  DatePicker,
  Divider,
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
import bus from "../../asserts/umbuslogo.png";
import moment from "moment";
import {
  MdLocationOn,
  MdDateRange,
  MdOutlineAccessTime,
  MdOutlineEmail,
  MdOutlineWhatsapp,
} from "react-icons/md";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import dayjs from "dayjs";

export default function PassengerTable({
  activePage,
  setActivePage,
  deviceid,
}) {
  const [spinning, setSpinning] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [operatorData, setOperatorData] = useState();
  const [sortedData, setSortedData] = useState([]);
  const [sortOrderId, setSortOrderId] = useState(null);
  const [sortOrderDate, setSortOrderDate] = useState(null);

  const getPassengerDetails =
    useSelector((state) => state.crm.passenger_details) || [];
  console.log(getPassengerDetails, "passenger details dashboard");

  const handleIdSort = () => {
    let sorted = [...getPassengerDetails];
    console.log(
      sorted.map((s) => parseInt(s.tbs_passenger_id.slice(-4))),
      "sorted Ids"
    );
    if (sortOrderId === "ascend") {
      sorted.sort(
        (a, b) =>
          parseInt(b.tbs_passenger_id.slice(-4)) -
          parseInt(a.tbs_passenger_id.slice(-4))
      );
      setSortOrderId("descend");
    } else if (sortOrderId === "descend") {
      sorted = [...getPassengerDetails]; // Reset to original order
      setSortOrderId(null);
    } else {
      sorted.sort(
        (a, b) =>
          parseInt(a.tbs_passenger_id.slice(-4)) -
          parseInt(b.tbs_passenger_id.slice(-4))
      );
      setSortOrderId("ascend");
    }

    console.log(getPassengerDetails, "sort details");
    setSortedData(sorted);
  };

  const handleDateSort = () => {
    let sorted = [...getPassengerDetails];
    if (sortOrderDate === "ascend") {
      sorted.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setSortOrderDate("descend");
    } else if (sortOrderDate === "descend") {
      sorted = [...getPassengerDetails]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) => new Date(a.created_date) - new Date(b.created_date)
      );
      setSortOrderDate("ascend");
    }

    console.log(getPassengerDetails, "sort details");
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
  const dispatch = useDispatch();
  useEffect(() => {
    UnreadNotification(dispatch);
  }, []);

  useEffect(() => {
    // Function to prevent zoom on touch events
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Function to prevent double tap zoom
    const preventDoubleTapZoom = (e) => {
      e.preventDefault();
    };

    // Add event listeners for touchstart and double tap
    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("dblclick", preventDoubleTapZoom, {
      passive: false,
    });

    // Add event listener for wheel event to prevent zoom on Ctrl + scroll
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Add event listeners for gesture events on Safari
    const preventGestureZoom = (e) => {
      e.preventDefault();
    };
    document.addEventListener("gesturestart", preventGestureZoom);
    document.addEventListener("gesturechange", preventGestureZoom);
    document.addEventListener("gestureend", preventGestureZoom);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("dblclick", preventDoubleTapZoom);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", preventGestureZoom);
      document.removeEventListener("gesturechange", preventGestureZoom);
      document.removeEventListener("gestureend", preventGestureZoom);
    };
  }, []);
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(metaTag);

    // Disable pinch-to-zoom
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventZoom);
    };
  }, []);
  useEffect(() => {
    GetNotificationData(dispatch);
  }, []);
  // const [activePage, setActivePage] = useState(1);
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
  //   getPassengerDetails?.length > 0 &&
  //   getPassengerDetails?.slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems =
  //   sortedData.length > 0
  //     ? sortedData?.slice(indexOfFirstItem, indexOfLastItem)
  //     : getPassengerDetails?.slice(indexOfFirstItem, indexOfLastItem);
  //  console.log(currentItems.length, "lg");
  const currentItems =
    Array.isArray(sortedData) && sortedData.length > 0
      ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
      : Array.isArray(getPassengerDetails)
      ? getPassengerDetails.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);  // parse the full date string
  //   const options = { day: "2-digit", month: "short", year: "numeric" };
  //   return date.toLocaleDateString("en-GB", options);  // return as "24 Apr 2025"
  // };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  const formatDate2 = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
}


  const formatTime = (timeStr) => {
    const date = new Date(timeStr); // directly use the full datetime string
    const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // 12-hour format with AM/PM
    return date.toLocaleTimeString("en-US", options); // return as "03:50 PM"
  };

  // const formatDates = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const day = date.getDate();
  //   const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
  //   const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  //   return `${day < 10 ? '0' + day : day}-${month}-${year}`;
  // };
  //  const fromatted=(dateStr)=>{
  //    // Split the string into parts
  // let dateParts = dateStr.split(" ");

  // // Extract each part
  // let day = dateParts[0];
  // let month = dateParts[1];
  // let year = dateParts[2];
  // let time = dateParts[3];
  // let amPm = dateParts[4];

  // console.log("Day:", day);
  // console.log("Month:", month);
  // console.log("Year:", year);
  // console.log("Time:", time);
  // console.log("AM/PM:", amPm);
  //  }

  const formatTimes = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
    const formattedHour = parseInt(hour) % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
      width: "2vw",
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
          className="text-[1.2vw] text-center font-bold flex justify-evenly items-center"
          style={{ color: "white" }}
        >
          <p>Passenger ID</p>

          <button onClick={handleIdSort}>
            {sortOrderId === "ascend" ? (
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
            ) : sortOrderId === "descend" ? (
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
            ) : sortOrderId === null ? (
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
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row.key}
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
          Name
        </div>
      ),
      width: "12vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[2vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row.name ? (
              row?.name?.length >= 30 ? (
                <Tooltip
                  placement="top"
                  title={row?.name}
                  className="cursor-pointer"
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  {`${capitalizeFirstLetter(row?.name?.slice(0, 30))}...`}
                </Tooltip>
              ) : (
                <div>{capitalizeFirstLetter(row.name)}</div>
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
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] text-center font-bold"
    //       style={{ color: "white" }}
    //     >
    //       Operator Name
    //     </div>
    //   ),
    //   width: "9vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
    //         {row.operator_name.length > 15 ? (
    //           <Tooltip
    //             placement="right"
    //             title={row.operator_name}
    //             className="cursor-pointer text-[#1F487C]"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             <p>{`${row.operator_name.slice(0, 15)}...`}</p>
    //           </Tooltip>
    //         ) : (
    //           <p>{row.operator_name}</p>
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
          Mobile
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.mobile ? row.mobile : "-"}
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
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.email ? row.email : "-"}
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
    //       Age / DOB
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row.age ? row.age : "--"} / {formatDate(row.dob)}
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
    //       Gender
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row?.gender !== null
    //           ? row?.gender !== "null"
    //             ? capitalizeFirstLetter(row.gender)
    //             : "-"
    //           : "-"}
    //       </div>
    //     );
    //   },
    // },
    {
      title: (
        <div className="text-[1.1vw] font-bold  flex items-center justify-center">
          Created Date
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
      // sorter: (a, b) =>
      //   dayjs(a.created_date).valueOf() - dayjs(b.created_date).valueOf(),
      width: "8vw",
      render: (row) => {
        console.log(row?.created_date?.slice(0, -8), "Date111");
        // console.log(formatDate(row?.created_date)(formatTime(row?.created_date)), "Datesss");

        return (
          <div>
            {row.created_date ? (
              <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
                <p>
                  {row?.created_date.includes("/")
                    ? formatDate2(row?.created_date)
                    : formatDate(row?.created_date?.slice(0, -8))}
                </p>
              </div>
            ) : (
              <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
                <p className="text-[#1F4B7F]">-</p>
              </div>
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
          Occupation
        </div>
      ),
      width: "10vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[2.5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.occupation ? (
              row?.occupation?.length >= 25 ? (
                <Tooltip
                  placement="top"
                  title={row?.occupation}
                  className="cursor-pointer"
                  color="white"
                  overlayInnerStyle={{
                    color: "#1F487C",
                  }}
                >
                  {`${row?.occupation?.slice(0, 25)}...`}
                </Tooltip>
              ) : (
                <div>{row.occupation}</div>
              )
            ) : (
              <div className="">-</div>
            )}
          </div>
        );
      },
    },
    //     {
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
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] text-center font-bold"
    //       style={{ color: "white" }}
    //     >
    //       State
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row.state ? row.state : "-"}
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
    //       Referral Code
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
    //         {row.code ? (row?.code?.length >= 9 ? (
    //           <Tooltip
    //             placement="top"
    //             title={row?.code}
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             {`${row?.code?.slice(0, 9)}...`}
    //           </Tooltip>
    //         ) : (
    //           <div>{row.code}</div>
    //         )) : ("-")}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] flex justify-center"
    //       style={{ color: "white" }}
    //     >
    //       User Status
    //     </div>
    //   ),
    //   width: "7vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
    //         {row.user_status === null ? (
    //           <IoMdCloseCircleOutline className="text-red-600" />
    //         ) : row.user_status === "register" && (
    //           <IoMdCheckmarkCircleOutline className="text-green-600" />
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];
  const data =
    currentItems?.length > 0 &&
    currentItems?.map((item) => ({
      key: item.tbs_passenger_id,
      s_no: 1,
      email: item.email_id,
      mobile: item.mobile_number,
      name: item.user_name,
      code: item.referral_code,
      dob: item.date_of_birth,
      gender: item.gender,
      state: item.state,
      state_id: item.state_id,
      age: item.age,
      occupation_id: item.occupation_id,
      occupation: item.occupation,
      user_status: item.user_status,
      created_date: item.created_date,
    }));

  // useEffect(() => {
  //   setSpinning(true);
  //   GetPassengerDetails(dispatch, setSpinning);
  // }, []);
  useEffect(() => {
    setSpinning(true);
    if (deviceid === 1) {
      console.log("BookingTable deviceId:", deviceid);
      GetPassengerDetails(dispatch, setSpinning, deviceid);
    } else if (deviceid === 2) {
      console.log("BookingTable deviceId:", deviceid);
      GetPassengerDetails(dispatch, setSpinning, deviceid);
    } else if (deviceid === 0) {
      console.log("BookingTable deviceId:", deviceid);
      GetPassengerDetails(dispatch, setSpinning, deviceid);
    }
  }, [deviceid]);

  // const fetchGetBookingDetails = async () => {
  //   try {
  //     const data = await GetBookingDetailsById(
  //       updatedata,
  //       SetUpdateData,
  //       operatorData
  //     );
  //     setOperatorData(data);
  //     console.log(data, "Data operator");
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };
  // useEffect(() => {
  //   if (updatedata != null) {
  //     fetchGetBookingDetails();
  //   }
  // }, [updatedata]);

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
            pagination={false}
            locale={{ emptyText: "No Data Available" }}
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record?.hidden_details}</p>
            //   ),
            // }}
            // expandedRowRender={(record) => (
            //   <p style={{ margin: 0 }}>{record?.hidden_details}</p>
            // )}
            // expandRowByClick={true}
            // onRow={(record) => ({
            //   onClick: () => handleRowClick(record),
            // })}
            // rowClassName={(row) =>
            //   row?.key === expandedRowKey ? "expanded-row" : ""
            // }
            // expandIcon={() => null}
            // expandIconColumnIndex={-1}
            // expandedRowKeys={expandedRowKey ? [expandedRowKey] : []}
          />
        )}
      </div>
      <div className={`${isRowExpanded ? "mb-[10vh]" : ""}`}>
        {getPassengerDetails?.length > 10 && (
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
                {getPassengerDetails?.length > 0
                  ? getPassengerDetails?.length
                  : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={getPassengerDetails?.length}
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
    </div>
  );
}
