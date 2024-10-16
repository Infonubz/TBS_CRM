import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { BsPlusLg } from "react-icons/bs";
import { PiUpload } from "react-icons/pi";
import { Table, Pagination, Tooltip } from "antd";
import { IoGrid, IoSearch } from "react-icons/io5";
import ModalPopup from "../Common/Modal/Modal";
import Ad_Advertisement from "./Add_Advertisement";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Popover } from "antd";
import DeleteList from "../Offers/DeleteList";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAdsData,
  handleAdsearch,
  handleMbleAdsearch,
  GetMobileAds,
} from "../../Api/Ads/Ads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ReactPaginate from "react-js-pagination";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import "../../App.css";
import { IoMdMenu } from "react-icons/io";

export default function Advertisement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [adsdata, setAdsData] = useState([]);
  const [updatedata, SetUpdateData] = useState(null);
  const [mbleUpdatedata, SetMbleUpdateData] = useState(null);
  const [openPopovers, setOpenPopovers] = useState({});
  const [toggleDelete, settoggleDelete] = useState(false);
  const [deleteData, SetDeleteData] = useState();
  const [tabType, setTabType] = useState("Web");
  const apiUrl = process.env.REACT_APP_API_URL;
  const getadlist = useSelector((state) => state.crm.ad_list);
  const getMobileadlist = useSelector((state) => state.crm.mobile_adsList);

  const togglePopover = (adId) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [adId]: !prevState[adId],
    }));
  };

  const handleEdit = (tbs_ad_id) => {
    setIsModalOpen(true);
    SetUpdateData(tbs_ad_id);
    console.log(tbs_ad_id, "aaaadddddiiiiidddddd");
    // Close popover
    togglePopover(tbs_ad_id);
  };

  const Search = (e) => {
    if (tabType == "Web") {
      handleAdsearch(e, dispatch);
    } else {
      handleMbleAdsearch(e, dispatch);
    }
  };

  const handleMbleEdit = (tbs_mobad_id) => {
    setIsModalOpen(true);
    SetUpdateData(tbs_mobad_id);
    togglePopover(tbs_mobad_id);
  };

  const closeMbleModal = () => {
    setIsModalOpen(false);
    SetUpdateData(null);
    setAdsData("");
  };

  const handleDelete = (adId) => {
    setDeleteModalIsOpen(true);
    SetDeleteData(adId);
    // Close popover
    togglePopover(adId);
  };

  const handleMbleDelete = (tbs_mobad_id) => {
    setDeleteModalIsOpen(true);
    SetDeleteData(tbs_mobad_id);
    togglePopover(tbs_mobad_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    SetUpdateData(null);
    setAdsData("");
  };

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    GetAdsData(dispatch);
    GetMobileAds(dispatch);
  }, []);

  const webColumns = [
    // {
    //   title: (
    //     <span className="flex justify-center">
    //       <h1 className="text-[1.2vw] font-semibold">S.No</h1>
    //     </span>
    //   ),
    //   width: "5vw",
    //   render: (row, rowdta, index) => (
    //     <div className="flex justify-center ">
    //       <h1 className="pl-[1vw] text-[1vw] justify-center">{index + 1}</h1>
    //     </div>
    //   ),
    // },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">S.No</h1>
        </span>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        // Calculate the serial number based on current page
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1vw] justify-center">{serialNumber}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Client Details</h1>
        </span>
      ),
      width: "15vw",
      sorter: (a, b) => a.client_details.localeCompare(b.client_details),
      render: (row, rowdta, index) => (
        <div className="flex flex-col items-center">
          <div>
            <div>
              <h1 className="text-[1.2vw] text-[#1F4B7F] font-medium">
                {row.client_details}
              </h1>
            </div>
            <div>
              <h1 className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
                {row.emailid}
              </h1>
            </div>
            <div>
              <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
                {row.phone}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Ad Details</h1>
        </span>
      ),
      width: "15vw",
      sorter: (a, b) =>
        tabType == "Web"
          ? a.ad_title.localeCompare(b.ad_title)
          : a.mobad_title.localeCompare(b.mobad_title),
      render: (row, rowdta, index) => (
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center">
            {row?.ad_title?.length > 15 ? (
              <Tooltip
                placement="top"
                title={row?.ad_title}
                className="cursor-pointer"
                color="#1F487C"
              >
                <div className="text-[1.2vw] text-[#1F4B7F] font-medium">
                  {`${row?.ad_title?.slice(0, 15)}...`}
                </div>
              </Tooltip>
            ) : (
              <div className="text-[1.2vw] text-[#1F4B7F] font-medium">
                {row?.ad_title?.slice(0, 15)}
              </div>
            )}
            <div className="text-right">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col">
                    <div>
                      <a
                        onClick={() => handleEdit(row.tbs_ad_id)}
                        className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-1"
                          color="#1f487c"
                        />
                        Edit
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={() => handleDelete(row.tbs_ad_id)}
                        className="flex pt-[1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mr-1"
                          color="#1f487c"
                        />
                        Delete
                      </a>
                    </div>
                  </div>
                }
                trigger="click"
                open={openPopovers[row.tbs_ad_id] || false}
                onOpenChange={() => togglePopover(row.tbs_ad_id)}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  color="#1f487c"
                  style={{
                    height: "1.5vw",
                    width: "1.5vw",
                  }}
                />
              </Popover>
            </div>
          </div>
          <div>
            <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
              Usage per day : {row?.usage_per_day}
            </p>
          </div>
          <div>
            <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
              {`${dayjs(row?.start_date).format("DD MMM, YY")}`} -{" "}
              {`${dayjs(row?.end_date).format("DD MMM, YY")}`}
            </p>
          </div>
          <div>
            <button
              className={`${row.status_id == 3
                ? "bg-[#34AE2A]"
                : row.status_id == 1
                  ? "bg-[#FD3434]"
                  : row.status_id == 2
                    ? "bg-[#FF9900]"
                    : "bg-[#FF9900]"
                } rounded-[0.5vw] text-[1.1vw] mt-[0.5vw] font-semibold text-white w-[9vw] py-[0.2vw]`}
            >
              {capitalizeFirstLetter(row.status)}
            </button>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Video</h1>
        </span>
      ),

      width: "70vw",
      render: (row, rowdta, index) => {
        console.log(row.ad_video, "row.ad_videorow.ad_video");
        return (
          <div className="w-full h-[20vh] overflow-hidden">
            {row.ad_file_type && row.ad_file_type.startsWith("image/") ? (
              <img
                src={`http://192.168.90.47:4000${row.ad_video}`}
                alt="Ad"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "1.4vw",
                }}
              />
            ) : (
              <div className="react-player-wrapper">
                <ReactPlayer
                  playing
                  loop
                  muted
                  width="100%"
                  height="auto"
                  style={{
                    objectFit: "cover",
                  }}
                  url={`http://192.168.90.47:4000${row.ad_video}`}
                  className="react-player"
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const mobileColumns = [
    // {
    //   title: (
    //     <span className="flex justify-center">
    //       <h1 className="text-[1.2vw] font-semibold">S.No</h1>
    //     </span>
    //   ),
    //   width: "5vw",
    //   render: (row, rowdta, index) => (
    //     <div className="flex justify-center ">
    //       <h1 className="pl-[1vw] text-[1vw] justify-center">{index + 1}</h1>
    //     </div>
    //   ),
    // },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">S.No</h1>
        </span>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        // Calculate the serial number based on current page
        const serialNumber = (mble_activePage - 1) * mbleItemsPerPage + (index + 1);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1vw] justify-center">{serialNumber}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Client Details</h1>
        </span>
      ),
      width: "15vw",
      sorter: (a, b) => a.client_details.localeCompare(b.client_details),
      render: (row, rowdta, index) => (
        <div className="flex flex-col items-center">
          <div>
            <div>
              <h1 className="text-[1.2vw] text-[#1F4B7F] font-medium">
                {row.client_details}
              </h1>
            </div>
            <div>
              <h1 className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
                {row.emailid}
              </h1>
            </div>
            <div>
              <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
                {row.phone}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Ad Details</h1>
        </span>
      ),
      width: "15vw",
      sorter: (a, b) =>
        tabType == "Web"
          ? a.ad_title.localeCompare(b.ad_title)
          : a.mobad_title.localeCompare(b.mobad_title),
      render: (row, rowdta, index) => (
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center">
            {/* <div className="text-[1.2vw] text-[#1F4B7F] font-medium">
              {row?.ad_title}
            </div> */}
            {row?.mobad_title?.length > 15 ? (
              <Tooltip
                placement="top"
                title={row?.mobad_title}
                className="cursor-pointer"
                color="#1F487C"
              >
                <div className="text-[1.2vw] text-[#1F4B7F] font-medium">
                  {`${row?.mobad_title?.slice(0, 15)}...`}
                </div>
              </Tooltip>
            ) : (
              <div className="text-[1.2vw] text-[#1F4B7F] font-medium">
                {row?.mobad_title?.slice(0, 15)}
              </div>
            )}
            <div className="text-right">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col">
                    <div>
                      <a
                        onClick={() => handleMbleEdit(row.tbs_mobad_id)}
                        className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-1"
                          color="#1f487c"
                        />
                        Edit
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={() => handleMbleDelete(row.tbs_mobad_id)}
                        className="flex pt-[1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mr-1"
                          color="#1f487c"
                        />
                        Delete
                      </a>
                    </div>
                  </div>
                }
                trigger="click"
                open={openPopovers[row.tbs_mobad_id] || false}
                onOpenChange={() => togglePopover(row.tbs_mobad_id)}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  color="#1f487c"
                  style={{
                    height: "1.5vw",
                    width: "1.5vw",
                  }}
                />
              </Popover>
            </div>
          </div>
          <div>
            <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
              Usage per day : {row?.usage_per_day}
            </p>
          </div>
          <div>
            <p className="text-[0.9vw] pt-[0.3vw] text-[#1F4B7F] font-medium">
              {`${dayjs(row?.start_date).format("DD MMM, YY")}`} -{" "}
              {`${dayjs(row?.end_date).format("DD MMM, YY")}`}
            </p>
          </div>
          <div>
            <button
              className={`${row.status_id == 3
                ? "bg-[#34AE2A]"
                : row.status_id == 1
                  ? "bg-[#FD3434]"
                  : row.status_id == 2
                    ? "bg-[#FF9900]"
                    : "bg-[#FF9900]"
                } rounded-[0.5vw] text-[1.1vw] mt-[0.5vw] font-semibold text-white w-[9vw] py-[0.2vw]`}
            >
              {capitalizeFirstLetter(row.status)}
            </button>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Video</h1>
        </span>
      ),

      width: "70vw",
      render: (row) => {
        console.log(row.mobad_file_type, row.mobad_vdo, "row data");
        return (
          <div className="w-full h-[20vh] overflow-hidden">
            {row.mobad_file_type && row.mobad_file_type.startsWith("image/") ? (
              <img
                src={`http://192.168.90.47:4000${row.mobad_vdo}`}
                alt="Ad"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "1.4vw",
                }}
              />
            ) : (
              <div className="react-player-wrapper">
                <ReactPlayer
                  playing
                  loop
                  muted
                  width="100%"
                  height="auto"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  url={`http://192.168.90.47:4000${row.mobad_vdo}`}
                  className="react-player"
                />
              </div>
              // <video>
              //   <source
              //     src={`http://192.168.90.47:4000${row.mobad_vdo}`}
              //   ></source>
              // </video>
            )}
          </div>
        );
      },
    },
  ];

  const [activePage, setActivePage] = useState(1);
  const [mble_activePage, setMble_ActivePage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const mbleItemsPerPage = 3;

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const indexOfLast = mble_activePage * mbleItemsPerPage;
  const indexOfFirst = indexOfLast - mbleItemsPerPage;

  const currentItems =
    getadlist?.length > 0 &&
    getadlist?.slice(indexOfFirstItem, indexOfLastItem);

  const mobileAds =
    getMobileadlist?.length > 0 &&
    getMobileadlist?.slice(indexOfFirst, indexOfLast);
  console.log(mobileAds, 'mobileads')

  const AdsList = tabType === "Web" ? currentItems : mobileAds;
  const columns = tabType === "Web" ? webColumns : mobileColumns;

  console.log(AdsList, "currentItemscurrentItems");

  useEffect(() => {
    setAdsData(AdsList);
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (tabType == "Web") {
      setActivePage(pageNumber);
    } else {
      setMble_ActivePage(pageNumber);
    }
  };

  return (
    <>
      <div
        className="min-h-screen max-h-full w-full"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[5vw] h-[92vh] relative w-full ">
          <div className="h-[12vh] w-full flex flex-col">
            <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
              UPLOAD ADS
            </h1>

            <div className="pb-[0.5vw] flex h-full items-center justify-between">
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="bg-white outline-none pl-[2vw] w-[25vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                    placeholder="Search Ads"
                    onChange={(e) => {
                      Search(e);
                    }}
                  />
                  <IoSearch
                    className="absolute left-[0.5vw]"
                    size={"1vw"}
                    color="#1F4B7F"
                  />
                </div>
                {/* <div className="flex ml-[3vw]">
                  <div
                    className={`cursor-pointer ${
                      tabType == "Web"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    }`}
                    onClick={() => setTabType("Web")}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Web
                    </p>
                  </div>
                  <div
                    className={`cursor-pointer ml-[2vw] ${
                      tabType == "Mobile"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                    }`}
                    onClick={() => setTabType("Mobile")}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Mobile
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="flex">

                <div className="flex mr-[3vw] border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                  <button
                    className={`${tabType == "Web" ? "bg-[#1F4B7F]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw]   rounded-bl-[0.3vw] `}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setTabType("Web")}
                  >
                    <span>
                      <IoMdMenu
                        size={"1.2vw"}
                        color={`${tabType == "Web" ? "white" : "#1F4B7F"}`}
                      />
                    </span>
                    <span
                      className={`${tabType == "Web" ? "text-white" : "text-[#1F4B7F]"
                        }  text-[1.1vw]`}
                    >
                      Web
                    </span>
                  </button>
                  <button
                    className={`${tabType == "Mobile" ? "bg-[#1F4B7F]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setTabType("Mobile")}
                  >
                    <span>
                      <IoGrid
                        size={"1.2vw"}
                        color={`${tabType == "Mobile" ? "white" : "#1F4B7F"}`}
                      />
                    </span>
                    <span
                      className={`${tabType == "Mobile" ? "text-white" : "text-[#1F4B7F]"
                        }  text-[1.1vw]`}
                    >
                      Mobile
                    </span>
                  </button>
                </div>


                <button
                  className="bg-[#1F4B7F] flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                  onClick={() => setIsModalOpen(true)}
                >
                  <BsPlusLg color="white" size="1.7vw" />
                  <span className="text-[1.2vw] text-white">Add Ads</span>
                </button>
              </div>
            </div>
          </div>

          <div className="h-[72vh]  w-full ">
            <Table
              dataSource={AdsList}
              columns={columns}
              pagination={false}
              className="custom-table"
            />
          </div>
          <div className="w-full h-[8vh] flex justify-between items-center">
            <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
              <span>Showing</span>
              <span className="font-bold">
                {/* 1 -{" "} */}
                {/* {tabType == "Web"
                  ?
                  // getadlist?.length > 0 && getadlist?.length
                  `${indexOfFirstItem + 1} - ${indexOfFirstItem + currentItems?.length}`
                  :
                  // getMobileadlist?.length > 0 && getMobileadlist?.length
                  ` ${indexOfFirst + 1} - ${indexOfFirst + mobileAds?.length}`
                } */}
                {
                  tabType === "Web"
                    ? (currentItems && currentItems?.length > 0
                      ? `${indexOfFirstItem + 1} - ${indexOfFirstItem + currentItems?.length}`
                      : "0")
                    : (mobileAds && mobileAds?.length > 0
                      ? `${indexOfFirst + 1} - ${indexOfFirst + mobileAds?.length}`
                      : "0")
                }

                {console.log(currentItems, 'undefined_undefineed')}
                {console.log(mobileAds, 'mobile_undefined')}
              </span>
              <span>from</span>
              {/* <span className="font-bold">
                {tabType == "Web"
                  ? getadlist?.length > 0 && getadlist?.length
                  : getMobileadlist?.length > 0 && getMobileadlist?.length}
                {console.log(getadlist.length, 'blablablaablaaaa')}
              </span> */}
              <span className="font-bold">
                {tabType === "Web"
                  ? (getadlist?.length > 0 ? getadlist?.length : 0)
                  : (getMobileadlist?.length > 0 ? getMobileadlist?.length : 0)}
                {console.log(getadlist?.length, 'blablablaablaaaa')}
              </span>

              <span>data</span>
            </div>
            <div>
              {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={getadlist?.length}
                onChange={handlePageChange}
              /> */}
              {tabType === "Web" ? (
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={getadlist?.length > 0 && getadlist?.length}
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
              ) : (
                <ReactPaginate
                  activePage={mble_activePage}
                  itemsCountPerPage={mbleItemsPerPage}
                  totalItemsCount={
                    getMobileadlist?.length > 0 && getMobileadlist?.length
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
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isModalOpen}
        onClose={closeModal}
        height="auto"
        width="40vw"
        footer={null}
      >
        <Ad_Advertisement
          setIsModalOpen={setIsModalOpen}
          updatedata={updatedata}
          SetUpdateData={SetUpdateData}
          adsdata={adsdata}
          setAdsData={setAdsData}
          tabType={tabType}
        />
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
        footer={null}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete this Ad"}
          api={
            tabType === "Web"
              ? `${apiUrl}/ads/${deleteData}`
              : `${apiUrl}/mobads/${deleteData}`
          }
          module={"ads"}
        />
      </ModalPopup>
    </>
  );
}
