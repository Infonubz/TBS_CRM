import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { DatePicker, Pagination, Tooltip } from "antd";

import { FaCaretDown } from "react-icons/fa";
import Operator from "./Operator";
import Partner from "./Partner";
import axios from "axios";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  GetReqOperatorByDate,
  GetReqPromotionByDate,
  GetReqPromotionData,
  GetRequestManagementData,
  SearchReqOperator,
  SearchRequestPromotion,
} from "../../Api/RequestManagement/RequestManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-js-pagination";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
import ReqPromotion from "./ReqPromotion";
import moment from "moment/moment";
const { RangePicker } = DatePicker;
export default function RequestManagement() {
  const [view, setView] = useState("operator");
  const [filter, SetFilter] = useState("all");
  const [search, SetSearch] = useState("");
  const [date, SetDate] = useState("");
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  // const [get_rq_man_data, setget_rq_man_data] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [operatorId, setOperatorId] = useState(null);
  const [verifyData, setVerifyData] = useState("");
  const [getData, setGetData] = useState("");
  const get_rq_man_data = useSelector((state) => state.crm.request_management);
  const getpromotionlist = useSelector((state) => state.crm.req_promotion);

  const [showtable, setShowTable] = useState(1);

  useEffect(() => {
    if (showtable == 1) {
      GetRequestManagementData(dispatch, filter);
    }
  }, [showtable, filter]);

  console.log(filter, "showtableshowtable");

  console.log(search, "search");
  console.log(date, "date");
  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Id
        </div>
      ),
      render: (row) => {
        console.log("statuus", row);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1vw] text-[#1F4B7F]">
              {row?.tbs_operator_id}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Name
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            {/* <p className="text-[1vw] text-[#1F4B7F]">{row?.owner_name}</p> */}
            {row?.owner_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.owner_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.owner_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.owner_name?.slice(0, 15)
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Phone Number{" "}
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.phone}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Email Id
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.emailid}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Request Date
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{`${dayjs(
              row?.created_date
            ).format("DD MMM YY - hh:mm a")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Documents
        </div>
      ),
      render: (row) => {
        setOperatorId(row.tbs_operator_id);
        console.log(row.tbs_operator_id, "---operatorId");
        return (
          <div className="flex  justify-center">
            <button
              type="button"
              className="text-white bg-[#41C6FF] rounded-[0.5vw]  text-[1vw] w-[5vw] py-[0.2vw]  
           "
              onClick={() => {
                setIsVerifyModal(true);
                setVerifyData(row.tbs_operator_id);
                console.log(row.tbs_operator_id, "operator Id");
              }}
            >
              Verify
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      render: (row) => {
        // console.log("statuus", row.req_status);
        return (
          <div className="flex justify-center">
            <button
              className={`${
                row?.req_status == "verified"
                  ? "bg-[#34AE2A]"
                  : row?.req_status == "pending"
                  ? "bg-[#FFD600]"
                  : row?.req_status == "rejected"
                  ? "bg-[#FF1100]"
                  : row?.req_status == "under review"
                  ? "bg-[#FF6B00]"
                  : "bg-[#ffffff]"
              } rounded-[0.5vw] font-semibold text-white w-[7vw] py-[0.2vw]`}
            >
              {row?.req_status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      render: (row) => {
        setOperatorId(row.tbs_operator_id);
        // console.log(row.tbs_operator_id, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center">
            <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const paginatedData = get_rq_man_data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = get_rq_man_data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const onChange = (value) => {
    setShowTable(value);
    console.log(`selected ${value}`);
  };
  const [promoactivePage, setPromoActivePage] = useState(1);
  const promoitemsPerPage = 10; // Number of items to display per page

  const promoindexOfLastItem = promoactivePage * promoitemsPerPage;
  const promoindexOfFirstItem = promoindexOfLastItem - promoitemsPerPage;
  const promocurrentItems =
    getpromotionlist.length > 0 &&
    getpromotionlist?.slice(promoindexOfFirstItem, promoindexOfLastItem);
  console.log(getpromotionlist, "getpromotionlist");
  const handlePrmoPageChange = (pageNumber) => {
    setPromoActivePage(pageNumber);
  };
  const [promofilter, SetPromoFilter] = useState("All");

  useEffect(() => {
    if (showtable == 3) {
      GetReqPromotionData(dispatch, promofilter);
    }
  }, [showtable, promofilter]);

  console.log(showtable, "showtableshowtable");

  const [startDate, SetStartDate] = useState();
  const [endDate, SetEndDate] = useState();

  const dateres = useSelector((state) => state.crm.req_management_date_filter);
  console.log(dateres, "data vanthuduch");

  // useEffect(() => {
  //   GetReqPromotionByDate(dispatch);

  // }, []);
  // const functioncall=async()=>{
  //   console.log("i am here")
  //   await GetReqPromotionByDate(dispatch,startDate,endDate);

  // }

  const datefilter = async (values) => {
    if (showtable == 1) {
      try {
        // console.log(values[0].$d.toISOString().split('T')[0],"datevaluesss1")
        // console.log(values[1].$d.toISOString().split('T')[0],"datevaluesss2")

        // SetStartDate(moment(values[0].$d).format("YYYY-MM-DD"));
        // SetEndDate(moment(values[1].$d).format("YYYY-MM-DD"));
        // console.log(values[0].$d,"thissssssssssssssssss")

        // console.log(moment(values[0].$d).format("YYYY-MM-DD"), "val1");
        // console.log(moment(values[1].$d).format("YYYY-MM-DD"), "val2");

        await GetReqOperatorByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
        // functioncall()
      } catch (err) {
        console.log(err, "iam the error");
        GetRequestManagementData(dispatch);
      }
    } else {
      try {
        await GetReqPromotionByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
        console.log("this is promotion request");
      } catch (err) {
        console.log(err);
        GetReqPromotionData(dispatch);
      }
    }

    // const utcDate = new Date(Date.UTC(values[0].getFullYear(), values[0].getMonth(), values[0].getDate()));
    // console.log(utcDate.toISOString().split('T')[0],"val1")

    // const utcDate2 = new Date(Date.UTC(values[1].getFullYear(), values[1].getMonth(), values[1].getDate()));
    // console.log(utcDate2.toISOString().split('T')[0],"val2")
  };

  const SearchRequest = (e) => {
    if (showtable == 1) {
      console.log(e.target.value, "e values");
      SearchReqOperator(e.target.value, dispatch);
    } else {
      console.log(e.target.value, "search e value");
      SearchRequestPromotion(e.target.value, dispatch);
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[5vw] h-[92vh] w-full ">
          <div className="h-[12vh] w-full flex flex-col ">
            <div className="flex items-center pt-[0.5vw]">
              <h1 className="text-[#1F4B7F]  text-[1.5vw] font-bold">
                {`REQUEST MANAGEMENT`}
              </h1>
              <span className="text-[1vw]  text-[#1F4B7F] font-semibold">{`  -  (${
                showtable == 1
                  ? "Operator"
                  : showtable == 2
                  ? "Partner"
                  : "Promotion"
              })`}</span>
            </div>
            <div className="pb-[0.5vw] flex justify-between h-full items-center ">
              {/* <div className="relative flex items-center ">
              <input
                type="text"
                className="bg-white  outline-none pl-[2.3vw] text-[1.2vw] w-[9vw] h-[2.8vw] text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                placeholder="Search"
                onChange={(e) => SetSearch(e.target.value)}
              />
              <IoSearch
                className="absolute bottom-[.9vw] left-[.5vw]"
                size={"1.2vw"}
                color="#1F4B7F"
              />
            </div> */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="bg-white outline-none pl-[2vw] w-[20vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                  placeholder="Search Operators"
                  onChange={(e) => {
                    SearchRequest(e);
                  }}
                />
                <IoSearch
                  className="absolute left-[0.5vw]"
                  size={"1vw"}
                  color="#1F4B7F"
                />
              </div>
              {showtable == 1 ? (
                <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                  <div
                    className={` cursor-pointer ${
                      filter == "all"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetFilter("all");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      All
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      filter == "pending"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetFilter("pending");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Pending
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      filter == "verified"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetFilter("verified");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Verified
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      filter == "under_review"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetFilter("under_review");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Under Review
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      filter == "rejected"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetFilter("rejected");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Rejected
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                  <div
                    className={` cursor-pointer ${
                      promofilter == "All"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetPromoFilter("All");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      All
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      promofilter == "Pending"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetPromoFilter("Pending");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Pending
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      promofilter == "Approved"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetPromoFilter("Approved");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Approved
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      promofilter == "Rejected"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetPromoFilter("Rejected");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Rejected
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${
                      promofilter == "Under Review"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    } `}
                    onClick={() => {
                      SetPromoFilter("Under Review");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Under Review
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-x-[1vw]">
                {/* <div className="flex border-[#1F4B7F] h-[2.5vw] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                <button
                  className={`${
                    view == "operator" ? "bg-[#1F4B7F]" : "bg-white"
                  } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw]   rounded-bl-[0.3vw] `}
                  style={{
                    transition: "all 1s",
                  }}
                  onClick={() => setView("operator")}
                >
                  <span>
                    <IoMdMenu
                      size={"1.2vw"}
                      color={`${view == "operator" ? "white" : "#1F4B7F"}`}
                    />
                  </span>
                  <span
                    className={`${
                      view == "operator" ? "text-white" : "text-[#1F4B7F]"
                    }  text-[1.1vw]`}
                  >
                    Operator
                  </span>
                </button>
                <button
                  className={`${
                    view == "partner" ? "bg-[#1F4B7F]" : "bg-white"
                  } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                  style={{
                    transition: "all 1s",
                  }}
                  onClick={() => setView("partner")}
                >
                  <span>
                    <IoGrid
                      size={"1.2vw"}
                      color={`${view == "partner" ? "white" : "#1F4B7F"}`}
                    />
                  </span>
                  <span
                    className={`${
                      view == "partner" ? "text-white" : "text-[#1F4B7F]"
                    }  text-[1.1vw]`}
                  >
                    Partner
                  </span>
                </button>
              </div> */}
                <div className="relative flex items-center">
                  <Select
                    showSearch
                    placeholder="Select one"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={onChange}
                    defaultValue={{
                      value: 1,
                      label: "Operator",
                    }}
                    className="text-blue-500 h-[2.5vw] w-[10vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.7vw] border-r-[0.2vw] border-b-[0.2vw]"
                    options={[
                      {
                        value: 1,
                        label: "Operator",
                      },
                      // {
                      //   value: 2,
                      //   label: "Partner",
                      // },
                      {
                        value: 3,
                        label: "Promotion",
                      },
                    ]}
                  />

                  <FaCaretDown
                    className="absolute left-[7.5vw] bottom-[.3vw] text-[#1f487f]"
                    size={"2vw"}
                  />
                </div>
                <div className="relative flex items-center">
                  {/* <DatePicker
                  autoFocus={false}
                  placeholder="Filter Date"
                  onChange={(date) => SetDate(date.$d)}
                  className="text-blue-500 h-[2.5vw] w-[12vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                /> */}
                  <div className="reqman">
                    {/* <Space direction="vertical" size={8}> */}

                    <RangePicker
                      allowClear={true}
                      autoFocus={false}
                      onChange={datefilter}
                      className="text-blue-500 filterdate h-[2.5vw] w-[17.7vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] hover:border-[#1F4B7F] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                    />

                    {/* </Space> */}
                  </div>
                  {/* 
                  <FaCaretDown
                    className="absolute left-[13.5vw] bottom-[.5vw] text-[#1f487f]"
                    size={"2vw"}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[72vh]  w-full">
            {/* {view == "operator" ? (
            <>
              <Operator data={currentItems} />
            </>
          ) : (
            <>
              <Partner data={currentItems} columns={columns} />
            </>
          )} */}
            {showtable == 1 ? (
              <Operator data={currentItems} />
            ) : showtable == 2 ? (
              <Partner data={currentItems} columns={columns} />
            ) : (
              <ReqPromotion currentData={promocurrentItems} columns={columns} />
            )}
          </div>
          <div className="w-full h-[8vh] flex justify-between items-center">
            <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
              <span>Showing</span>
              <span className="font-bold">
                1 -{" "}
                {showtable == 1
                  ? get_rq_man_data?.length
                  : getpromotionlist?.length}
              </span>
              <span>from</span>
              <span className="font-bold">
                {showtable == 1
                  ? get_rq_man_data?.length
                  : getpromotionlist?.length}
              </span>
              <span>data</span>
            </div>
            <div>
              {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={0}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                // showSizeChanger
              /> */}
              <ReactPaginate
                activePage={showtable == 1 ? activePage : promoactivePage}
                itemsCountPerPage={
                  showtable == 1 ? itemsPerPage : promoitemsPerPage
                }
                totalItemsCount={
                  showtable == 1
                    ? get_rq_man_data?.length
                    : getpromotionlist?.length
                }
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
              {/* <input
              type="file"
              // onChange={(e) => console.log(e.target.value, "datatatat")}
              onChange={(e) => handleSubmit(e)}
            /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
