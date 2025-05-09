import { useEffect, useState } from "react";
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
import { FaDesktop, FaMobileAlt } from "react-icons/fa";

export default function BookingTable({ activePage, setActivePage, deviceid }) {
  const [spinning, setSpinning] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [operatorData, setOperatorData] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sortOrderDate, setSortOrderDate] = useState(null);
  const [sortOrderFare, setSortOrderFare] = useState(null);

  const getBookingDetails =
    useSelector((state) => state.crm.booking_details) || [];
  console.log(getBookingDetails, "booking details dashboard");

  useEffect(() => {
    setSpinning(true);
    if(deviceid === 0) {
      GetBookingDetails(dispatch, setSpinning, deviceid)
    } else if (deviceid === 1) {
      console.log("BookingTable deviceId:", deviceid);
      GetBookingDetails(dispatch, setSpinning, deviceid);
    } else if (deviceid === 2) {
      console.log("BookingTable deviceId:", deviceid);
      GetBookingDetails(dispatch, setSpinning, deviceid);
    }
  }, [deviceid]);

  const handleFareSort = (pagination, filters, sorter) => {
    // console.log(sorter,"sortersorter")
    // setSortedInfo(sorter);
    // console.log(sortedInfo,"sorted info")
    // const sorted = getBookingDetails.sort((a, b) => b.total_fare - a.total_fare);
    let sorted = [...getBookingDetails];
    console.log(sorted.total_fare, "sorted details");
    if (sortOrderFare === "ascend") {
      sorted.sort((a, b) => b.total_fare - a.total_fare);
      setSortOrderFare("descend");
    } else if (sortOrderFare === "descend") {
      sorted = [...getBookingDetails]; // Reset to original order
      setSortOrderFare(null);
    } else {
      sorted.sort((a, b) => a.total_fare - b.total_fare);
      setSortOrderFare("ascend");
    }

    console.log(getBookingDetails, "sort details");
    setSortedData(sorted);
  };

  const handleDateSort = () => {
    let sorted = [...getBookingDetails];
    console.log(
      sorted.map((sort) => sort.booking_date_time.slice(0, 13)),
      "sorted data from um"
    );
    if (sortOrderDate === "ascend") {
      sorted.sort(
        (a, b) =>
          new Date(b.booking_date_time.slice(0, 13)) -
          new Date(a.booking_date_time.slice(0, 13))
      );
      setSortOrderDate("descend");
    } else if (sortOrderDate === "descend") {
      sorted = [...getBookingDetails]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.booking_date_time.slice(0, 13)) -
          new Date(b.booking_date_time.slice(0, 13))
      );
      setSortOrderDate("ascend");
    }

    console.log(getBookingDetails, "sort details");
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
    {
      title: "Email",
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

  const reportId = "f8b29529-d035-4c97-ad20-b2d85cfe1151";
  const height = "500px";
  const width = "100%";
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19";
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNjIwNjI1NywibmJmIjoxNzI2MjA2MjU3LCJleHAiOjE3MjYyMTAxNTcsImFpbyI6IkUyZGdZQkIydnRtVW1MWHBuQVAzQzVHbktVd25BQT09IiwiYXBwaWQiOiI1ZGJkODFiZC0yNGMyLTQwYmMtYmVlNi1iZjBlMzQ1Mjk0OTEiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI1ZTNiMTE4Ny0yOGFjLTRiOWMtYThkZC03MmE0YmY2NzQ1NDMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUFBLiIsInN1YiI6IjVlM2IxMTg3LTI4YWMtNGI5Yy1hOGRkLTcyYTRiZjY3NDU0MyIsInRpZCI6IjA3YmIzOWVkLTljOTAtNGY0Zi04ZWE3LWRhZTVhYjUwMDZkNCIsInV0aSI6Ikw1UzVIX09VTjB5X0pCYlY5TE1nQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDI2In0.Ofc3nHFtY_dc0RpyVUQ90a7jXdkxOvQMMllVaOLiyCzhYqNA5gs2zN-XfLSppEcpbt424f_qO6RNRzdRPjYGl4tQuiWAvJ5Chs_34HzQ_-MKhkgYfYBPCFjNDRY8ZnAc1_DaF-0oeS4xJew3L2ML_bO87bVtv6Epp9-ihSo2eOdECojyV7MWd9CKCxCW0DN4UbfIjMj6ZrR_wgmgk6UBZFT-KJ4sIyo-08Q6iCJ0kPaxavm1CdSsHRfj2jQyVgch7BIFdciyv2dkD3Ed1xAwNtUsfCHr2zrN5GZri9J8zUwp9fe803-1uBFk324l4vbRwOXhSQIYpPe-4wmJU2_BJg";
  //-------------------------------------
  const Search = (e) => {
    handleBookingDetailsSearch(e, dispatch);
  };
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
  //   sortedData.length > 0
  //     ? sortedData?.slice(indexOfFirstItem, indexOfLastItem)
  //     : getBookingDetails?.slice(indexOfFirstItem, indexOfLastItem);

      const currentItems =
      Array.isArray(sortedData) && sortedData.length > 0
        ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
        : Array.isArray(getBookingDetails)
          ? getBookingDetails.slice(indexOfFirstItem, indexOfLastItem)
          : [];
  console.log(currentItems, "leeeeeength");
  const { RangePicker } = DatePicker;
  // date picker
  const changeDatePickerPlaceholder = () => {
    const inputDiv = document.querySelector(".ant-picker-input");
    if (inputDiv) {
      const inputElement = inputDiv.querySelector("input");
      if (inputElement) {
        inputElement.placeholder = "Start Date";
      }
    }
  };
  changeDatePickerPlaceholder();

  const changeDatePickerPlaceholder2 = () => {
    const inputDiv = document.querySelector(".ant-picker");
    if (inputDiv) {
      const children = inputDiv.querySelectorAll("div");
      if (children.length > 2) {
        const thirdChild = children[2];
        const inputElement = thirdChild.querySelector("input");
        if (inputElement) {
          inputElement.placeholder = "End Date";
        }
      }
    }
  };
  changeDatePickerPlaceholder2();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatTime = (timeStr) => {
    console.log(timeStr, "timetimetime");
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
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Ticket Number
        </div>
      ),
      width: "6vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw] font-bold">
            {row?.ticket_no?.length > 12 ? (
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
      width: "6vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw] font-bold">
            {row?.pnr_no?.length >= 10 ? (
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
          Operator Name
        </div>
      ),
      width: "10vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw] font-bold">
            {row.operator_name.length > 15 ? (
              <Tooltip
                placement="top"
                title={row.operator_name}
                className="cursor-pointer text-[#1F487C]"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <p>{`${row.operator_name.slice(0, 15)}...`}</p>
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
          <div className="flex justify-center text-[#1F4B7F] text-center text-[1vw] py-[0.5vw]">
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
      width: "4vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[2vw] text-[#1F4B7F] text-center  text-[1vw] py-[0.5vw]">
            {row?.email?.length >= 25 ? (
              <Tooltip
                placement="top"
                title={row?.email}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                {`${row?.email?.slice(0, 25)}...`}
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
        <div className="text-[1.2vw] text-center font-bold text-white flex items-center justify-evenly">
          <Tooltip
            placement="top"
            title="Booking Date / Time"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            Booking D / T
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
      width: "10vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[0.5vw] text-[#1F4B7F] text-center text-[1vw] py-[0.5vw]">
            {/* {`${(row.booking_date_time.slice(0, 13))} (${(row.booking_date_time.slice(15,23))})`} */}
            {`${formatDate(
              row.booking_date_time.split(",")[0].trim()
            )} (${row.booking_date_time.split(",")[1].trim()})`}
            {console.log(row.booking_date_time, "booking date")}
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
              <IoMdCheckmarkCircleOutline className="text-green-600 text-center" />
            ) : row.email_service === "No" ? (
              <IoMdCloseCircleOutline className="text-red-600 text-center" />
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
              <IoMdCheckmarkCircleOutline className="text-green-600 text-center" />
            ) : row.whatsapp_service === "No" ? (
              <IoMdCloseCircleOutline className="text-red-600 text-center" />
            ) : (
              "-"
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
      width: "9vw",
      render: (row, rowdta, index) => {
        return (
          <div className="grid grid-cols-3  space-x-2  text-[#1F4B7F]  text-[1vw] py-[0.5vw] font-bold">
            <p className=" ml-[1vw]  col-span-2 ">
              ₹{" "}
              {row?.total_fare % 1 === 0
                ? row.total_fare
                    .replace(/(\.\d*?[1-9])0+$/, "$1")
                    .replace(/\.0+$/, "")
                : row.total_fare}
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
          </div>
        );
      },
    },
  ];
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
      device_id: item.device_id,
      device_type: item.device_type,
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
                    <p>{formatDate(item.depature_date.slice(0, 10))}</p>
                    {console.log(
                      item.depature_date.slice(0, 10),
                      "dateeeeeeeee"
                    )}
                  </div>
                  <div className="flex items-center gap-[0.25vw] text-[1vw]">
                    <MdOutlineAccessTime />
                    <p>
                      {item.depature_time === null
                        ? "-"
                        : formatTime(item.depature_time)}
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
                    <p>{formatTime(item.arraival_time)}</p>
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
                        <p>{pass.Seat_Num}</p>
                      ))}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => (
                        <p>{pass.Passenger_Name}</p>
                      ))}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => <p>{pass.Age}</p>)}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details === null
                    ? "-"
                    : item.passenger_details.map((pass) => (
                        <p>{pass.GENDER_TYPE}</p>
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
                  <p>₹ {Number(item.base_fare).toFixed(2)}</p>
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

                <div
                  className={`flex justify-between px-[1vw] ${
                    item.discount_amt ? "" : "pb-3"
                  }`}
                >
                  <p className="font-semibold">GST</p>
                  <p>₹ {Number(item.gst).toFixed(2)}</p>
                </div>

                {item.discount_amt ? (
                  <div className="flex justify-between px-[1vw] pb-3">
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
              <div>
                <div className="flex justify-between flex-row w-full bg-[#1F487C] text-white rounded-b-md  p-2 px-[1vw]">
                  <p className="font-bold ml-1">Total Fare</p>
                  <p>₹ {Number(item.total_fare).toFixed(2)}</p>
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
  //   GetBookingDetails(dispatch, setSpinning);
  // }, []);

  const fetchGetBookingDetails = async () => {
    try {
      const data = await GetBookingDetailsById(
        updatedata,
        SetUpdateData,
        operatorData
      );
      setOperatorData(data);
      console.log(data, "Data operator");
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  useEffect(() => {
    if (updatedata != null) {
      fetchGetBookingDetails();
    }
  }, [updatedata]);

  const [dateClear, setDateClear] = useState();
  const datefilter = async (values) => {
    try {
      setDateClear(values);
      console.log(values, "date values");
      await GetBookingDetailsByDate(
        dispatch,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD")
      );
      setActivePage(1);
    } catch (err) {
      console.log(err, "error");
      GetBookingDetails(dispatch, setSpinning);
    }
  };
  const handleKeyDown = (e) => {
    // Allow control keys like Backspace, Delete, ArrowLeft, ArrowRight, Tab
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(e.key);

    if (isControlKey) {
      return; // If it's a control key, do nothing and allow it to execute
    }

    // Allow only alphabets (A-Z, a-z), numbers (0-9), and space
    if (!/^[A-Za-z0-9\s]$/.test(e.key)) {
      e.preventDefault(); // Prevent the key if it's not an alphabet, number, or space
    }
  };
  return (
    <div>
      {/* <div
      className={`h-screen w-screen pl-[2.5vw] pr-[2.5vw]`}
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[3vw]">Dashboard</h1>
      <div className="h-[85vh] w-[100%] rounded-[2vw] relative">
      <div className=" absolute w-[87.8vw] h-[85vw] top-[0.1vw] pr-[2vw]">
      <h1>hello</h1>
      <PowerBi />
      <PowerBIReport embedUrl={embedUrl} accessToken={accessToken} />

      <NewPowerbi embedUrl={embedUrl} accessToken={accessToken} />
      <PowerBIReport
              embedUrl={embedUrl}
              accessToken={accessToken}
              reportId={reportId}
              height={height}
              width={width}
            />
      </div>
      <div className="bg-[#99a1ac] h-[70vh] w-[15%] absolute left-[-6vw] top-[3.5vw] rounded-[2vw]"></div>
      </div>
      <div className="flex justify-between items-center ">
          <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
            BOOKINGS DETAILS
          </h1>
          <div className=' w-[4vw] h-[4vw] bg-teal-500 rounded-full order-last'></div>
        </div>
        <div className="flex justify-between">
          <div className="relative flex items-center pb-[0.5vw]">
            <LiaSearchSolid
              className="absolute left-[0.5vw] inline-block  pb-[.1vw]"
              size={"1.1vw"}
              color="#9CA3AF"
            />
            <input
              type="text"
              className="bg-white outline-none pl-[2vw] w-[17vw] text-[#1f487c] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]"
              placeholder="Search..."
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                Search(e);
              }}
            />
            <span className="inline-block cursor-pointer text-[#1F4B7F] text-[1vw] align-text-bottom absolute right-[1vw]">
              {" "}
              <Popover
                color="white"
                title={
                  <div className=" text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto ">
                    <span className="font-bold">SEARCH BY...</span>
                    {infos.map((info, index) => (
                      <div key={index} className="flex flex-col">
                        <ul
                          className="pl-[1vw]"
                          style={{ listStyleType: "disc" }}
                        >
                          <li className="text-[0.8vw] ">
                            <p className="">{info.title}</p>
                          </li>
                        </ul>
                        <span className="text-[.7vw] pl-[1vw] text-[#9CA3AF]">
                          {info.description}
                        </span>
                      </div>
                    ))}
                  </div>
                }
                placement="bottom"
              >
                <BsExclamationCircle size={"1vw"} color="#9CA3AF" />
              </Popover>
            </span>
          </div>
          <div className="order-last">
            <div className="reqman">
              <ConfigProvider
                theme={{
                  token: {
                    fontSize: ".9vw",
                    lineHeight: 0,
                    colorPrimary: "#1F487C",
                  },
                  components: {
                    DatePicker: {
                      activeBorderColor: "#1F487C",
                      hoverBorderColor: "#1F487C",
                      activeShadow: "#1F487C",
                      cellWidth: 25,
                      cellHeight: 20,
                    },
                  },
                }}
              >
                <RangePicker
                  allowClear={true}
                  autoFocus={false}
                  onChange={datefilter}
                  value={dateClear}
                  className="ads-date1 border-r-[0.75vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C]
                        text-[#1F487C] text-[0.8vw] h-[5vh] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder-[#1F487C]"
                />
              </ConfigProvider>
            </div>
          </div>
        </div> */}
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
        {getBookingDetails?.length > 10 && (
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
                {getBookingDetails?.length > 0 ? getBookingDetails?.length : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={getBookingDetails?.length}
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
