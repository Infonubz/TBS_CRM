import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoSearch } from "react-icons/io5";
import Advertisement from "./Advertisement";
import Offers_Deals from "./Offers_Deals";
import Promotion from "./Promotion";
import Subscription from "./Subscription";
import Roles_Response from "./Role_Response";
import User_Management from "./UserManagement";
import { Select } from "antd";
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
import { GetBinData } from "../../Api/RecycleBin/RecycleBin";
// import BinDeleteAndRestore from "./BinDeleteAndRestore";
import ModalPopup from "../Common/Modal/Modal";
import ListView from "../Promotion/ListView";

export default function RecycleBin() {


  
  const dispatch = useDispatch()
 useEffect(()=>{
  GetBinData(dispatch,1)
 },[])

 const getBin = useSelector((state)=>state.crm.bin_data)

 console.log(getBin,"hhdfjkhdkfjd");
  const [selectedTab, setSelectedTab] = useState(1);

  const onChange = (value) =>{
    setSelectedTab(value)
    GetBinData(dispatch,value)
  }

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getBin?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(activePage, 'active_page')
  console.log(itemsPerPage, 'items_per_page')
  console.log(indexOfFirstItem, 'Index_of_first_items')
  console.log(indexOfLastItem, 'index_of_last_item')
  console.log(currentItems, 'current_itmes')
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
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
      <div className="left-[5%] right-[5%] px-[5vw]">
        <div className="flex">
          <h1 className="text-[#1F4B7F] text-[1.8vw] font-bold flex items-center justify-center">
            RecycleBin
          </h1>
        </div>
        <div className="flex  items-center  justify-between gap-[2vw]">
          <div className="relative flex items-center ">
            <input
              type="text"
              className="bg-white outline-none pl-[2vw] w-[17vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
              placeholder="Search.."
              // onChange={(e) => handleSearch(e.target.value)}
            />
            <IoSearch
              className="absolute left-[0.5vw]"
              size={"1vw"}
              color="#1F4B7F"
            />
          </div>
          <div className="text-[#1F4B7F] font-bold text-[2vw]">
            {
           selectedTab === 1 ? <span>Offers & Deals</span> : selectedTab === 2 ?<span>Promotions</span> : selectedTab === 3 ? <span>Advertisements</span> : selectedTab === 4 ? <span>Advertisements - Mobile </span> : selectedTab === 5 ? <span>UserManagement - BusOperator</span> : selectedTab === 6 ? <span>UserManagement - Employee</span> : selectedTab === 7 ? <span>UserManagement - Client</span> : <span>Offers & Deals</span>
            }</div>
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
                 <Select
                    showSearch
                    placeholder="Select one"
                    suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}><IoMdArrowDropdown size="2vw" /></span>}
                    filterOption={(input, option) => {
                      const labelText = option?.label?.props.children || "";
                      return labelText.toLowerCase().includes(input.toLowerCase());
                    }}
                    onChange={onChange}
                    style={{
                      width: 300,
                    }}
                    defaultValue={{
                      value: 1,
                      label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">Offers & Deals</div>,
                    }}
                    className="text-blue-500 h-[2.5vw]  outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.7vw] border-r-[0.2vw] border-b-[0.2vw]"
                    options={[
                      {
                        value: 1,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">Offers & Deals</div>,
                      },
                      {
                        value: 2,
                        label: <div className="text-[1vw]  font-semibold pl-[0.7vw] pb-[0.1vw]">Promotions</div>
                      },
                      {
                        value: 3,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">Advertisements</div>
                      },
                      {
                        value: 5,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">UserManagement - BusOperator</div>
                      },
                      {
                        value: 7,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">UserManagement - Client</div>,
                      },
                      {
                        value: 8,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">UserManagement - Employee</div>,
                      },
                      {
                        value: 9,
                        label: <div className="text-[1vw] font-semibold pl-[0.7vw] pb-[0.1vw]">UserManagement - Partner</div>,
                      },
                    ]}
                  />
        </div>

        <div className="">
          {selectedTab === 1 && <Offers_Deals currentItems={currentItems} />}
          {selectedTab === 2 && <Promotion currentItems={currentItems}/>}
          {selectedTab === 3 && <Advertisement currentItems={currentItems} />}
          {selectedTab === 4  && <User_Management />}
          {selectedTab === 5  && <User_Management currentItems={currentItems} selectedTab={selectedTab} />}
          {selectedTab === 6  && <User_Management />}
          {selectedTab === 7  && <User_Management currentItems={currentItems} selectedTab={selectedTab} />}
          {selectedTab === "roles" && <Roles_Response />}
          {selectedTab === "subscript" && <Subscription />}
        </div>
      </div>
      <div className="w-full h-[8vh] flex justify-between items-center px-[5vw]">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
                <span>Showing</span>
                <span className="font-bold">{currentItems && currentItems?.length > 0 ? <div>{indexOfFirstItem + 1} - {indexOfFirstItem + currentItems?.length}</div> : "0"}</span>
                <span>from</span>
                <span className="font-bold">{getBin?.length > 0 ? getBin?.length : 0}</span>
                <span>data</span>
              </div>
              <div>
                {/* <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={getofferlist?.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageChange}
                  // showSizeChanger
                /> */}
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

                {/* <input
                type="file"
                // onChange={(e) => console.log(e.target.value, "datatatat")}
                onChange={(e) => handleSubmit(e)}
              /> */}
              </div>
            </div>
        
    </div>
  );
}
