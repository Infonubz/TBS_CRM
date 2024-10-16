import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineFileDownload,
} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import ListView from "./ListView";
import GridView from "./GridView";
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
import { Select } from "antd";

export default function Offers() {
  const [view, setView] = useState("list");
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offerdata, setOfferData] = useState("");
  const [updatedata, SetUpdateData] = useState(null);
  const getofferlist = useSelector((state) => state.crm.offers_list);
  const [selectedOccupation, setSelectedOccupation] = useState(0);

  const handleOccupationChange = (value) => {
    setSelectedOccupation(value);
  };

  const filtered_Offers = Array.isArray(getofferlist)
    ? getofferlist.filter(
      (offer) => offer.occupation_id === selectedOccupation || selectedOccupation === 0
    )
    : [];

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
              <div className="pb-[0.5vw] flex justify-between h-full items-center">
                <div className="flex gap-[1vw]">
                  <div className="relative flex items-center">
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
                  </div>
                  <div>
                    <Select
                      showSearch
                      className=" custom-select bg-white outline-none w-[15vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                      placeholder="Select Categories"
                      optionFilterProp="label"
                      onChange={handleOccupationChange}
                      defaultValue={{
                        value: 0,
                        // label: "All",
                        label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">All</div>,
                      }}
                      style={{
                        padding: 4,
                      }}
                      options={[
                        {
                          value: 0,
                          // label: "All",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">All</div>,

                        },
                        {
                          value: 1,
                          // label: "Business",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Business</div>,

                        },
                        {
                          value: 2,
                          // label: "General Public",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">General Public</div>,

                        },
                        {
                          value: 3,
                          // label: "Handicapped",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Handicapped</div>,

                        },
                        {
                          value: 4,
                          // label: "Pilgrim",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Pilgrim</div>,

                        },
                        {
                          value: 5,
                          // label: "Senior Citizen",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Senior Citizen</div>,

                        },
                        {
                          value: 6,
                          // label: "Student",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Student</div>,

                        },
                        {
                          value: 7,
                          // label: "Tourist",
                          label: <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]">Tourist</div>,

                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-x-[2vw] h-full ">
                  <div>
                    <input
                      id="xlsxFile"
                      name="xlsxFile"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log(file, "file_excel");
                        setExcelData(file);
                        handleOnClick(file);
                        // handleFileChange(event)
                      }}
                    />
                    <button
                      className="bg-[#1F4B7F] flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                      onClick={() =>
                        document.getElementById("xlsxFile").click()
                      }
                    >
                      <span className="text-white text-[1.1vw]">Import</span>
                      <MdOutlineFileDownload
                        color="white"
                        size={"2vw"}
                        className=""
                      />
                    </button>
                  </div>
                  <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
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
                  </div>
                  <button
                    className="bg-[#1F4B7F] flex px-[1vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                    onClick={() => {
                      setModalIsOpen(true);
                      SetUpdateData(null);
                      setOfferData("");
                    }}
                  >
                    <span>
                      <FaPlus size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white  text-[1.1vw]">
                      Create Offer
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[72vh]  w-full ">
              {view == "list" ? (
                <ListView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  currentItems={currentItems}
                  itemsPerPage={itemsPerPage}
                  activePage={activePage}
                />
              ) : (
                <GridView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                />
              )}
            </div>
            <div className="w-full h-[8vh] flex justify-between items-center">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
                <span>Showing</span>
                <span className="font-bold">{currentItems && currentItems?.length > 0 ? <div>{indexOfFirstItem + 1} - {indexOfFirstItem + currentItems?.length}</div> : "0"}</span>
                <span>from</span>
                <span className="font-bold">{getofferlist?.length > 0 ? getofferlist?.length : 0}</span>
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
                  totalItemsCount={getofferlist?.length}
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
        </div>
        <ModalPopup
          show={modalIsOpen}
          onClose={closeModal}
          height="75h"
          width="50vw"
          className=""
        >
          <AddOffer
            setModalIsOpen={setModalIsOpen}
            updatedata={updatedata}
            SetUpdateData={SetUpdateData}
            setOfferData={setOfferData}
            offerdata={offerdata}
          />
        </ModalPopup>
      </div>
    </>
  );
}
