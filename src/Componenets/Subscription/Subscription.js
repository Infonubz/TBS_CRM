import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { IoEyeOffOutline } from "react-icons/io5";
import Backdrop from "../../asserts/CRMbg.png";
import "../../App.css";
import { GetSubscriptionList, handleAdsearch } from "../../Api/Subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { GetOperatorDataById } from "../../Api/UserManagement/UserManagement";
// import { faAngleDoubleLeft, faAngleDoubleRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-js-pagination";

export default function Subscription({ }) {
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [showHalfMap, setShowHalfMap] = useState({}); // State to track which user's product key to show/hide
  const [eyeIcon, setEyeIcon] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [operatorData, setOperatorData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getSubscriptionlist =
    useSelector((state) => state.crm.subscription_list) || [];

  const paginatedData =
    Array.isArray(getSubscriptionlist) &&
    getSubscriptionlist.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

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

  const fetchGetPermission = async () => {
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

  const columns = [
    {
      title: (
        <div
          className="w-[3vw] text-[1.2vw] flex items-center justify-center"
          style={{ color: "whitex", width: "5vw" }}
        >
          USER ID
        </div>
      ),
      dataIndex: "tbs_operator_id",
      key: "tbs_operator_id",
    },
    {
      title: (
        <div className="text-[1.2vw]  flex items-center justify-center" style={{ color: "whitex" }}>
          PRODUCT KEY
        </div>
      ),
      dataIndex: "generate_key",
      key: "generate_key",
      render: (text, row) => (
        <div className="flex w-full">
          <div className="w-[14vw]">
            <span className=" w-full text-[1vw]">
              {!showHalfMap[row.tbs_operator_id] ? maskProductKey(text) : text}
            </span>
          </div>
          <div className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
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
        <div className="text-[1.2vw]  flex items-center justify-center" style={{ color: "whitex" }}>
          ACTIVATED DATE
        </div>
      ),
      dataIndex: "created_date",
    },
    {
      title: (
        <div className="text-[1.2vw]  flex items-center justify-center" style={{ color: "whitex" }}>
          PLAN NAME
        </div>
      ),
      dataIndex: "plan_name",
    },
    {
      title: (
        <div className="text-[1.2vw]  flex items-center justify-center" style={{ color: "whitex" }}>
          ENDED DATE
        </div>
      ),
      dataIndex: "end_date",
    },
    {
      title: (
        <div className="text-[1.2vw]  flex items-center justify-center" style={{ color: "whitex" }}>
          PLAN TYPE
        </div>
      ),
      dataIndex: "plan_type",
    },
  ];

  const data = paginatedData?.map((item) => ({
    key: item.tbs_operator_id,
    tbs_operator_id: item.tbs_operator_id,
    generate_key: item.generate_key,
    created_date: dayjs(item?.created_date).format("DD MMM YY"),
    plan_name: item.plan_name,
    end_date: dayjs(item?.end_date).format("DD MMM YY"),
    plan_type: item.plan_type,
    hidden_details: (
      <div>
        <div className="grid grid-cols-3">
          <div className="flex items-center">
            <div className="grid grid-cols-2 gap-x-[2vw]">
              <img
                src={`http://192.168.90.47:4000${item?.profileimg}`}
                alt=""
                className="w-[6vw] h-[6vw] border-[0.1vw] border-slate-200 rounded-full"
              />
              <div className="grid grid-rows-2">
                <span className="font-bold text-[1.5vw]">Name</span>
                <span className="font-light text-[1vw]">
                  {item?.owner_name}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-rows-4 gap-y-[1vw]">
              <p className="text-slate-400 font-semibold text-[0.9vw]">
                CLIENT INFORMATION
              </p>
              <div className="grid grid-cols-2 gap-x-[2vw] text-[0.85vw]">
                <span>Contact Number</span>
                <span className="font-semibold">{item?.phone}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-[2vw] text-[0.85vw]">
                <span>Type of Business</span>
                <span className="font-semibold">
                  {item?.type_of_constitution}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-[2vw] text-[0.85vw]">
                <span>Current Subscription</span>
                {/* <span className="font-semibold">Half-Yearly Plan</span> */}
              </div>
              <div className="grid grid-cols-2 gap-x-[2vw] text-[0.85vw]">
                <span>Member Since</span>
                <span className="font-semibold">{`${dayjs(
                  item?.created_date
                ).format("DD MMM YY")}`}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-y-[5vw]">
            <div className="grid grid-rows-2">
              <span className="text-slate-400 font-semibold text-[0.9vw]">
                PRODUCT KEY
              </span>
              <span className="text-green-600 font-bold text-[1.2vw]">
                {item?.generate_key}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-x-[1.5vw]">
              <div className="grid grid-rows-2">
                <span className="text-green-600 font-bold text-[1.2vw]">
                  {item?.tbs_operator_id}
                </span>
                <span className="text-slate-400 font-semibold text-[0.9vw]">
                  User ID
                </span>
              </div>
              <div className="grid grid-rows-2">
                <span className="text-green-600 font-bold text-[1.2vw]">
                  {/* 6, April, 2023 */}
                </span>
                <span className="text-slate-400 font-semibold text-[0.9vw]">
                  Activated Date
                </span>
              </div>
              <div className="grid grid-rows-2">
                <span className="text-green-600 font-bold text-[1.2vw]">
                  {/* 221 */}
                </span>
                <span className="text-slate-400 font-semibold text-[0.9vw]">
                  Days Left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    GetSubscriptionList(dispatch);
  }, []);

  useEffect(() => {
    if (updatedata != null) {
      fetchGetPermission();
    }
  }, [updatedata]);

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-[5vw]  w-full ">
        <div className="flex justify-between items-center ">
          <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
            SUBSCRIPTION
          </h1>
          {/* <div className=' w-[4vw] h-[4vw] bg-teal-500 rounded-full order-last'></div> */}
        </div>
        <div className="flex justify-between">
          <div className="relative flex items-center pb-[0.5vw]">
            <IoSearch
              className="absolute left-[22.5vw]"
              size={"1vw"}
              color="#1F4B7F"
            />
            <input
              type="text"
              className="bg-white outline-none pl-[2vw] w-[25vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
              placeholder="Search By Plan"
              onChange={(e) => {
                Search(e);
              }}
            />
          </div>
          <div className="order-last">
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["3"],
              }}
            >
              <Typography.Link>
                <Space className="text-[#8B909A]">
                  Filter By Range
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
          </div>
        </div>

        <Table
          className="custom-table"
          columns={columns}
          dataSource={data}
          pagination={false}
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
        />
      </div>

      <div className="px-[2.5vw] absolute bottom-[7vw] w-[95%] justify-between flex right-[2vw] items-center ">
        <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
          <span>Showing</span>
          <span className="font-bold">{currentItems && currentItems?.length > 0
            ? <div>{indexOfFirstItem + 1} - {indexOfFirstItem + currentItems?.length}</div> : "0"}</span>
          <span>from</span>
          <span className="font-bold"> {getSubscriptionlist?.length > 0 ? getSubscriptionlist?.length : 0}</span>
          <span>data</span>
        </div>
        <div>
          {/* <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={getSubscriptionlist?.length}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          /> */}
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
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                size="1vw"
              />
            }
            lastPageText={
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="1vw"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
