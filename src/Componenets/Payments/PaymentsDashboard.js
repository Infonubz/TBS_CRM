import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Backdrop from "../../asserts/CRMbg.png";
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
import { FaPeopleGroup } from "react-icons/fa6";
import { GetPayDashDetails } from "../../Api/Payments/Payments";
import { SiRazorpay } from "react-icons/si";
import { TbBus } from "react-icons/tb";
import razorPay from "../../asserts/Razorpay.jpeg"
import abhiBus from "../../asserts/AbhiBus.jpeg"

export const PaymentsDashboard = () => {
  const [spinning, setSpinning] = useState(false);
  const [table, setTable] = useState("dashboard");
  const dispatch = useDispatch();
  const availableBalance =
    useSelector((state) => state.crm.available_balance) || [];
  console.log(availableBalance, "DASHBOARD details dashboard");
  useEffect(() => {
    setSpinning(true);
    GetPayDashDetails(dispatch, setSpinning);
  }, []);

  const formatNumber = (value) => {
    console.log(value,"value")
    if (typeof value === "string") {
      value = value.replace(/,/g, '')
    }
    value = parseFloat(value)
    if (value === undefined || value === null || isNaN(value)) {
      return "Invalid value";
    }

    // if (value >= 1000000) {
    //   return (value / 1000000).toFixed(1) + " million";
    // } else if (value >= 100000) {
    //   return (value / 100000).toFixed(1) + " lakh";
    // } else if (value >= 1000) {
    //   return (value / 1000).toFixed(1) + " thousand";
    // } else {
    //   return value.toString();
    // }

  
      // Universal formatting logic
      if (value >= 1000000) {
          return (value / 1000000).toFixed(1) + "m"; // Millions
      } else if (value >= 1000) {
          return (value / 1000).toFixed(1) + "k"; // Thousands
      } else {
          return value.toString(); // Small numbers as is
      }
  
  };

  const formatBalance = (balance) => {
    if (typeof balance === "string") {
      balance = balance.replace(/,/g, '')
    }
    balance = parseFloat(balance)
    return balance
  }
  return (
    <div>
      <div className="w-full h-[75vh] rounded-xl dash-container bg-[#fff] mt-[0.25vw]">
        {/* bg-[#1f4a7f34] */}
        <div className="grid grid-cols-10 h-full">
          {spinning ? (
            <div className="absolute top-[50vh] left-[50vw] flex justify-center items-center  z-10 col-span-6">
              <Spin size="large" />
            </div>
          ) : (
            <div className="col-span-6 px-[2vw] pb-[2vw] grid grid-rows-3 min-h-fit">
              <div className="row-span-1 grid grid-rows-3">
                <p className="font-bold text-[#1F4B7F] text-[1.5vw] row-span-1 self-center">
                  Total Razorpay / AbhiBus Wallet Current Balance
                </p>
                <div className="grid grid-cols-2 gap-[2vw] row-span-2">
                  <Link
                    // to="/dashboard/booking_table"
                    className="bg-[#369FFF] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold ">
                        {/* {getPayDashDetails.totalFare >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${getPayDashDetails.totalFare.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹ {formatNumber(getPayDashDetails.totalFare)}
                            </p>
                          </Tooltip>
                        ) : ( */}
                          <p className="text-[#fff]">
                            ₹ 0
                          </p>
                        {/* )} */}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        {/* <SiRazorpay  className="text-[2vw]" /> */}
                        <img src={razorPay} className="w-[3vw] rounded-full"/>
                      </div>
                    </div>
                    <p className="font-bold text-[1.2vw]">Razorpay Current Balance</p>
                  </Link>

                  <Link
                    // to="/dashboard/cancellation_table"
                    className="bg-[#ff3a3a] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <div className="text-[2vw] font-bold">
                        {formatBalance(availableBalance) >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${availableBalance.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(
                                availableBalance
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {availableBalance}
                            {console.log(availableBalance,"balancebalance")}
                          </p>
                        )}
                      </div>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        {/* <TbBus  className="text-[2vw]" /> */}
                        <img src={abhiBus} className="w-[3vw] rounded-full"/>
                      </div>
                    </div>
                    <p className="font-bold text-[1.2vw]">AbhiBus Current Balance</p>
                  </Link>
                </div>
              </div>

              <div className="row-span-1 grid grid-rows-3">
                {/* <p className="font-bold text-[#1F4B7F] text-[1.5vw] row-span-1 self-center">
                  Total TBS Booking / Cancellation Count
                </p>
                <div className="grid grid-cols-3 gap-[2vw] row-span-2">
                  <Link
                    // to="/dashboard/booking_table"
                    className="bg-[#8AC53E] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {getPayDashDetails.bookingCount >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={getPayDashDetails.bookingCount.toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(getPayDashDetails.bookingCount)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {getPayDashDetails.bookingCount}
                          </p>
                        )}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        <IoMdTrendingUp className="text-[2vw]" />
                      </div>
                    </div>

                    <p className="font-bold text-[1.2vw]">Booked Tickets</p>
                  </Link>

                  <Link
                    // to="/dashboard/cancellation_table"
                    className="bg-[#ff3a3a] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {getPayDashDetails.cancellationCount >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={getPayDashDetails.cancellationCount.toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(
                                getPayDashDetails.cancellationCount
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {getPayDashDetails.cancellationCount}
                          </p>
                        )}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        <IoMdTrendingDown className="text-[2vw]" />
                      </div>
                    </div>

                    <p className="font-bold text-[1.2vw]">Cancelled Tickets</p>
                  </Link>

                  <Link
                    to=""
                    className="bg-[#369FFF] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {getPayDashDetails.passengerCount >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={getPayDashDetails.passengerCount.toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(getPayDashDetails.passengerCount)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {getPayDashDetails.passengerCount}
                          </p>
                        )}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        <FaPeopleGroup className="text-[2vw]" />
                      </div>
                    </div>

                    <p className="font-bold text-[1.2vw]">Passengers</p>
                  </Link>
                </div> */}
              </div>
              <div className="row-span-1 grid grid-rows-3">
                {/* <p className="font-bold text-[#1F4B7F] text-[1.5vw] self-center row-span-1">
                  Total TBS Booking Fare Details
                </p>
                <div className="grid grid-cols-4 gap-[2vw] row-span-2">
                  <Link
                    to=""
                    className="bg-[#369FFF] text-[#fff] px-[1.5vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {getPayDashDetails.baseFare >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${getPayDashDetails.baseFare.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹ {formatNumber(getPayDashDetails.baseFare)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {getPayDashDetails.baseFare}
                          </p>
                        )}
                      </p>
                      <TbReceiptRupee className="text-[2vw]" />
                    </div>

                    <p className="font-bold text-[1vw]">Base Fare</p>
                  </Link>

                  <Link
                    to=""
                    className="bg-[#FF993A] text-[#fff] px-[1.5vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {getPayDashDetails.gst >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${getPayDashDetails.gst.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹ {formatNumber(getPayDashDetails.gst)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {getPayDashDetails.gst}
                          </p>
                        )}
                      </p>
                      <TbReceiptTax className="text-[2vw]" />
                    </div>

                    <p className="font-bold text-[1vw]">GST</p>
                  </Link>
                  <Link
                    to=""
                    className="bg-[#8AC53E] text-[#fff] px-[1.5vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {getPayDashDetails.tbsDealAmount >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${getPayDashDetails.tbsDealAmount.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(getPayDashDetails.tbsDealAmount)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {getPayDashDetails.tbsDealAmount}
                          </p>
                        )}
                      </p>
                      <TbRosetteDiscount className="text-[2vw]" />
                    </div>

                    <p className="font-bold text-[1vw]">TBS Deal</p>
                  </Link>

                  <Link
                    to=""
                    className="bg-[#369FFF] text-[#fff] px-[1.5vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {getPayDashDetails.discountAmount >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${getPayDashDetails.discountAmount.toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(getPayDashDetails.discountAmount)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {getPayDashDetails.discountAmount}
                          </p>
                        )}
                      </p>
                      <TbRosetteDiscount className="text-[2vw]" />
                    </div>

                    <p className="font-bold text-[1vw]">Discount</p>
                  </Link>
                </div> */}
              </div>
            </div>
          )}
          <div className="col-span-4 border-l-[0.2vw] border-[#a0a0a0d5]"></div>
        </div>
      </div>
    </div>
  );
};
