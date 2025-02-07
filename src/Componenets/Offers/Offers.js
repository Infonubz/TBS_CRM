import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineDownloading,
  MdOutlineFileDownload,
} from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import ListView from "../Offers/DiscountOffer/ListView";
import GridView from "../Offers/DiscountOffer/GridView";
import ModalPopup from "../Common/Modal/Modal";
import "../../App.css";
import {
  GetOffersData,
  handleoffersearch,
  SearchDiscountOffer,
  SubmitOfferExcel,
} from "../../Api/Offers/Offers";
import { useDispatch, useSelector } from "react-redux";
import AddOffer from "./AddOffers";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Popover, Select } from "antd";
import { LiaSearchSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import RedeemListView from "./RedeemOffer/RedeemListView";
import RedeemGridView from "./RedeemOffer/RedeemGridView";
import {
  GetRedeemOffersData,
  handleRedeemoffersearch,
  SearchRedeemOffer,
  SubmitRedeemExcel,
} from "../../Api/Offers/RedeemOffers";
import { Tooltip } from "antd";
import IndexAddOffer from "./IndexAddOffer";
import { BsExclamationCircle } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { CgExport, CgImport } from "react-icons/cg";
import Dragger from "antd/es/upload/Dragger";
import { GetExcelTemplateById } from "../../Api/UserManagement/UserManagement";
import { useLocation } from "react-router";

export default function Offers() {
  const userType = sessionStorage.getItem("type_name");
  const typeId = sessionStorage.getItem("type_id")
    ? sessionStorage.getItem("type_id")
    : localStorage.getItem("type_id");
  const userID = sessionStorage.getItem("USER_ID");

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const location = useLocation()
  const [view, setView] = useState("list");
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offerdata, setOfferData] = useState("");
  const [updatedata, SetUpdateData] = useState(null);
  const getofferlist = useSelector((state) => state.crm.offers_list);
  console.log(getofferlist, "get_offer_list");
  const getredeemlist = useSelector((state) => state.crm.redeem_offer);
  console.log(getredeemlist, "get_redeme_selection");
  const [selectedOccupation, setSelectedOccupation] = useState(0);
  const [offerType, setOfferType] = useState("discount");
  const [offerimage, setOfferImage] = useState("");
  const [offerview, setOfferView] = useState(false);
  const [offerFilter, setOfferFilter] = useState("all");
  const [valueSymbol, setValueSymbol] = useState("₹");
  const [importModal, setImportModal] = useState(false);


  const [hoveredOption, setHoveredOption] = useState(null);

  console.log(valueSymbol, "value_symbol");

  console.log(offerdata, "Offers_datas");


  useEffect(() => {
    const tabIndex = location.state?.tabIndex || 'discount';
    setOfferType(tabIndex);
  }, [location.state]);


  const handleOccupationChange = (value) => {
    setSelectedOccupation(value);
  };

  const infos = [
    {
      title: "Offers Title",
    },
    {
      title: "Offer Code",
    },
    {
      title: "Category",
    },
    {
      title: "Created Date",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
    {
      title: " Duration",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
  ];

  const filtered_Discount = Array.isArray(getofferlist)
    ? getofferlist.filter(
      (offer) =>
        offer.occupation_id === selectedOccupation || selectedOccupation === 0
    )
    : [];

  const filtered_Redeem = Array.isArray(getredeemlist)
    ? getredeemlist.filter(
      (offer) =>
        offer.occupation_id === selectedOccupation || selectedOccupation === 0
    )
    : [];

  const filtered_Offers =
    offerType === "discount" ? filtered_Discount : filtered_Redeem;

  console.log(filtered_Offers, "filtered_Offers");

  // const currentData = getofferlist?.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  // const handlefilter = async (e) => {
  //   console.log(e?.target?.files[0].name,"testingimage");
  //   try {
  //     const payload = {
  //       profilePic: e?.target?.files[0].name,
  //       firstName: "manojchandran",
  //       email: "manoj@gmail.com",
  //       phone: 8190098951,
  //     };

  //     const response = await axios.post(
  //       "http://192.168.90.47:7000/users",

  //       // {
  //       //   params: payload,
  //       // }
  //       payload
  //     );

  //     console.log("Response", response.data);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
    SetUpdateData(null);
    setOfferData("");
    setImportModal(false)
    setExcelData("")
    // Getofferdata();
  };

  // const Getofferdata = async () => {
  //   const url = "${apiImgUrl}/promo";
  //   try {
  //     const response = await axios.get(url);
  //     console.log(response, "responseresponse");
  //     setOfferData(response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error response from server:", error.response);
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //     } else {
  //       console.error("Error setting up request:", error.message);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   Getofferdata();
  // }, []);
  // const handleSearch = async (value) => {
  //   const url = `${apiImgUrl}/search`;
  //   const payload = { search: value };
  //   try {
  //     const response = await axios.post(url, payload);
  //     console.log(response, "responseresponse");
  //     setOfferData(response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error response from server:", error.response);
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //     } else {
  //       console.error("Error setting up request:", error.message);
  //     }
  //   }
  // };

  const [excelData, setExcelData] = useState(null);

  const handleOnClick = async () => {

    try {   
      const response = await SubmitOfferExcel(excelData, dispatch);
      // toast.success(response);
      GetOffersData(dispatch);
      setImportModal(false)
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Failed to upload file");
    }
  };

  // const handleRedeemClick = async (file) => {
  //   try {
  //     const response = await SubmitRedeemExcel(file, dispatch);
  //     // toast.success(response);
  //     GetRedeemOffersData(dispatch);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     // toast.error("Failed to upload file");
  //   }
  // };

  // const handleOnClick = async (file) => {
  //   console.log(file, "adfdsfadsfa_praveeen_007_00011");
  //   try {
  //     const response = await SubmitOfferExcel(file, dispatch);
  //     toast.success(response);
  //     GetOffersData(dispatch);
  //     console.log("praveeen_007_00011");
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     toast.error("Failed to upload file");
  //   }
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     handleOnClick(file);
  //   }
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    if(offerType ==="discount"){
      GetOffersData(dispatch, offerFilter);
      // alert("hiiii")
    }
    else if(offerType === "redeem") {

      GetRedeemOffersData(dispatch, offerFilter);
    }
  }, [dispatch, offerFilter,offerType]);
  useEffect(()=>{
    setOfferFilter("all")
  },[offerType])

  // console.log(updatedata, "updatedataupdatedata");
  console.log(getofferlist, "getofferlist");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filtered_Offers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  console.log(activePage, "active_page");
  console.log(itemsPerPage, "items_per_page");
  console.log(indexOfFirstItem, "Index_of_first_items");
  console.log(indexOfLastItem, "index_of_last_item");
  console.log(currentItems, "current_itmes");
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // const handleExport = () => {
  //   if (getofferlist.length === 0) {
  //     alert("No data to export!");
  //     return;
  //   }

  //   const excelbook = XLSX.utils.book_new();
  //   const excelsheet = XLSX.utils.json_to_sheet(getofferlist);
  //   XLSX.utils.book_append_sheet(excelbook, excelsheet, "Sheet 1");

  //   const excelBuffer = XLSX.write(excelbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const excelBlob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  //   });
  //   saveAs(excelBlob, "exported_data.xlsx");
  // };

  const handleExport = () => {
    const offerToExport =
      offerType === "discount" ? getofferlist : getredeemlist;

    if (offerToExport.length === 0) {
      alert("No data to export!");
      return;
    }

    const excelbook = XLSX.utils.book_new();
    const excelsheet = XLSX.utils.json_to_sheet(offerToExport);
    XLSX.utils.book_append_sheet(excelbook, excelsheet, "Sheet 1");

    const excelBuffer = XLSX.write(excelbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(excelBlob, "exported_data.xlsx");
  };

  const SearchRequest = (e) => {
    if (offerType === "discount") {
      SearchDiscountOffer(e.target.value, offerFilter, dispatch);
    } else {
      SearchRedeemOffer(e.target.value, offerFilter, dispatch);
    }
  };

  useEffect(() => {
    if (currentItems?.length === 0 && activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [currentItems]);

  const fetchOfferTemp = async () => {
    try {
      const response = await GetExcelTemplateById(offerType)
      setExcelData(response.data[0])
      console.log(response.data[0], 'fetch_optemp')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOfferTemp()
  }, [offerType])

  const handleFileUpload = (file) => {
    // Handle the file (e.g., read the Excel file, process it, etc.)
    setExcelData(file);
    console.log(file, "filesfiles"); // Log the file to the console
  };

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
      <div className="">
        <div
          className="h-screen w-screen  blur-0"
          style={{
            backgroundImage: `url(${Backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-[2.5vw] h-[92vh] relative w-full ">
            <div className="h-[12vh]  w-full flex flex-col ">
              <h1 className="text-[#1F487C] pt-[0.5vw] text-[1.5vw] font-bold">
                OFFERS & DEALS
              </h1>
              <div className="pb-[0.5vw] flex  items-center justify-between ">
                {/* <div className="flex border-[#1F487C] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw]">
                  <button
                    className={`${view == "list" ? "bg-[#1F487C]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-xl   rounded-bl-[0.3vw] `}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setView("list")}
                  >
                    <span>
                      <IoMdMenu
                        size={"1.2vw"}
                        color={`${view == "list" ? "white" : "#1F487C"}`}
                      />
                    </span>
                    <span
                      className={`${view == "list" ? "text-white" : "text-[#1F487C]"
                        }  text-[1.1vw]`}
                    >
                      List View
                    </span>
                  </button>
                  <button
                    className={`${view == "grid" ? "bg-[#1F487C]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setView("grid")}
                  >
                    <span>
                      <IoGrid
                        size={"1.2vw"}
                        color={`${view == "grid" ? "white" : "#1F487C"}`}
                      />
                    </span>
                    <span
                      className={`${view == "grid" ? "text-white" : "text-[#1F487C]"
                        }  text-[1.1vw]`}
                    >
                      Grid View
                    </span>
                  </button>
                </div> */}
                <div className="flex border-[#1F487C] h-[5vh] ">
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
                      className={`${view === "list" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-l-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C]`}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("list")}
                    >
                      <TiThMenu
                        color={`${view === "list" ? "white" : "#1F487C"}`}
                      />
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
                      className={`${view === "Grid" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-r-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0  border-[#1F487C]`}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("Grid")}
                    >
                      <IoGrid
                        color={`${view === "Grid" ? "white" : "#1F487C"}`}
                      />
                    </button>
                  </Tooltip>
                </div>

                {/* <div className="relative flex items-center">
                    <input
                      type="text"
                      className="bg-white outline-none pl-[2vw] w-[25vw] h-[5vh] text-[1vw] border-[#1F487C] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                      placeholder="Search Offers & Deal"
                      // onChange={(e) => handleSearch(e.target.value)}
                      onChange={(e) => handleoffersearch(e, dispatch)}
                    />
                    <IoSearch
                      className="absolute left-[0.5vw]"
                      size={"1vw"}
                      color="#1F487C"
                    />
                  </div> */}

                {/* --------------------------------------searchBar------------------------------------- */}

                <div className="relative flex items-center">
                  <div className=" flex items-center bg-white placeholder-[#9CA3AF] text-[#1F487C] outline-none pl-[1.75vw] w-[13.85vw] h-[5vh] text-[1vw] placeholder:text-[1vw] border-[#1F487C] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw] ">
                    <input
                      type="text"
                      className="w-[10vw] outline-none mt-[0.3vw] placeholder:mt-[0.25vw]"
                      placeholder="Search..."
                      onKeyDown={handleKeyDown}
                      onChange={(e) => {
                        SearchRequest(e);
                      }}
                    />
                  </div>
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
                  <LiaSearchSolid
                    className="absolute inline-block left-[0.5vw] "
                    size={"1vw"}
                    color="#9CA3AF"
                  />
                </div>

                <div className="w-[34vw]">
                  <div className="flex gap-x-[2.25vw] text-[1.2vw]">
                    <div
                      className={` cursor-pointer ${offerFilter == "all"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setOfferFilter("all");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        All
                      </p>
                    </div>
                    {typeId === "PRO101" ? (
                      <div
                        className={` cursor-pointer ${offerFilter == "pending"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          setOfferFilter("pending");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Pending
                        </p>
                      </div>
                    ) : (
                      <div
                        className={` cursor-pointer ${offerFilter == "posted"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          setOfferFilter("posted");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Posted
                        </p>
                      </div>
                    )}
                    {typeId === "PRO101" ? (
                      <div
                        className={` cursor-pointer ${offerFilter == "approved"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          setOfferFilter("approved");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Active
                        </p>
                      </div>
                    ) : (
                      <div
                        className={` cursor-pointer ${offerFilter == "active"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          setOfferFilter("active");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Active
                        </p>
                      </div>
                    )}
                    <div
                      className={` cursor-pointer ${offerFilter == "hold"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setOfferFilter("hold");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Hold
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${offerFilter == "rejected"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setOfferFilter("rejected");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Rejected
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${offerFilter == "draft"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setOfferFilter("draft");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Draft
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center text-[1.1vw]">
                  <div
                    className={`${offerType === "discount"
                        ? "bg-[#1F487C] text-white font-semibold "
                        : "bg-white text-[#1F487C]"
                      }  px-[0.5vw]  gap-[0.5vw] items-center rounded-tl-[0.75vw] rounded-bl-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-0 border-[#1F487C] cursor-pointer w-[6vw] h-[5vh] flex item-center justify-center`}
                    style={{
                      transition: "all 0.5s",
                    }}
                    onClick={() => setOfferType("discount")}
                  >Discount
                  </div>
                  <div
                    className={`${offerType === "redeem"
                        ? "bg-[#1F487C] text-white font-semibold "
                        : "bg-white  text-[#1F487C]"
                      }  px-[0.5vw]  gap-[0.5vw] items-center rounded-r-[0.75vw] border-[0.1vw] border-r-[0.25vw] border-b-[0.25vw] border-l-0 border-[#1F487C] cursor-pointer w-[6vw] h-[5vh] flex item-center justify-center`}
                    style={{
                      transition: "all 0.5s",
                    }}
                    onClick={() => setOfferType("redeem")}

                  > Redeem
                  </div>
                </div>
                <div className="umselect">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: '#e5e5e5',
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className="custom-select bg-white outline-none w-[11vw] h-[5vh] text-[1.1vw] border-[#1F487C] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw]"
                      placeholder="Select Category"
                      optionFilterProp="label"
                      listHeight={200}
                      onChange={handleOccupationChange}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      style={{
                        padding: 4,
                      }}
                      options={[
                        { value: 0, label: "All" },
                        { value: 1, label: "Business" },
                        { value: 2, label: "General Public" },
                        { value: 3, label: "Handicapped" },
                        { value: 4, label: "Pilgrim" },
                        { value: 5, label: "Senior Citizen" },
                        { value: 6, label: "Student" },
                        { value: 7, label: "Tourist" },
                      ]}
                      // dropdownStyle={{
                      //   overflowY: "auto",
                      //   zIndex: 1000,
                      // }}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>
                </div>
                <div className="flex items-center gap-[0.75vw]">
                  <Tooltip
                    placement="bottom"
                    // title="Export"
                    title={
                      <div className="flex items-center gap-x-[0.5vw] justify-center">
                        <CgExport color={"#1F487C"} size={"1vw"} />
                        <label className="text-[1vw] font-semibold">
                          Export
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
                      className="bg-[#1F487C] flex px-[0.5vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                      onClick={handleExport}
                    >
                      <CgExport color="white" size={"1.5vw"} className="" />
                      {/* <span className="text-white text-[1.1vw]">Export</span> */}
                    </button>
                  </Tooltip>
                  <ModalPopup
                    show={importModal}
                    onClose={closeModal}
                    height="23.3vw"
                    width="28vw"
                    closeicon={false}
                  >
                    <div>
                      <div className="text-[#1F4B7F] font-semibold text-center text-[1.3vw]">Import & Download {offerType==="redeem" ? "Redeem" : "Discount"} Template</div>
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

                  {/* <input
                    id="xlsxFile"
                    name="xlsxFile"
                    type="file"
                    accept=".xls,.xlsx"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      console.log(file, "file_excel");
                      setExcelData(file);
                      {
                        offerType === "discount"
                          ? handleOnClick(file)
                          : handleRedeemClick(file);
                      }

                      // handleFileChange(event)
                    }}
                  /> */}


                  <button
                    className="bg-[#1F487C] flex px-[0.5vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.50vw]"
                    onClick={() =>
                      setImportModal(true)
                      //  document.getElementById("xlsxFile").click()
                    }
                  >
                    <Tooltip
                      placement="bottom"
                      // title="Import"
                      title={
                        <div className="flex items-center gap-x-[0.5vw] justify-center">
                          <CgImport color={"#1F487C"} size={"1vw"} />
                          <label className="text-[1vw] font-semibold">
                            Import
                          </label>
                        </div>
                      }
                      className="cursor-pointer"
                      color="white"
                      overlayInnerStyle={{
                        color: "#1F487C",
                      }}
                    >
                      <CgImport color="white" size={"1.5vw"} className="" />
                    </Tooltip>
                    {/* <span className="text-white text-[1.1vw]">Import</span> */}
                  </button>
                  <button
                    className="bg-[#1F487C] flex px-[0.75vw] h-[5vh] gap-[0.25vw] items-center rounded-[0.50vw] "
                    onClick={() => {
                      setModalIsOpen(true);
                      SetUpdateData(null);
                      setOfferData("");
                      setValueSymbol("₹");
                    }}
                  >
                    <span>
                      <FaPlus size={"1vw"} color="white" />
                    </span>
                    <span className="text-white font-bold mt-[0.25vw] text-[1vw]">
                      Add
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="h-[72vh]  w-full ">
              {view == "list" ? (
                <ListView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  currentItems={currentItems}
                  itemsPerPage={itemsPerPage}
                  activePage={activePage}
                  offerimage={offerimage}
                  setOfferImage={setOfferImage}
                  offerview={offerview}
                  setOfferView={setOfferView}
                />
              ) : (
                <GridView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  offerimage={offerimage}
                  setOfferImage={setOfferImage}
                  offerview={offerview}
                  setOfferView={setOfferView}
                />
              )}
            </div> */}

            <div className="h-[72vh] w-full">
              {/* Conditionally render ListView or GridView based on offerType and view */}
              {offerType === "redeem" ? (
                view === "list" ? (
                  <RedeemListView
                    currentData={currentItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    itemsPerPage={itemsPerPage}
                    activePage={activePage}
                    offerimage={offerimage}
                    setOfferImage={setOfferImage}
                    offerview={offerview}
                    setOfferView={setOfferView}
                    offerFilter={offerFilter}

                  />
                ) : (
                  <RedeemGridView
                    currentData={currentItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    offerimage={offerimage}
                    setOfferImage={setOfferImage}
                    offerview={offerview}
                    setOfferView={setOfferView}
                    offerFilter={offerFilter}
                  />
                )
              ) : offerType === "discount" ? (
                view === "list" ? (
                  <ListView
                    currentData={currentItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    itemsPerPage={itemsPerPage}
                    activePage={activePage}
                    offerimage={offerimage}
                    setOfferImage={setOfferImage}
                    offerview={offerview}
                    setOfferView={setOfferView}
                    offerFilter={offerFilter}
                    setValueSymbol={setValueSymbol}
                    valueSymbol={valueSymbol}

                  />
                ) : (
                  <GridView
                    currentData={currentItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    offerimage={offerimage}
                    setOfferImage={setOfferImage}
                    offerview={offerview}
                    setOfferView={setOfferView}
                    setValueSymbol={setValueSymbol}
                    valueSymbol={valueSymbol}
                    offerFilter={offerFilter}
                  />
                )
              ) : null}
            </div>

            {(offerType === "discount"
              ? getofferlist?.length > 10
              : getredeemlist?.length > 10) && (
                <div className="w-full h-[8vh] flex justify-between items-center">
                  <div className="text-[#1F487C] flex text-[1.1vw] gap-[0.5vw]">
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
                      {offerType === "discount"
                        ? getofferlist?.length > 0
                          ? getofferlist.length
                          : 0
                        : getredeemlist?.length > 0
                          ? getredeemlist.length
                          : 0}
                    </span>
                    <span>data</span>
                  </div>
                  <div>
                    {/* Pagination Component */}
                    <ReactPaginate
                      activePage={activePage}
                      itemsCountPerPage={itemsPerPage}
                      totalItemsCount={
                        offerType === "discount"
                          ? getofferlist?.length
                          : getredeemlist?.length
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
                  </div>
                </div>
              )}
          </div>
        </div>
        <ModalPopup
          show={modalIsOpen}
          onClose={closeModal}
          height="35vw"
          width="50vw"
          className=""
        >
          <IndexAddOffer
            setModalIsOpen={setModalIsOpen}
            updatedata={updatedata}
            SetUpdateData={SetUpdateData}
            setOfferData={setOfferData}
            offerdata={offerdata}
            offerType={offerType}
            setOfferType={setOfferType}
            setValueSymbol={setValueSymbol}
            valueSymbol={valueSymbol}
            offerFilter={offerFilter}
          />
        </ModalPopup>
      </div>
    </>
  );
}
