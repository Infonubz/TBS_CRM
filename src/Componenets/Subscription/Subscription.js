import React, { useState, useEffect } from "react";
import { Table, Pagination, Popover, Spin, ConfigProvider, Tooltip } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { IoEyeOffOutline } from "react-icons/io5";
import Backdrop from "../../asserts/CRMbg.png";
import { BsExclamationCircle } from "react-icons/bs";
import "../../App.css";
import {
  GetSubscriptionByDate,
  GetSubscriptionList,
  handleAdsearch,
} from "../../Api/Subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { GetOperatorDataById } from "../../Api/UserManagement/UserManagement";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-js-pagination";
import { LiaSearchSolid } from "react-icons/lia";
import { DatePicker } from "antd";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import moment from "moment";
import { capitalizeFirstLetter } from "../Common/Captilization";

export default function Subscription({ }) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [showHalfMap, setShowHalfMap] = useState({}); // State to track which user's product key to show/hide
  const [eyeIcon, setEyeIcon] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [operatorData, setOperatorData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [spinning, setSpinning] = useState(false);

  const getSubscriptionlist =
    useSelector((state) => state.crm.subscription_list) || [];

  const infos = [
    {
      title: "Operator Name",
    },
    {
      title: "Owner Name",
    },
    {
      title: "Plan Name",
    },
    {
      title: "Plan Type",
    },
    {
      title: "Activated Date",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
    {
      title: "Expiry Date",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
  ];

  const paginatedData =
    Array.isArray(getSubscriptionlist) &&
    getSubscriptionlist.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  console.log(operatorData, "operator_data");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getSubscriptionlist?.length > 0 &&
    getSubscriptionlist?.slice(indexOfFirstItem, indexOfLastItem);

  const Search = (e) => {
    handleAdsearch(e, dispatch);
  };

  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const toggleShowHalf = (user_id) => {
    setShowHalfMap((prev) => ({
      ...prev,
      [user_id]: !prev[user_id],
    }));
    setEyeIcon((eyeIcon) => ({
      ...eyeIcon,
      [user_id]: !eyeIcon[user_id],
    }));
  };

  const maskProductKey = (text) => {
    const halfLength = Math.ceil(text?.length - 10);
    return "*".repeat(text?.length - halfLength) + text?.slice(0, halfLength);
  };

  const handleRowClick = (record) => {
    SetUpdateData(record.tbs_operator_id);
    setExpandedRowKey(record.key === expandedRowKey ? null : record.key);
  };

  const fetchGetSubscription = async () => {
    try {
      const data = await GetOperatorDataById(
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

  const items = [
    { key: "1", label: "Item 1" },
    { key: "2", label: "Item 2" },
    { key: "3", label: "Item 3" },
  ];

  const { RangePicker } = DatePicker;

  const columns = [
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Logo
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        const pageNo = (activePage - 1) * itemsPerPage + index + 1;
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            <img
              src={`${apiImgUrl}${row?.profile_img}`}
              alt=""
              className="w-[2vw] h-[2vw] border-[0.1vw] border-slate-200 rounded-full"
            />
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
          Operator Name
        </div>
      ),
      width: "15vw",
      render: (row, rowdta, index) => {
        console.log(row, "row852852");
        console.log(rowdta, "rowdta852852");

        const pageNo = (activePage - 1) * itemsPerPage + index + 1;
        return (
          <div className="flex pl-[3vw] text-[#1F4B7F] font-bold  text-[1vw]">
            <h1 className="">{row.company_name}
              {
                row?.company_name?.length > 18 ? (
                  <Tooltip color="white"
                    overlayInnerStyle={{ color: "#1F4B7F" }} title={capitalizeFirstLetter(row?.company_name)}>
                    <span>
                      {`${row?.company_name?.charAt(0) === row?.company_name?.charAt(0).toLowerCase()
                        ? capitalizeFirstLetter(row?.company_name).slice(0, 18)
                        : row?.company_name?.slice(0, 18)}...`}
                    </span>

                  </Tooltip>
                ) : (
                  <span>
                    {row?.company_name?.charAt(0) === row?.company_name?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(row?.company_name)
                      : row?.company_name}
                  </span>

                )
              }
            </h1>
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
          Product Key
        </div>
      ),
      dataIndex: "generate_key",
      key: "generate_key",
      width: "16vw",
      render: (text, row) => (
        <div className="flex pl-[2vw] w-full mr-[0.5vw] text-[#1F4B7F] font-bold text-[1vw]">
          <div className="w-[10vw]">
            <span className=" w-full text-[1vw]">
              {!showHalfMap[row.tbs_operator_id] ? maskProductKey(text) : text}
            </span>
          </div>
          <div
            className="cursor-pointer flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => toggleShowHalf(row.tbs_operator_id)}>
              {eyeIcon[row.tbs_operator_id] ? (
                <IoEyeOutline style={{ height: "1.3vw", width: "1.3vw" }} />
              ) : (
                <IoEyeOffOutline style={{ height: "1.3vw", width: "1.3vw" }} />
              )}
            </button>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div
          className="text-[1.1vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Plan Name
        </div>
      ),
      dataIndex: "plan_name",
      width: "12vw",
      render: (text, row) => (
        <div className="flex items-center justify-center">
          {row?.plan_name ? (
            <div className="flex  font-bold text-[#1F4B7F] text-[1vw]">
              {row?.plan_name}
            </div>
          ) : (
            <div className="flex  font-extrabold text-[#1F4B7F] text-[1vw]">
              -
            </div>
          )}
        </div>
      ),
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Plan Type
        </div>
      ),
      dataIndex: "created_date",
      width: "12vw",
      render: (text, row) => (
        <div className="flex items-center justify-center">
          {row?.plan_type ? (
            <div className="flex  text-[#1F4B7F] font-bold text-[1vw]">
              {row?.plan_type}
            </div>
          ) : (
            <div className="flex  text-[#1F4B7F] font-bold text-[1vw]">-</div>
          )}
        </div>
      ),
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Activated Date
        </div>
      ),
      dataIndex: "created_date",
      width: "12vw",
      render: (text) => (
        <div className="flex pl-[3vw] text-[#1F4B7F] px-[2vw] text-[1vw]">
          <span className="text-[1vw] text-[#1F487C]">{text}</span>{" "}
        </div>
      ),
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Expiry Date
        </div>
      ),
      dataIndex: "expiriy_date",
      width: "12vw",
      render: (text, row) => (
        <div className="flex justify-between items-center text-[#1F4B7F] px-[2vw] text-[1vw]">
          <span className="text-[1vw] flex items-center pl-[4vw] font-bold justify-center text-[#1F487C]">
            {/* {text} */}
            -
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(row);
            }}
            className=""
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
        // <div className="flex items-center justify-center">
        //   {row?.plan_type ? (
        //     <div className="flex  text-[#1F4B7F] font-bold text-[1vw]">
        //       {row?.plan_type}
        //     </div>
        //   ) : (
        //     <div className="flex  text-[#1F4B7F] font-bold text-[1vw]">-</div>
        //   )}
        // </div>
      ),
    },
  ];
  console.log(currentItems, "currentItemscurrentItems");

  const data =
    currentItems?.length > 0 &&
    currentItems?.map((item) => ({
      key: item.tbs_operator_id,
      s_no: 1,
      tbs_operator_id: item.tbs_operator_id,
      generate_key: item.generate_key,
      created_date: dayjs(item?.created_date).format("DD MMM, YYYY"),
      plan_name: item.plan_name,
      expiriy_date: item.plan_type,
      plan_type: item.plan_type,
      company_name: item.company_name,
      profile_img: item.profileimg,
      gst_number: item.gstin,
      hidden_details: (
        <div className="grid grid-cols-5 items-center py-[1vw]">
          <div className="col-span-1 flex flex-col gap-[1vw] justify-center items-center border-r-[0.1vw] border-[#1F487C] w-full h-full">
            <img
              src={`${apiImgUrl}${item?.profileimg}`}
              alt=""
              className="w-[6vw] h-[6vw] border-[0.1vw] border-slate-200 rounded-full"
            />
            <span className="font-bold text-[#1F487C] text-[1.5vw]">
              {item?.company_name}
            </span>
          </div>
          <div className=" col-span-2 px-[5vw]  border-r-[0.1vw] border-[#1F487C] w-full h-full">
            <div className=" grid grid-rows-5 gap-y-[0.4vw]">
              <p className="text-[#1F487C] font-semibold text-[1.2vw] text-center">
                CLIENT INFORMATION
              </p>
              <div className="flex gap-x-[2vw] text-[1vw] text-[#1F487C] justify-between">
                <span className="font-semibold order-first">GST Number</span>
                <span className="order-last">
                  {item?.gstin}
                  {/* <p className="">29GGGGG1314R9Z6</p> */}
                </span>
              </div>
              <div className="flex justify-between gap-x-[2vw] text-[1vw] text-[#1F487C]">
                <span className="font-semibold order-first">
                  Type of Business
                </span>
                <span className="order-last">{item?.type_of_constitution}</span>
              </div>
              <div className=" flex justify-between gap-x-[2vw] text-[1vw] text-[#1F487C] ">
                <span className="font-semibold order-first">
                  Contact Number
                </span>
                <span className="order-last">{item?.phone}</span>
              </div>
              {/* <div className="flex justify-between gap-x-[2vw] text-[1vw] text-[#1F487C]">
                <span className="font-semibold order-first">
                  Current Subscription
                </span>
                <span className="font-semibold">Half-Yearly Plan</span>
                <span className="order-last">{item?.phone}</span>
              </div> */}
              <div className="flex justify-between gap-x-[2vw] text-[1vw] text-[#1F487C]">
                <span className="order-first font-semibold">Member Since</span>
                <span className="order-last">{`${dayjs(
                  item?.created_date
                ).format("DD MMM, YYYY")}`}</span>
              </div>
            </div>
          </div>
          <div className=" col-span-2 grid grid-rows-2 gap-y-[1vw]">
            <div className="flex flex-col text-center">
              <span className="text-[#1F487C] font-semibold text-[1.2vw]">
                PRODUCT KEY
              </span>
              <span className="text-green-600 font-bold text-[1.2vw]">
                {item?.generate_key}
              </span>
            </div>

            <div className=" px-[3vw]">
              <div className="bg-[#1F487C] rounded-lg">
                <div className="grid grid-cols-3 border-b-[0.1vw] border-white py-[0.75vw] ">
                  <span className="text-white font-normal text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                    User ID
                  </span>
                  <span className="text-white font-normal text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                    Activated Date
                  </span>
                  <span className="text-white font-normal text-[1vw] w-full text-center">
                    Days Left
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-x-[1.5vw] justify-items-center py-[0.25vw]">
                  <span className="text-white font-normal text-[1vw]">
                    {item?.tbs_operator_id}
                  </span>
                  <span className="text-white font-normal text-[1vw]">
                    {`${dayjs(item?.created_date).format("DD MMM, YYYY")}`}
                  </span>
                  <span className="text-white font-normal text-[1vw]">221</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    }));
  const dispatch = useDispatch();

  useEffect(() => {
    setSpinning(true);
    GetSubscriptionList(dispatch, setSpinning);
  }, []);

  useEffect(() => {
    if (updatedata != null) {
      fetchGetSubscription();
    }
  }, [updatedata]);
  const [dateClear, setDateClear] = useState();

  const datefilter = async (values) => {
    try {
      setDateClear(values);

      await GetSubscriptionByDate(
        dispatch,
        moment(values[0].$d).format("YYYY-MM-DD"),
        moment(values[1].$d).format("YYYY-MM-DD")
      );
      // functioncall()
    } catch (err) {
      console.log(err, "iam the error");
      GetSubscriptionList(dispatch, setSpinning);
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
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-[2.5vw] w-full h-[90vw]">
        <div className="flex justify-between items-center ">
          <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
            SUBSCRIPTION
          </h1>
          {/* <div className=' w-[4vw] h-[4vw] bg-teal-500 rounded-full order-last'></div> */}
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
                // className="custom-range-picker bg-white outline-none pl-[1.5vw] w-[17vw] h-[2.5vw] text-[0.9vw] border-[#1F4B7F] border-l-[0.1vw] px-[1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.2vw] border-b-[0.2vw]"
                // disabledDate={(current) => current < dayjs().startOf("day")}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className="h-[72.3vh]">
          {spinning ? (
            <div className="absolute inset-0 flex justify-center items-center  z-10">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              className="custom-table"
              columns={columns}
              dataSource={data}
              pagination={false}
              locale={{ emptyText: 'No Data Available' }}
              // scroll={{ y: "65vh", x: "175vh" }}
              scroll={{
                y: data.length > 0 && data.some(item => item.someColumn !== 0) ? "65vh" : undefined,
                x: data.length > 0 && data.some(item => item.someColumn !== 0) ? "175vh" : undefined
              }}
              expandedRowRender={(record) => (
                <p style={{ margin: 0 }}>{record?.hidden_details}</p>
              )}
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
        {getSubscriptionlist?.length > 10 && (
          <div className=" mt-[1vw] justify-between flex items-center ">
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
                {getSubscriptionlist?.length > 0
                  ? getSubscriptionlist?.length
                  : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={getSubscriptionlist?.length}
                pageRangeDisplayed={5}
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

      <div></div>
    </div>
  );
}
