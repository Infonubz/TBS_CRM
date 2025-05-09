import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Backdrop from "../../asserts/CRMbg.png";
import {
  GetDashboardDetails,
  handleBookingDetailsSearch,
  handleCancellationDetailsSearch,
  GetBookingDetailsByDate,
  GetBookingDetails,
  GetCancellationDetailsByDate,
  GetCancellationDetails,
  handlePassengerDetailsSearch,
  handleBlockedDetailsSearch,
  GetBlockedDetailsByDate,
  GetBlockedDetails,
} from "../../Api/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Spin,
  Tooltip,
  Popover,
  ConfigProvider,
  DatePicker,
} from "antd";
import "../../App.css";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import {
  TbReceiptRupee,
  TbReceiptTax,
  TbRosetteDiscount,
} from "react-icons/tb";
import { FaDesktop, FaPeopleGroup } from "react-icons/fa6";
import { LiaSearchSolid } from "react-icons/lia";
import { BsExclamationCircle } from "react-icons/bs";
import BookingTable from "../Dashboard/BookingTable";
import { DashTable } from "../Dashboard/DashTable";
import CancelTable from "../Dashboard/CancelTable";
import PassengerTable from "../Dashboard/PassengerTable";
import moment from "moment";
import BlockTable from "../Dashboard/BlockTable";
import { IoGrid } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { FaMobileAlt } from "react-icons/fa";
import axios from "axios";
import { DashTableNew } from "../Dashboard/DashTableNew";
import { Formik, Field, Form, ErrorMessage } from "formik";
import dayjs from "dayjs";
import all1 from "../../asserts/all1.png"
import all2 from "../../asserts/all2.png"
import { MdCancel } from "react-icons/md";

const apiUrl = process.env.REACT_APP_API_URL;

const BackUp = () => {
  const location = useLocation();
  const [spinning, setSpinning] = useState(false);
  const [table, setTable] = useState(location?.state?.tabIndex || "blocked");
  console.log(table, "tableeeeeee");
  const [activePage, setActivePage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isView, setIsView] = useState("All");
  const [deviceid, setDeviceId] = useState(0);
  const [inputValue,setInputValue]=useState();

  const handleClear = () => {
        setInputValue('');
        
        GetBlockedDetails(dispatch, setSpinning,deviceid);
        
        
        
      };

  const dispatch = useDispatch();
  const getDashboardDetails =
    useSelector((state) => state.crm.dashboard_details) || [];
  console.log(getDashboardDetails, "DASHBOARD details dashboard");
  useEffect(() => {
    setSpinning(true);
    GetDashboardDetails(dispatch, setSpinning);
  }, []);

  const formatNumber = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "Invalid value";
    }

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "m";
    } else if (value >= 100000) {
      return (value / 1000).toFixed(1) + "k";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    } else {
      return value.toString();
    }
  };

  const infos1 = [
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

  const infos2 = [
    {
      title: "Mobile Number",
    },
    {
      title: "Email",
    },
  ];

  const infos3 = [
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
  ];

  const Search = (e) => {
    if (table == "bookings") {
      handleBookingDetailsSearch(e, dispatch);
      setActivePage(1);
    } else if (table == "cancellation") {
      handleCancellationDetailsSearch(e, dispatch);
      setActivePage(1);
    } else if (table == "passengers") {
      handlePassengerDetailsSearch(e, dispatch);
      setActivePage(1);
    } else if (table == "blocked") {
      handleBlockedDetailsSearch(e, dispatch);
      setActivePage(1);
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

  const { RangePicker } = DatePicker;

  // date picker
  const changeDatePickerPlaceholder = () => {
    const inputDiv = document.querySelector(".ant-picker-input");
    if (inputDiv) {
      const inputElement = inputDiv.querySelector("input");
      if (inputElement) {
        inputElement.placeholder = "Start Date";
        inputElement.className = "text-center";
      }
    }
  };

  const changeDatePickerPlaceholder2 = () => {
    const inputDiv = document.querySelector(".ant-picker");
    if (inputDiv) {
      const children = inputDiv.querySelectorAll("div");
      if (children.length > 2) {
        const thirdChild = children[2];
        const inputElement = thirdChild.querySelector("input");
        if (inputElement) {
          inputElement.placeholder = "End Date";
          inputElement.className = "text-center";
        }
      }
    }
  };

  useEffect(() => {
    changeDatePickerPlaceholder();
    changeDatePickerPlaceholder2();
  }, [table]);

  const [dateClear, setDateClear] = useState();
  const datefilter = async (values) => {
    try {
      setDateClear(values);
      console.log(values, "date values");
      if (table == "bookings") {
        await GetBookingDetailsByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
      } else if (table == "cancellation") {
        await GetCancellationDetailsByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
      } else if (table == "blocked") {
        await GetBlockedDetailsByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
      }
      setActivePage(1);
    } catch (err) {
      console.log(err, "error");
      if (table == "bookings") {
        GetBookingDetails(dispatch, setSpinning, 0);
      } else if (table == "cancellation") {
        GetCancellationDetails(dispatch, setSpinning, 0);
      } else if (table == "blocked") {
        GetBlockedDetails(dispatch, setSpinning, 0);
      }
    }
  };

  useEffect(() => {
    setTable(location?.state?.tabIndex);
  }, [location.state]);
  useEffect(() => {
    if (table === "blocked") {
      setTable(
        location?.state?.tabIndex ? location?.state?.tabIndex : "blocked"
      );
    }
  }, [table]);

  useEffect(() => {
    if (deviceid) {
      console.log("deviceId updated:", deviceid);
    }
  }, [deviceid]);

  return (
    <div
      className={`h-screen w-screen px-[2.5vw]`}
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
        {/* {table == "dashboard"
          ? "DASHBOARD"
          : table == "bookings"
          ? "BOOKED TICKETS"
          : table == "cancellation"
          ? "CANCELLED TICKETS"
          : table == "passengers"
          ? "PASSENGERS"
          : table == "blocked"
          ? "BLOCKED HISTORY"
          : "DASHBOARD"} */}
          Back Up
      </h1>

      <div className="flex justify-between items-start">
        <div className="relative flex items-center pb-[0.5vw]">
          <LiaSearchSolid
            className="absolute left-[0.5vw] inline-block "
            size={"1vw"}
            color="#9CA3AF"
          />
          <input
            type="text"
            className={`${
              table === "dashboard"
                ? "cursor-not-allowed hover:bg-zinc-500"
                : ""
            } bg-white outline-none pt-[0.25vw] pl-[2vw] w-[17vw] text-[#1f487c] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]`}
            placeholder="Search..."
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              Search(e);
              setInputValue(e.target.value);
            }}
            // disabled={isDisabled}
          />
          <span
            className={`inline-block ${
              table === "dashboard" ? "cursor-not-allowed" : "cursor-pointer"
            } text-[#1F4B7F] text-[1vw] align-text-bottom absolute right-[1vw]`}
          >
            {" "}
            {inputValue ? (
                                      <MdCancel size="1.3vw" className="text-[#1f487c] cursor-pointer  " onClick={() => {
                                        handleClear(); 
                                        // setPopoverVisible(false); 
                                      }} />
                                    ) : (
            <Popover
              color="white"
              title={
                table == "dashboard" ? (
                  ""
                ) : (
                  <div className=" text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto ">
                    <span className="font-bold">SEARCH BY...</span>
                    {table == "passengers"
                      ? infos2.map((info, index) => (
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
                        ))
                      : table == "bookings"
                      ? infos3.map((info, index) => (
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
                        ))
                      : infos1.map((info, index) => (
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
                )
              }
              placement="bottom"
            >
              <BsExclamationCircle size={"1vw"} color="#9CA3AF" />
            </Popover>)}
          </span>
        </div>

        {/* <Link to="/dashboard/booking_table" className="text-[1.3vw] text-[#1f487c] text-center">Bookings</Link>
          <Link to="/dashboard/cancellation_table" className="text-[1.3vw] text-[#1f487c] text-center">Cancellation</Link>
          <Link to="" className="text-[1.3vw] text-[#1f487c] text-center">Passengers</Link> */}
        <div className="flex items-start pl-[1vw] gap-x-[3vw] -ml-[2vw]">
          {/* <div
            className={` cursor-pointer ${
              table == "dashboard"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("dashboard");
              setIsDisabled(true);
              setDeviceId(0)
            }}
          >
            <p className="text-[1.3vw] text-[#1f487c] text-center">Dashboard</p>
          </div>
          <div
            className={` cursor-pointer ${
              table == "bookings"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("bookings");
              setIsDisabled(false);
              setActivePage(1);
              setDeviceId(0)
              setIsView("All")
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Bookings
            </div>
          </div>

          <div
            className={` cursor-pointer ${
              table == "cancellation"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("cancellation");
              setIsDisabled(false);
              setActivePage(1);
              setDeviceId(0)
              setIsView("All")
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Cancellation
            </div>
          </div> */}

          {/* <div
            className={` cursor-pointer ${
              table == "passengers"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("passengers");
              setIsDisabled(false);
              setActivePage(1);
              setDeviceId(0)
              setIsView("All")
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Passengers
            </div>
          </div> */}

          <div
            className={` cursor-pointer ${
              table == "blocked"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } -ml-[18vw]`}
            onClick={() => {
              setTable("blocked");
              setIsDisabled(false);
              setActivePage(1);
              setDeviceId(0)
              setIsView("All")
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Blocked History
            </div>
          </div>
        </div>

        <div className="flex col-span-2">
          {table === "dashboard" ||
          table === "bookings" ||
          table === "cancellation" ||
          table === "blocked" ? (
            <div className="flex items-center -mr-[19vw]">
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
                    // className="custom-range-picker bg-white outline-none pl-[1.5vw] w-[17vw] h-[2.5vw] text-[0.9vw] border-[#1F4B7F] border-l-[0.1vw] px-[1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.2vw] border-b-[0.2vw]"
                    // disabledDate={(current) => current < dayjs().startOf("day")}
                  />
                </ConfigProvider>
              </div>
            </div>
          ) : (
            <div className="w-[20vw]"></div>
          )}
        </div>
        {table === "dashboard" ||
        table === "bookings" ||
        table === "cancellation" ||
        table === "passengers" ||
        table === "blocked" ? (
          <div className="flex border-[#1F487C] h-[5vh] ">
            {/* <Tooltip
              placement="top"
              title={
                <div className="flex items-center gap-x-[0.5vw] justify-center">
                  <FaDesktop color={"#1F487C"} size={"1vw"} />
                  <label className="text-[1vw] font-semibold">All</label>
                </div>
              }
              className="cursor-pointer"
              color="white"
              overlayInnerStyle={{
                color: "#1F487C",
              }}
            > */}
              <button
                className={`${
                  isView === "All" ? "bg-[#1F487C]" : "bg-[white]"
                } px-[0.75vw] rounded-l-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C] flex items-center gap-[0.5vw]`}
                style={{
                  transition: "all 1s",
                }}
                onClick={() => {
                  setIsView("All");
                  setDeviceId(0);
                  setActivePage(1);
                  //  GetBookingDetails(dispatch, setSpinning, 1);
                }}
              >
                {/* <FaDesktop
                  color={`${isView === "Desktop" ? "white" : "#1F487C"}`}
                /> */}
                {isView === "All" ? <img src={all1} className="w-[1.25vw]"/> : <img src={all2} className="w-[1.25vw]"/>}
                <p className={`text-[1vw] font-semibold ${isView === "All" ? "text-white" : "text-[#1F487C]"}`}>All</p>
              </button>
            {/* </Tooltip> */}
            {/* <Tooltip
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
            > */}
              <button
                className={`${
                  isView === "Desktop" ? "bg-[#1F487C]" : "bg-[white]"
                } px-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C] flex items-center gap-[0.5vw]`}
                style={{
                  transition: "all 1s",
                }}
                onClick={() => {
                  setIsView("Desktop");
                  setDeviceId(1);
                  setActivePage(1);
                  //  GetBookingDetails(dispatch, setSpinning, 1);
                }}
              >
                <FaDesktop
                  color={`${isView === "Desktop" ? "white" : "#1F487C"}`}
                  className="text-[1.25vw]"
                />
                <p className={`text-[1vw] font-semibold ${isView === "Desktop" ? "text-white" : "text-[#1F487C]"}`}>Website</p>
              </button>
            {/* </Tooltip> */}
            {/* <Tooltip
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
            > */}
              <button
                className={`${
                  isView === "Mobile" ? "bg-[#1F487C]" : "bg-[white]"
                } px-[0.75vw] rounded-r-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0  border-[#1F487C] flex items-center gap-[0.5vw]`}
                style={{
                  transition: "all 1s",
                }}
                onClick={() => {
                  setIsView("Mobile");
                  setDeviceId(2);
                  setActivePage(1);
                }}
              >
                <FaMobileAlt
                  color={`${isView === "Mobile" ? "white" : "#1F487C"}`}
                  className="text-[1.25vw]"
                />
                <p className={`text-[1vw] font-semibold ${isView === "Mobile" ? "text-white" : "text-[#1F487C]"}`}>Mobile</p>
              </button>
            {/* </Tooltip> */}
          </div>
        ) : (
          <div className="w-[1vw]"></div>
        )}
      </div>

      {table == "dashboard" ? (
        <DashTableNew setTable={setTable} deviceid={deviceid}/>
      ) : // <DashTable/>
      table == "bookings" ? (
        <BookingTable
          activePage={activePage}
          setActivePage={setActivePage}
          deviceid={deviceid}
        />
      ) : table == "cancellation" ? (
        <CancelTable
          activePage={activePage}
          setActivePage={setActivePage}
          deviceid={deviceid}
        />
      ) : table == "passengers" ? (
        <PassengerTable
          activePage={activePage}
          setActivePage={setActivePage}
          deviceid={deviceid}
        />
      ) : table == "blocked" ? (
        <BlockTable
          activePage={activePage}
          setActivePage={setActivePage}
          deviceid={deviceid}
        />
      ) : (
        // <DashTable/>
        <DashTableNew setTable={setTable} deviceid={deviceid}/>
        // <DashTable/>
      )}
      {/* <Link to="/dashboard/booking_table">Component 1</Link> */}
      {/* <Outlet /> */}
    </div>
  );
};

export default BackUp;
