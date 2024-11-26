import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineFileDownload,
} from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import ListView from "../Offers/DiscountOffer/ListView";
import GridView from "../Offers/DiscountOffer/GridView";
import ModalPopup from "../Common/Modal/Modal";
import "../../App.css";
import {
  GetOffersData,
  handleoffersearch,
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
import { ConfigProvider, Select } from "antd";
import { LiaSearchSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import RedeemListView from "./RedeemOffer/RedeemListView";
import RedeemGridView from "./RedeemOffer/RedeemGridView";
import { GetRedeemOffersData, handleRedeemoffersearch, SubmitRedeemExcel } from "../../Api/Offers/RedeemOffers";

export default function Offers() {
  const [view, setView] = useState("list");
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offerdata, setOfferData] = useState("");
  const [updatedata, SetUpdateData] = useState(null);
  const getofferlist = useSelector((state) => state.crm.offers_list);
  console.log(getofferlist, 'get_offer_list')
  const getredeemlist = useSelector((state) => state.crm.redeem_offer)
  console.log(getredeemlist, 'get_redeme_selection')
  const [selectedOccupation, setSelectedOccupation] = useState(0);
  const [offerType, setOfferType] = useState('discount')
  const [offerimage, setOfferImage] = useState("");
  const [offerview, setOfferView] = useState(false);


  console.log(offerdata, 'Offers_datas')

  const handleOccupationChange = (value) => {
    setSelectedOccupation(value);
  };



  const filtered_Discount = Array.isArray(getofferlist)
    ? getofferlist.filter(
      (offer) => offer.occupation_id === selectedOccupation || selectedOccupation === 0
    )
    : [];

  const filtered_Redeem = Array.isArray(getredeemlist)
    ? getredeemlist.filter(
      (offer) => offer.occupation_id === selectedOccupation || selectedOccupation === 0
    )
    : [];

  const filtered_Offers = offerType === 'discount' ? filtered_Discount : filtered_Redeem

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
    // Getofferdata();
  };

  // const Getofferdata = async () => {
  //   const url = "http://192.168.90.47:4000/promo";
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
  //   const url = `http://192.168.90.47:4000/search`;
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

  const handleOnClick = async (file) => {
    console.log(file, "adfdsfadsfa_praveeen_007_00011");
    try {
      const response = await SubmitOfferExcel(file, dispatch);
      // toast.success(response);
      GetOffersData(dispatch);
      console.log("praveeen_007_00011");
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Failed to upload file");
    }
  };


  const handleRedeemClick = async (file) => {
    console.log(file, "adfdsfadsfa_praveeen_007_00011");
    try {
      const response = await SubmitRedeemExcel(file, dispatch);
      // toast.success(response);
      GetRedeemOffersData(dispatch);
      console.log("praveeen_007_00011");
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Failed to upload file");
    }
  };


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
    GetOffersData(dispatch);
    GetRedeemOffersData(dispatch);
  }, [dispatch]);

  // console.log(updatedata, "updatedataupdatedata");
  console.log(getofferlist, "getofferlist");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filtered_Offers?.slice(indexOfFirstItem, indexOfLastItem);

  console.log(activePage, 'active_page')
  console.log(itemsPerPage, 'items_per_page')
  console.log(indexOfFirstItem, 'Index_of_first_items')
  console.log(indexOfLastItem, 'index_of_last_item')
  console.log(currentItems, 'current_itmes')
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

    const offerToExport = offerType === 'discount' ? getofferlist : getredeemlist;

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
          <div className="px-[5vw] h-[92vh] relative w-full ">
            <div className="h-[12vh]  w-full flex flex-col ">
              <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
                OFFERS & DEALS
              </h1>
              <div className="pb-[0.5vw] flex h-full items-center gap-[1vw]">
                {/* <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw]">
                  <button
                    className={`${view == "list" ? "bg-[#1F4B7F]" : "bg-white"
                      } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-xl   rounded-bl-[0.3vw] `}
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
                <div className="flex border-[#1F4B7F] h-[5vh] ">
                  <button
                    className={`${view === 'list' ? "bg-[#1F487C]" : "bg-[white]"} px-[0.75vw] rounded-l-xl border-[0.1vw] border-b-[0.2vw] border-r-0  border-[#1F487C]`}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setView('list')}>
                    <IoMdMenu color={`${view === 'list' ? "white" : "#1F487C"}`} />
                  </button>
                  <button
                    className={`${view === 'Grid' ? "bg-[#1F487C]" : "bg-[white]"} px-[0.75vw] rounded-r-xl border-[0.1vw] border-b-[0.2vw] border-r-[0.2vw] border-l-0  border-[#1F487C]`}
                    style={{
                      transition: "all 1s",
                    }}
                    onClick={() => setView('Grid')}>
                    <IoGrid color={`${view === 'Grid' ? "white" : "#1F487C"}`} />
                  </button>
                </div>
                <div className="flex gap-[1vw]">
                  {/* <div className="relative flex items-center">
                    <input
                      type="text"
                      className="bg-white outline-none pl-[2vw] w-[25vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                      placeholder="Search Offers & Deal"
                      // onChange={(e) => handleSearch(e.target.value)}
                      onChange={(e) => handleoffersearch(e, dispatch)}
                    />
                    <IoSearch
                      className="absolute left-[0.5vw]"
                      size={"1vw"}
                      color="#1F4B7F"
                    />
                  </div> */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="bg-white placeholder-[#1f477c76] text-[#1F487C] outline-none pl-[3vw] w-[19vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw]"
                      placeholder="Search Offer & Deal"
                      onChange={(e) => {
                        { offerType === 'discount' ? handleoffersearch(e, dispatch) : handleRedeemoffersearch(e, dispatch) }
                      }}
                    />
                    <LiaSearchSolid
                      className="absolute left-[0.5vw]"
                      size={"1vw"}
                      color="#1F4B7F"
                    />
                  </div>
                  <div className="relative flex items-center justify-between w-[21vw] text-[1.3vw]">
                    <div className={`${offerType === 'redeem' ? 'font-semibold underline' : ' '} text-[#1F487C] cursor-pointer `}
                      onClick={() => setOfferType('redeem')}>Redeem Offers</div>
                    <div className={`${offerType === 'discount' ? 'font-semibold underline' : 'font-normal'} text-[#1F487C] cursor-pointer`}
                      onClick={() => setOfferType('discount')}>Discount Offers</div>
                  </div>
                  <div>
                    <ConfigProvider
                      theme={{
                        components: {

                          Select: {
                            optionActiveBg: '#aebed1',
                            optionSelectedColor: '#FFF',
                            optionSelectedBg: '#aebed1',
                            optionHeight: '2',
                          }
                        }
                      }}>
                      <Select
                        showSearch
                        className=" custom-select bg-white outline-none w-[15vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw]"
                        placeholder="Select Categories"
                        optionFilterProp="label"
                        onChange={handleOccupationChange}
                        suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}><IoMdArrowDropdown size="2vw" /></span>}
                        defaultValue={{
                          value: '',
                          label: <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-[#1F487C] opacity-50">Select the Category</div>,
                          // value: 0,
                          // // label: "All",
                          // label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">All</div>,
                        }}
                        style={{
                          padding: 4,
                        }}
                        options={[
                          // {
                          //   value: '',
                          //   label: <div className="">Select the Category</div>
                          // },
                          {
                            value: 0,
                            // label: "All",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">All</div>,

                          },
                          {
                            value: 1,
                            // label: "Business",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Business</div>,

                          },
                          {
                            value: 2,
                            // label: "General Public",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">General Public</div>,

                          },
                          {
                            value: 3,
                            // label: "Handicapped",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Handicapped</div>,

                          },
                          {
                            value: 4,
                            // label: "Pilgrim",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Pilgrim</div>,

                          },
                          {
                            value: 5,
                            // label: "Senior Citizen",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Senior Citizen</div>,

                          },
                          {
                            value: 6,
                            // label: "Student",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Student</div>,

                          },
                          {
                            value: 7,
                            // label: "Tourist",
                            label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">Tourist</div>,

                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="flex items-center gap-x-[1vw] h-full ">
                  <div className="flex items-center gap-[1vw]">
                    <button
                      className="bg-[#1F4B7F] flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-xl"
                      onClick={handleExport}
                    >
                      < TbUpload
                        color="white"
                        size={"1.5vw"}
                        className=""
                      />
                      <span className="text-white text-[1.1vw]">Export</span>
                    </button>
                    <input
                      id="xlsxFile"
                      name="xlsxFile"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log(file, "file_excel");
                        setExcelData(file);
                        { offerType === 'discount' ? handleOnClick(file) : handleRedeemClick(file) }

                        // handleFileChange(event)
                      }}
                    />
                    <button
                      className="bg-[#1F4B7F] flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-xl"
                      onClick={() =>
                        document.getElementById("xlsxFile").click()
                      }
                    >
                      < GoDownload
                        color="white"
                        size={"1.5vw"}
                        className=""
                      />
                      <span className="text-white text-[1.1vw]">Import</span>
                    </button>

                  </div>
                  <button
                    className="bg-[#1F4B7F] flex pl-[0.25vw] pr-[1vw] w-[9vw] h-[5vh] justify-between gap-[0.25vw] items-center rounded-xl"
                    onClick={() => {
                      setModalIsOpen(true);
                      SetUpdateData(null);
                      setOfferData("");
                    }}
                  >
                    <span>
                      <IoAdd size={"2vw"} color="white" />
                    </span>
                    <span className="text-white  text-[1.1vw]">
                      Add Offer
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
              {offerType === 'redeem' ? (
                view === 'list' ? (
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
                  />
                )
              ) : offerType === 'discount' ? (
                view === 'list' ? (
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
                )
              ) : null}
            </div>

            {
              (offerType === 'discount' ? getofferlist?.length > 10 : getredeemlist?.length > 10) && (
                <div className="w-full h-[8vh] flex justify-between items-center">
                  <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
                    <span>Showing</span>
                    <span className="font-bold">
                      {currentItems && currentItems?.length > 0 ? (
                        <div>{indexOfFirstItem + 1} - {indexOfFirstItem + currentItems?.length}</div>
                      ) : (
                        "0"
                      )}
                    </span>
                    <span>from</span>
                    <span className="font-bold">
                      {offerType === 'discount'
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
                      totalItemsCount={offerType === 'discount' ? getofferlist?.length : getredeemlist?.length}
                      pageRangeDisplayed={3}
                      onChange={handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="active"
                      prevPageText={<FontAwesomeIcon icon={faChevronLeft} size="1vw" />}
                      nextPageText={<FontAwesomeIcon icon={faChevronRight} size="1vw" />}
                      firstPageText={<FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />}
                      lastPageText={<FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />}
                    />
                  </div>
                </div>
              )
            }

          </div>
        </div>
        <ModalPopup
          show={modalIsOpen}
          onClose={closeModal}
          height="75h"
          width="55vw"
          className=""
        >
          <AddOffer
            setModalIsOpen={setModalIsOpen}
            updatedata={updatedata}
            SetUpdateData={SetUpdateData}
            setOfferData={setOfferData}
            offerdata={offerdata}
            offerType={offerType}
            setOfferType={setOfferType}
          />
        </ModalPopup>
      </div>
    </>
  );
}
