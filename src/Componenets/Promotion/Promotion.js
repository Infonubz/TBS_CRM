import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import ListView from "../Promotion/ListView";
import { Pagination } from "antd";
import GridView from "../Promotion/GridView";
import axios from "axios";
import ModalPopup from "../Common/Modal/Modal";
import AddPromotion from "./AddPromotion";
import DeleteList from "../Offers/DeleteList";
import "../../App.css";
// import DeleteList from "./DeleteList";
// import { APiUrl } from "../../Api/ApiUrl";
import {
  GetPromotionData,
  handlePromosearch,
  SubmitPromoExcel,
} from "../../Api/Promotion/Promotion";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Promotion() {
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [promodata, setPromoData] = useState("");
  const [updatedata, SetUpdateData] = useState(null);
  const getpromotionlist = useSelector((state) => state.crm.promotion_data);
  const [promotionDataList, setpromotionDataList] = useState({});
  const currentData =
    getpromotionlist?.length > 0 &&
    getpromotionlist?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  console.log(currentData, "currentdata passed first phase");
  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
    SetUpdateData(null);
    setPromoData("");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    GetPromotionData(dispatch);
  }, []);

  console.log(updatedata, "updated_Data_of_Promolist");
  console.log(currentData, "getpromotionlist_listed_successfully");

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

  const [excelData, setExcelData] = useState(null);

  const handleOnClick = async (file) => {
    console.log(file, "adfdsfadsfa");
    try {
      const response = await SubmitPromoExcel(file, dispatch);
      // toast.success(response);
      GetPromotionData(dispatch);
      console.log("praveeen");
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Failed to upload file");
    }
  };
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getpromotionlist?.length > 0 &&
    getpromotionlist?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const [promotionId, setPromotionId] = useState(null);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
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
          <div className="px-[5vw] h-[92vh] w-full ">
            <div className="h-[12vh] w-full flex flex-col ">
              <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
                PROMOTION
              </h1>
              <div className="pb-[0.5vw] flex justify-between h-full items-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="bg-white outline-none pl-[2vw] w-[25vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                    placeholder="Search Promotions"
                    onChange={(e) => handlePromosearch(e, dispatch)}
                  />
                  <IoSearch
                    className="absolute left-[0.5vw]"
                    size={"1vw"}
                    color="#1F4B7F"
                  />
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
                        console.log(file, "filesfiles");
                        setExcelData(file);
                        handleOnClick(file);
                      }}
                    />
                    <button
                      className="bg-[#1F4B7F] flex px-[1vw] h-[2.5vw] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
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

                  <div className="flex border-[#1F4B7F] h-[2.5vw] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                    <button
                      className={`${
                        view == "list" ? "bg-[#1F4B7F]" : "bg-white"
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
                        className={`${
                          view == "list" ? "text-white" : "text-[#1F4B7F]"
                        }  text-[1.1vw]`}
                      >
                        List View
                      </span>
                    </button>
                    <button
                      className={`${
                        view == "grid" ? "bg-[#1F4B7F]" : "bg-white"
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
                        className={`${
                          view == "grid" ? "text-white" : "text-[#1F4B7F]"
                        }  text-[1.1vw]`}
                      >
                        Grid View
                      </span>
                    </button>
                  </div>
                  <button
                    className="bg-[#1F4B7F] flex px-[1vw] h-[2.5vw] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                    onClick={() => {
                      setModalIsOpen(true);
                      SetUpdateData(null);
                      setPromoData("");
                    }}
                  >
                    <span>
                      <FaPlus size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white  text-[1.1vw]">
                      New Promotions
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
                  promotionId={promotionId}
                  setDeleteModalIsOpen={setDeleteModalIsOpen}
                  setPromotionId={setPromotionId}
                />
              ) : (
                <GridView
                  currentData={currentItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  promotionId={promotionId}
                  setPromotionId={setPromotionId}
                  setDeleteModalIsOpen={setDeleteModalIsOpen}
                />
              )}
            </div>
            <div className="w-full h-[8vh] flex justify-between items-center">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
                <span>Showing</span>
                <span className="font-bold">1 - {pageSize}</span>
                <span>from</span>
                <span className="font-bold">{getpromotionlist?.length}</span>
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
          </div>
        </div>
        <ModalPopup
          show={modalIsOpen}
          onClose={closeModal}
          // height="40vw"
          width="50vw"
        >
          <AddPromotion
            setModalIsOpen={setModalIsOpen}
            SetUpdateData={SetUpdateData}
            updatedata={updatedata}
            promodata={promodata}
            setPromoData={setPromoData}
            promotionId={promotionId}
            setPromotionId={setPromotionId}
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
            title={"Want to delete this Promotion"}
            api={`http://192.168.90.47:4000/api/promo/${promotionId}`}
            module={"promotion"}
          />
        </ModalPopup>
      </div>
    </>
  );
}
