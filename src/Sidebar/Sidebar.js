import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RiAdvertisementFill,
  RiDashboardFill,
  RiDeleteBin5Fill,
  RiDiscountPercentFill,
  RiMoneyRupeeCircleFill,
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
import { useLocation, useNavigate } from "react-router";
import {
  //IoIosLogOut,
  IoIosNotifications,
  IoMdArrowDropup,
  IoMdSettings,
} from "react-icons/io";
//import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import {
  MdLogout,
  //MdOutlineSpeakerNotes,
  MdSubscriptions,
} from "react-icons/md";
import { ConfigProvider, Popover, Select, Tooltip } from "antd";
import promotionicon from "../asserts/Promotion.png";
import request_management from "../asserts/Request_Managment.png";
//import { LiaSave } from "react-icons/lia";
import Notification from "../Componenets/Notification/Notification";
import Support from "../Componenets/Support/Support";
import NotificationPopup from "../Componenets/Notification/NotificationPopup";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../Componenets/Common/Captilization";
import { debounce } from "lodash";
import "../App.css";
import { MdOutlineBackupTable } from "react-icons/md";


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
  const [selectedValue, setSelectedValue] = useState("Search..");
  const location = useLocation();

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

  function splitString(str) {
    if (str?.length > 9 && !str.slice(0, 10).includes(" ")) {
      return capitalizeFirstLetter(str.slice(0, 9)) + " " + str.slice(9);
    } else {
      return capitalizeFirstLetter(str);
    }
  }

  const options = [
    { value: "dashboard", label: "Dashboard" },
    { value: "booked tickets", label: "Booked Tickets" },
    { value: "cancelled tickets", label: "Cancelled Tickets" },
    { value: "passengers", label: "Passengers" },
    { value: "blocked history", label: "Blocked History" },
    { value: "user management", label: "User Management" },
    { value: "operator", label: "Operator" },
    { value: "partner", label: "Partner" },
    { value: "client", label: "Client" },
    { value: "employee", label: "Employee" },
    { value: "request management", label: "Request Management" },
    { value: "discount offers", label: "Discount Offers" },
    { value: "redeem offers", label: "Redeem Offers" },
    { value: "mobile advertisement", label: "Mobile Advertisement" },
    { value: "web advertisement", label: "Web Advertisement" },
    { value: "promotion", label: "Promotion" },
    { value: "roles", label: "Roles" },
    { value: "subscription", label: "Subscription" },
    { value: "company settings", label: "Company Settings" },
    { value: "user settings", label: "User Settings" },
    { value: "Configuration", label: "Configuration" },
    { value: "product integrations", label: "Product Integrations" },
    { value: "theme settings", label: "Theme Settings" },
    { value: "recycle bin", label: "Recycle Bin" },
  ];
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Handle input change and filter options based on query
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

  // const handleOptionSelect = (selectedOption) => {
  //   alert(selectedOption.value)
  //   setQuery(selectedOption.label); // Show label in the input box
  //   setFilteredOptions([]); // Clear the options after selection
  //   setFocusedIndex(-1); // Reset focus
  // };

  // Handle keyboard navigation (arrow keys and enter)
  // const handleKeyDown = (e) => {
  //   if (e.key === 'ArrowDown') {
  //     setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, filteredOptions.length - 1));
  //   } else if (e.key === 'ArrowUp') {
  //     setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  //   } else if (e.key === 'Enter' && focusedIndex >= 0) {
  //     handleOptionSelect(filteredOptions[focusedIndex]);
  //   } else if (e.key === 'Escape') {
  //     setFilteredOptions([]); // Close the dropdown
  //     setFocusedIndex(-1); // Reset focus
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

    // Allow only alphabetic characters (A-Z, a-z)
    if (!/^[A-Za-z\s]$/.test(e.key)) {
      e.preventDefault(); // Prevent the key if it's not an alphabet or space
    }

    // Handle dropdown navigation keys
    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      handleOptionSelect(filteredOptions[focusedIndex]);
    } else if (e.key === "Escape") {
      setFilteredOptions([]); // Close the dropdown
      setFocusedIndex(-1); // Reset focus
    }
  };

  // const handleChange = (value) => {
  //   if (value === "requestmanagement") {
  //     navigation('/requestmanagement')
  //     setSelectedIcon("request")
  //   }
  //   else if (value === "dashboard") {
  //     navigation('/dashboard')
  //     setSelectedIcon('dashboard')

  //   }
  //   else if (value === "usermanagement") {
  //     navigation('/usermanagement')
  //     setSelectedIcon('users')

  //   }
  //   else if (value === "offers") {
  //     navigation('/discounts')
  //     setSelectedIcon("discount")
  //   }
  //   else if (value === "advertisement") {
  //     navigation('/ads')
  //     setSelectedIcon("advertisement")
  //   }
  //   else if (value === "promotion") {
  //     navigation('/promotion')
  //     setSelectedIcon("Promotion")
  //   }
  //   else if (value === "rolesandresponsiblities") {
  //     navigation('/roles')
  //     setSelectedIcon("userGear")
  //   }
  //   else if (value === "subscription") {
  //     navigation('/subscription')
  //     setSelectedIcon("subscription")
  //   }
  //   else if (value === "settings") {
  //     navigation("/settings")
  //     setSelectedIcon("settings")
  //   }
  //   else if (value === "recyclebin") {
  //     navigation("/recyclebin")
  //     setSelectedIcon("recycle")
  //   }
  // }

  // const handleChange = useCallback(
  //   debounce((value) => {
  //     try {
  //       if (value === 'request management') {
  //         navigation('/requestmanagement');
  //         setSelectedIcon('request');
  //       } else if (value === 'dashboard') {
  //         navigation('/dashboard');
  //         setSelectedIcon('dashboard');
  //       } else if (value === 'user management') {
  //         navigation('/usermanagement');
  //         setSelectedIcon('users');
  //       } else if (value === 'redeem offers') {
  //         navigation('/discounts', { state: { tabIndex: 'redeem' } });
  //         setSelectedIcon('discount');
  //       } else if (value === 'discount offers') {
  //         navigation('/discounts', { state: { tabIndex: 'discount' } });
  //         setSelectedIcon('discount');
  //       }
  //       else if (value === 'advertisement') {
  //         navigation('/ads');
  //         setSelectedIcon('advertisement');
  //       } else if (value === 'promotion') {
  //         navigation('/promotion');
  //         setSelectedIcon('promotion');
  //       } else if (value === 'roles and responsiblities') {
  //         navigation('/roles');
  //         setSelectedIcon('userGear');
  //       } else if (value === 'subscription') {
  //         navigation('/subscription');
  //         setSelectedIcon('subscription');
  //       }
  //       else if (value === 'settings - company settings') {
  //         navigation('/settings', { state: { tabIndex: "system" } });
  //         setSelectedIcon('settings');
  //       } else if (value === 'settings - Configuration') {
  //         navigation('/settings', { state: { tabIndex: "configuration" } });
  //         setSelectedIcon('settings');
  //       }
  //       else if (value === 'settings - user settings') {
  //         navigation('/settings', { state: { tabIndex: "user" } });
  //         setSelectedIcon('settings');
  //       }
  //       else if (value === 'settings - product integrations') {
  //         navigation('/settings', { state: { tabIndex: "integrations" } });
  //         setSelectedIcon('settings');
  //       }
  //       else if (value === 'recycle bin') {
  //         navigation('/recyclebin');
  //         setSelectedIcon('recycle');
  //       }
  //       else{
  //         navigation('');
  //         setSelectedIcon("")
  //       }
  //       // Optionally reset selected value after navigation
  //       setSelectedValue('Search..');
  //     } catch (e) {
  //       console.error(e); // Error handling
  //     }
  //   }, 200), // Adjust debounce delay as needed
  //   [] // Dependency array
  // );

  useEffect(() => {
    console.log(location.pathname === "/recyclebin", "location");
    switch (location.pathname) {
      case "/requestmanagement":
        setSelectedIcon("request");
        break;
      case "/usermanagement":
        setSelectedIcon("users");
        break;
      case "/dashboard":
        setSelectedIcon("dashboard");
        break;
      case "/payments":
        setSelectedIcon("payments");
        break;
      case "/discounts":
        setSelectedIcon("discount");
        break;
      case "/ads":
        setSelectedIcon("advertisement");
        break;
      case "/promotion":
        setSelectedIcon("Promotion");
        break;
      case "/roles":
        setSelectedIcon("userGear");
        break;
      case "/subscription":
        setSelectedIcon("subscription");
        break;
      case "/settings":
        setSelectedIcon("settings");
        break;
      case "/recyclebin":
        setSelectedIcon("recycle");
        break;
    }
  }, [location.pathname]);
  const handleOptionSelect = useCallback(
    debounce((selectedOption) => {
      const { value } = selectedOption;
      // alert(selectedOption.value)
      setQuery(selectedOption.label); // Show label in the input box
      setFilteredOptions([]); // Clear the options after selection
      setFocusedIndex(-1);
      try {
        switch (value) {
          case "request management":
            navigation("/requestmanagement");
            // setSelectedIcon("request");
            break;
          case "operator":
            navigation("/usermanagement", {
              state: { tabIndex: "super_admin" },
            });
            // setSelectedIcon("users");
            break;
          case "partner":
            navigation("/usermanagement", { state: { tabIndex: "partner" } });
            // setSelectedIcon("users");
            break;
          case "client":
            navigation("/usermanagement", { state: { tabIndex: "client" } });
            // setSelectedIcon("users");
            break;
          case "employee":
            navigation("/usermanagement", { state: { tabIndex: "employee" } });
            // setSelectedIcon("users");
            break;
          case "dashboard":
            navigation("/dashboard", { state: { tabIndex: "dashboard" } });
            // setSelectedIcon("dashboard");
            break;
          case "booked tickets":
            navigation("/dashboard", { state: { tabIndex: "bookings" } });
            // setSelectedIcon("users");
            break;
          case "cancelled tickets":
            navigation("/dashboard", { state: { tabIndex: "cancellation" } });
            // setSelectedIcon("users");
            break;
          case "passengers":
            navigation("/dashboard", { state: { tabIndex: "passengers" } });
            // setSelectedIcon("users");
            break;
          case "blocked history":
            navigation("/dashboard", { state: { tabIndex: "blocked" } });
            // setSelectedIcon("users");
            break;
          case "user management":
            navigation("/usermanagement");
            // setSelectedIcon("users");
            break;
          case "redeem offers":
            navigation("/discounts", { state: { tabIndex: "redeem" } });
            // setSelectedIcon("discount");
            break;
          case "discount offers":
            navigation("/discounts", { state: { tabIndex: "discount" } });
            // setSelectedIcon("discount");
            break;
          case "web advertisement":
            navigation("/ads", { state: { tabIndex: "Web" } });
            // setSelectedIcon("advertisement");
            break;
          case "mobile advertisement":
            navigation("/ads", { state: { tabIndex: "Mobile" } });
            // setSelectedIcon("advertisement");
            break;
          case "promotion":
            navigation("/promotion");
            // setSelectedIcon("Promotion");
            break;
          case "roles":
            navigation("/roles");
            // setSelectedIcon("userGear");
            break;
          case "subscription":
            navigation("/subscription");
            // setSelectedIcon("subscription");
            break;
          case "company settings":
            navigation("/settings", { state: { tabIndex: "system" } });
            // setSelectedIcon("settings");
            break;
          case "Configuration":
            navigation("/settings", { state: { tabIndex: "configuration" } });
            // setSelectedIcon("settings");
            break;
          case "user settings":
            navigation("/settings", { state: { tabIndex: "user" } });
            // setSelectedIcon("settings");
            break;
          case "product integrations":
            navigation("/settings", { state: { tabIndex: "integrations" } });
            // setSelectedIcon("settings");
            break;
          case "theme settings":
            navigation("/settings", { state: { tabIndex: "themeSettings" } });
            // setSelectedIcon("settings");
            break;
          case "recycle bin":
            navigation("/recyclebin");
            // setSelectedIcon("recycle");
            break;
          default:
            navigation("");
            setSelectedIcon("");
        }

        // Optionally reset selected value after navigation
        setSelectedValue("Search..");
      } catch (e) {
        console.error(e); // Error handling
      }
    }, 200),
    [] // Dependency array
  );

  const searchBoxRef = useRef(null);

  // Close search input if clicked outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        // setSearchInput(false);
        setFilteredOptions([]); // Close the input if the click is outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <div className="flex items-center gap-x-[.3vw]">
                <div className="relative w-[13vw]" ref={searchBoxRef}>
                  <div className=" left-[.5vw] top-[.5vw] absolute">
                    <IoSearch size={"1.3vw"} color="white" />
                  </div>

                  <input
                    className="h-[2.5vw] pl-[2.3vw] pr-[.4vw] bg-[#57789f] placeholder:text-white text-[1vw] w-full rounded-[.4vw] outline-none text-[white]"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                  />
                  {filteredOptions.length > 0 && (
                    <ul
                      className="absolute w-[13vw]   bg-white shadow-md rounded-[.4vw] mt-1 max-h-[12vw] overflow-auto text-[1vw] text-[#1F4B7F]"
                      // style={{ top: 'calc(100% + 5px)' }}
                      // style={{top:"-125px"}}
                      style={{ bottom: "calc(100% + 4px)" }}
                    >
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          className={`p-[.5vw] text-[1vw]  hover:bg-[#f0f0f0] cursor-pointer ${
                            index === focusedIndex ? "bg-[#e0e0e0]" : ""
                          }`}
                          onClick={() => handleOptionSelect(option)} // Select option
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* <Tooltip title="Payment Details" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "payments" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("payments", "payments")}
                >
                  <RiMoneyRupeeCircleFill color="white" size={"2.5vw"} />
                </div>
              </Tooltip> */}

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
                      className={`h-[2.38vw] w-[2.38vw] p-[.2vw] ml-[0.5vw] ${
                        selectedIcon === "request" ? "" : ""
                      } `}
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
                    <FaUserGear
                      color="white"
                      size={"2.5vw"}
                      className="ml-[0.75vw]"
                    />
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
              <Tooltip title="Back Up" color="#1F4B7F">
                <div
                  className={`icon-container ${
                    selectedIcon === "backup" ? "selected" : ""
                  }`}
                  onClick={() => handleIconClick("backup", "backup")}
                >
                  <MdOutlineBackupTable color="white" size={"2.5vw"} />
                </div>
              </Tooltip>
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
              <div className="w-[11vw]">
                <Popover
                  // color="#1F4B7F"
                  // color="#2d6ab4"
                  placement="top"
                  content={
                    <div className="flex flex-col w-[8vw] rounded-md">
                      {" "}
                      {/* shadow-sm shadow-[#1F4B7F] */}
                      <div className="flex items-center p-[.5vw]">
                        <span>
                          <MdLogout size={"2vw"} color="#1F4B7F" />
                        </span>
                        <label
                          className="text-[1.2vw] pl-[0.5vw] text-[#1F4B7F] cursor-pointer font-semibold"
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
                    <label className="text-[1.2vw] max-w-[6.5vw] text-wrap text-white cursor-pointer  font-semibold">
                      {/* {sessionStorage.getItem("user_name")} */}
                      {/* {sessionStorage.getItem("user_name")?.length > 16 ? <><Tooltip color="white"
                        overlayInnerStyle={{ color: "#1F4B7F" }}
                        placement="top" title={<span className="text-[1.1vw] font-semibold">{sessionStorage.getItem("user_name")}</span>}> {`${splitString(sessionStorage.getItem("user_name")).slice(0,16)}..`}</Tooltip></> : <>{splitString(sessionStorage.getItem("user_name"))}</>} */}
                      {/* vikramgane */}

                      {sessionStorage.getItem("user_name")?.length > 9 ? (
                        <>
                          <Tooltip
                            color="white"
                            overlayInnerStyle={{ color: "#1F4B7F" }}
                            placement="top"
                            title={
                              <span className="text-[1.1vw] font-semibold">
                                {sessionStorage.getItem("user_name")}
                              </span>
                            }
                          >
                            {" "}
                            {`${capitalizeFirstLetter(
                              sessionStorage.getItem("user_name").slice(0, 8)
                            )}..`}
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          {capitalizeFirstLetter(
                            sessionStorage.getItem("user_name")
                          )}
                        </>
                      )}
                      {/* { splitString("vikram ganesa")} */}
                    </label>
                    <span className="pl-[0.5vw]">
                      <CgProfile
                        size={"1.5vw"}
                        color="white"
                        className="cursor-pointer ml-[0.5vw]"
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
              module={"notification"}
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
            module={"support"}
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
