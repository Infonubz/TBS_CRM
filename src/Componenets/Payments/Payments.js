import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { Link, Outlet, useLocation } from "react-router-dom";
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
import { LiaSearchSolid } from "react-icons/lia";
import { BsExclamationCircle } from "react-icons/bs";
import moment from "moment";
import {PaymentsDashboard} from "./PaymentsDashboard";
import PaymentTable from "./PaymentTable";
import SettlementTable from "./SettlementTable";
import RefundTable from "./RefundTable";

const Payments = () => {
  const location = useLocation();
  const [spinning, setSpinning] = useState(false);
  const [table, setTable] = useState(
    location?.state?.tabIndex || "payDashboard"
  );
  const [activePage, setActivePage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  //   const getPayDashboardDetails =
  //     useSelector((state) => state.crm.dashboard_details) || [];
  //   console.log(getDashboardDetails, "DASHBOARD details dashboard");
  useEffect(() => {
    // setSpinning(true);
    // GetDashboardDetails(dispatch, setSpinning);
  }, []);

  const infos2 = [
    {
      title: "Mobile Number",
    },
    {
      title: "Email",
    },
  ];

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

  const Search = (e) => {
    //   if (table == "payments") {
    //     handleBookingDetailsSearch(e, dispatch);
    //     setActivePage(1);
    //   } else if (table == "settlements") {
    //     handleCancellationDetailsSearch(e, dispatch);
    //     setActivePage(1);
    //   } else if (table == "refunds") {
    //     handlePassengerDetailsSearch(e, dispatch);
    //     setActivePage(1);
    //   } else if (table == "blocked") {
    //     handleBlockedDetailsSearch(e, dispatch);
    //     setActivePage(1);
    //   }
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
      // if (table == "payments") {
      //   await GetBookingDetailsByDate(
      //     dispatch,
      //     moment(values[0].$d).format("YYYY-MM-DD"),
      //     moment(values[1].$d).format("YYYY-MM-DD")
      //   );
      // } else if (table == "settlements") {
      //   await GetCancellationDetailsByDate(
      //     dispatch,
      //     moment(values[0].$d).format("YYYY-MM-DD"),
      //     moment(values[1].$d).format("YYYY-MM-DD")
      //   );
      // } else if (table == "blocked") {
      //   await GetBlockedDetailsByDate(
      //     dispatch,
      //     moment(values[0].$d).format("YYYY-MM-DD"),
      //     moment(values[1].$d).format("YYYY-MM-DD")
      //   );
      // }
      setActivePage(1);
    } catch (err) {
      console.log(err, "error");
      // if (table == "payments") {
      //   GetBookingDetails(dispatch, setSpinning);
      // } else if (table == "settlements") {
      //   GetCancellationDetails(dispatch, setSpinning);
      // } else if (table == "blocked") {
      //   GetBlockedDetails(dispatch, setSpinning);
      // }
    }
  };

  useEffect(() => {
    setTable(location?.state?.tabIndex);
  }, [location.state]);
  useEffect(() => {
    if (table === "payDashboard") {
      setTable(
        location?.state?.tabIndex ? location?.state?.tabIndex : "payDashboard"
      );
    }
  }, [table]);

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
        {table == "payDashboard"
          ? "PAYMENT DETAILS"
          : table == "payments"
          ? "PAYMENTS"
          : table == "settlements"
          ? "SETTLEMENTS"
          : table == "refunds"
          ? "REFUNDS"
          // : table == "blocked"
          // ? "BLOCKED HISTORY"
          : "PAYMENT DETAILS"}
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
            // className={`
            //   ${table === "payDashboard" ? "cursor-not-allowed hover:bg-zinc-500" : ""}
            //    bg-white outline-none pt-[0.25vw] pl-[2vw] w-[17vw] text-[#1f487c] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]`}
            className={`cursor-not-allowed hover:bg-zinc-500 bg-white outline-none pt-[0.25vw] pl-[2vw] w-[17vw] text-[#1f487c] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]`}
            placeholder="Search..."
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              Search(e);
            }}
            disabled={isDisabled}
          />
          <span
            className={`inline-block ${
              table === "payDashboard" ? "cursor-not-allowed" : "cursor-pointer"
            } text-[#1F4B7F] text-[1vw] align-text-bottom absolute right-[1vw]`}
          >
            {" "}
            <Popover
              color="white"
              title={
                table == "payDashboard" || table == "payments" || table == "settlements" || table == "refunds" ? (
                  ""
                ) : (
                  <div className=" text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto ">
                    <span className="font-bold">SEARCH BY...</span>
                    {table == "refunds"
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
            </Popover>
          </span>
        </div>

        {/* <Link to="/dashboard/booking_table" className="text-[1.3vw] text-[#1f487c] text-center">Bookings</Link>
                <Link to="/dashboard/cancellation_table" className="text-[1.3vw] text-[#1f487c] text-center">Cancellation</Link>
                <Link to="" className="text-[1.3vw] text-[#1f487c] text-center">Passengers</Link> */}
        <div className="flex items-center pl-[2vw] gap-x-[3vw] -ml-[22vw]">
          <div
            className={` cursor-pointer ${
              table == "payDashboard"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("payDashboard");
              setIsDisabled(true);
            }}
          >
            <p className="text-[1.3vw] text-[#1f487c] text-center">Dashboard</p>
          </div>
          <div
            className={` cursor-pointer ${
              table == "payments"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("payments");
              setIsDisabled(false);
              setActivePage(1);
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Payments
            </div>
          </div>

          <div
            className={` cursor-pointer ${
              table == "settlements"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("settlements");
              setIsDisabled(false);
              setActivePage(1);
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Settlements
            </div>
          </div>

          <div
            className={` cursor-pointer ${
              table == "refunds"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("refunds");
              setIsDisabled(false);
              setActivePage(1);
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Refunds
            </div>
          </div>

          {/* <div
            className={` cursor-pointer ${
              table == "blocked"
                ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                : ""
            } `}
            onClick={() => {
              setTable("blocked");
              setIsDisabled(false);
              setActivePage(1);
            }}
          >
            <div className="text-[1.3vw] text-[#1f487c] text-center">
              Blocked History
            </div>
          </div> */}
        </div>

        {table === "paymentsssss" ||
        table === "settlementsssss" ||
        table === "refundssss" ? (
          <div className="order-last flex items-center">
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

      {table == "payDashboard" ? (
        <PaymentsDashboard />
      ) : table == "payments" ? (
        <PaymentTable activePage={activePage} setActivePage={setActivePage} />
      ) : table == "settlements" ? (
        <SettlementTable activePage={activePage} setActivePage={setActivePage} />
      ) : table == "refunds" ? (
        <RefundTable activePage={activePage} setActivePage={setActivePage} />
      // ) : table == "blocked" ? (
      //   <PaymentsDashboard activePage={activePage} setActivePage={setActivePage} />
      ) : (
        <PaymentsDashboard />
      )}
    </div>
  );
};

export default Payments;
