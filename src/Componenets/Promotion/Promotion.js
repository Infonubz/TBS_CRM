import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid } from "react-icons/io5";
import { ConfigProvider, Popover, Select } from "antd";
// import { GoDownload } from "react-icons/go";
// import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { BsExclamationCircle } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";
import { CgImport } from "react-icons/cg";
import {
  FaCloudUploadAlt,
  //FaCloudUploadAlt,
  FaPlus,
} from "react-icons/fa";
import { GetOperatorByOPId } from "../../Api/UserManagement/SuperAdmin";
import { GetEmpPersonalById } from "../../Api/UserManagement/Employee";
import ListView from "../Promotion/ListView";
// import { Pagination } from "antd";
import GridView from "../Promotion/GridView";
// import axios from "axios";
import ModalPopup from "../Common/Modal/Modal";
// import AddPromotion from "./AddPromotion";
import DeleteList from "../Offers/DeleteList";
import "../../App.css";
// import DeleteList from "./DeleteList";
// import { APiUrl } from "../../Api/ApiUrl";
import {
  GetPromotionDataByStatus,
  handlePromosearch,
  SubmitPromoExcel,
  GetPromoDataByEmp,
} from "../../Api/Promotion/Promotion";
import { useDispatch, useSelector } from "react-redux";
import { LiaSearchSolid } from "react-icons/lia";
// import * as XLSX from "xlsx";
// import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import ExportButton from "../Common/Download/Excel";
import AddPromoIndex from "./AddPromoIndex";
// import { CiImport } from "react-icons/ci";
import { RiUpload2Fill } from "react-icons/ri";
import { PROMO_BG_IMAGE } from "../../Store/Type";
import StatusUpdateModal from "./StatusUpdateModal";
import { GetPromotionById } from "../../Api/Promotion/Promotion";
import { Tooltip } from "antd";
import { TiThMenu } from "react-icons/ti";
import Dragger from "antd/es/upload/Dragger";
import { MdOutlineDownloading } from "react-icons/md";
import { GetExcelTemplateById } from "../../Api/UserManagement/UserManagement";

export default function Promotion() {
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(apiUrl, "apiUrlapiUrl");
  const [view, setView] = useState("list");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [promodata, setPromoData] = useState("");
  console.log(promodata, "promodata_promodata");
  const [updatedata, SetUpdateData] = useState(null);
  const getpromotionlist = useSelector((state) => state.crm.promotion_data);
  const dispatch = useDispatch();
  const [CurrentTab, SetCurrentTab] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [promotionId, setPromotionId] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [comments, setComments] = useState("");
  const [listType, setListType] = useState("operator");
  const [ownerName, setOwnerName] = useState("");
  const [eyeModalIsOpen, setEyeModalIsOpen] = useState(false);
  const [promoImage, setPromoImage] = useState("");
   const [importModal, setImportModal] = useState(false);
  const itemsPerPage = 10; // Number of items to display per page
  //const [promotionDataList, setpromotionDataList] = useState({});
  const type_Id = sessionStorage.getItem("type_id");
  const opType_Id = sessionStorage.getItem("OP_ID");
  const poType_Id = sessionStorage.getItem("PO_ID");
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  // const currentData =
  //   getpromotionlist?.length > 0 &&
  //   getpromotionlist?.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );
  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  const closeModal = () => {
    setModalIsOpen(false);
    setEyeModalIsOpen(false);
    SetUpdateData(null);
    setStatusUpdateModal(false);
    setPromoData("");
    setImportModal(false)
    setExcelData("")
    setPromotionId(null);
    dispatch({
      type: PROMO_BG_IMAGE,
      payload: {},
    });
    sessionStorage.removeItem("upload");
    sessionStorage.removeItem("promotion_logo");
  };

  const filtered_List = getpromotionlist;

  const infos = [
    {
      title: "Operator Name",
    },
    {
      title: "Promo Title",
    },
    {
      title: "Promo Code",
    },
    {
      title: "Promo Value",
    },
    {
      title: "Created Date",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
    {
      title: "Duration",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
  ];

  const ownerById = async () => {
    if (poType_Id) {
      try {
        const response = await GetEmpPersonalById(poType_Id);
        setOwnerName(response?.owner_name);
        console.log(response, "operator id");
      } catch (error) {
        console.error(error);
      }
    } else if (opType_Id) {
      try {
        const response = await GetOperatorByOPId(opType_Id);
        setOwnerName(response?.owner_name);
        console.log(response, "operator id");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchGetPromo = async () => {
    try {
      const data = await GetPromotionById(
        promotionId,
        setPromotionId,
        setPromoData
      );
      console.log(data.promo_name, "datadata");
      setPromoData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  // const [excelData, setExcelData] = useState(null);

  // const handleonclick = async (values) => {
  //   try {
  //     const data = await SubmitPromoExcel(values, dispatch);
  //     toast.success(data?.message);
  //     GetPromotionData(dispatch);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error uploading data", error);
  //   }
  // };

  const handleOnClick = async () => {
    console.log(excelData, "adfdsfadsfa");
    try {
      const response = await SubmitPromoExcel(excelData, dispatch);
      GetPromotionDataByStatus(dispatch, CurrentTab,listType);
      setImportModal(false)
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Failed to upload file");
    }
  };

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    getpromotionlist?.length > 0 &&
    getpromotionlist?.slice(indexOfFirstItem, indexOfLastItem);

  // const currentItems =
  //   getpromotionlist?.length > 0 &&
  //   getpromotionlist?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems, setActivePage, activePage]);

  useEffect(()=>{
SetCurrentTab("All")
  },[listType,setListType])
  useEffect(() => {
    if (type_Id === "OP101" && listType === "employee") {
      GetPromoDataByEmp(dispatch, CurrentTab);
    } else {
      GetPromotionDataByStatus(dispatch, CurrentTab,listType);
      // alert("hoooo")
    }
  }, [CurrentTab, dispatch, listType, type_Id]);

  useEffect(() => {
    ownerById();
  }, [opType_Id, poType_Id]);

  useEffect(() => {
    if (promotionId) {
      fetchGetPromo();
    }
  }, [promotionId]);
  console.log(promodata, "promodata");

  const fetchPromoTemp = async() => {
    try {
        const response = await GetExcelTemplateById("promotion")
        setExcelData(response.data[0])
        console.log(response.data[0], 'fetch_optemp')
        return response.data
      } catch (error) {
        console.log(error)
      }
  }

  const handleDownloadExcel = () => {
    if (excelData?.length === 0) {
      console.log('error')
    } else {
      const fileUrl = `${apiImgUrl}${excelData?.upload_files}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

  }
  const handleFileUpload = (file) => {
    // Handle the file (e.g., read the Excel file, process it, etc.)
    setExcelData(file);
    console.log(file, "filesfiles"); // Log the file to the console
  };


  const uploadProps = {
    name: 'file', // The field name to send the file
    accept: '.xls,.xlsx', // File type restrictions
    // onChange: handleChange, // Event handler for file status changes
    beforeUpload: (file) => {
      // Process file before upload (e.g., validate file format)
      handleFileUpload(file);
      return false; // Prevent automatic upload, you can handle upload yourself
    },
    showUploadList: false
  };


  useEffect(()=>{
    fetchPromoTemp()
  },[])
  
  console.log(CurrentTab,"currentabtba");

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
    <>
      <div className="mb-[5vw]">
        <div
          className="h-screen w-screen blur-0"
          style={{
            backgroundImage: `url(${Backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-[2.5vw] h-[92vh] w-full ">
            <div className="h-[12vh] w-full flex flex-col ">
              <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
                PROMOTION
              </h1>
              <div className="pb-[0.5vw] flex justify-between h-full items-center">
                <div className="flex items-center gap-x-[1vw]">
                  <div className="flex border-[#1F4B7F] h-[5vh]">
                    <Tooltip
                      placement="top"
                      title={
                        <div className="flex items-center gap-x-[0.5vw] justify-center">
                          <TiThMenu color={"#1F487C"} size={"1vw"} />
                          <label className="text-[1vw] font-semibold">
                            List View
                          </label>
                        </div>
                      }
                      className="cursor-pointer"
                      color="white"
                      overlayInnerStyle={{
                        color: "#1F487C",
                      }}
                    >
                      <button
                        className={`${
                          view === "list" ? "bg-[#1F4B7F]" : "bg-white"
                        } px-[0.75vw] rounded-l-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C]`}
                        style={{
                          transition: "all 1s",
                        }}
                        onClick={() => setView("list")}
                      >
                        <span>
                          <TiThMenu
                            size={"0.9vw"}
                            color={`${view === "list" ? "white" : "#1F4B7F"}`}
                          />
                        </span>
                      </button>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title={
                        <div className="flex items-center gap-x-[0.5vw] justify-center">
                          <IoGrid color={"#1F487C"} size={"1vw"} />
                          <label className="text-[1vw] font-semibold">
                            Grid View
                          </label>
                        </div>
                      }
                      className="cursor-pointer"
                      color="white"
                      overlayInnerStyle={{
                        color: "#1F487C",
                      }}
                    >
                      <button
                        className={`${
                          view === "grid" ? "bg-[#1F4B7F]" : "bg-white"
                        } px-[0.75vw] rounded-r-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0  border-[#1F487C]`}
                        style={{
                          transition: "all 1s",
                        }}
                        onClick={() => setView("grid")}
                      >
                        <span>
                          <IoGrid
                            size={"0.9vw"}
                            color={`${view === "grid" ? "white" : "#1F4B7F"}`}
                          />
                        </span>
                      </button>
                    </Tooltip>
                  </div>
                  <div className="relative flex items-center w-[13.85vw]">
                    <LiaSearchSolid
                      className="absolute left-[0.7vw] top-[50%] transform -translate-y-1/2"
                      size={"1vw"}
                      color="#9CA3AF"
                    />

                    <input
                      type="text"
                      className="bg-white placeholder-[#9CA3AF] text-[#1F487C] outline-none pl-[2vw] pr-[2vw] w-full h-[5vh] text-[1vw] placeholder:text-[1vw] border-[#1F487C] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]"
                      placeholder="Search..."
                      onChange={(e) =>
                        handlePromosearch(e, dispatch, CurrentTab)
                      }
                      onKeyDown={handleKeyDown}
                    />

                    <Popover
                      color="white"
                      title={
                        <div className="text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto">
                          <span className="font-bold">SEARCH BY...</span>
                          {infos.map((info, index) => (
                            <div key={index} className="flex flex-col">
                              <ul
                                className="pl-[1vw]"
                                style={{ listStyleType: "disc" }}
                              >
                                <li className="text-[0.8vw]">
                                  <p className="font-semibold">{info.title}</p>
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
                      <BsExclamationCircle
                        className="absolute right-[0.8vw] top-[50%] transform -translate-y-1/2 cursor-pointer"
                        size={"1vw"}
                        color="#9CA3AF"
                      />
                    </Popover>
                  </div>

                  <div className="flex items-center gap-x-[2.5vw] pl-[1vw]">
                    <div
                      className={` cursor-pointer ${
                        CurrentTab === "All"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      style={{
                        transition: "all 5s as",
                      }}
                      onClick={() => SetCurrentTab("All")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        All
                      </div>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        CurrentTab === "Pending"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => SetCurrentTab("Pending")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        {type_Id === "PRO101" || listType === "employee"
                          ? "Pending"
                          : "Posted"}
                      </div>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        CurrentTab === "Approved"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => SetCurrentTab("Approved")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Active
                      </div>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        CurrentTab === "Hold"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => SetCurrentTab("Hold")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Hold
                      </div>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        CurrentTab === "Rejected"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => SetCurrentTab("Rejected")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Rejected
                      </div>
                    </div>
                    {listType !== "employee" && (
                      <div
                        className={` cursor-pointer ${
                          CurrentTab === "Draft"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                        } `}
                        onClick={() => SetCurrentTab("Draft")}
                      >
                        <div className="text-[1.3vw] text-[#1f487c] text-center">
                          Draft
                        </div>
                      </div>
                    )}
                    {type_Id === "OP101" &&  listType === "employee" && (
                      <div
                      className={` cursor-pointer ${
                        CurrentTab === "Repost"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => SetCurrentTab("Repost")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Repost
                      </div>
                    </div>  
                    )}
                  </div>
                </div>

                <div className={`flex ${listType === "operator" ? "items-center" : "items-center"}  gap-x-[1vw] h-[2vw]`}>
                {/* <div className="flex justify-between w-[38vw] items-center gap-x-[1vw] h-[2vw]"> */}
                  {type_Id === "OP101" && (
                    <div className="flex relative items-center pl-[2vw]">
                      <div
                        className={`${
                          listType === "operator"
                            ? "bg-[#1F4B7F] text-white font-semibold "
                            : "bg-white text-[#1F487C]"
                        }  px-[0.5vw] items-center rounded-tl-xl rounded-bl-xl border-[0.1vw] border-b-[0.25vw] border-r-0 border-[#1F487C] cursor-pointer 
                    w-[5.90vw] h-[2.6vw] flex item-center justify-center text-[1.1vw]`}
                        style={{
                          transition: "all 0.5s",
                        }}
                        onClick={() => setListType("operator")}
                      >
                        Operator
                      </div>
                      <div
                        className={`${
                          listType === "employee"
                            ? "bg-[#1F4B7F] text-white font-semibold "
                            : "bg-white  text-[#1F487C]"
                        }  px-[0.5vw] items-center rounded-r-xl border-[0.1vw] border-r-[0.25vw] border-b-[0.25vw] border-l-0 border-[#1F487C] 
                    cursor-pointer w-[5.90vw] h-[2.6vw] flex item-center justify-center text-[1.1vw]`}
                        style={{
                          transition: "all 0.5s",
                        }}
                        onClick={() => setListType("employee")}
                      >
                        Employee
                      </div>
                    </div>
                  )}
                  <ExportButton dataArray={currentItems} />
                  {listType === "employee" ? "" : 

<>
                  <ModalPopup
                    show={importModal}
                    onClose={closeModal}
                    height="23.3vw"
                    width="28vw"
                    closeicon={false}
                  >
                    <div>
                      <div className="text-[#1F4B7F] font-semibold text-center text-[1.28vw]">Import & Download Promotion Template</div>
                      <button onClick={handleDownloadExcel} className="w-full px-[1vw] text-[#1F4B7F] shadow-[#00000054] shadow-lg   text-[1.2vw] h-[2.5vw] rounded-[.5vw]  my-[1.5vw]  bg-white flex justify-center items-center gap-x-[1vw]">
                        <MdOutlineDownloading className="text-[#1F4B7F] text-[1.4vw]" />{" "}
                        <span>Download  Template</span>
                      </button>
                      <ConfigProvider
                        theme={{
                          token: {
                            colorBorder: "#1F4B7F",
                          colorPrimary: "#1F4B7F",
                          },
                          components: {
                            Upload: {
                              actionsColor: "#1F4B7F"
                            }
                          }
                        }}>
                        <Dragger height={"9.2vw"} {...uploadProps}>
                  
                          <div className="text-[#1F4B7F] text-[1vw]">
                            {excelData?.name ? (
                              excelData?.name
                            ) : (
                              <div className="flex flex-col items-center text-[1vw] justify-center">
                                <FaCloudUploadAlt className="text-[2.5vw] ml-[.5vw]" />
                                <span className="font-bold ">+ Upload</span>
                              </div>
                            )}
                          </div>
                        </Dragger>
                      </ConfigProvider>
                      <div className="flex justify-center mt-[1.3vw] ">
                        <button
                          className="bg-[#1F4B7F]  flex px-[1vw]  justify-center h-[2.5vw] items-center rounded-[0.5vw]"
                          onClick={() =>
                            // document.getElementById("xlsxFile").click()
                            handleOnClick()
                          }
                        >
                          <span>
                            {/* <CgImport size={"1.2vw"} color="white" /> */}
                          </span>
                          <span className="text-white font-bold text-[1.1vw]">
                            submit
                          </span>
                        </button>
                      </div>
                    </div>
                  </ModalPopup>

                  <div>
                    {/* <input
                      id="xlsxFile"
                      name="xlsxFile"
                       type="file"
                    accept=".xls,.xlsx"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log(file, "filesfiles");
                        setExcelData(file);
                        handleOnClick(file);
                      }}
                    /> */}
                    <button
                      className="bg-[#1F4B7F] shadow-sm shadow-black flex px-[0.75vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                      onClick={() =>
                        // document.getElementById("xlsxFile").click()
                        setImportModal(true)
                      }
                    >
                      {" "}
                      <CgImport
                        color="white"
                        size={"1.3vw"}
                        className=""
                      />
                      <span className="text-white font-bold text-[1.1vw]">
                        Import
                      </span>
                      {/* <MdOutlineFileDownload
                        color="white"
                        size={"2vw"}
                        className=""
                      /> */}
                    </button>
                  </div> 
                  
                  {/* 
                  <div className="flex border-[#1F4B7F] h-[2.5vw] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                    <button
                      className={`${view == "list" ? "bg-[#1F4B7F]" : "bg-white"
                        } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw]   rounded-bl-[0.3vw] `}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("list")}
                    >
                      <span>
                        <IoMdMenu
                          size={"1.2vw"}
                          color={`${view == "list" ? "white" : "#1F4B7F"}`}
                        />
                      </span>
                      <span
                        className={`${view == "list" ? "text-white" : "text-[#1F4B7F]"
                          }  text-[1.1vw]`}
                      >
                        List View
                      </span>
                    </button>
                    <button
                      className={`${view == "grid" ? "bg-[#1F4B7F]" : "bg-white"
                        } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("grid")}
                    >
                      <span>
                        <IoGrid
                          size={"1.2vw"}
                          color={`${view == "grid" ? "white" : "#1F4B7F"}`}
                        />
                      </span>
                      <span
                        className={`${view == "grid" ? "text-white" : "text-[#1F4B7F]"
                          }  text-[1.1vw]`}
                      >
                        Grid View
                      </span>
                    </button>
                  </div> */}
                  <button
                    className="bg-[#1F4B7F] shadow-sm shadow-black flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                    onClick={() => {
                      setPromotionId("")
                      setPromoData("");
                      setModalIsOpen(true);
                      SetUpdateData(null);
                    }}
                  >
                    <span>
                      <FaPlus size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white font-bold text-[1.1vw]">
                      Add
                    </span>
                  </button>
                  </>
}
                </div>
              </div>
            </div>
            <div className="h-[72vh]  w-full ">
              {view === "list" ? (
                <ListView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  promotionId={promotionId}
                  setDeleteModalIsOpen={setDeleteModalIsOpen}
                  setPromotionId={setPromotionId}
                  activePage={activePage}
                  itemsPerPage={itemsPerPage}
                  statusUpdateModal={statusUpdateModal}
                  setStatusUpdateModal={setStatusUpdateModal}
                  setComments={setComments}
                  CurrentTab={CurrentTab}
                  listType={listType}
                  eyeModalIsOpen={eyeModalIsOpen}
                  setEyeModalIsOpen={setEyeModalIsOpen}
                  promoImage={promoImage}
                  setPromoImage={setPromoImage}
                />
              ) : (
                <GridView
                  currentData={currentItems}
                  setPromoData={setPromoData}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  promotionId={promotionId}
                  setPromotionId={setPromotionId}
                  setDeleteModalIsOpen={setDeleteModalIsOpen}
                  statusUpdateModal={statusUpdateModal}
                  setStatusUpdateModal={setStatusUpdateModal}
                  setComments={setComments}
                  listType={listType}
                  eyeModalIsOpen={eyeModalIsOpen}
                  setEyeModalIsOpen={setEyeModalIsOpen}
                  promoImage={promoImage}
                  setPromoImage={setPromoImage}
                />
              )}
            </div>
            {getpromotionlist?.length > 10 ? (
              <div className="w-full h-[8vh] flex justify-between items-center">
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
                    {getpromotionlist?.length > 0
                      ? getpromotionlist?.length
                      : 0}
                  </span>
                  <span>data</span>
                </div>
                <div>
                  {/* <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={getpromotionlist?.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageChange}
                  // showSizeChanger
                /> */}
                  <ReactPaginate
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={getpromotionlist?.length}
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
            ) : (
              ""
            )}
          </div>
        </div>
        <ModalPopup
          show={modalIsOpen}
          onClose={closeModal}
          height="35.3vw"
          width="50vw"
        >
          {/* <AddPromotion
            setModalIsOpen={setModalIsOpen}
            SetUpdateData={SetUpdateData}
            updatedata={updatedata}
            promodata={promodata}
            setPromoData={setPromoData}
            promotionId={promotionId}
            setPromotionId={setPromotionId}
          /> */}
          <AddPromoIndex
            setModalIsOpen={setModalIsOpen}
            SetUpdateData={SetUpdateData}
            updatedata={updatedata}
            promodata={promodata}
            setPromoData={setPromoData}
            promotionId={promotionId}
            CurrentTab={CurrentTab}
            setPromotionId={setPromotionId}
            ownerName={ownerName}
            listType={listType}
            // setPromolist={setPromolist}
            // promolist={promolist}
          />
        </ModalPopup>

        <ModalPopup
          show={deletemodalIsOpen}
          onClose={closeDeleteModal}
          height="20vw"
          width="30vw"
          closeicon={false}
        >
          <DeleteList
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            title={`Want to delete this ${promodata?.promo_name}`}
            api={`${apiUrl}/promo/${promotionId}`}
            module={"promotion"}
            CurrentTab={CurrentTab}
            listType={listType}
          />
        </ModalPopup>

        <ModalPopup
          className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
          show={statusUpdateModal}
          closeicon={false}
          onClose={closeModal}
          height="22vw"
          width="auto"
        >
          <StatusUpdateModal
            setStatusUpdateModal={setStatusUpdateModal}
            promotionId={promotionId}
            CurrentTab={CurrentTab}
            comments={comments}
            listType={listType}
          />
        </ModalPopup>

        <ModalPopup
          show={eyeModalIsOpen}
          onClose={closeModal}
          closeicon={false}
          height="20vw"
          width="30vw"
        >
          {
            <div className="flex justify-center items-center mt-[1vw]">
              {promoImage != null ? (
                <img
                  alt="prmoImage"
                  src={`${apiImgUrl}${promoImage}`}
                  className="w-full h-[15vw] rounded-[0.5vw]"
                />
              ) : (
                <div className="flex flex-col justify-center items-center w-full h-full pb-[1vw]">
                  <CiImageOff size={"6.5vw"} color="#1F487C" />
                  <span className="text-[#1F487C] text-[1.3vw] font-semibold mt-[1vw]">
                    Image not available
                  </span>
                </div>
              )}
            </div>
          }
        </ModalPopup>
      </div>
    </>
  );
}
