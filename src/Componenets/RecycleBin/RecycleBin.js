import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoSearch } from "react-icons/io5";
import Advertisement from "./Advertisement";
// import Offers_Deals from "./OffersDeals";
import Promotion from "./Promotion";
import Subscription from "./Subscription";
// import Roles_Response from "./RoleResponse";
// import User_Management from "./UserManagement";
import { ConfigProvider, Popover, Select, Spin } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { GetBinData, SearchBindData } from "../../Api/RecycleBin/RecycleBin";
import UserManagement from "./UserManagement";
import OffersDeals from "./OffersDeals";
import RolesResponse from "./RoleResponse";
import { BsExclamationCircle } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";

export default function RecycleBin() {
  const [spinning, setSpinning] = useState(false);
  const typeId = sessionStorage.getItem("type_id");

  const dispatch = useDispatch();
  useEffect(() => {
    setSpinning(true);
    GetBinData(dispatch, typeId === "PRO101" ? 5 : 2, setSpinning);
  }, []);

  const getBin = useSelector((state) => state.crm.bin_data);

  console.log(getBin, "hhdfjkhdkfjd");
  const [selectedTab, setSelectedTab] = useState(typeId === "PRO101" ? 5 : 2);

  const onChange = (value) => {
    setSelectedTab(value);
    setSpinning(true);
    setActivePage(1);
    GetBinData(dispatch, value, setSpinning);
  };

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = selectedTab === 3 ? 5 : selectedTab === 4 ? 5 : 10;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getBin?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(activePage, "active_page");
  console.log(itemsPerPage, "items_per_page");
  console.log(indexOfFirstItem, "Index_of_first_items");
  console.log(indexOfLastItem, "index_of_last_item");
  console.log(currentItems, "current_itmes");
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // const tabTitles = {
  //   1: "Offers & Deals",
  //   2: "Promotions",
  //   3: "Advertisements - Web",
  //   4: "Advertisements - Mobile",
  //   5: "UserManagement - BusOperator",
  //   6: "Operator Employee",
  //   7: "UserManagement - Client",
  //   8: "ProductOwner Employee",
  //   9: "UserManagement - Partner",
  // };

  const tabTitles = {
    1: "(Offers & Deals)",
    2: "(Promotions)",
    3: "(Advertisements - Web)",
    4: "(Advertisements - Mobile)",
    5: "(Operator)",
    6: "(Operator - Employee)",
    7: "(Client)",
    8: "(ProductOwner - Employee)",
    9: "(Partner)",
  };

  const selectedTitle = tabTitles[selectedTab] || "Offers & Deals";

  const handleSearch = (e) => {
    SearchBindData(dispatch, selectedTab, e);
  };
  const options = [
    {
      value: 5,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          User Management - Operator
        </div>
      ),
    },
    {
      value: 9,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          User Management - Partner
        </div>
      ),
    },
    {
      value: 7,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          User Management - Client
        </div>
      ),
    },
    {
      value: 8,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          {/* ProductOwner-Employee */}
          User Management - Employee
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div className="text-[1vw] text-[#1F4B7F] font-semibold pl-[0.2vw]  ">
          Offers & Deals
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          Advertisements - Web
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          Advertisements - Mobile
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]   font-semibold pl-[0.2vw] ">
          Promotions
        </div>
      ),
    },
    // {
    //   value: 6,
    //   label: (
    //     <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.7vw] pb-[0.1vw]">
    //       Operator-Employee
    //     </div>
    //   ),
    // },
  ];
  const operatorOptions = [
    {
      value: 2,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]   font-semibold  ">
          Promotions
        </div>
      ),
    },
    {
      value: 6,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold ">
          Employee
        </div>
      ),
    },
  ];

  const defaultvalues = {
    // value: 1,
    // label: (
    //   <div className="text-[1vw] text-[#1F4B7F] font-semibold  ">
    //     Offers & Deals
    //   </div>
    // ),
      value: 5,
      label: (
        <div className="text-[1vw] text-[#1F4B7F]  font-semibold pl-[0.2vw] ">
          User Management - Operator
        </div>
      ),
  };
  const operatorDefaultvalues = {
    value: 2,
    label: (
      <div className="text-[1vw] text-[#1F4B7F]   font-semibold ">
        Promotions
      </div>
    ),
  };

  // useEffect(()=>{
  // if(currentItems?.length == 0){
  //   setActivePage(activePage - 1)
  // }

  // },[currentItems])
  useEffect(() => {
    if (currentItems?.length === 0 && activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [currentItems]);

  const data = {
    1: [{ title: "Name" }, { title: "Code" }, { title: "status" }],
    2: [
      { title: "Name" },
      { title: "Operator name" },
      { title: "Description" },
      { title: "status" },
    ],
    3: [{ title: "Title" }, { title: "Description" }, { title: "status" }],
    4: [{ title: "Title" }, { title: "Description" }, { title: "status" }],
    5: [
      { title: "Name" },
      { title: "Mobile" },
      { title: "Email" },
      // { title: "Deleted Date" },
      { title: "status" },
    ],
    7: [
      { title: "Name" },
      { title: "Mobile" },
      { title: "Email" },
      // { title: "Deleted Date" },
      { title: "status" },
    ],
    8: [
      { title: "Name" },
      { title: "Mobile" },
      { title: "Email" },
      // { title: "Deleted Date" },
      { title: "status" },
    ],
    9: [
      { title: "Name" },
      { title: "Mobile" },
      { title: "Email" },
      // { title: "Deleted Date" },
      { title: "status" },
    ],
    7: [
      { title: "Name" },
      { title: "Mobile" },
      { title: "Email" },
      // { title: "Deleted Date" },
      { title: "status" },
    ],
  };

  const currentArray = data[selectedTab];

  console.log(selectedTab, "currenttabs");
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
      <>
        <div className="px-[2.5vw] h-[92vh] ">
          <div className=" ">
            <div className="h-[12vh] mb-[.2vw] w-full items-center">
              <div className="flex items-center">
                <h1 className="text-[#1F4B7F] text-[1.8vw] font-bold flex items-center justify-center">
                  <span className="pr-[.3vw]">Recycle Bin</span>{" "}
                  <span className="text-[1vw]">-</span>
                  <span className="text-[1vw] pl-[.5vw]">{selectedTitle}</span>
                </h1>
              </div>
              <div className="flex  items-center h-[8vh]  justify-between gap-[2vw] pb-[1vw]">
                <div className="relative flex items-center ">
                  <input
                    type="text"
                    className="bg-white outline-none text-[#1F4B7F] px-[2vw] w-[17vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]"
                    placeholder="Search.."
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute inline-block align-text-bottom  right-[1vw] ">
                    <Popover
                      color="white"
                      title={
                        <div className=" text-[#1F4B7F]  p-[1vw] max-h-[20vw] overflow-auto ">
                          <span className="font-bold">SEARCH BY ...</span>
                          {currentArray?.map((info, index) => (
                            <div key={index} className="flex flex-col">
                              <ul
                                className="pl-[1vw]"
                                style={{ listStyleType: "disc" }}
                              >
                                <li className="text-[0.8vw] ">
                                  <p className="">{info.title}</p>
                                </li>
                              </ul>
                              <span className="text-[.7vw] pl-[1vw] ">
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
                  </div>
                  <LiaSearchSolid
                    className="absolute left-[0.5vw] pb-[.1vw] "
                    size={"1.1vw"}
                    color="#9CA3AF"
                  />
                </div>
                <div className="text-[#1F4B7F] font-bold text-[2vw]">
                  {/* {
              selectedTab === 1 ? <span>Offers & Deals</span> : selectedTab === 2 ? <span>Promotions</span> : selectedTab === 3 ? <span>Advertisements</span> : selectedTab === 4 ? <span>Advertisements - Mobile </span> : selectedTab === 5 ? <span>UserManagement - BusOperator</span> : selectedTab === 6 ? <span>Operator Employee</span> : selectedTab === 7 ? <span>UserManagement - Client</span> : selectedTab === 9 ?<span>UserManagement - Partner</span>: selectedTab === 8 ? <span>ProductOwner Employee</span> :<span>Offers & Deals</span>
            } */}
                  {/* <span>{selectedTitle}</span> */}
                </div>
                {/* <div className="flex items-center gap-x-[3vw]">
            <div
              className={` cursor-pointer ${
                selectedTab == "user management"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => {
                setSelectedTab("user management");
              }}
            >
              <p className="text-[1.3vw] text-[#1f487c] text-center">
                User Management
              </p>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "offers"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("offers")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Offers & Deals
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "ads"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("ads")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Advertisement
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "promo"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("promo")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Promotion
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "roles"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("roles")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Roles & Responsibilities
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "subscript"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("subscript")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Subscription
              </div>
            </div>
          </div> */}
                {/* <Select
                  showSearch
                  placeholder="Select one"
                  suffixIcon={
                    <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                      <IoMdArrowDropdown size="2vw" />
                    </span>
                  }
                  filterOption={(input, option) => {
                    const labelText = option?.label?.props.children || "";
                    return labelText.toLowerCase().includes(input.toLowerCase());
                  }}
                  onChange={onChange}
                  style={{
                    width: 300,
                  }}
                  // defaultValue={{
                  //   value: 1,
                  //   label: (
                  //     <div className="text-[1vw] text-[#1F4B7F] font-semibold pl-[0.7vw] pb-[0.1vw]">
                  //       Offers & Deals
                  //     </div>
                  //   ),
                  // }}
                  defaultValue={typeId === "PRO101" ? defaultvalues : operatorDefaultvalues}
                  className="text-[#1F4B7F] h-[5vh] text-[1vw]  outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.2vw] border-b-[0.2vw]"

                  options={
                    typeId === "PRO101" ? options : operatorOptions
                  }
                /> */}
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: "#aebed1",
                        optionSelectedColor: "#FFF",
                        optionSelectedBg: '#e5e5e5',
                        optionHeight: "2",
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    // value={values.per_city}
                    // placement="topRight"
                    // listHeight={190}
                    onChange={onChange}
                    className={` custom-select bg-white border-r-[0.25vw] w-[20vw] text-[2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] h-[5vh]  rounded-[0.75vw] outline-none  px-[1vw]`}
                    // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select"
                    filterOption={(input, option) => {
                      const labelText = option?.label?.props.children || "";
                      return labelText
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                    optionFilterProp="value"
                    suffixIcon={
                      <span style={{ color: "#1f487c" }}>
                        <IoMdArrowDropdown size="2vw" />
                      </span>
                    }
                    style={{ padding: 1 }}
                    defaultValue={
                      typeId === "PRO101"
                        ? defaultvalues
                        : typeId === "PROEMP101"
                        ? defaultvalues
                        : operatorDefaultvalues
                    }
                    options={
                      typeId === "PRO101"
                        ? options
                        : typeId === "PROEMP101"
                        ? options
                        : operatorOptions
                    }
                  />
                </ConfigProvider>
              </div>
            </div>

            {spinning ? (
              <div className="absolute inset-0 flex justify-center items-center  z-10">
                <Spin size="large" />
              </div>
            ) : (
              <div className="h-[72vh]">
                {selectedTab === 1 && (
                  <OffersDeals
                    currentItems={currentItems}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    selectedTab={selectedTab}
                  />
                )}
                {selectedTab === 2 && (
                  <Promotion
                    currentItems={currentItems}
                    selectedTab={selectedTab}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {selectedTab === 3 && (
                  <Advertisement
                    currentItems={currentItems}
                    selectedTab={selectedTab}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {selectedTab === 4 && (
                  <Advertisement
                    currentItems={currentItems}
                    selectedTab={selectedTab}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {selectedTab === 5 && (
                  <UserManagement
                    currentItems={currentItems}
                    selectedTab={selectedTab}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {selectedTab === 6 && (
                  <UserManagement
                    currentItems={currentItems}
                    selectedTab={selectedTab}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {selectedTab === 7 && (
                  <UserManagement
                    currentItems={currentItems}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    selectedTab={selectedTab}
                  />
                )}
                {selectedTab === 8 && (
                  <UserManagement
                    currentItems={currentItems}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    selectedTab={selectedTab}
                  />
                )}
                {selectedTab === 9 && (
                  <UserManagement
                    currentItems={currentItems}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    selectedTab={selectedTab}
                  />
                )}
                {selectedTab === "roles" && <RolesResponse />}
                {selectedTab === "subscript" && <Subscription />}
              </div>
            )}
          </div>

          {getBin?.length > 10 && spinning === false ? (
            <div className="w-full h-[8vh] flex justify-between items-center ">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
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
                  {getBin?.length > 0 ? getBin?.length : 0}
                </span>
                <span>data</span>
              </div>
              <div>
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={getBin?.length}
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
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
