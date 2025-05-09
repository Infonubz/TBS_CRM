import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Backdrop from "../../asserts/CRMbg.png";
import {
  GetBarChartDetails,
  GetDashboardDetails,
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
import { FaPeopleGroup } from "react-icons/fa6";
import { decryptData } from "../Common/Encrypt-Decrypt";
import dashMan from "../../asserts/dashboardMan.gif";
import arrowGif from "../../asserts/arrowGif.gif";
import flagPole from "../../asserts/flagPole.png";
import ticket from "../../asserts/ticket.png";
import greenTick from "../../asserts/greenTick.png";
import redCross from "../../asserts/redCross.png";
import blueRev from "../../asserts/blueRev.png";
import dashes1 from "../../asserts/dashes1.png";
import dashes2 from "../../asserts/dashes2.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Line,
  ComposedChart,
  Scatter,
  LineChart,
  ScatterChart,
  ZAxis,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { GetPayDashDetails } from "../../Api/Payments/Payments";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from "formik";
import dayjs from "dayjs";
import moment from "moment";
import fareIcon from "../../asserts/fareIcon.png";
import gstIcon from "../../asserts/gstIcon.png";
import offerIcon from "../../asserts/gstIcon.png";
import spent from "../../asserts/spent.png"
import balance from "../../asserts/balance.png"
import spent1 from "../../asserts/spent.svg"

export const DashTableNew = ({
  setTable,
  deviceid,
  activePicker,
  setActivePicker,
  swap,
  setSwap,
  dates,
  isView,
}) => {
  const [spinning, setSpinning] = useState(false);
  //   const [table, setTable] = useState("dashboard");
  // const [activePicker, setActivePicker] = useState("Weekly");
  // const [swap, setSwap] = useState("amount");
  const [hovered, setHovered] = useState(null);
  const [hideTool, setHideTool] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
console.log(hoveredIndex,"indexindex")

  const dispatch = useDispatch();
  const getDashboardDetails =
    useSelector((state) => state.crm.dashboard_details) || [];
  console.log(getDashboardDetails, "DASHBOARD details dashboard");
  console.log(deviceid, "deviceidid");
  console.log(dates, "datesdates");

  useEffect(() => {
    setSpinning(true);
    // GetPayDashDetails(dispatch, setSpinning);
    if (deviceid === 0) {
      GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
    } else if (deviceid === 1) {
      GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 1, 1);
    } else if (deviceid === 2) {
      GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 1, 1);
    } else {
      GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
    }
  }, [deviceid]);

  useEffect(() => {
    setSpinning(true);
    GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
    GetPayDashDetails(dispatch, setSpinning);
  }, []);
  console.log(deviceid, swap, dates, "checkcheckcheck");
  const abhiBalance =
    useSelector((state) => state.crm.available_balance) || "0";

  const formatNumber = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "Invalid value";
    }
    if (value >= 1000000) {
      return Math.floor((value / 1000000) * 10) / 10 + "m"; // Millions
    } else if (value >= 1000) {
      return Math.floor((value / 1000) * 10) / 10 + "k"; // Thousands
    } else {
      return value.toString(); // Small numbers as is
    }
  };

  const [activeIndexes] = useState([0, 1, 2]);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const dataBarWeek = [
    {
      name: "Sun",
      name2: "Sun",
      Cancelled: 700,
      Booked: 170,
      Refunded: 60,
    },
    {
      name: "Mon",
      Cancelled: 500,
      Booked: 120,
      Refunded: 40,
    },
    {
      name: "Tue",
      Cancelled: 800,
      Booked: 140,
      Refunded: 20,
    },
    {
      name: "Wed",
      Cancelled: 400,
      Booked: 70,
      Refunded: 50,
    },
    {
      name: "Thu",
      Cancelled: 600,
      Booked: 100,
      Refunded: 20,
    },
    {
      name: "Fri",
      Cancelled: 500,
      Booked: 140,
      Refunded: 40,
    },
    {
      name: "Sat",
      Cancelled: 400,
      Booked: 280,
      Refunded: 140,
    },
  ];
  const dataBarWeek2 = [
    {
      name: "Sun",
      Cancelled: 700,
      Booked: 170,
      Refunded: 60,
    },
    {
      name: "Mon",
      Cancelled: 500,
      Booked: 120,
      Refunded: 40,
    },
    {
      name: "Tue",
      Cancelled: 800,
      Booked: 140,
      Refunded: 20,
    },
    {
      name: "Wed",
      Cancelled: 400,
      Booked: 70,
      Refunded: 50,
    },
    {
      name: "Thu",
      Cancelled: 600,
      Booked: 100,
      Refunded: 20,
    },
    {
      name: "Fri",
      Cancelled: 500,
      Booked: 140,
      Refunded: 40,
    },
    {
      name: "Sat",
      Cancelled: 400,
      Booked: 280,
      Refunded: 140,
    },
  ];
  const dataBarMonth = [
    {
      name: "Jan",
      Cancelled: 4000,
      Booked: 2400,
      Refunded: 2400,
    },
    {
      name: "Feb",
      Cancelled: 3000,
      Booked: 1398,
      Refunded: 2210,
    },
    {
      name: "Mar",
      Cancelled: 2000,
      Booked: 9800,
      Refunded: 2290,
    },
    {
      name: "Apr",
      Cancelled: 2780,
      Booked: 3908,
      Refunded: 2000,
    },
    {
      name: "May",
      Cancelled: 1890,
      Booked: 4800,
      Refunded: 2181,
    },
    {
      name: "Jun",
      Cancelled: 2390,
      Booked: 3800,
      Refunded: 2500,
    },
    {
      name: "Jul",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
    {
      name: "Aug",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
    {
      name: "Sep",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
    {
      name: "Oct",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
    {
      name: "Nov",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
    {
      name: "Dec",
      Cancelled: 3490,
      Booked: 4300,
      Refunded: 2100,
    },
  ];
  const dataBarYear = [
    {
      name: "2025",
      Cancelled: 4000,
      Booked: 2400,
      Refunded: 2400,
    },
    {
      name: "2026",
      Cancelled: "",
      Booked: "",
      Refunded: "",
    },
    {
      name: "2027",
      Cancelled: "",
      Booked: "",
      Refunded: "",
    },
    {
      name: "2028",
      Cancelled: "",
      Booked: "",
      Refunded: "",
    },
    {
      name: "2029",
      Cancelled: "",
      Booked: "",
      Refunded: "",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    console.log(active, payload, label, "toolProps");
    if (!active || !payload || payload.length === 0) return null;

    // Filter out duplicate dataKeys, keeping only the first occurrence
    const seen = new Set();
    const filteredPayload = payload.filter((entry) => {
      if (seen.has(entry.dataKey)) return false;
      seen.add(entry.dataKey);
      return true;
    });
    console.log(filteredPayload, "filtereddd");

    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-[1vw] p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#1f4b7f]">
          {!barChartDetails[0].date && dates ? (
            <p className="font-semibold mb-1">{formatDate2(label)}</p>
          ) : (
            <p className="font-semibold mb-1">{label}</p>
          )}
          <div className="flex gap-[0.25vw]">
            <div>
              <div className="bg-[#02CA70] rounded-full w-[0.75vw] h-[0.75vw] mt-[0.35vw]"></div>
              <div className="bg-[#FF574B] rounded-full w-[0.75vw] h-[0.75vw] mt-[0.7vw]"></div>
            </div>
            <div>
              {filteredPayload.map((entry, index) => (
                <p key={index} className="">
                  <span>{entry.name}:</span>
                  {/* ₹ {entry.value} */}
                  <span className="font-bold">
                    {swap === "amount"
                      ? ` ₹ ${entry.value.toLocaleString()}`
                      : `${entry.value}`}
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center ">
            {filteredPayload.map((entry, index) => (
              <p key={index} className="flex items-center gap-[0.25vw]">
                {index === 1 ? (
                  <>
                    <div className="bg-[#3E7DFB] rounded-full w-[0.75vw] h-[0.75vw]"></div>
                    <span>Refunded:</span>
                    <span className="font-bold">
                      {swap === "amount"
                        ? `₹ ${entry.value.toLocaleString()}`
                        : `${entry.value}`}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </p>
            ))}
          </div>

          {/* <p className="text-gray-500 mt-2 italic">Anything you want can be displayed here.</p> */}
        </div>
      );
    }

    return null;
  };

  const NeedleTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;
    console.log(payload[0], "paypaypay");
    return (
      <div className="bg-white text-[1vw] p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#1f4b7f] ">
        <p>
          {payload[0].name}:{" "}
          <span className="font-bold">
            ₹{payload[0].value.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    );
  };

  const AmtNo1 = Number(
    // decryptData
    getDashboardDetails?.piechart?.totalFare
  );
  const AmtNo2 = Number(
    // decryptData
    getDashboardDetails?.piechart?.cancellationRefund
  );
  const AmtNo3 = Number(
    // decryptData
    getDashboardDetails?.piechart?.cancellationRefund
  );
  // (getDashboardDetails?.refundedAmount));
  const dataPieAmount = [
    {
      name: "Booked",
      value: Math.round((AmtNo1 / (AmtNo1 + AmtNo2 + AmtNo3)) * 100),
      amount: AmtNo1,
    },
    {
      name: "Cancelled",
      value: Math.round((AmtNo2 / (AmtNo1 + AmtNo2 + AmtNo3)) * 100),
      amount: AmtNo2,
    },
    {
      name: "Refunded",
      value: Math.round((AmtNo3 / (AmtNo1 + AmtNo2 + AmtNo3)) * 100),
      amount: AmtNo3,
    },
  ];
  console.log(dataPieAmount[0], "datadata");
  const CntNo1 = Number(
    // decryptData
    getDashboardDetails?.piechart?.bookingCount
  );
  const CntNo2 = Number(
    // decryptData
    getDashboardDetails?.piechart?.cancellationCount
  );
  const CntNo3 = Number(
    // decryptData
    getDashboardDetails?.piechart?.cancellationCount
  );
  // (getDashboardDetails?.piechart?.refundedCount));
  const bookedCntValue = ((CntNo1 / (CntNo1 + CntNo2 + CntNo3)) * 100)
  const cancelledCntValue = ((CntNo2 / (CntNo1 + CntNo2 + CntNo3)) * 100)
  const refundedCntValue = ((CntNo3 / (CntNo1 + CntNo2 + CntNo3)) * 100)
  function adjustPercentages(values) {
    let roundedValues = values.map(v => Math.round(v)); // Round each value
    let difference = 100 - roundedValues.reduce((sum, v) => sum + v, 0); // Compute the difference

    // Adjust the largest value to make the sum exactly 100%
    let maxIndex = roundedValues.indexOf(Math.max(...roundedValues));
    roundedValues[maxIndex] += difference; 

    return roundedValues;
}


  const dataPieCount = [
    {
      name: "Booked",
      value: bookedCntValue,
      count:
        // decryptData
        getDashboardDetails?.piechart?.bookingCount,
    },
    {
      name: "Cancelled",
      value: cancelledCntValue,
      count:
        // decryptData
        getDashboardDetails?.piechart?.cancellationCount,
    },
    {
      name: "Refunded",
      value: refundedCntValue,
      count:
        // decryptData
        getDashboardDetails?.piechart?.cancellationCount,
    },
  ];
const per = ((CntNo1 / (CntNo1 + CntNo2 + CntNo3)) * 100).toFixed(2)
console.log(bookedCntValue,cancelledCntValue,refundedCntValue,"perperper")
  const PieTooltip1 = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const tooltipData = payload[0]?.payload; // Fetch data correctly
      const { name, amount } = tooltipData || {};

      return (
        <div className="bg-white text-[1vw] p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#1f4b7f]">
          <p className="">
            {name}:
            <span className="font-bold">
              ₹
              {amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  const PieTooltip2 = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const tooltipData = payload[0]?.payload; // Fetch data correctly
      const { name, count } = tooltipData || {};

      return (
        <div className="bg-white text-[1vw] p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#1f4b7f]">
          <p className="">
            {name}: <span className="font-bold">{count}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  const COLORS = ["#02CA70", "#FF574B", "#3E7DFB"];

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
console.log(payload,"paypaypay")
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const offset = 2;
    const labelX = cx + (outerRadius + offset) * cos; // Horizontal position based on angle
    const labelY = cy + (outerRadius + offset) * sin - 2; // Vertical position, moved 30px above

    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <g>
        <text x={cx} y={cy} textAnchor="middle">
          <tspan
            x={cx}
            dy="-7.5"
            fontSize="0.85vw"
            fontWeight="lighter"
            fill="#737373"
          >
            {swap === "amount"
              ? "Total Amount"
              : swap === "count" && "Total Count"}
          </tspan>
          <tspan
            x={cx}
            dy="35"
            fontWeight="bold"
            fontSize="1.75vw"
            fill="black"
          >
            {swap === "amount"
              ? formatNumber(AmtNo1 + AmtNo2)
              : swap === "count" && formatNumber(CntNo1 + CntNo2)}
          </tspan>
        </text>

        {/* Active Pie Sector */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          // outerRadius={hoveredIndex === payload.name ? outerRadius + 12 : outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {/* Circle above the slice */}
        <circle
          cx={labelX}
          // cx={hoveredIndex === payload.name ? labelX + 12 : labelX }
          cy={labelY}
          // cy={hoveredIndex === payload.name ? labelY + 12 : labelY }
          r="1vw"
          fill="white"
          stroke={fill}
          strokeWidth={2}
        />
        {/* <rect
          x={x - 20} // Adjust horizontal positioning
          y={y - 10} // Adjust vertical positioning
          width="40" // Wider than height to get the tablet look
          height="15"
          rx="10" // Rounded corners to create the tablet effect
          ry="10"
          fill="white"
          stroke={fill}
          strokeWidth={2}
        /> */}

        {/* Value inside the circle */}
        <text
          // x={labelX}
          x={hoveredIndex === payload.name ? labelX + 12 : labelX }
          // y={labelY}
          y={hoveredIndex === payload.name ? labelY + 12 : labelY}
          // x={x - 2.5} // Adjust horizontal positioning
          // y={y - 2.5} // Adjust vertical positioning
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-gray-800 font-semibold text-[0.8vw]"
        >
          {value}%

        </text>
      </g>
    );
  };

  const RADIAN = Math.PI / 180;

  // const needle = (percentage, cx, cy, iR, oR, color) => {
  //   const offset = 4.5
  //   const ang = 180 - (percentage * 180) / 100 - offset; // Corrected calculation
  //   const length = (iR + 2 * oR) / 3;
  // const sin = Math.sin(-RADIAN * ang);
  // const cos = Math.cos(-RADIAN * ang);
  // const r = 5;
  // const x0 = cx; // Match Pie cx
  // const y0 = cy; // Match Pie cy
  // const xba = x0 + r * sin;
  // const yba = y0 - r * cos;
  // const xbb = x0 - r * sin;
  // const ybb = y0 + r * cos;
  // const xp = x0 + length * cos;
  // const yp = y0 + length * sin;

  // return [
  //   <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
  //   <path d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
  // ];

  // };

  const getNeedleSize = () => {
    return Math.max(3, window.innerWidth * 0.005); // Adjust size based on screen width
  };
  const [needleSize, setNeedleSize] = useState(getNeedleSize());

  useEffect(() => {
    const handleResize = () => {
      setNeedleSize(getNeedleSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const needle = (percentage, cx, cy, iR, oR, color) => {
    const offset = 0;
    const ang = 180 - (percentage * 180) / 100 + offset;

    const r = needleSize; // Now it's dynamic!
    // const length = (iR + 2 * oR) / 4 * (window.innerWidth / 1000);
    const length = ((iR + 2 * oR) / 3.5) * (window.innerWidth / 1200);

    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);

    const x0 = cx,
      y0 = cy;
    const xba = x0 + r * sin,
      yba = y0 - r * cos;
    const xbb = x0 - r * sin,
      ybb = y0 + r * cos;
    const xp = x0 + length * cos,
      yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="none"
        fill={color}
      />,
    ];
  };

  const needleValue = parseFloat(
    (abhiBalance || "0").toString().replace(/,/g, "")
  );
  console.log(needleValue, "balancebalance");

  const leftValue = Number((200000 - needleValue).toFixed(2));
  const rightValue = Number(needleValue.toFixed(2));
  const percentage = Math.round((leftValue / 200000) * 100); // Convert 0-200000 scale to 0-100
  const needlaChartdata = [
    { name: "Booked", value: leftValue, color: "#ff574b" },
    { name: "Balance", value: rightValue, color: "#02ca70" },
  ];

  const handleAmtBarChartFilter = (value) => {
    console.log(value, "activeactive");
    if (value === "Weekly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",1,1)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 1, 1);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 1, 1);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
      }
    } else if (value === "Monthly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",2,1)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 2, 1);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 2, 1);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 2, 1);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 2, 1);
      }
    } else if (value === "Yearly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",3,1)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 3, 1);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 3, 1);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 3, 1);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 3, 1);
      }
    }
  };

  const handleCntBarChartFilter = (value) => {
    console.log(value, "activeactive");
    if (value === "Weekly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",1,2)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 2);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 1, 2);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 1, 2);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 2);
      }
    } else if (value === "Monthly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",2,2)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 2, 2);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 2, 2);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 2, 2);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 2, 2);
      }
    } else if (value === "Yearly") {
      // GetDashboardDetails(dispatch,setSpinning,1,"null","null",3,2)
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 3, 2);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 3, 2);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 3, 2);
      } else {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 3, 2);
      }
    }
  };

  useEffect(() => {
    if (swap === "amount" && !dates) {
      // GetBarChartDetails(dispatch, 1, 1);
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 1);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 1, 1);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 1, 1);
      }
    } else if (swap === "count" && !dates) {
      // GetBarChartDetails(dispatch, 1, 2);
      if (deviceid === 0) {
        GetDashboardDetails(dispatch, setSpinning, 0, "null", "null", 1, 2);
      } else if (deviceid === 1) {
        GetDashboardDetails(dispatch, setSpinning, 1, "null", "null", 1, 2);
      } else if (deviceid === 2) {
        GetDashboardDetails(dispatch, setSpinning, 2, "null", "null", 1, 2);
      }
    }
  }, [swap]);
  // const barChartDetails =
  //   useSelector((state) => state.crm.barchart_details) || [];
  const barChartDetails = getDashboardDetails.barchart || [];
  console.log(barChartDetails, "detaildetails");

  const baseFare = Number(
    // decryptData
    getDashboardDetails?.piechart?.baseFare
  ).toFixed(2);
  const tbsDeal = Number(
    // decryptData
    getDashboardDetails?.piechart?.tbsDealAmount
  ).toFixed(2);
  const tbsFare = baseFare - tbsDeal;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      console.log(entries);
    });

    observer.observe(document.body);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  const ncx = (8.05 / 100) * window.innerWidth;
  const ncy = (12.45 / 100) * window.innerWidth;
  const chartWidth = document.querySelector("recharts-wrapper");
  const chartHeight = document.querySelector("recharts-wrapper");
  const needleWidth = chartWidth * 0.05; // Adjust the factor as needed
  const needleHeight = chartHeight * 10;

  const { RangePicker } = DatePicker;

  const handleAmount = async (values) => {
    setSwap("amount");
    if (isView === "All") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        0,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        1
      );
    } else if (isView === "Desktop") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        1,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        1
      );
    } else if (isView === "Mobile") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        2,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        1
      );
    }
  };

  const handleCount = async (values) => {
    setSwap("count");
    if (isView === "All") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        0,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        2
      );
    } else if (isView === "Desktop") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        1,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        2
      );
    } else if (isView === "Mobile") {
      await GetDashboardDetails(
        dispatch,
        setSpinning,
        2,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD"),
        1,
        2
      );
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // const options = { day: "2-digit", month: "short", year: "numeric" };
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatDate2 = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate.replace(/(\d{2} \w{3})/, "$1,");
  };

  return (
    <div>
      <div className="w-full h-[78.5vh] rounded-[1vw] bg-[#fff] mt-[0.01vw] border-[#1f4b7f] border-t-[0.1vw] border-l-[0.1vw] border-r-[0.2vw] border-b-[0.2vw] p-[1vw]">
        {/* bg-[#1f4a7f34] */}
        {spinning ? (
          <div className="absolute top-[50vh] left-[50vw] flex justify-center items-center  z-10 col-span-6">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-6 h-full">
            <div className="relative col-span-1">
              <div className="w-full h-full bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] dash-container2">
                <div className="pt-[1vw] flex justify-center items-end gap-[0.25vw]">
                  <p className="text-[#737373] text-[1vw]">AbhiBus</p>
                  <p className="text-[#0A0A0A] font-bold text-[1.1vw]">Wallet</p>
                </div>
                <div className="relative w-full h-[15vw] -ml-[0.35vw] -mt-[4vw]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      {/* <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={180 - (percentage * 180) / 100} // Corrected calculation
                        data={[{ name: "Deposited", value: leftValue }]}
                        cx="52.5%"
                        cy="85%"
                        innerRadius="85%"
                        outerRadius="100%"
                        fill="#ff574b"
                        stroke="none"
                      >
                        <Cell fill="#ff574b" />
                      </Pie>

                      <Pie
                        dataKey="value"
                        startAngle={180 - (percentage * 180) / 100} // Adjusted calculation
                        endAngle={0}
                        data={[{ name: "Gained", value: rightValue }]}
                        cx="52.5%"
                        cy="85%"
                        innerRadius="85%"
                        outerRadius="100%"
                        fill="#02ca70"
                        stroke="none"
                      >
                        <Cell fill="#02ca70" />
                      </Pie> */}

                      <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0} // Unified range
                        data={needlaChartdata}
                        cx="52.5%"
                        cy="85%"
                        innerRadius="85%"
                        outerRadius="100%"
                        fill="#02ca70"
                        stroke="none"
                      >
                        {needlaChartdata.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>

                      {/* <ReTooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} /> */}
                      {/* <ReTooltip content={<NeedleTooltip />} /> */}
                      {needle(percentage, ncx, ncy, 85, 100, "#000")}
                      {console.log("Needle Position - ncx:", ncx, "ncy:", ncy)}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between px-[0.5vw] -mt-[2.5vw] text-[0.75vw]">
                  <p>₹0</p>
                  <p>₹200k</p>
                </div>

                <div className="relative font-bold flex justify-center items-center pt-[1vw] ml-[1vw] mt-[1vw]">
                  <img src={spent} className="w-[4.75vw] absolute left-0 z-10"/>
                  <p className="text-white absolute z-20 left-[0.25vw] text-[0.9vw] drop-shadow-md">Spent</p>
                  <p className="bg-[#F9CBC8] w-[11.5vw] pr-[1vw] rounded-r-full pt-[0.1vw] absolute left-[2vw] text-[1.25vw] flex justify-end">₹ {leftValue.toLocaleString()}{" "}</p>
                </div>
                <div className="relative font-bold flex justify-center items-center pt-[1vw] ml-[1vw] mt-[2vw]">
                  <img src={balance} className="w-[4.75vw] absolute left-0 z-10"/>
                  <p className="text-white absolute z-20 left-[0.25vw] text-[0.9vw] drop-shadow-md">Balance</p>
                  <p className="bg-[#9BEFCF] w-[11.5vw] pr-[1vw] rounded-r-full pt-[0.1vw] absolute left-[2vw] text-[1.25vw] flex justify-end">₹ {rightValue.toLocaleString()}{" "}</p>
                </div>
                
               <img
                  src={dashMan}
                  className="absolute -bottom-[1vw] -left-[0.5vw]"
                  alt="human"
                ></img>
              </div>
            </div>
            <div className="col-span-4 grid grid-rows-4">
              {swap === "amount" ? (
                <div className="row-span-1 grid grid-cols-3 gap-[1vw] px-[1vw]">
                  <div className="bg-[#02CA70] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative dash-container2 flex flex-col justify-center">
                    <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                      Booked Tickets
                    </p>
                    <div className="flex justify-between relative z-[10]">
                      <div className="h-[4vw] text-[#fff]">
                        <p className="text-[2vw] font-bold ">
                          {
                            // decryptData
                            getDashboardDetails?.piechart?.totalFare >= 1000 ? (
                              <Tooltip
                                placement="right"
                                title={`₹ ${Number(
                                  getDashboardDetails?.piechart?.totalFare
                                  // decryptData(getDashboardDetails?.piechart?.totalFare)
                                ).toLocaleString("en-IN")}`}
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
                                      getDashboardDetails?.piechart?.totalFare
                                      // decryptData(getDashboardDetails?.piechart?.totalFare)
                                    ).toFixed(2)
                                  )}
                                  {/* {console.log(typeof(decryptData(getDashboardDetails.totalFare)),"type of base fare")} */}
                                  {/* {console.log(Number(decryptData(getDashboardDetails.totalFare)).toLocaleString(),"type of base fare 2")} */}
                                </p>
                              </Tooltip>
                            ) : (
                              <p className="text-[#fff]">
                                ₹{" "}
                                {Number(
                                  getDashboardDetails?.piechart?.totalFare
                                  // decryptData(getDashboardDetails?.piechart?.totalFare)
                                ).toFixed(2)}
                              </p>
                            )
                          }
                        </p>
                        <p
                          className="underline text-[1vw] cursor-pointer"
                          onClick={() => setTable("bookings")}
                        >
                          View entire list
                        </p>
                      </div>
                      {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                      <div className="relative border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                        <img
                          src={ticket}
                          className=""
                          alt="booked ticket"
                        ></img>
                        <img
                          src={greenTick}
                          className="absolute w-[1.65vw] top-[1.9vw] left-[1.85vw]"
                          alt="tick symbol"
                        ></img>
                      </div>
                    </div>
                    <div className="absolute right-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                    </div>
                    <div className="absolute top-0 z-[0]">
                      <img
                        src={dashes1}
                        alt="dash pattern"
                        className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                      ></img>
                      <img
                        src={dashes2}
                        alt="dash pattern"
                        className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                      ></img>
                    </div>
                  </div>
                  <div className="bg-[#FF574B] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative dash-container2 flex flex-col justify-center">
                    <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                      Cancelled Tickets
                    </p>
                    <div className="flex justify-between relative z-[10]">
                      <div className="h-[4vw] text-[#fff]">
                        <p className="text-[2vw] font-bold ">
                          {/* {console.log(typeof(decryptData(getDashboardDetails.cancellationRefund)),"type of base fare")} */}
                          {/* {console.log(Number(decryptData(getDashboardDetails.cancellationRefund)).toLocaleString(),"type of base fare 2")} */}
                          {
                            // decryptData
                            getDashboardDetails?.piechart?.cancellationRefund >=
                            1000 ? (
                              <Tooltip
                                placement="right"
                                title={`₹ ${Number(
                                  // decryptData(
                                  getDashboardDetails?.piechart
                                    ?.cancellationRefund
                                  // )
                                ).toLocaleString("en-IN")}`}
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
                                      // decryptData(
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                      // )
                                    ).toFixed(2)
                                  )}
                                </p>
                              </Tooltip>
                            ) : (
                              <p className="text-[#fff]">
                                ₹{" "}
                                {Number(
                                  // decryptData(
                                  getDashboardDetails?.piechart
                                    ?.cancellationRefund
                                  // )
                                ).toFixed(2)}
                              </p>
                            )
                          }
                        </p>
                        <p
                          className="underline text-[1vw] cursor-pointer"
                          onClick={() => setTable("cancellation")}
                        >
                          View entire list
                        </p>
                      </div>
                      {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                      <div className="relative border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                        <img src={ticket} className="" alt="ticket"></img>
                        <img
                          src={redCross}
                          className="absolute w-[1.65vw] top-[1.9vw] left-[1.85vw]"
                          alt="cancelled symbol"
                        ></img>
                      </div>
                    </div>
                    <div className="absolute right-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                    </div>
                    <div className="absolute left-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                    </div>
                    <div className="absolute top-0 z-[0]">
                      <img
                        src={dashes1}
                        alt="dash pattern"
                        className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                      ></img>
                      <img
                        src={dashes2}
                        alt="dash pattern"
                        className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                      ></img>
                    </div>
                  </div>
                  <div className="bg-[#3E7DFB] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative dash-container2 flex flex-col justify-center">
                    <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                      Refunded Tickets
                    </p>
                    <div className="flex justify-between relative z-[10]">
                      <div className="h-[4vw] text-[#fff]">
                        <p className="text-[2vw] font-bold">
                          {
                            // decryptData
                            getDashboardDetails?.piechart?.cancellationRefund >=
                            1000 ? (
                              <Tooltip
                                placement="right"
                                title={`₹ ${Number(
                                  // decryptData(
                                  getDashboardDetails?.piechart
                                    ?.cancellationRefund
                                  // )
                                ).toLocaleString("en-IN")}`}
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
                                      // decryptData(
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                      // )
                                    ).toFixed(2)
                                  )}
                                  {/* {console.log(typeof(decryptData(getDashboardDetails.totalFare)),"type of base fare")} */}
                                  {/* {console.log(Number(decryptData(getDashboardDetails.totalFare)).toLocaleString(),"type of base fare 2")} */}
                                </p>
                              </Tooltip>
                            ) : (
                              <p className="text-[#fff]">
                                ₹{" "}
                                {Number(
                                  // decryptData(
                                  getDashboardDetails?.piechart
                                    ?.cancellationRefund
                                  // )
                                ).toFixed(2)}
                              </p>
                            )
                          }
                        </p>
                        <p
                          className="underline text-[1vw] cursor-pointer"
                          onClick={() => setTable("cancellation")}
                        >
                          View entire list
                        </p>
                      </div>
                      {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                      <div className="relative border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                        <img src={ticket} className="" alt="ticket"></img>
                        <img
                          src={blueRev}
                          className="absolute w-[1.65vw] top-[1.9vw] left-[1.85vw]"
                          alt="refunded symbol"
                        ></img>
                      </div>
                    </div>
                    <div className="absolute left-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                    </div>
                    <div className="absolute top-0 z-[0]">
                      <img
                        src={dashes1}
                        alt="dash pattern"
                        className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                      ></img>
                      <img
                        src={dashes2}
                        alt="dash pattern"
                        className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                      ></img>
                    </div>
                  </div>
                </div>
              ) : (
                swap === "count" && (
                  <div className="row-span-1 grid grid-cols-3 gap-[1vw] px-[1vw]">
                    <div className="bg-[#02CA70] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative flex flex-col justify-center">
                      <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                        Booked Tickets
                      </p>
                      <div className="flex justify-between relative z-[10]">
                        <div className="h-[4vw] text-[#fff]">
                          <p className="text-[2vw] font-bold ">
                            {
                              // decryptData
                              getDashboardDetails?.piechart?.bookingCount >=
                              1000 ? (
                                <Tooltip
                                  placement="right"
                                  title={Number(
                                    // decryptData
                                    getDashboardDetails?.piechart?.bookingCount
                                  ).toLocaleString("en-IN")}
                                  className="cursor-pointer text-[#1F487C]"
                                  color="white"
                                  overlayInnerStyle={{
                                    color: "#1F487C",
                                    fontSize: "2vw",
                                  }}
                                >
                                  <p className="text-[#fff]">
                                    {formatNumber(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.bookingCount
                                    )}
                                  </p>
                                </Tooltip>
                              ) : (
                                <p className="text-[#fff]">
                                  {
                                    // decryptData
                                    getDashboardDetails?.piechart?.bookingCount
                                  }
                                </p>
                              )
                            }
                          </p>
                          <p
                            className="underline text-[1vw] cursor-pointer"
                            onClick={() => setTable("bookings")}
                          >
                            View entire list
                          </p>
                        </div>
                        {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                        <div className="border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                          <img
                            src={ticket}
                            className=""
                            alt="booked ticket"
                          ></img>
                        </div>
                      </div>
                      <div className="absolute right-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      </div>
                      <div className="absolute top-0 z-[0]">
                        <img
                          src={dashes1}
                          alt="dash pattern"
                          className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                        ></img>
                        <img
                          src={dashes2}
                          alt="dash pattern"
                          className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                        ></img>
                      </div>
                    </div>
                    <div className="bg-[#FF574B] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative flex flex-col justify-center">
                      <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                        Cancelled Tickets
                      </p>
                      <div className="flex justify-between relative z-[10]">
                        <div className="h-[4vw] text-[#fff]">
                          <p className="text-[2vw] font-bold ">
                            {
                              // decryptData
                              getDashboardDetails?.piechart
                                ?.cancellationCount >= 1000 ? (
                                <Tooltip
                                  placement="right"
                                  title={Number(
                                    // decryptData
                                    getDashboardDetails?.piechart
                                      ?.cancellationCount
                                  ).toLocaleString("en-IN")}
                                  className="cursor-pointer text-[#1F487C]"
                                  color="white"
                                  overlayInnerStyle={{
                                    color: "#1F487C",
                                    fontSize: "2vw",
                                  }}
                                >
                                  <p className="text-[#fff]">
                                    {formatNumber(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationCount
                                    )}
                                  </p>
                                </Tooltip>
                              ) : (
                                <p className="text-[#fff]">
                                  {
                                    // decryptData
                                    getDashboardDetails?.piechart
                                      ?.cancellationCount
                                  }
                                </p>
                              )
                            }
                          </p>
                          <p
                            className="underline text-[1vw] cursor-pointer"
                            onClick={() => setTable("cancellation")}
                          >
                            View entire list
                          </p>
                        </div>
                        {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                        <div className="relative border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                          <img src={ticket} className="" alt="ticket"></img>
                          <img
                            src={redCross}
                            className="absolute w-[1.65vw] top-[1.9vw] left-[1.85vw]"
                            alt="cancelled symbol"
                          ></img>
                        </div>
                      </div>
                      <div className="absolute right-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-l-full"></div>
                      </div>
                      <div className="absolute left-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      </div>
                      <div className="absolute top-0 z-[0]">
                        <img
                          src={dashes1}
                          alt="dash pattern"
                          className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                        ></img>
                        <img
                          src={dashes2}
                          alt="dash pattern"
                          className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                        ></img>
                      </div>
                    </div>
                    <div className="bg-[#3E7DFB] col-span-1 rounded-[1.5vw] py-[1vw] px-[2vw] relative flex flex-col justify-center">
                      <p className="text-[1vw] text-[#fff] font-semibold relative z-[10]">
                        Refunded Tickets
                      </p>
                      <div className="flex justify-between relative z-[10]">
                        <div className="h-[4vw] text-[#fff]">
                          <p className="text-[2vw] font-bold ">
                            {
                              // decryptData
                              getDashboardDetails?.piechart
                                ?.cancellationCount >= 1000 ? (
                                <Tooltip
                                  placement="right"
                                  title={Number(
                                    // decryptData
                                    getDashboardDetails?.piechart
                                      ?.cancellationCount
                                  ).toLocaleString("en-IN")}
                                  className="cursor-pointer text-[#1F487C]"
                                  color="white"
                                  overlayInnerStyle={{
                                    color: "#1F487C",
                                    fontSize: "2vw",
                                  }}
                                >
                                  <p className="text-[#fff]">
                                    {formatNumber(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationCount
                                    )}
                                  </p>
                                </Tooltip>
                              ) : (
                                <p className="text-[#fff]">
                                  {
                                    // decryptData
                                    getDashboardDetails?.piechart
                                      ?.cancellationCount
                                  }
                                </p>
                              )
                            }
                          </p>
                          <p
                            className="underline text-[1vw] cursor-pointer"
                            onClick={() => setTable("cancellation")}
                          >
                            View entire list
                          </p>
                        </div>
                        {/* {console.log(getDashboardDetails.totalFare, "TOTAL FARE")} */}
                        <div className="relative border-0 bg-white rounded-full p-[0.5vw] w-[4vw] h-[4vw]">
                          <img src={ticket} className="" alt="ticket"></img>
                          <img
                            src={blueRev}
                            className="absolute w-[1.65vw] top-[1.9vw] left-[1.85vw]"
                            alt="refunded symbol"
                          ></img>
                        </div>
                      </div>
                      <div className="absolute left-[0] top-[1.5vw] flex flex-col gap-[1.5vw]">
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                        <div className="w-[1vw] h-[0.5vw] bg-white rounded-r-full"></div>
                      </div>
                      <div className="absolute top-0 z-[0]">
                        <img
                          src={dashes1}
                          alt="dash pattern"
                          className="mt-[0.5vw] opacity-[0.75] w-[14vw]"
                        ></img>
                        <img
                          src={dashes2}
                          alt="dash pattern"
                          className="ml-[3vw] -mt-[2vw] opacity-[0.75] w-[14vw]"
                        ></img>
                      </div>
                    </div>
                  </div>
                )
              )}
              {/* Bar Chart */}
              <div className="row-span-2 grid grid-cols-1 px-[1vw] pt-[1vw]">
                {swap === "amount" ? (
                  <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] px-[1vw] py-[1vw] dash-container2 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-end gap-[0.25vw]">
                        <p className="text-[#737373] text-[1vw]">Amount</p>
                        <p className="text-[#0A0A0A] font-bold text-[1.1vw]">
                          Performance
                        </p>
                      </div>
                      {/* {activePicker === "Weekly" && (
                        <div className="flex gap-[2vw]">
                        <button className="flex items-center text-[0.75vw] bg-white clip-flag py-[0.25vw] px-[0.5vw] shadow-lg shadow-black"><MdKeyboardArrowLeft />
                        Prev Week</button>
                        <button className="flex items-center text-[0.75vw] bg-white clip-flag-right py-[0.25vw] px-[0.5vw] shadow-lg shadow-black">Next Week<MdKeyboardArrowRight />
                        </button>
                      </div>
                      )} */}

                      <div className="flex items-center gap-[0.5vw]">
                        <div className="flex gap-[0.5vw] text-[0.85vw]">
                          <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                            <div className="bg-[#02CA70] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            <p>Booked</p>
                          </div>
                          <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                            <div className="bg-[#FF574B] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            <p>Cancelled</p>
                          </div>
                          <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                            <div className="bg-[#3E7DFB] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            <p>Refunded</p>
                          </div>
                        </div>
                        {dates ? (
                          ""
                        ) : (
                          <div className="flex items-center bg-[#1F4B7F80] p-[0.25vw] rounded-[0.75vw] w-[14.75vw]">
                            {["Weekly", "Monthly", "Yearly"].map((type) => (
                              <button
                                key={type}
                                onClick={() => {
                                  if (activePicker !== type) {
                                    setActivePicker(type);
                                  }
                                  handleAmtBarChartFilter(type);
                                }}
                                className={`px-[1vw] py-[0.25vw] rounded-[0.5vw] text-[0.85vw] capitalize ${
                                  activePicker === type
                                    ? "bg-white text-[#1F487C] font-bold"
                                    : " text-white"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative w-full h-full">
                      {/* <p>weekly</p> */}
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={barChartDetails}
                          barSize={10}
                          margin={{
                            top: 5,
                            right: 10,
                            left: -20,
                            bottom: -10,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            tickFormatter={(value) => {
                              console.log("Tick Value:", value);
                              return !barChartDetails[0].date && dates
                                ? formatDate(value)
                                : value;
                            }}
                            className="text-[0.85vw]"
                          />
                          <YAxis
                            // tickCount={6}
                            interval={0}
                            tickFormatter={(value) =>
                              value === 0 ? "0" : `${value / 1000}k`
                            }
                            className="text-[0.85vw]"
                          />

                          <ReTooltip content={<CustomTooltip />} />

                          {/* <Legend /> */}
                          <Bar
                            dataKey="Booked"
                            // stackId="a"
                            fill="#02CA70"
                            radius={[10, 10, 0, 0]}
                          />
                          <Bar
                            dataKey="Cancelled"
                            // stackId="a"
                            fill="#FF574B"
                            radius={[10, 10, 0, 0]}
                          />
                          <Bar
                            dataKey="Cancelled"
                            // stackId="a"
                            fill="#3E7DFB"
                            radius={[10, 10, 0, 0]}
                          />
                          {/* <Bar
                              dataKey="Refunded"
                              stackId="a"
                              fill="#3E7DFB"
                              radius={[10, 10, 0, 0]}

                            /> */}
                          {/* <Scatter
                              dataKey="Booked"
                              fill="#02CA70"
                              line
                              shape={() => null}
                              tooltipType="none"
                            />
                            <Scatter
                              dataKey="Cancelled"
                              fill="#FF574B"
                              line
                              shape={() => null}
                              tooltipType="none"
                            /> */}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  swap === "count" && (
                    <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] px-[1vw] py-[1vw] dash-container2 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-end gap-[0.25vw]">
                          <p className="text-[#737373] text-[1vw]">Count</p>
                          <p className="text-[#0A0A0A] font-bold text-[1.1vw]">
                            Performance
                          </p>
                        </div>
                        <div className="flex items-center gap-[0.5vw]">
                          <div className="flex gap-[0.5vw] text-[0.85vw]">
                            <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                              <div className="bg-[#02CA70] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              <p>Booked</p>
                            </div>
                            <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                              <div className="bg-[#FF574B] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              <p>Cancelled</p>
                            </div>
                            <div className="border-[0.1vw] border-[#1F4B7F80] flex items-center gap-[0.25vw] px-[0.5vw] rounded-[0.5vw]">
                              <div className="bg-[#3E7DFB] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              <p>Refunded</p>
                            </div>
                          </div>
                          {dates ? (
                            ""
                          ) : (
                            <div className="flex items-center bg-[#1F4B7F80] p-[0.25vw] rounded-[0.75vw] w-[14.75vw]">
                              {["Weekly", "Monthly", "Yearly"].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => {
                                    if (activePicker !== type) {
                                      setActivePicker(type);
                                    }
                                    handleCntBarChartFilter(type);
                                  }}
                                  className={`px-[1vw] py-[0.25vw] rounded-[0.5vw] text-[0.85vw] capitalize ${
                                    activePicker === type
                                      ? "bg-white text-[#1F487C] font-bold"
                                      : " text-white"
                                  }`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="relative w-full h-full">
                        {/* <p>Monthly</p> */}
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={barChartDetails}
                            barSize={10}
                            margin={{
                              top: 5,
                              right: 10,
                              left: -20,
                              bottom: -10,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="name"
                              tickFormatter={(value) => {
                                return !barChartDetails[0].date && dates
                                  ? formatDate(value)
                                  : value;
                              }}
                              className="text-[0.85vw]"
                            />
                            <YAxis
                              // tickCount={6}
                              interval={0}
                              tickFormatter={(value) => `${value}`}
                              className="text-[0.85vw]"
                            />

                            <ReTooltip content={<CustomTooltip />} />

                            {/* <Legend /> */}
                            <Bar
                              dataKey="Booked"
                              // stackId="a"
                              fill="#02CA70"
                              radius={[10, 10, 0, 0]}
                            />
                            <Bar
                              dataKey="Cancelled"
                              // stackId="a"
                              fill="#FF574B"
                              radius={[10, 10, 0, 0]}
                            />
                            <Bar
                              dataKey="Cancelled"
                              // stackId="a"
                              fill="#3E7DFB"
                              radius={[10, 10, 0, 0]}
                            />
                            {/* <Bar
                                dataKey="Refunded"
                                stackId="a"
                                fill="#3E7DFB"
                                radius={[10, 10, 0, 0]}

                              /> */}
                            {/* <Scatter
                                dataKey="Booked"
                                fill="#02CA70"
                                line
                                shape={() => null}
                                tooltipType="none"
                              />
                              <Scatter
                                dataKey="Cancelled"
                                fill="#FF574B"
                                line
                                shape={() => null}
                                tooltipType="none"
                              /> */}
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* SVG for manual lines */}
                      {/* <svg width="100%" height="100%" style={{ position: "absolute", pointerEvents: "none" }}>
        {barPositions.map((pos, index) => {
          if (index < barPositions.length - 3) { // Making sure we connect within valid indices
            return (
              <g key={index}>
                <line x1={pos.x} y1={pos.y} x2={barPositions[index + 3]?.x} y2={barPositions[index + 3]?.y} stroke="#FF574B" strokeWidth="2" />
                <line x1={pos.x} y1={pos.y} x2={barPositions[index + 3]?.x} y2={barPositions[index + 3]?.y} stroke="#02CA70" strokeWidth="2" />
                <line x1={pos.x} y1={pos.y} x2={barPositions[index + 3]?.x} y2={barPositions[index + 3]?.y} stroke="#3E7DFB" strokeWidth="2" />
              </g>
            );
          }
        })}
      </svg> */}

                      {/* <Line
                                type="mono"
                                dataKey="Booked"
                                stroke="#02CA70"
                                dot={false}
                                x="60px"
                              />
                              <Line
                                type="monotone"
                                dataKey="Cancelled"
                                stroke="#FF574B"
                                dot={false}
                              /> */}

                      {/* <Line
                                type="monotone"
                                dataKey="Refunded"
                                stroke="#3E7DFB"
                                dot={false}
                              /> */}
                      {/* <Scatter
                                dataKey="Booked"
                                fill="#02CA70"
                                line
                                shape={() => null}
                                tooltipType="none"
                              />
                              <Scatter
                                dataKey="Cancelled"
                                fill="#FF574B"
                                line
                                shape={() => null}
                                tooltipType="none"
                              /> */}
                      {/* <ScatterChart data={dataBarWeek} margin={{
                                top: 5,
                                right: 10,
                                left: -20,
                                bottom: -10,
                              }}
                              className="-mt-[10vw]">
                                <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `${value}`} />
                              <Scatter dataKey="Booked" fill="#02CA70" line/>
                            </ScatterChart>
                            <ScatterChart data={dataBarWeek} margin={{
                                top: 5,
                                right: 10,
                                left: -20,
                                bottom: -10,
                              }}>
                            <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `${value}`} />
                              <Scatter dataKey="Cancelled" fill="#FF574B" line />
                            </ScatterChart>
                            <ScatterChart data={dataBarWeek} margin={{
                                top: 5,
                                right: 10,
                                left: -20,
                                bottom: -10,
                              }}>
                            <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `${value}`} />
                              <Scatter dataKey="Refunded" fill="#3E7DFB" line />
                            </ScatterChart> */}
                    </div>
                  )
                )}
              </div>
              <div className="row-span-1 grid grid-cols-4 gap-[1vw] px-[1vw] pt-[1vw]">
                <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] col-span-1 dash-container2 grid grid-cols-7">
                  <div className="col-span-2 bg-[#4848484D] border-r-[0.2vw] border-r-[#535353] rounded-l-[1.5vw] flex justify-center items-center">
                    <img
                      src={fareIcon}
                      alt="base fare icon"
                      className="bg-[#535353] p-[0.5vw] rounded-full"
                    />
                  </div>
                  <div className="col-span-5 pr-[1vw] py-[1vw] flex flex-col justify-center">
                    <p className="text-[1vw] flex items-end justify-end gap-[0.25vw] text-[#737373]">
                      Base
                      <soan className="font-bold text-[1.1vw] text-[#0A0A0A]">
                        Fare
                      </soan>
                    </p>

                    <div className="flex justify-end">
                      {/* <TbReceiptRupee className="text-[2vw]" /> */}

                      <p className="text-[2vw] font-bold">
                        {
                          // decryptData
                          getDashboardDetails?.piechart?.baseFare >= 1000 ? (
                            <Tooltip
                              placement="right"
                              title={`₹ ${Number(
                                // decryptData
                                getDashboardDetails?.piechart?.baseFare
                              ).toLocaleString("en-IN")}`}
                              className="cursor-pointer text-[#404040]"
                              color="white"
                              overlayInnerStyle={{
                                color: "#1F487C",
                                fontSize: "1.5vw",
                              }}
                            >
                              <p className="text-[#404040]">
                                ₹{" "}
                                {formatNumber(
                                  // decryptData
                                  getDashboardDetails?.piechart?.baseFare
                                )}
                              </p>
                            </Tooltip>
                          ) : (
                            <p className="text-[#404040]">
                              ₹{" "}
                              {
                                // decryptData
                                Number(
                                  getDashboardDetails?.piechart?.baseFare
                                ).toFixed(2)
                              }
                            </p>
                          )
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] col-span-1 dash-container2 grid grid-cols-7">
                  <div className="col-span-2 bg-[#02CA704D] border-r-[0.2vw] border-r-[#02CA70] rounded-l-[1.5vw] flex justify-center items-center">
                    <img
                      src={fareIcon}
                      alt="tbs fare icon"
                      className="bg-[#02CA70] p-[0.5vw] rounded-full"
                    />
                  </div>
                  <div className="col-span-5 pr-[1vw] py-[1vw] flex flex-col justify-center">
                    <p className="text-[1vw] flex items-end justify-end gap-[0.25vw] text-[#02CA70]">
                      TBS
                      <soan className="font-bold text-[1.1vw] text-[#02CA70]">
                        Fare
                      </soan>
                    </p>

                    <div className="flex justify-end">
                      {/* <TbReceiptTax className="text-[2vw]" /> */}

                      <p className="text-[2vw] font-bold">
                        {tbsFare >= 1000 ? (
                          <Tooltip
                            placement="right"
                            title={`₹ ${Number(tbsFare).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}`}
                            className="cursor-pointer text-[#02CA70]"
                            color="white"
                            overlayInnerStyle={{
                              color: "#1F487C",
                              fontSize: "1.5vw",
                            }}
                          >
                            <p className="text-[#02CA70]">
                              ₹ {formatNumber(tbsFare)}
                            </p>
                          </Tooltip>
                        ) : (
                          <p className="text-[#02CA70]">
                            ₹ {Number(tbsFare).toFixed(2)}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] col-span-1 dash-container2 grid grid-cols-7">
                  <div className="col-span-2 bg-[#4848484D] border-r-[0.2vw] border-r-[#535353] rounded-l-[1.5vw] flex justify-center items-center">
                    <img
                      src={gstIcon}
                      alt="gst icon"
                      className="bg-[#535353] px-[0.65vw] py-[0.6vw] rounded-full"
                    />
                  </div>
                  <div className="col-span-5 pr-[1vw] py-[1vw] flex flex-col justify-center">
                    <p className="text-[1vw] flex items-end justify-end gap-[0.25vw] text-[#737373]">
                      TBS
                      <soan className="font-bold text-[1.1vw] text-[#0A0A0A]">
                        GST
                      </soan>
                    </p>

                    <div className="flex justify-end">
                      {/* <TbRosetteDiscount className="text-[2vw]" /> */}

                      <p className="text-[2vw] font-bold">
                        {
                          // decryptData
                          getDashboardDetails?.piechart?.gst >= 1000 ? (
                            <Tooltip
                              placement="right"
                              title={`₹ ${Number(
                                // decryptData
                                getDashboardDetails?.piechart?.gst
                              ).toLocaleString("en-IN")}`}
                              className="cursor-pointer text-[#404040]"
                              color="white"
                              overlayInnerStyle={{
                                color: "#1F487C",
                                fontSize: "1.5vw",
                              }}
                            >
                              <p className="text-[#404040]">
                                ₹{" "}
                                {formatNumber(
                                  // decryptData
                                  getDashboardDetails?.piechart?.gst
                                )}
                              </p>
                            </Tooltip>
                          ) : (
                            <p className="text-[#404040]">
                              ₹{" "}
                              {
                                // decryptData
                                Number(
                                  getDashboardDetails?.piechart?.gst
                                ).toFixed(2)
                              }
                            </p>
                          )
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] col-span-1 dash-container2 grid grid-cols-7">
                  <div className="col-span-2 bg-[#02CA704D] border-r-[0.2vw] border-r-[#02CA70] rounded-l-[1.5vw] flex justify-center items-center">
                    <img
                      src={offerIcon}
                      alt="offer icon"
                      className="bg-[#02CA70] px-[0.65vw] py-[0.6vw] rounded-full"
                    />
                  </div>
                  <div className="col-span-5 pr-[1vw] py-[1vw] flex flex-col justify-center">
                    <p className="text-[1vw] flex items-end justify-end gap-[0.25vw] text-[#02CA70]">
                      TBS
                      <soan className="font-bold text-[1.1vw] text-[#02CA70]">
                        Offer
                      </soan>
                    </p>

                    <div className="flex justify-end">
                      {/* <TbRosetteDiscount className="text-[2vw]" /> */}

                      <p className="text-[2vw] font-bold">
                        {
                          // decryptData
                          getDashboardDetails?.piechart?.discountAmount >=
                          1000 ? (
                            <Tooltip
                              placement="right"
                              title={`₹ ${Number(
                                // decryptData
                                getDashboardDetails?.piechart?.discountAmount
                              ).toLocaleString("en-IN")}`}
                              className="cursor-pointer text-[#02CA70]"
                              color="white"
                              overlayInnerStyle={{
                                color: "#1F487C",
                                fontSize: "1.5vw",
                              }}
                            >
                              <p className="text-[#02CA70]">
                                ₹{" "}
                                {formatNumber(
                                  // decryptData
                                  getDashboardDetails?.piechart?.discountAmount
                                )}
                              </p>
                            </Tooltip>
                          ) : (
                            <p className="text-[#02CA70]">
                              ₹{" "}
                              {
                                // decryptData
                                Number(
                                  getDashboardDetails?.piechart?.discountAmount
                                ).toFixed(2)
                              }
                            </p>
                          )
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-4">
              <div className="relative row-span-1 flex items-end justify-end">
                <div className="flex flex-col gap-[0.5vw] ">
                  <div>
                    <img
                      src={arrowGif}
                      className={`absolute ${
                        swap === "amount"
                          ? "right-[10.25vw] -top-[0.1vw] w-[4.75vw] h-[5.25vw]"
                          : "right-[7.75vw] top-[0.15vw] w-[3.75vw] h-[4.25vw]"
                      }`}
                      style={{
                        transform: "rotate(90deg)",
                      }}
                      alt="arrow"
                    />
                    <p
                      onClick={() => {
                        if (dates) {
                          handleAmount(dates);
                        } else {
                          setSwap("amount");
                          setActivePicker("Weekly");
                        }
                      }}
                      className={`bg-[#1F4B7F] text-white py-[0.25vw] pl-[1vw] pr-[0.5vw] clip-flag absolute text-[1vw] cursor-pointer ${
                        swap === "amount"
                          ? "scale-[1.25] right-[1.75vw] top-[1.5vw] font-bold"
                          : "scale-[1] right-[0.75vw] top-[1.25vw]"
                      }`}
                    >
                      Tickets Amount
                    </p>
                  </div>
                  <div className="">
                    <img
                      src={arrowGif}
                      className={`absolute ${
                        swap === "count"
                          ? "right-[9.25vw] top-[2.65vw] w-[4.75vw] h-[5.25vw]"
                          : "right-[7vw] top-[3.4vw] w-[3.75vw] h-[4.25vw]"
                      }`}
                      style={{
                        transform: "rotate(90deg)",
                      }}
                      alt="arrow"
                    />
                    <p
                      onClick={() => {
                        if (dates) {
                          handleCount(dates);
                        } else {
                          setSwap("count");
                          setActivePicker("Weekly");
                        }
                      }}
                      className={`bg-[#1F4B7F] text-white py-[0.25vw] pl-[1vw] pr-[0.5vw] clip-flag absolute text-[1vw] cursor-pointer ${
                        swap === "count"
                          ? "scale-[1.25] right-[1.75vw] top-[4.25vw] font-bold"
                          : "scale-[1] right-[0.75vw] top-[4.5vw]"
                      }`}
                    >
                      Tickets Count
                    </p>
                  </div>
                </div>
                <div className="flex justify-end h-[17vh]">
                  {/* <div className="clip-pole h-[8.5vw] mt-[0.5vw] mr-[0.5vw] w-[2vw] bg-black flex justify-end"></div> */}
                  <img src={flagPole} className="" alt="flag pole"></img>
                </div>
                {/* <div className=" absolute top-[4.75vw] left-[9vw] w-[4.5vw] h-[5vw]">
                  <img
                    src={arrowGif}
                    className="w-[4.5vw] h-[5vw]"
                    style={{
                      transform: "rotate(270deg",
                    }}
                  />
                </div> */}
              </div>
              <div className="row-span-3 bg-gradient-to-b from-[#A9F9EE] to-[#F9FFF1] rounded-[1.5vw] dash-container2 mt-[1vw] p-[1vw]">
                {swap === "amount" ? (
                  <>
                    <div className="flex items-end gap-[0.25vw]">
                      <p className="text-[#737373] text-[1vw]">Total</p>
                      <p className="text-[#0A0A0A] font-bold text-[1.1vw]">
                        Performance
                      </p>
                    </div>

                    {/* Labels & Amount Section */}
                    <div className="mt-[]">
                      <div className="grid grid-cols-3 text-[0.85vw]">
                        <p className="col-span-2">Label</p>
                        <p className="col-span-1 justify-self-end">Amount</p>
                      </div>
                      <hr className="mb-[1vw] border-[0.1vw] border-[#1F4B7F80]"></hr>

                      <div className="grid grid-rows-2 text-[0.85vw]">
                        <div className="row-span-1 grid grid-cols-3">
                          <div className="col-span-2 flex items-center gap-[0.25vw]">
                            <div className="bg-[#02CA70] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            Booked Tickets
                          </div>
                          <div className="col-span-1 justify-self-end">
                            <p className="text-[0.85vw]">
                              {
                                // decryptData
                                getDashboardDetails?.piechart?.totalFare >=
                                1000 ? (
                                  <Tooltip
                                    placement="right"
                                    title={`₹ ${Number(
                                      // decryptData
                                      getDashboardDetails?.piechart?.totalFare
                                    ).toLocaleString()}`}
                                    className="cursor-pointer"
                                    color="white"
                                    overlayInnerStyle={{
                                      color: "#1F487C",
                                      fontSize: "2vw",
                                    }}
                                  >
                                    <p className="">
                                      ₹{" "}
                                      {formatNumber(
                                        Number(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.totalFare
                                        ).toFixed(2)
                                      )}
                                    </p>
                                  </Tooltip>
                                ) : (
                                  <p className="">
                                    ₹{" "}
                                    {Number(
                                      // decryptData
                                      getDashboardDetails?.piechart?.totalFare
                                    ).toFixed(2)}
                                  </p>
                                )
                              }
                            </p>
                          </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3">
                          <div className="col-span-2 flex items-center gap-[0.25vw]">
                            <div className="bg-[#FF574B] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            Cancelled Tickets
                          </div>
                          <div className="col-span-1 justify-self-end">
                            <p className="text-[0.85vw]">
                              {
                                // decryptData
                                getDashboardDetails?.piechart
                                  ?.cancellationRefund >= 1000 ? (
                                  <Tooltip
                                    placement="right"
                                    title={`₹ ${Number(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                    ).toLocaleString()}`}
                                    className="cursor-pointer"
                                    color="white"
                                    overlayInnerStyle={{
                                      color: "#1F487C",
                                      fontSize: "2vw",
                                    }}
                                  >
                                    <p className="">
                                      ₹{" "}
                                      {formatNumber(
                                        Number(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.cancellationRefund
                                        ).toFixed(2)
                                      )}
                                    </p>
                                  </Tooltip>
                                ) : (
                                  <p className="">
                                    ₹{" "}
                                    {Number(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                    ).toFixed(2)}
                                  </p>
                                )
                              }
                            </p>
                          </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3">
                          <div className="col-span-2 flex items-center gap-[0.25vw]">
                            <div className="bg-[#3E7DFB] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                            Refunded Tickets
                          </div>
                          <div className="col-span-1 justify-self-end">
                            <p className="text-[0.85vw]">
                              {
                                // decryptData
                                getDashboardDetails?.piechart
                                  ?.cancellationRefund >= 1000 ? (
                                  <Tooltip
                                    placement="right"
                                    title={`₹ ${Number(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                    ).toLocaleString()}`}
                                    className="cursor-pointer"
                                    color="white"
                                    overlayInnerStyle={{
                                      color: "#1F487C",
                                      fontSize: "2vw",
                                    }}
                                  >
                                    <p className="">
                                      ₹{" "}
                                      {formatNumber(
                                        Number(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.cancellationRefund
                                        ).toFixed(2)
                                      )}
                                    </p>
                                  </Tooltip>
                                ) : (
                                  <p className="">
                                    ₹{" "}
                                    {Number(
                                      // decryptData
                                      getDashboardDetails?.piechart
                                        ?.cancellationRefund
                                    ).toFixed(2)}
                                  </p>
                                )
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart Section */}
                    <div className="mt-[1.5vw] w-full h-[12vw]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dataPieAmount}
                            activeIndex={activeIndexes}
                            activeShape={renderActiveShape}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {dataPieAmount.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <ReTooltip content={<PieTooltip1 />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                ) : (
                  swap === "count" && (
                    <>
                      <div className="flex items-end gap-[0.25vw]">
                        <p className="text-[#737373] text-[1vw]">Total</p>
                        <p className="text-[#0A0A0A] font-bold text-[1.1vw]">
                          Performance
                        </p>
                      </div>

                      {/* Labels & Amount Section */}
                      <div className="-mb-[vw]">
                        <div className="grid grid-cols-3 text-[0.85vw]">
                          <p className="col-span-2">Label</p>
                          <p className="col-span-1 justify-self-end">Count</p>
                        </div>
                        <hr className="mb-[1vw] border-[0.1vw] border-[#1F4B7F80]"></hr>

                        <div className="grid grid-rows-2 text-[0.85vw]">
                          <div className="row-span-1 grid grid-cols-3">
                            <div className="col-span-2 flex items-center gap-[0.25vw]">
                              <div className="bg-[#02CA70] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              Booked Tickets
                            </div>
                            <div className="col-span-1 justify-self-end">
                              <p className="text-[0.85vw]">
                                {
                                  // decryptData
                                  getDashboardDetails?.piechart?.bookingCount >=
                                  1000 ? (
                                    <Tooltip
                                      placement="right"
                                      title={Number(
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.bookingCount
                                      ).toLocaleString()}
                                      className="cursor-pointer"
                                      color="white"
                                      overlayInnerStyle={{
                                        color: "#1F487C",
                                        fontSize: "2vw",
                                      }}
                                    >
                                      <p className="">
                                        {formatNumber(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.bookingCount
                                        )}
                                      </p>
                                    </Tooltip>
                                  ) : (
                                    <p className="">
                                      {
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.bookingCount
                                      }
                                    </p>
                                  )
                                }
                              </p>
                            </div>
                          </div>
                          <div className="row-span-1 grid grid-cols-3">
                            <div className="col-span-2 flex items-center gap-[0.25vw]">
                              <div className="bg-[#FF574B] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              Cancelled Tickets
                            </div>
                            <div className="col-span-1 justify-self-end">
                              <p className="text-[0.85vw]">
                                {
                                  // decryptData
                                  getDashboardDetails?.piechart
                                    ?.cancellationCount >= 1000 ? (
                                    <Tooltip
                                      placement="right"
                                      title={Number(
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.cancellationCount
                                      ).toLocaleString()}
                                      className="cursor-pointer "
                                      color="white"
                                      overlayInnerStyle={{
                                        color: "#1F487C",
                                        fontSize: "2vw",
                                      }}
                                    >
                                      <p className="">
                                        {formatNumber(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.cancellationCount
                                        )}
                                      </p>
                                    </Tooltip>
                                  ) : (
                                    <p className="">
                                      {
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.cancellationCount
                                      }
                                    </p>
                                  )
                                }
                              </p>
                            </div>
                          </div>
                          <div className="row-span-1 grid grid-cols-3">
                            <div className="col-span-2 flex items-center gap-[0.25vw]">
                              <div className="bg-[#3E7DFB] rounded-full w-[0.5vw] h-[0.5vw]"></div>
                              Refunded Tickets
                            </div>
                            <div className="col-span-1 justify-self-end">
                              <p className="text-[0.85vw]">
                                {
                                  // decryptData
                                  getDashboardDetails?.piechart
                                    ?.cancellationCount >= 1000 ? (
                                    <Tooltip
                                      placement="right"
                                      title={Number(
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.cancellationCount
                                      ).toLocaleString()}
                                      className="cursor-pointer "
                                      color="white"
                                      overlayInnerStyle={{
                                        color: "#1F487C",
                                        fontSize: "2vw",
                                      }}
                                    >
                                      <p className="">
                                        {formatNumber(
                                          // decryptData
                                          getDashboardDetails?.piechart
                                            ?.cancellationCount
                                        )}
                                      </p>
                                    </Tooltip>
                                  ) : (
                                    <p className="">
                                      {
                                        // decryptData
                                        getDashboardDetails?.piechart
                                          ?.cancellationCount
                                      }
                                    </p>
                                  )
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pie Chart Section */}
                      <div className="mt-[1.5vw] w-full h-[12vw]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={dataPieCount}
                              activeIndex={activeIndexes}
                              activeShape={renderActiveShape}
                              cx="50%"
                              cy="50%"
                              innerRadius="55%"
                              outerRadius="80%"
                              // outerRadius={(entry, index) => (hoveredIndex === index ? "100%" : "80%")}
                              // outerRadius={hoveredIndex !== null ? 100 : 80} // Enlarges only the hovered 
                              fill="#8884d8"
                              dataKey="value"
  // activeIndex={[...activeIndexes, hoveredIndex]} // Highlights only the hovered slice
  
  // onMouseEnter={(data, index) => setHoveredIndex(data.name)}
  // onMouseLeave={() => setHoveredIndex(null)}


                              
                            >
                              {dataPieCount.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                  
                          



                                />
                              ))}
                            </Pie>
                            <ReTooltip content={<PieTooltip2 />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
