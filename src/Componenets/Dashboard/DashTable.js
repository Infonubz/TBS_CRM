import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Backdrop from "../../asserts/CRMbg.png";
import { GetDashboardDetails } from "../../Api/Dashboard/Dashboard";
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
import { decryptData } from "../Common/Encrypt-Decrypt";

export const DashTable = () => {
  const [spinning, setSpinning] = useState(false);
  const [table, setTable] = useState("dashboard");
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

    // if (value >= 1000000) {
    //   return (value / 1000000).toFixed(1) + "m";
    // } else if (value >= 100000) {
    //   return (value / 100000).toFixed(1) + "l";
    // } else if (value >= 1000) {
    //   return (value / 1000).toFixed(1) + "k";
    // } else {
    //   return value.toString();
    // }

    // Universal formatting logic
    // if (value >= 1000000) {
    //   return (value / 1000000).toFixed(1) + "m"; // Millions
    // } else if (value >= 1000) {
    //   return (value / 1000).toFixed(1) + "k"; // Thousands
    // } else {
    //   return value.toString(); // Small numbers as is
    // }
    if (value >= 1000000) {
      return Math.floor((value / 1000000) * 10) / 10 + "m"; // Millions
    } else if (value >= 1000) {
      return Math.floor((value / 1000) * 10) / 10 + "k"; // Thousands
    } else {
      return value.toString(); // Small numbers as is
    }
  };

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
                  Total TBS Booking / Cancellation Amount
                </p>
                <div className="grid grid-cols-2 gap-[2vw] row-span-2">
                  <Link
                    // to="/dashboard/booking_table"
                    className="bg-[#8AC53E] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold ">
                        {decryptData(getDashboardDetails.totalFare) >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(getDashboardDetails.totalFare)
                            ).toLocaleString()}`}
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
                                Number(decryptData(getDashboardDetails.totalFare)).toFixed(2)
                              )}
                              {/* {console.log(typeof(decryptData(getDashboardDetails.totalFare)),"type of base fare")} */}
                              {/* {console.log(Number(decryptData(getDashboardDetails.totalFare)).toLocaleString(),"type of base fare 2")} */}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {Number(decryptData(getDashboardDetails.totalFare)).toFixed(2)}
                          </p>
                        )}
                      </p>
                      {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        {/* bg-[#ffffff69] */}
                        <IoMdTrendingUp className="text-[2vw]" />
                      </div>
                    </div>
                    <p className="font-bold text-[1.2vw]">Booking Amount</p>
                  </Link>

                  <Link
                    // to="/dashboard/cancellation_table"
                    className="bg-[#ff3a3a] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {decryptData(getDashboardDetails.cancellationRefund) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(
                                getDashboardDetails.cancellationRefund
                              )
                            ).toLocaleString()}`}
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
                                Number(
                                  decryptData(
                                    getDashboardDetails.cancellationRefund
                                  )
                                ).toFixed(2)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹{" "}
                            {Number(
                              decryptData(
                                getDashboardDetails.cancellationRefund
                              )
                            ).toFixed(2)}
                          </p>
                        )}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        <IoMdTrendingDown className="text-[2vw]" />
                      </div>
                    </div>
                    <p className="font-bold text-[1.2vw]">
                      Cancellation Amount
                    </p>
                  </Link>
                </div>
              </div>

              <div className="row-span-1 grid grid-rows-3">
                <p className="font-bold text-[#1F4B7F] text-[1.5vw] row-span-1 self-center">
                  Total TBS Booking / Cancellation Count
                </p>
                <div className="grid grid-cols-3 gap-[2vw] row-span-2">
                  <Link
                    // to="/dashboard/booking_table"
                    className="bg-[#8AC53E] text-[#fff] px-[2vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    {/* bg-[#03c03c] */}
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {decryptData(getDashboardDetails.bookingCount) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={Number(
                              decryptData(getDashboardDetails.bookingCount)
                            ).toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(
                                decryptData(getDashboardDetails.bookingCount)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {decryptData(getDashboardDetails.bookingCount)}
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
                    {/* bg-[#e23d28] */}
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {decryptData(getDashboardDetails.cancellationCount) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={Number(
                              decryptData(getDashboardDetails.cancellationCount)
                            ).toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(
                                decryptData(
                                  getDashboardDetails.cancellationCount
                                )
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {decryptData(getDashboardDetails.cancellationCount)}
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
                    {/* bg-[#03c03c] */}
                    <div className="flex justify-between">
                      <p className="text-[2vw] font-bold">
                        {decryptData(getDashboardDetails.passengerCount) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={Number(
                              decryptData(getDashboardDetails.passengerCount)
                            ).toLocaleString()}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "2vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              {formatNumber(
                                decryptData(getDashboardDetails.passengerCount)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            {decryptData(getDashboardDetails.passengerCount)}
                          </p>
                        )}
                      </p>
                      <div className="border-0 bg-[#1f4a7f34] rounded-full p-[0.5vw]">
                        <FaPeopleGroup className="text-[2vw]" />
                      </div>
                    </div>

                    <p className="font-bold text-[1.2vw]">Passengers</p>
                  </Link>
                </div>
              </div>
              <div className="row-span-1 grid grid-rows-3">
                <p className="font-bold text-[#1F4B7F] text-[1.5vw] self-center row-span-1">
                  Total TBS Booking Fare Details
                </p>
                <div className="grid grid-cols-4 gap-[2vw] row-span-2">
                  <Link
                    to=""
                    className="bg-[#369FFF] text-[#fff] px-[1.5vw] py-[1vw] rounded-md dash-container flex flex-col justify-between cursor-default"
                  >
                    {/* bg-[#209c45] */}
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {decryptData(getDashboardDetails.baseFare) >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(getDashboardDetails.baseFare)
                            ).toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(
                                decryptData(getDashboardDetails.baseFare)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {decryptData(getDashboardDetails.baseFare)}
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
                    {/* bg-[#d33d2a] */}
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {decryptData(getDashboardDetails.gst) >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(getDashboardDetails.gst)
                            ).toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(
                                decryptData(getDashboardDetails.gst)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {decryptData(getDashboardDetails.gst)}
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
                    {/* bg-[#007FFF] */}
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {decryptData(getDashboardDetails.tbsDealAmount) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(getDashboardDetails.tbsDealAmount)
                            ).toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(
                                decryptData(getDashboardDetails.tbsDealAmount)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {decryptData(getDashboardDetails.tbsDealAmount)}
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
                    {/* bg-[#2375c7] */}
                    <div className="flex justify-between">
                      <p className="text-[1.5vw] font-bold">
                        {decryptData(getDashboardDetails.discountAmount) >=
                        1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(
                              decryptData(getDashboardDetails.discountAmount)
                            ).toLocaleString()}`}
                            className="cursor-pointer text-[#1F487C]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#fff]">
                              ₹{" "}
                              {formatNumber(
                                decryptData(getDashboardDetails.discountAmount)
                              )}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#fff]">
                            ₹ {decryptData(getDashboardDetails.discountAmount)}
                          </p>
                        )}
                      </p>
                      <TbRosetteDiscount className="text-[2vw]" />
                    </div>

                    <p className="font-bold text-[1vw]">Discount</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className="col-span-4 border-l-[0.2vw] border-[#a0a0a0d5]"></div>
        </div>
      </div>
    </div>
  );
};
