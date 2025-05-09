import { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
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
  MdPerson,
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
import pay from "./pay.json";
import { GetPaymentDetails } from "../../Api/Payments/Payments";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { capitalizeFirstLetter } from "../Common/Captilization";
import cardChip from "../../asserts/cardChip.png";
import { ReactComponent as Upi } from "../../asserts/UPI-Color.svg";
import { TbWorldWww } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { BsCircleHalf } from "react-icons/bs";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export default function PaymentTable({ activePage, setActivePage }) {
  const [spinning, setSpinning] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [operatorData, setOperatorData] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sortOrderDate, setSortOrderDate] = useState(null);
  const [sortOrderFare, setSortOrderFare] = useState(null);
  const [count, setCount] = useState(10);
  const [skip, setSkip] = useState(0);
  const [goToPage, setGoToPage] = useState(0);

  const getBookingDetails =
    useSelector((state) => state.crm.booking_details) || [];
  console.log(getBookingDetails, "booking details dashboard");

  const getPaymentDetails = useSelector((state) => state.crm.payment_details);
  console.log(getPaymentDetails, "payment details dashboard");

  const handleFareSort = (pagination, filters, sorter) => {
    // console.log(sorter,"sortersorter")
    // setSortedInfo(sorter);
    // console.log(sortedInfo,"sorted info")
    // const sorted = getPaymentDetails.sort((a, b) => b.total_fare - a.total_fare);
    let sorted = [...getPaymentDetails];
    console.log(sorted.amount_refunded, "sorted details");
    if (sortOrderFare === "ascend") {
      sorted.sort((a, b) => b.amount_refunded - a.amount_refunded);
      setSortOrderFare("descend");
    } else if (sortOrderFare === "descend") {
      sorted = [...getPaymentDetails]; // Reset to original order
      setSortOrderFare(null);
    } else {
      sorted.sort((a, b) => a.amount_refunded - b.amount_refunded);
      setSortOrderFare("ascend");
    }

    console.log(getPaymentDetails, "sort details");
    setSortedData(sorted);
  };

  const handleDateSort = () => {
    let sorted = [...getPaymentDetails];
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
      sorted = [...getPaymentDetails]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.booking_date_time.slice(0, 13)) -
          new Date(b.booking_date_time.slice(0, 13))
      );
      setSortOrderDate("ascend");
    }

    console.log(getPaymentDetails, "sort details");
    setSortedData(sorted);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
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

  //-------------------------------------
  const Search = (e) => {
    handleBookingDetailsSearch(e, dispatch);
  };
  // const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  // const handlePageChange = (pageNumber) => {
  //   setActivePage(pageNumber);
  //   console.log(activePage, "active page");
  //   console.log(itemsPerPage, "page items");
  //   setIsRowExpanded(false);
  //   // SetUpdateData(null);
  //   setExpandedRowKey(null);
  // };
  const handlePageChange = (pageNumber) => {
    const page = parseInt(pageNumber);
    setGoToPage(page);
  };
  const handleGoToPage = () => {
    const goToSkip = goToPage * 10;
    console.log(goToPage, goToSkip, "go to page");
    setSkip(goToSkip);
    setSpinning(true);
    GetPaymentDetails(count, goToSkip, dispatch, setSpinning);
    setActivePage(goToPage);
    setIsRowExpanded(false);
    setExpandedRowKey(null);
    console.log(
      count,
      goToSkip,
      activePage,
      goToPage,
      "pagination check handleGoToPage"
    );
    setGoToPage(0);
  };
  // Calculate pagination slice based on activePage
  // const indexOfLastItem = activePage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.length > 0 ? sortedData : getPaymentDetails;
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
    const date = new Date(dateStr * 1000);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate.replace(",", "");
  };

  const formatTime = (timeStr) => {
    console.log(timeStr, "timetimetime");
    const [hours, minutes, seconds] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);

    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  const formatNetBank = (value) => {
    const banks = [
      { bankName: "Allahabad Bank", bankCode: "ALLA" },
      { bankName: "AU Small Finance Bank", bankCode: "AUBL" },
      { bankName: "Bank of Baroda (Retail)", bankCode: "BARB_R" },
      {
        bankName: "Bandhan Bank Limited (except Mutual Fund and Insurance)",
        bankCode: "BDBL",
      },
      { bankName: "Bank of India", bankCode: "BKID" },
      { bankName: "Bank of India (Corporate)", bankCode: "BKID_C" },
      { bankName: "Central Bank of India", bankCode: "CBIN" },
      { bankName: "City Union Bank", bankCode: "CIUB" },
      { bankName: "Canara Bank", bankCode: "CNRB" },
      { bankName: "Corporation Bank", bankCode: "CORP" },
      { bankName: "Catholic Syrian Bank", bankCode: "CSBK" },
      { bankName: "Development Bank of Singapore", bankCode: "DBSS" },
      { bankName: "DCB Bank", bankCode: "DCBL" },
      { bankName: "Deutsche Bank", bankCode: "DEUT" },
      { bankName: "Dhanlaxmi Bank", bankCode: "DLXB" },
      { bankName: "Equitas Small Finance Bank", bankCode: "ESFB" },
      { bankName: "Federal Bank", bankCode: "FDRL" },
      { bankName: "HDFC Bank", bankCode: "HDFC" },
      { bankName: "IDBI Bank", bankCode: "IBKL" },
      { bankName: "ICICI Bank", bankCode: "ICIC" },
      { bankName: "IDFC FIRST BANK", bankCode: "IDFB" },
      { bankName: "Indian Bank", bankCode: "IDIB" },
      { bankName: "Indusind Bank", bankCode: "INDB" },
      { bankName: "Indian Overseas Bank", bankCode: "IOBA" },
      { bankName: "Jammu and Kashmir Bank", bankCode: "JAKA" },
      { bankName: "Jana Small Finance Bank", bankCode: "JSFB" },
      { bankName: "Karnataka Bank", bankCode: "KARB" },
      { bankName: "Kotak Bank", bankCode: "KKBK" },
      { bankName: "Karur Vysya Bank", bankCode: "KVBL" },
      { bankName: "Lakshmi Vilas Bank (Retail)", bankCode: "LAVB_R" },
      { bankName: "Bank Of Maharashtra", bankCode: "MAHB" },
      { bankName: "Punjab National Bank (Retail)", bankCode: "PUNB_R" },
      { bankName: "RBL Bank", bankCode: "RATN" },
      { bankName: "State Bank of India", bankCode: "SBIN" },
      { bankName: "Standard Chartered", bankCode: "SCBL" },
      { bankName: "South Indian Bank", bankCode: "SIBL" },
      { bankName: "Saraswat Co-operative Bank", bankCode: "SRCB" },
      { bankName: "Shamrao Vithal Co.Operative Bank", bankCode: "SVCB" },
      { bankName: "Tamilnadu Mercantile Bank", bankCode: "TMBL" },
      { bankName: "Union Bank of India", bankCode: "UBIN" },
      { bankName: "UCO Bank", bankCode: "UCBA" },
      { bankName: "Ujjivan Bank", bankCode: "UJVN" },
      { bankName: "Axis Bank", bankCode: "UTIB" },
      { bankName: "Yes Bank", bankCode: "YESB" },
    ];
    const bank = banks.find((b) => b.bankCode === value);
    return bank ? bank.bankName : value;
  };
  const formatCardBank = (value) => {
    const banks = [
      {"bankName": "ICICI Bank", "bankCode": "ICIC"},
      {"bankName": "HDFC Bank", "bankCode": "HDFC"},
      {"bankName": "Axis Bank", "bankCode": "UTIB"},
      {"bankName": "State Bank of India", "bankCode": "SBIN"},
      {"bankName": "Hongkong & Shanghai Banking Corporation", "bankCode": "HSBC"},
      {"bankName": "Allahabad Bank", "bankCode": "ALLA"},
      {"bankName": "Andhra Bank", "bankCode": "ANDB"},
      {"bankName": "AU Small Finance Bank", "bankCode": "AUBL"},
      {"bankName": "Bank of Baroda", "bankCode": "BARB"},
      {"bankName": "Bank of India", "bankCode": "BKID"},
      {"bankName": "Bank of Maharashtra", "bankCode": "MAHB"},
      {"bankName": "Canara Bank", "bankCode": "CNRB"},
      {"bankName": "CITI Bank", "bankCode": "CITI"},
      {"bankName": "City Union Bank", "bankCode": "CIUB"},
      {"bankName": "Corporation Bank", "bankCode": "CORP"},
      {"bankName": "DCB Bank", "bankCode": "DCBL"},
      {"bankName": "Dena Bank", "bankCode": "BKDN"},
      {"bankName": "Equitas Small Finance Bank", "bankCode": "ESFB"},
      {"bankName": "Federal Bank", "bankCode": "FDRL"},
      {"bankName": "IDBI", "bankCode": "IBKL"},
      {"bankName": "IDFC FIRST Bank", "bankCode": "IDFB"},
      {"bankName": "Indian Bank", "bankCode": "IDIB"},
      {"bankName": "Indian Overseas Bank", "bankCode": "IOBA"},
      {"bankName": "Indusind Bank", "bankCode": "INDB"},
      {"bankName": "Jupiter", "bankCode": "Fintechs"},
      {"bankName": "Karnataka Bank", "bankCode": "KARB"},
      {"bankName": "Karur Vysya Bank", "bankCode": "KVBL"},
      {"bankName": "Kotak Mahindra Bank", "bankCode": "KKBK"},
      {"bankName": "Niyo Global Cards", "bankCode": "Fintechs"},
      {"bankName": "One Card", "bankCode": "Fintechs"},
      {"bankName": "Punjab National Bank", "bankCode": "PUNB"},
      {"bankName": "RazorpayX Corporate Cards", "bankCode": "Fintechs"},
      {"bankName": "RBL Bank", "bankCode": "RATN"},
      {"bankName": "SBM Bank", "bankCode": "STCB"},
      {"bankName": "Slice", "bankCode": "Fintechs"},
      {"bankName": "South Indian Bank", "bankCode": "SIBL"},
      {"bankName": "Standard Chartered Bank", "bankCode": "SCBL"},
      {"bankName": "State Bank of Mysore", "bankCode": "SBMY"},
      {"bankName": "Syndicate Bank", "bankCode": "SYNB"},
      {"bankName": "Union Bank of India", "bankCode": "UBIN"},
      {"bankName": "Vijaya Bank", "bankCode": "VIJB"},
      {"bankName": "Yes Bank", "bankCode": "YESB"}
    ]
    const bank = banks.find((b) => b.bankCode === value);
    return bank ? bank.bankName : value;
  }
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
          Order ID
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row?.order_id?.length > 12 ? (
              <Tooltip
                placement="top"
                title={row?.order_id}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                {`${row?.order_id?.slice(0, 12)}...`}
              </Tooltip>
            ) : (
              <div>{row.order_id}</div>
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
          Payment ID
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1.5vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row?.pay_id?.length >= 10 ? (
              <Tooltip
                placement="top"
                title={row?.pay_id}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                {`${row?.pay_id?.slice(0, 10)}...`}
              </Tooltip>
            ) : (
              <div>{row.pay_id}</div>
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
    //   width: "10vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="ml-[1vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
    //         {row.operator_name.length > 15 ? (
    //           <Tooltip
    //             placement="top"
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
            {row.mobile.slice(3, 13)}
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
          <div className="ml-[2vw] text-[#1F4B7F] text-[1vw] py-[0.5vw]">
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
          {/* <Tooltip
            placement="top"
            title="Booking Date / Time"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          > */}
          Created
          {/* </Tooltip> */}
          {/* <button onClick={handleDateSort}>
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
          </button> */}
        </div>
      ),
      key: "created_at",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[1vw] text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {/* {`${(row.booking_date_time.slice(0, 13))} (${(row.booking_date_time.slice(15,23))})`} */}
            {formatDate(row.date)}
            {console.log(row.date, "booking date")}
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
            title="Amount Status"
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
            {row.amount_status === "null" ? (
              "-"
            ) : row.amount_status === "captured" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.amount_status === "failed" ? (
              <IoMdCloseCircleOutline className="text-red-600" />
            ) : row.amount_status === "refunded" ? (
              <RiRefund2Line className="text-blue-600" />
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
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Fare
        </div>
      ),
      width: "7vw",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[2vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            ₹ {row.amount / 100}
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
          Credit
        </div>
      ),
      width: "7vw",
      key: "credit",
      sorter: (a, b) => ((a.amount - a.fee - a.tax) - (b.amount - b.fee - b.tax)),
      sortOrder: sortedInfo.columnKey === "credit" && sortedInfo.order,
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[2vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            ₹ {((row.amount - row.fee - row.tax) / 100).toFixed(2)}
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
            title="Refund Status"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            <BsArrowCounterclockwise />
          </Tooltip>
        </div>
      ),
      width: "3vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
            {row.refund_status === null ? (
              <IoMdCloseCircleOutline className="text-red-600" />
            ) : row.refund_status === "full" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.refund_status === "partial" ? (
              <BsCircleHalf className="text-blue-600" />
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
          className="text-[1.2vw] text-center font-bold flex justify-evenly items-center"
          style={{ color: "white" }}
        >
          <p>Refund</p>
          {/* <button onClick={handleFareSort}>
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
          </button> */}
        </div>
      ),
      key: "refund_amt",
      sorter: (a, b) => a.refund_amt - b.refund_amt,
      sortOrder: sortedInfo.columnKey === "refund_amt" && sortedInfo.order,
      width: "9vw",
      render: (row, rowdta, index) => {
        return (
          <div className="grid grid-cols-4 text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            <p className="col-span-3 ml-[2vw]">
              ₹ {row.refund_amt / 100}
              {/* {row?.refund_amt.endsWith("0")
                ? row.refund_amt
                    .replace(/(\.\d*?[1-9])0+$/, "$1")
                    .replace(/\.0+$/, "")
                : row.refund_amt} */}
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
      order_id: item.order_id,
      pay_id: item.id,
      email: item.email,
      mobile: item.contact,
      date: item.created_at,
      amount: item.amount,
      refund_amt: item.amount_refunded,
      amount_status: item.status,
      refund_status: item.refund_status,
      tax: item.tax,
      fee: item.fee,
      hidden_details: (
        <div className="grid grid-cols-3">
          {/* <div className=" col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center">
            <div className="border-[0.1vw] border-[#1F487C] w-[15vw] rounded-[0.5vw] relative">
              <RiMoneyRupeeCircleFill className="absolute text-[4vw] left-[37%] text-[#1F487C] opacity-25"/>
              <p className="text-[2.5vw] text-[#1F487C] font-bold flex justify-center">{item.method.toUpperCase()}</p>
            </div>
          </div> */}

          {item.method === "card" ? (
            <div className=" col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center py-[0.5vw]">
              <div className="border-[0.1vw] border-[#1F487C] w-[15vw] rounded-[0.5vw] bg-white">
                <div className="flex justify-between px-[1vw] py-[0.25vw]">
                  <p className="font-bold">{formatCardBank(item.card.issuer)}</p>
                  <p>{capitalizeFirstLetter(item.card.type)} Card</p>
                </div>
                <div className="px-[1vw] py-[0.25vw] flex justify-between items-center ">
                  <p>**** **** **** {item.card.last4}</p>
                  <img src={cardChip} className="w-[2vw]" />
                </div>
                <p className="bg-[#1F487C] rounded-b-[0.5vw] text-white flex justify-end px-[1vw] py-[0.25vw] font-bold">
                  {item.card.network}
                </p>
              </div>
            </div>
          ) : item.method === "upi" ? (
            <div className=" col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center py-[0.5vw]">
              <div className="border-[0.1vw] border-[#1F487C] min-w-[15vw] rounded-[0.5vw] bg-white">
                <div className="flex justify-between px-[1vw] py-[0.5vw] ">
                  <Upi className="w-[5vw]" />
                </div>
                <p className="bg-[#1F487C] rounded-b-[0.5vw] text-white flex justify-end px-[1vw] py-[0.25vw] font-bold">
                  {item.upi.vpa === "" || item.upi.vpa === null
                    ? "-"
                    : `${item.upi.vpa}`}
                </p>
              </div>
            </div>
          ) : item.method === "netbanking" ? (
            <div className=" col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center py-[0.5vw]">
              <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] bg-white">
                <div className="flex items-center gap-[0.25vw] px-[1vw] py-[0.25vw] text-[#1F487C]">
                  <TbWorldWww className="text-[1.5vw]" />
                  <p className="text-[1.5vw]">Internet Banking</p>
                </div>
                <p className="bg-[#1F487C] rounded-b-[0.5vw] text-white flex justify-end px-[1vw] py-[0.25vw] font-bold">
                  {item.bank ? `${formatNetBank(item.bank)}` : "-"}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* <div className="col-span-2 border-r-[0.1vw] border-[#1F487C] flex items-center justify-center py-[0.5vw]">
            <div className="bg-[#1F487C] rounded-[0.5vw]">
              <div className="grid grid-cols-2 border-b-[0.1vw] border-white py-[0.75vw] ">
                <span className="text-white font-semibold text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  {item.upi ? "VPA" : "Card ID"}
                  {item.upi ? "VPA" : "Card Last 4 Digits"}
                </span>
                <span className="text-white font-semibold text-[1vw] w-full text-center border-white px-[0.5vw]">
                  {item.upi ? "Account Type" : "Card Type"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-[1.5vw] justify-items-center py-[0.25vw]">
                <span className="text-white font-normal text-[1vw] px-[1vw]">
                  {item.upi ? `${item.upi.vpa}` : `${item.card.id}`}
                  {item.upi ? `${item.upi.vpa}` : `${item.card.last4}`}
                </span>
                <span className="text-white font-normal text-[1vw] px-[1vw]">
                  {item.upi
                    ? `${item.upi.payer_account_type}`
                    : `${item.card.issuer} - (${
                        item.card.network
                      } / ${capitalizeFirstLetter(item.card.type)})`}
                </span>
              </div>
            </div>
          </div> */}

          <div className="col-span-1 flex items-center justify-center py-[0.5vw] text-[0.9vw]">
            <div className="border-2 border-dotted border-zinc-800 rounded-[0.5vw] px-[1vw] py-[0.5vw] w-[15vw]">
              {/* <div className="flex justify-between">
                <p className="font-semibold">Amount</p>
                <p>₹ {item.amount}</p>
              </div> */}
              <div className="flex justify-between">
                <p className="font-semibold">Fare amount</p>
                <p>₹ {item.amount / 100}</p>
              </div>
              <div className="flex justify-between ">
                <p className="font-semibold">Fee</p>
                <p>- ₹ {item.fee / 100}</p>
                {/* <p>- ₹ {item?.tbs_deal_amount.endsWith('0') ? item.tbs_deal_amount.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : item.tbs_deal_amount}</p> */}
              </div>

              <div className="flex justify-between">
                <p className="font-semibold">Tax</p>
                <p>- ₹ {item.tax / 100}</p>
                {/* <p>- ₹ {item?.discount_amt.endsWith('0') ? item.discount_amt.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : item.discount_amt}</p> */}
              </div>

              <div className="flex justify-between border-t-[0.1vw] border-zinc-800 text-[#1F487C]">
                <p className="font-bold">Credit Amount</p>
                <p className="font-bold">
                  ₹ {((item.amount - item.fee - item.tax) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    }));

  useEffect(() => {
    setSpinning(true);
    GetPaymentDetails(10, 0, dispatch, setSpinning);
  }, []);
  console.log(spinning, "spinning");

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
            onChange={handleChange}
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
        {/* {getPaymentDetails?.length > 10 && ( */}
        <div className=" mt-[0.5vw]  flex justify-between items-center ">
          <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
            <span>Showing</span>
            <span className="font-bold">
              {currentItems && currentItems?.length > 0 ? (
                <div>
                  {skip + 1} - {skip + currentItems?.length}
                </div>
              ) : (
                "0"
              )}
            </span>
            {/* <span>from</span> */}
            {/* <span className="font-bold"> */}
            {/* {getPaymentDetails?.length > 0 ? getPaymentDetails?.length : 0} */}
            {/* 100 */}
            {/* </span> */}
            {/* <span>data</span> */}
          </div>
          <div className="flex gap-[0.5vw]">
            <div className="flex">
              <FontAwesomeIcon
                className={`border-[0.1vw] border-[#1f4b7f] py-[0.5vw] px-[1vw] text-[#1f4b7f] bg-white rounded-[0.25vw] ${
                  activePage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (skip >= 10) {
                    const minSkip = 0;
                    setSkip(minSkip);
                    setSpinning(true);
                    GetPaymentDetails(count, minSkip, dispatch, setSpinning);
                    setActivePage(1);
                    setIsRowExpanded(false);
                    setExpandedRowKey(null);
                    console.log(count, minSkip, activePage, "pagination check");
                  } else {
                    console.log(
                      count,
                      skip,
                      "pagination check exceeded the limit"
                    );
                  }
                }}
                icon={faAngleDoubleLeft}
                size="1vw"
              />
              <FontAwesomeIcon
                className="border-[0.1vw] border-[#1f4b7f] p-[0.5vw] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw] cursor-pointer"
                onClick={() => {
                  if (skip) {
                    const oldSkip = skip - 10;
                    setSkip(oldSkip);
                    setSpinning(true);
                    GetPaymentDetails(count, oldSkip, dispatch, setSpinning);
                    setActivePage(activePage - 1);
                    setIsRowExpanded(false);
                    setExpandedRowKey(null);
                    console.log(count, oldSkip, activePage, "pagination check");
                  } else {
                    console.log(
                      count,
                      skip,
                      "pagination check exceeded the limit"
                    );
                  }
                }}
                icon={faChevronLeft}
                size="1vw"
              />
              <p
                className={`flex items-center border-[0.1vw] border-[#1f4b7f] px-[0.75vw] rounded-[0.25vw] bg-white text-[#1f4b7f]`}
              >
                {activePage}
              </p>
              {/* <p className="flex items-center border-[0.1vw] border-[#1f4b7f] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw]">
                {activePage + 1}
              </p>
              <p className="flex items-center border-[0.1vw] border-[#1f4b7f] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw]">
                {activePage + 2}
              </p>
              <p className="flex items-center border-[0.1vw] border-[#1f4b7f] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw]">
                {activePage + 3}
              </p>
              <p className="flex items-center border-[0.1vw] border-[#1f4b7f] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw]">
                {activePage + 4}
              </p> */}

              <FontAwesomeIcon
                className={`border-[0.1vw] border-[#1f4b7f] py-[0.5vw] px-[0.75vw] text-[#1f4b7f] bg-white rounded-[0.25vw] cursor-pointer ${
                  activePage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (currentItems.length >= 10) {
                    const newSkip = skip + 10;
                    setSkip(newSkip);
                    setSpinning(true);
                    GetPaymentDetails(count, newSkip, dispatch, setSpinning);
                    setActivePage(activePage + 1);
                    setIsRowExpanded(false);
                    setExpandedRowKey(null);
                    console.log(count, newSkip, activePage, "pagination check");
                  } else {
                    console.log(
                      count,
                      skip,
                      "pagination check exceeded the limit"
                    );
                  }
                }}
                icon={faChevronRight}
                size="1vw"
              />

              <FontAwesomeIcon
                className={`border-[0.1vw] border-[#1f4b7f] py-[0.5vw] px-[1vw] text-[#1f4b7f] bg-white rounded-[0.25vw] cursor-pointer ${
                  activePage === 10 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (skip < 90) {
                    const maxSkip = 90;
                    setSkip(maxSkip);
                    setSpinning(true);
                    GetPaymentDetails(count, maxSkip, dispatch, setSpinning);
                    setActivePage(10);
                    setIsRowExpanded(false);
                    setExpandedRowKey(null);
                    console.log(count, maxSkip, activePage, "pagination check");
                  } else {
                    console.log(
                      count,
                      skip,
                      "pagination check exceeded the limit"
                    );
                  }
                }}
                icon={faAngleDoubleRight}
                size="1vw"
              />
            </div>

            <div className="flex">
              <input
                className="border-[0.1vw] border-[#1f4b7f] px-[0.5vw] bg-white rounded-[0.25vw] w-[5vw]"
                type="number"
                value={goToPage}
                onChange={(e) => handlePageChange(e.target.value)}
              />
              <button
                className="border-[0.1vw] border-[#1f4b7f] text-white bg-[#1f4b7f] rounded-[0.25vw] px-[0.5vw]"
                onClick={handleGoToPage}
              >
                Go to page
              </button>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
      {/* </div> */}
    </div>
  );
}
