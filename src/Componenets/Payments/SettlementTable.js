import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { GetSettlementDetails } from "../../Api/Payments/Payments";

export default function SettlementTable({ activePage, setActivePage }) {
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

  const getSettlementDetails = useSelector((state) => state.crm.settlement_details);
  console.log(getSettlementDetails, "settlement details dashboard");

  const handleFareSort = (pagination, filters, sorter) => {
    // console.log(sorter,"sortersorter")
    // setSortedInfo(sorter);
    // console.log(sortedInfo,"sorted info")
    // const sorted = getSettlementDetails.sort((a, b) => b.total_fare - a.total_fare);
    let sorted = [...getSettlementDetails];
    console.log(sorted.amount_refunded, "sorted details");
    if (sortOrderFare === "ascend") {
      sorted.sort((a, b) => b.amount_refunded - a.amount_refunded);
      setSortOrderFare("descend");
    } else if (sortOrderFare === "descend") {
      sorted = [...getSettlementDetails]; // Reset to original order
      setSortOrderFare(null);
    } else {
      sorted.sort((a, b) => a.amount_refunded - b.amount_refunded);
      setSortOrderFare("ascend");
    }

    console.log(getSettlementDetails, "sort details");
    setSortedData(sorted);
  };

  const handleDateSort = () => {
    let sorted = [...getSettlementDetails];
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
      sorted = [...getSettlementDetails]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.booking_date_time.slice(0, 13)) -
          new Date(b.booking_date_time.slice(0, 13))
      );
      setSortOrderDate("ascend");
    }

    console.log(getSettlementDetails, "sort details");
    setSortedData(sorted);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };

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
  // const Search = (e) => {
  //   handleBookingDetailsSearch(e, dispatch);
  // };
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
    GetSettlementDetails(count, goToSkip, dispatch, setSpinning);
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
  const currentItems = sortedData.length > 0 ? sortedData : getSettlementDetails;
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
          Settlement ID
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[7vw] -mr-[10vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            {row.settlement_id}
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
      sorter: (a, b) =>
       new Date ((a.date)) -
       new Date ((b.date)),
      sortOrder:
        sortedInfo.columnKey === "created_at" && sortedInfo.order,
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {/* {`${(row.booking_date_time.slice(0, 13))} (${(row.booking_date_time.slice(15,23))})`} */}
            {formatDate(row.date)}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] flex justify-center"
          style={{ color: "white" }}
        >
          {/* <Tooltip
            placement="top"
            title="Email Service"
            className="cursor-pointer"
            color="white"
            overlayInnerStyle={{
              color: "#1F487C",
            }}
          >
            <MdOutlineEmail />
          </Tooltip> */}
          Status
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1.5vw]">
            {row.status === "null" ? (
              "-"
            ) : row.status === "processed" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : row.status === "No" ? (
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
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Amount
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="ml-[8vw] -mr-[10vw] text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
            ₹ {row.amount.toFixed(2)}
            {/* {Number(row.amount.toFixed(0))} */}
            {/* {Math.trunc(row.amount)} */}
          </div>
        );
      },
    },

    
    // {
    //   title: (
    //     <div
    //       className="text-[1.2vw] text-center font-bold flex justify-evenly items-center"
    //       style={{ color: "white" }}
    //     >
    //       <p>Refund Amount</p>
    //       <button onClick={handleFareSort}>
    //         {sortOrderFare === "ascend" ? (
    //           <Tooltip
    //             placement="top"
    //             title="Ascending"
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             <TiArrowSortedUp />
    //           </Tooltip>
    //         ) : sortOrderFare === "descend" ? (
    //           <Tooltip
    //             placement="top"
    //             title="Descending"
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             <TiArrowSortedDown />
    //           </Tooltip>
    //         ) : sortOrderFare === null ? (
    //           <Tooltip
    //             placement="top"
    //             title="Unsorted"
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             <TiArrowUnsorted />
    //           </Tooltip>
    //         ) : (
    //           <Tooltip
    //             placement="top"
    //             title="Ascending"
    //             className="cursor-pointer"
    //             color="white"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //             }}
    //           >
    //             <TiArrowSortedUp />
    //           </Tooltip>
    //         )}
    //       </button>
    //     </div>
    //   ),
    //   key: "refund_amt",
    //   width: "9vw",
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="grid grid-cols-4 text-[#1F4B7F] text-[1vw] py-[0.5vw] font-bold">
    //         <p className="col-span-3 ml-[2vw]">
    //           ₹{row.refund_amt / 100}
    //         </p>
    //         <button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             handleRowClick(row);
    //           }}
    //           className="col-span-1"
    //         >
    //           {row.key === expandedRowKey ? (
    //             <IoIosArrowDropupCircle
    //               style={{ height: "1.3vw", width: "1.3vw" }}
    //             />
    //           ) : (
    //             <IoIosArrowDropdownCircle
    //               style={{ height: "1.3vw", width: "1.3vw" }}
    //             />
    //           )}
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];
  const data =
    currentItems?.length > 0 &&
    currentItems?.map((item) => ({
      key: item.id,
      s_no: 1,
      settlement_id: item.id,
      date: item.created_at,
      amount: item.amount/100,
      status: item.status,
    }));

  useEffect(() => {
    setSpinning(true);
    GetSettlementDetails(10, 0, dispatch, setSpinning);
  }, []);
  console.log(spinning, "spinning");

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

  const [dateClear, setDateClear] = useState();
  // const datefilter = async (values) => {
  //   try {
  //     setDateClear(values);
  //     console.log(values, "date values");
  //     await GetBookingDetailsByDate(
  //       dispatch,
  //       moment(values[0].$d).format("YYYY-MM-DD"),
  //       moment(values[1].$d).format("YYYY-MM-DD")
  //     );
  //     setActivePage(1);
  //   } catch (err) {
  //     console.log(err, "error");
  //     GetBookingDetails(dispatch, setSpinning);
  //   }
  // };
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
          />
        )}
      </div>
      <div className={`${isRowExpanded ? "mb-[10vh]" : ""}`}>
        {/* {getSettlementDetails?.length > 10 && ( */}
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
              {/* {getSettlementDetails?.length > 0 ? getSettlementDetails?.length : 0} */}
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
                    GetSettlementDetails(count, minSkip, dispatch, setSpinning);
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
                    GetSettlementDetails(count, oldSkip, dispatch, setSpinning);
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
                    GetSettlementDetails(count, newSkip, dispatch, setSpinning);
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
                  activePage >= 2 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (skip < 20) {
                    const maxSkip = 20;
                    setSkip(maxSkip);
                    setSpinning(true);
                    GetSettlementDetails(count, maxSkip, dispatch, setSpinning);
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
