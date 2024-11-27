import React, { useEffect, useState } from "react";
import {
  RiAdvertisementFill,
  RiDashboardFill,
  RiDeleteBin5Fill,
  RiDiscountPercentFill,
} from "react-icons/ri";
import "./index.css";
import {
  IoHelpCircle,
  //IoHelpCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
//import { BiSolidReport } from "react-icons/bi";
import { useNavigate } from "react-router";
import {
  //IoIosLogOut,
  IoIosNotifications,
  IoMdSettings,
} from "react-icons/io";
//import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import {
  MdLogout,
  //MdOutlineSpeakerNotes,
  MdSubscriptions,
} from "react-icons/md";
import { Popover, Tooltip } from "antd";
import promotionicon from "../asserts/Promotion.png";
import request_management from "../asserts/Request_Managment.png";
//import { LiaSave } from "react-icons/lia";
import Notification from "../Componenets/Notification/Notification";
import Support from "../Componenets/Support/Support";
import NotificationPopup from "../Componenets/Notification/NotificationPopup";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Sidebar() {
  //const unreadCounts = 0;
  const getnotificationlist = useSelector(
    (state) => state.crm.notification_count
  );
  // const {unread_count}=getnotificationlist
  const [unreadCountss, setunreadCountss] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(() => {
    return sessionStorage.getItem("selectedIcon") || "dashboard";
  });
  const navigation = useNavigate();
  const [searchInput, setSearchInput] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const storedModulePermissions = sessionStorage.getItem("module_permission");
  const currenttypeid = sessionStorage.getItem("type_id");
  const modulePermissions = storedModulePermissions
    ? JSON.parse(storedModulePermissions)
    : [];

  const showPromotionsIcon = modulePermissions?.some(
    (permission) => permission.module_name === "Promotions"
  );
  const showAdvertisement = modulePermissions?.some(
    (permission) => permission.module_name === "Advertisement"
  );
  const showRoles = modulePermissions?.some(
    (permission) => permission.module_name === "Roles"
  );
  const showOffers = modulePermissions?.some(
    (permission) => permission.module_name === "Offers & Deals"
  );
  const showClient = modulePermissions?.some(
    (permission) => permission.module_name === "Client - (UM)"
  );
  const showEmployee = modulePermissions?.some(
    (permission) => permission.module_name === "Employee - (UM)"
  );
  const showPartner = modulePermissions?.some(
    (permission) => permission.module_name === "Partner - (UM)"
  );

  const handleIconClick = (iconName, page) => {
    setSelectedIcon(iconName);
    sessionStorage.setItem("selectedIcon", iconName);
    navigation(`/${page}`);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };
  const openNotification = () => {
    setIsSupportOpen(false);
    setIsNotificationOpen(true);
    setSelectedIcon("notification");
  };

  const openSupport = () => {
    setIsNotificationOpen(false);
    setIsSupportOpen(true);
    setSelectedIcon("support");
  };
  const colseSupport = () => {
    setIsSupportOpen(false);
  };

  useEffect(() => {
    if (getnotificationlist !== undefined) {
      setunreadCountss(getnotificationlist);
    }
  }, [getnotificationlist]);

  return (
    <div className="fixed w-full px-[2.5vw]">
      <div className="relative ">
        {/* rounded-t-full */}
        <div className="absolute h-[8vh] bottom-0  pl-[2.5vw]  flex items-center rounded-t-full  bg-[#1F4B7F] w-full">
          {/* <div className="absolute h-[5vw] bottom-0 left-0 right-0 px-[5vw] flex items-center  bg-[#1F4B7F] w-[100%]"> */}
          <div className=" flex items-center justify-between w-full">
            <div className="flex items-center gap-[2vw]">
              <Tooltip title="Dashboard" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "dashboard" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("dashboard", "dashboard")}
                >
                  <RiDashboardFill color="white" size={"2.5vw"} />
                </div>
              </Tooltip>
              {/* {searchInput ? (
                <div
                  className="search-container"
                  onMouseLeave={() => setSearchInput(false)}
                >
                  <input
                    type="text"
                    className="search-input outline-none pl-[5vw]"
                    placeholder="Search"
                  />
                  <IoSearch className="search-icon" />
                </div>
              ) : (
                <div
                  className="search-button"
                  onMouseEnter={() => setSearchInput(true)}
                  onMouseLeave={() => setSearchInput(false)}
                >
                  <IoSearch size={"1.5vw"} color="white" />
                </div>
              )} */}
              <Tooltip
                width="20vw"
                title={
                  <div
                    className="search-container"
                    onMouseLeave={() => setSearchInput(false)}
                  >
                    <input
                      type="text"
                      className="search-input outline-none pl-[5vw]"
                      placeholder="Search"
                    />
                    <IoSearch className="search-icon" />
                  </div>
                }
                color="#1F4B7F"
                placement="topLeft"
                className="w-[20vw]"
                style={{
                  width: "20vw",
                }}
              >
                <div
                  className="search-button"
                  onMouseEnter={() => setSearchInput(true)}
                  onMouseLeave={() => setSearchInput(false)}
                >
                  <IoSearch size={"1.5vw"} color="white" />
                </div>
              </Tooltip>
              {(showClient ||
                showEmployee ||
                showPartner ||
                currenttypeid === "PRO101" ||
                currenttypeid === "OP101") && (
                <Tooltip title="User Management" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "users" ? "selected" : ""
                    }`}
                    onClick={() => handleIconClick("users", "usermanagement")}
                  >
                    <FaUsers color="white" size={"2.5vw"} />
                  </div>
                </Tooltip>
              )}
              {currenttypeid === "PRO101" && (
                <Tooltip title="Request Management" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "request" ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleIconClick("request", "requestmanagement")
                    }
                  >
                    {/* <HiOutlineClipboardDocumentList
                    color="white"
                    size={"2.5vw"}
                  /> */}
                    <img
                      src={request_management}
                      alt="request management"
                      className="h-[2vw] w-[2vw]"
                    />
                  </div>
                </Tooltip>
              )}
              {(showOffers || currenttypeid === "PRO101") && (
                <Tooltip title="Offers & Deals" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "discount" ? "selected" : ""
                    }`}
                    onClick={() => handleIconClick("discount", "discounts")}
                  >
                    <RiDiscountPercentFill color="white" size={"2.5vw"} />
                  </div>
                </Tooltip>
              )}
              {(showAdvertisement || currenttypeid === "PRO101") && (
                <Tooltip title="Advertisement" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "advertisement" ? "selected" : ""
                    }`}
                    onClick={() => handleIconClick("advertisement", "ads")}
                  >
                    <RiAdvertisementFill color="white" size={"2.5vw"} />
                  </div>
                </Tooltip>
              )}
              {(showPromotionsIcon ||
                currenttypeid === "PRO101" ||
                currenttypeid === "OP101") && (
                <Tooltip title="Promotion" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "Promotion" ? "selected" : ""
                    }`}
                    onClick={() => handleIconClick("Promotion", "promotion")}
                  >
                    {/* <MdOutlineSpeakerNotes color="white" size={"2.5vw"} /> */}
                    <img
                      src={promotionicon}
                      alt="promotion icon"
                      className="h-[2.5vw] w-[2.5vw]"
                    />
                  </div>
                </Tooltip>
              )}
              {(showRoles ||
                currenttypeid === "PRO101" ||
                currenttypeid === "OP101") && (
                <Tooltip title="Roles & Responsibilities" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "userGear" ? "selected" : ""
                    }`}
                    onClick={() => handleIconClick("userGear", "roles")}
                  >
                    <FaUserGear color="white" size={"2.5vw"} />
                  </div>
                </Tooltip>
              )}
              {/* <Tooltip title="Report" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "report" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("report", "reports")}
                >
                  <BiSolidReport color="white" size={"2.5vw"} />
                </div>
              </Tooltip> */}
              {currenttypeid === "PRO101" && (
                <Tooltip title="Subscription" color="#1F4B7F">
                  <div
                    className={`icon-container ${
                      selectedIcon === "subscription" ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleIconClick("subscription", "subscription")
                    }
                  >
                    <MdSubscriptions color="white" size={"2.5vw"} />
                  </div>
                </Tooltip>
              )}
            </div>
            <div className="flex items-center gap-[1vw]">
              <Tooltip title="Settings" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "settings" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("settings", "settings")}
                >
                  <IoMdSettings color="white" size={"2.5vw"} />
                </div>
              </Tooltip>
              <Tooltip title="Notification" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "notification" ? "selected" : ""
                  }`}
                  onClick={
                    openNotification
                    // handleIconClick("notification", "notification")
                  }
                >
                  {/* <div> */}
                  <div className="relative">
                    <IoIosNotifications color="white" size={"2.5vw"} />
                  </div>
                  {unreadCountss > 0 ? (
                    <div className="h-[1.5vw] w-[1.5vw] absolute bottom-[1.5vw] left-[1.3vw] rounded-xl bg-red-600 text-white">
                      <span className="flex flex-col items-center text-[1vw]">
                        {unreadCountss}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* </div> */}
              </Tooltip>
              <Tooltip title="Support" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "support" ? "selected" : ""
                  }`}
                  onClick={
                    openSupport
                    // handleIconClick("support", "support")
                  }
                >
                  <IoHelpCircle color="white" size={"2.5vw"} />
                </div>
              </Tooltip>
              <Tooltip title="Recycle Bin" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "recycle" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("recycle", "recyclebin")}
                >
                  <RiDeleteBin5Fill color="white" size={"2.5vw"} />
                </div>
              </Tooltip>
              <div className="border-r-[0.2vw] border-white h-[2.5vw]"></div>
              <div className="w-[10vw]">
                <Popover
                  placement="top"
                  content={
                    <div className="flex flex-col w-[8vw]">
                      <div className="flex items-center">
                        <span>
                          <MdLogout size={"2vw"} />
                        </span>
                        <label
                          className="text-[1.2vw] pl-[0.5vw] text-black cursor-pointer font-semibold"
                          onClick={() => {
                            sessionStorage.removeItem("token");
                            sessionStorage.removeItem("selectedIcon");
                            sessionStorage.removeItem("token");
                            sessionStorage.clear();
                            navigation("/");
                            window.location.reload();
                          }}
                        >
                          Logout
                        </label>
                      </div>
                    </div>
                  }
                  trigger="click"
                  // open={openPopovers[row.ad_id] || false}
                  // onOpenChange={() => togglePopover(row.ad_id)}
                >
                  <div className="flex items-center cursor-pointer">
                    <label className="text-[1.2vw] text-white cursor-pointer  font-semibold">
                      {sessionStorage.getItem("user_name")}
                      {/* {sessionStorage.getItem("user_name")} */}
                    </label>
                    <span className="pl-[0.5vw]">
                      <CgProfile
                        size={"1.5vw"}
                        color="white"
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                </Popover>
              </div>
            </div>
            <NotificationPopup
              className="border border-[#1f487c] h-[100%] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
              show={isNotificationOpen}
              closeicon={false}
              onClose={closeNotification}
              // height="90%"
              // width="30vw"
            >
              {/* <div className="overflow-auto mt-6 max-h-[70vh]">
        {content.map((item, index) => (
          <div key={index} className="flex border-b  last:border-b-0 py-2">
            <div className="font-semibold w-1/4">{item.title}:</div>
            <div className="w-2/3">{item.description}</div>
          </div>
        ))}
      </div> */}
              <Notification />
            </NotificationPopup>
          </div>
          <NotificationPopup
            className="border border-[#1f487c] h-[100%] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
            show={isSupportOpen}
            closeicon={false}
            onClose={colseSupport}
            // height="90%"
            // width="30vw"
          >
            {/* <div>
        <div className="flex justify-center text-[#1f487c] font-bold"><h1>GEt In Touch</h1></div>
        <div>Phone : <span>1234567890</span></div>
        <div>Mail  : <span>nubiznez@nubiznez.com</span></div>

        <form>
          <label>Name</label>
          <input type="text" />
          <label>phone</label>
          <input type="number"/>
          <label>email</label>
          <input type="mail"/>
          <label>message</label>
          <textarea></textarea>
          <button
              className="flex bg-[#1F4B7F] mt-[0.3vw] px-[0.6vw] gap-[0.5vw] py-[0.3vw] rounded-[0.6vw] items-center justify-center"
              type="submit"
            >
              <span>
                <LiaSave color="white" size={"1.5vw"} />
              </span>
              <span className="text-white text-[1vw]">Submit</span>
            </button>
        </form>
        </div> */}
            <Support />
          </NotificationPopup>
        </div>
      </div>
    </div>
  );
}
