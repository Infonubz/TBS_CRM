import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
// import { GoDownload } from "react-icons/go";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoMdMenu } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
// import ListView from "./ListView";
import { Pagination } from "antd";
// import GridView from "./GridView";
import axios from "axios";
import ModalPopup from "../Common/Modal/Modal";
// import AddPromotion from "./AddPromotion";
import "../../App.css";
// import DeleteList from "./DeleteList";
// import GridAdminView from "../../Componenets/UserManagement/Admin/GridAdminView";
// import ListAdminView from "../../Componenets/UserManagement/Admin/ListAdminView";
// import GridUserView from "../../Componenets/UserManagement/User/GridUserView";
// import ListUserView from "../../Componenets/UserManagement/User/ListUserView";
// import AddUser from "./User/AddUser";
import ExportButton from "../Common/Download/Excel";
// import AddAdmin from "./Admin/AddAdmin";
import {
  Getuserdata,
  UserManagementSearch,
} from "../../Api/UserManagement/UserManagement";
import { useDispatch, useSelector } from "react-redux";
import { CiImport } from "react-icons/ci";
import AddSuperAdmin from "./SuperAdmin/AddCompanyProfile";
import AddPartner from "./Partner/IndexAddPartner";
// import AddEmployee from "./Employee/AddEmployee";
import SuperAdminIndex from "./SuperAdmin/IndexSuperAdmin";
import TableList from "./TableList";
import {
  GetOperatorData,
  GetSuperAdminData,
} from "../../Api/UserManagement/SuperAdmin";
import AddEmployee from "./Employee/IndexAddEmployee";
import EmployeeTableList from "./EmployeeTableList";
import EmployeeGridView from "./EmployeeGridView";
import { GetEmployeeData } from "../../Api/UserManagement/Employee";
import PartnerTableList from "./PartnerTableList";
import PartnerGridView from "./PartnerGridView";
import AddParner from "./Partner/IndexAddPartner";
import GridList from "./GridList";
import { GetPartnerData } from "../../Api/UserManagement/Partner";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import ClientGridView from "./ClientGridView";
import ClientTableView from "./ClientTableView";
import ClientIndex from "./Client/IndexClientDetails";
import { GetClientData } from "../../Api/UserManagement/Client";

export default function Discounts() {
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeecurrentPage, setEmployeeCurrentPage] = useState(1);
  const [patcurrentPage, setPatCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [employeepagesize, setEmployeePageSize] = useState(10);
  const [patpagesize, setPatPageSize] = useState(10);
  const [userdata, setUserData] = useState([]);
  const [admindata, setAdminData] = useState([]);
  const [updatedata, SetUpdateData] = useState("");
  const [adminupdatedata, SetAdminUpdateData] = useState("");
  const [adminUser, setAdminUser] = useState("super_admin");
  const get_user_list = useSelector((state) => state.user_management_user_list);
  const get_operator_list = useSelector((state) => state.crm.operator_list);
  const get_employee_list = useSelector((state) => state.crm.employee_list);
  const get_partner_list = useSelector((state) => state.crm.partner_list);
  console.log(get_employee_list, "get_partner_list");
  const currentData =
    get_operator_list.length > 0 &&
    get_operator_list?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  console.log(currentData, "currentData");
  const employeecurrentdata =
    get_employee_list.length > 0 &&
    get_employee_list?.slice(
      (employeecurrentPage - 1) * employeepagesize,
      employeecurrentPage * employeepagesize
    );
  const patcurrentdata =
    get_partner_list.length > 0 &&
    get_partner_list?.slice(
      (patcurrentPage - 1) * patpagesize,
      patcurrentPage * patpagesize
    );
  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };
  // const handleEmployeePageChange = (page, pageSize) => {
  //   setEmployeeCurrentPage(page);
  //   setEmployeePageSize(pageSize);
  // };
  // const handlePartnerPageChange = (page, pageSize) => {
  //   setPatCurrentPage(page);
  //   setPatPageSize(pageSize);
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
  // const handleSubmit = async (e) => {
  //   // e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("firstName", "manoj");
  //   formData.append("email", "manoj@gmail.com");
  //   formData.append("phone", 8190098951);
  //   formData.append("profilePic", e?.target?.files[0]);

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.90.47:7000/users",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error uploading data", error);
  //   }
  // };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
    SetUpdateData("");
    setOperatorID(null);
    GetSuperAdminData(dispatch);
    // Getuserdata();
  };

  // const Getuserdata = async () => {
  //   //   const url = " http://192.168.90.47:6000/users";
  //   //   const response = await axios.get(url); // const response = await axios.get(`${APiUrl}/promo`);
  //   //   console.log(response, "responseresponse");
  //   //   setUserData(response.data);
  //   // };
  //   try {
  //     const response = await axios.get("http://192.168.90.47:4001/users");
  //     console.log(response, "responseresponse");
  //     setUserData(response.data);
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
  // const GetAdmindata = async () => {
  //   try {
  //     const response = await axios.get("http://192.168.6.57:4000/api/admin");
  //     console.log(response, "responseresponse555");
  //     setAdminData(response.data);
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
  //   Getuserdata();
  //   GetAdmindata();
  // }, []);
  // const handleSearch = async (value) => {
  //   const url = `http://192.168.6.57:4001/api/search`;
  //   const adminurl = "http://192.168.6.57:4000/api/search";
  //   const payload = { search: value };
  //   try {
  //     const response = await axios.post(adminUser ? adminurl : url, payload);
  //     console.log(response, "responseresponse");
  //     setAdminData(response.data);
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
  // const handleSearch = async (value) => {
  //   try {
  //     const data = await UserManagementSearch(value, adminUser);
  //     adminUser ? setAdminData(data) : setUserData(data);
  //     console.log(data, "datadata");
  //   } catch (error) {
  //     // Handle the error if needed
  //   }
  // };
  // const dispatch = useDispatch();
  // const handleSearch = async (searchValue, isAdminUser) => {
  //   try {
  //     const result = await UserManagementSearch(
  //       searchValue,
  //       isAdminUser,
  //       dispatch
  //     );
  //     adminUser ? setAdminData(result) : setUserData(result);
  //     console.log("Search result:", result);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   }
  // };
  // const [addadmin, setAddadmin] = useState("");
  // const handleAdd = () => {
  //   setModalIsOpen(true);
  //   setAddadmin("");
  // };
  // const get_admin_list = useSelector(
  //   (state) => state.user_management_admin_list
  // );
  // useEffect(() => {
  //   Getuserdata(dispatch);
  // }, []);
  const get_super_admin_list = useSelector((state) => state.super_admin_list);
  const get_all_client = useSelector((state) => state.crm.client_data);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect triggered");
    GetSuperAdminData(dispatch);
  }, [dispatch]); //
  useEffect(() => {
    GetOperatorData(dispatch);
    GetEmployeeData(dispatch);
    GetPartnerData(dispatch);
    GetClientData(dispatch);
  }, []);
  const [currentPage1, setCurrentPage1] = useState(0); // State to track current page
  const perPage = 5; // Number of items per page

  // const handlePageChange1 = (selectedPage) => {
  //   setCurrentPage(selectedPage.selected);
  // };

  const paginatedData =
    get_operator_list.length > 0 &&
    get_operator_list?.slice(
      currentPage * perPage,
      (currentPage + 1) * perPage
    );
  const [SPA_ID, SetSPAID] = useState(null);
  const [operatorID, setOperatorID] = useState(null);
  const [EmployeeID, setEmployeeID] = useState(null);
  const [PartnerID, setPartnerID] = useState(null);
  const [clientID, setClientID] = useState(null);

  // pagination for operators
  const [OperatorActivePage, setOperatorActivePage] = useState(1);
  const operatorItemsPerPage = 10;
  const indexOfLastOperatorItem = OperatorActivePage * operatorItemsPerPage;
  const indexOfFirstOperatorItem =
    indexOfLastOperatorItem - operatorItemsPerPage;
  const currentOperatorItems =
    get_operator_list.length > 0 &&
    get_operator_list?.slice(indexOfFirstOperatorItem, indexOfLastOperatorItem);
  const handleOperatorPageChange = (pageNumber) => {
    setOperatorActivePage(pageNumber);
  };
  // pagination for Employee
  const [EmployeeActivePage, setEmployeeActivePage] = useState(1);
  const employeeItemsPerPage = 10;
  const indexOfLastEmployeeItem = EmployeeActivePage * employeeItemsPerPage;
  const indexOfFirstEmployeeItem =
    indexOfLastOperatorItem - employeeItemsPerPage;
  const currentEmployeeItems =
    get_employee_list.length > 0 &&
    get_employee_list?.slice(indexOfFirstEmployeeItem, indexOfLastEmployeeItem);
  const handleEmployeePageChange = (pageNumber) => {
    setEmployeeActivePage(pageNumber);
  };
  // pagination for partner
  const [PartnerActivePage, setPartnerActivePage] = useState(1);
  const partnerItemsPerPage = 10;
  const indexOfLastPartnerItem = PartnerActivePage * partnerItemsPerPage;
  const indexOfFirstPartnerItem = indexOfLastOperatorItem - partnerItemsPerPage;
  const currentPartnerItems =
    get_partner_list.length > 0 &&
    get_partner_list?.slice(indexOfLastPartnerItem, indexOfFirstPartnerItem);
  const handlePartnerPageChange = (pageNumber) => {
    setPartnerActivePage(pageNumber);
  };
  // pagination for Client
  const [ClientActivePage, setClientActivePage] = useState(1);
  const clientItemsPerPage = 10;
  const indexOfLastClientItem = ClientActivePage * clientItemsPerPage;
  const indexOfFirstClientItem = indexOfLastClientItem - clientItemsPerPage;
  const currentClientItems =
    get_all_client.length > 0 &&
    get_all_client?.slice(indexOfFirstClientItem, indexOfLastClientItem);
  const handleClientPageChange = (pageNumber) => {
    setClientActivePage(pageNumber);
  };
  console.log(get_all_client, "get_all_client");
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
            <div className="w-full h-[12vh]  flex flex-col ">
              <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
                USER MANAGEMENT
              </h1>
              <div className="pb-[0.5vw] flex justify-between h-full items-center">
                <div className="flex items-center gap-[2vw]">
                  <div className="relative flex items-center ">
                    <input
                      type="text"
                      className="bg-white outline-none pl-[2vw] w-[17vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                      placeholder="Search Operators"
                      // onChange={(e) => handleSearch(e.target.value)}
                    />
                    <IoSearch
                      className="absolute left-[0.5vw]"
                      size={"1vw"}
                      color="#1F4B7F"
                    />
                  </div>
                  <div className="flex items-center gap-x-[2vw] ">
                    <div
                      className={` cursor-pointer ${
                        adminUser == "super_admin"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => {
                        setAdminUser("super_admin");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Bus Operator
                      </p>
                    </div>
                    {/* <div
                      className={` cursor-pointer ${
                        adminUser == "partner"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => setAdminUser("partner")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Partner
                      </div>
                    </div> */}
                    <div
                      className={` cursor-pointer ${
                        adminUser == "client"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => setAdminUser("client")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Client
                      </div>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        adminUser == "employee"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => setAdminUser("employee")}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Employee
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[1vw] h-full ">
                  <ExportButton
                    dataArray={adminUser ? employeecurrentdata : currentData}
                  />
                  <button className="bg-[#1F4B7F] flex px-[1vw]  justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]">
                    <span>
                      <CiImport size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white  text-[1.1vw]">Import</span>
                  </button>
                  <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
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
                    className="bg-[#1F4B7F] flex w-[12vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                    // onClick={() => handleAdd()}
                    onClick={() => {
                      setModalIsOpen(true);
                      setOperatorID(null);
                      setEmployeeID(null);
                      setPartnerID(null);
                      setClientID(null);
                    }}
                  >
                    <span>
                      <FaPlus size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white  text-[1.1vw]">
                      {`Add ${
                        adminUser == "super_admin"
                          ? "Operator"
                          : adminUser == "partner"
                          ? "Partner"
                          : adminUser == "client"
                          ? "Client"
                          : "Employee"
                      }`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[72vh]  w-full ">
              {/* {view == "list" ? (
                <ListView
                  currentData={currentData}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                />
              ) : (
                <GridView
                  currentData={currentData}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                />
              )} */}
              {/* {adminUser ? (
                view == "grid" ? (
                  <>
                    <GridAdminView
                      admindata={employeecurrentdata}
                      setModalIsOpen={setModalIsOpen}
                      SetUpdateData={SetAdminUpdateData}
                    />
                  </>
                ) : (
                  <div>
                    <ListAdminView
                      admindata={employeecurrentdata}
                      setModalIsOpen={setModalIsOpen}
                      SetUpdateData={SetAdminUpdateData}
                    />
                  </div>
                )
              ) : view == "grid" ? (
                <GridUserView
                  userdata={currentData}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                />
              ) : (
                <ListUserView
                  userdata={currentData}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                />
              )} */}

              {adminUser == "super_admin" ? (
                view == "grid" ? (
                  <GridList
                    currentData={currentOperatorItems}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    setOperatorID={setOperatorID}
                    operatorID={operatorID}
                  />
                ) : (
                  <TableList
                    currentData={currentOperatorItems}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    setOperatorID={setOperatorID}
                    operatorID={operatorID}
                  />
                )
              ) : adminUser == "partner" ? (
                view == "grid" ? (
                  <PartnerGridView
                    currentData={currentPartnerItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    PartnerID={PartnerID}
                    setPartnerID={setPartnerID}
                  />
                ) : (
                  <PartnerTableList
                    currentData={currentPartnerItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    PartnerID={PartnerID}
                    setPartnerID={setPartnerID}
                  />
                )
              ) : adminUser == "client" ? (
                view == "grid" ? (
                  <ClientGridView
                    currentData={currentClientItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    clientID={clientID}
                    setClientID={setClientID}
                  />
                ) : (
                  <ClientTableView
                    currentData={currentClientItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    clientID={clientID}
                    setClientID={setClientID}
                  />
                )
              ) : view == "grid" ? (
                <EmployeeGridView
                  currentData={currentEmployeeItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                />
              ) : (
                <EmployeeTableList
                  currentData={currentEmployeeItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                />
              )}

              {/* {view == "grid" ? (
                <TableList currentData={currentData} />
              ) : (
                <TableList currentData={currentData} />
              )} */}
            </div>
            <div className="w-full h-[8vh] flex justify-between items-center">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
                <span>Showing</span>
                <span className="font-bold">
                  1 -{" "}
                  {adminUser == "super_admin"
                    ? get_operator_list?.length
                    : adminUser == "partner"
                    ? get_partner_list.length
                    : adminUser == "client"
                    ? get_all_client?.length
                    : get_employee_list?.length}
                </span>
                <span>from</span>
                <span className="font-bold">
                  {" "}
                  {adminUser == "super_admin"
                    ? get_operator_list?.length
                    : adminUser == "partner"
                    ? get_partner_list.length
                    : adminUser == "client"
                    ? get_all_client?.length
                    : get_employee_list?.length}
                </span>
                <span>data</span>
              </div>
              <div>
                {/* <Pagination
                  // current={adminUser ? employeecurrentPage : currentPage}
                  // pageSize={adminUser ? employeepagesize : pageSize}
                  // total={adminUser ? admindata?.length : get_user_list?.length}
                  current={
                    adminUser == "super_admin"
                      ? currentPage
                      : adminUser == "partner"
                      ? patcurrentPage
                      : employeecurrentPage
                  }
                  pageSize={
                    adminUser == "super_admin"
                      ? pageSize
                      : adminUser == "partner"
                      ? patpagesize
                      : employeepagesize
                  }
                  total={
                    adminUser == "super_admin"
                      ? get_operator_list?.length
                      : adminUser == "partner"
                      ? get_partner_list.length
                      : get_employee_list?.length
                  }
                  onChange={
                    adminUser == "super_admin"
                      ? handlePageChange
                      : adminUser == "employee"
                      ? handleEmployeePageChange
                      : handlePartnerPageChange
                  }
                  onShowSizeChange={
                    adminUser == "super_admin"
                      ? handlePageChange
                      : adminUser == "employee"
                      ? handleEmployeePageChange
                      : handlePartnerPageChange
                  }
                  // onChange={handlePageChange}
                  // onShowSizeChange={handlePageChange}
                  // showSizeChanger
                /> */}
                <ReactPaginate
                  OperatorActivePage={
                    adminUser === "super_admin"
                      ? OperatorActivePage
                      : adminUser === "partner"
                      ? PartnerActivePage
                      : adminUser === "client"
                      ? ClientActivePage
                      : EmployeeActivePage
                  }
                  itemsCountPerPage={
                    adminUser === "super_admin"
                      ? operatorItemsPerPage
                      : adminUser === "partner"
                      ? partnerItemsPerPage
                      : adminUser === "client"
                      ? clientItemsPerPage
                      : employeeItemsPerPage
                  }
                  totalItemsCount={
                    adminUser === "super_admin"
                      ? get_operator_list?.length
                      : adminUser === "partner"
                      ? get_partner_list?.length
                      : adminUser === "client"
                      ? get_all_client?.length
                      : get_employee_list?.length
                  }
                  pageRangeDisplayed={3}
                  onChange={
                    adminUser === "super_admin"
                      ? handleOperatorPageChange
                      : adminUser === "partner"
                      ? handlePartnerPageChange
                      : adminUser === "client"
                      ? handleClientPageChange
                      : handleEmployeePageChange
                  }
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

                {/* <ReactPaginate
                  pageCount={Math.ceil(get_operator_list.length / perPage)} // Total number of pages
                  pageRangeDisplayed={5} // Number of pages to display in pagination
                  marginPagesDisplayed={2} // Number of pages to display for margins
                  previousLabel={<IoIosArrowBack size={"1.5vw"} />} // Previous button text
                  nextLabel={<IoIosArrowForward size={"1.5vw"} />} // Next button text
                  breakLabel="..." // Break label for ellipsis
                  onPageChange={handlePageChange1} // Callback function for page change
                  containerClassName="pagination justify-content-center flex"
                  activeClassName="active"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                /> */}
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
          width="70vw"
          closeicon={false}
        >
          {/* <AddPromotion
            setModalIsOpen={setModalIsOpen}
            updatedata={updatedata}
          /> */}
          {/* {adminUser ? (
            <AddAdmin
              updatedata={adminupdatedata}
              setModalIsOpen={setModalIsOpen}
              setAddadmin={setAddadmin}
              addadmin={addadmin}
            />
          ) : (
            <AddUser updatedata={updatedata} setModalIsOpen={setModalIsOpen} />
          )} */}
          {/* {adminUser == "super_admin" ? (
            <AddSuperAdmin />
          ) : adminUser == "super_admin" ? (
            <AddPartner />
          ) : (
            <AddEmployee />
          )} */}
          {adminUser == "super_admin" ? (
            <SuperAdminIndex
              adminUser={adminUser}
              operatorID={operatorID}
              setOperatorID={setOperatorID}
              setModalIsOpen={setModalIsOpen}
            />
          ) : adminUser == "partner" ? (
            <AddParner
              setModalIsOpen={setModalIsOpen}
              PartnerID={PartnerID}
              setPartnerID={setPartnerID}
            />
          ) : adminUser == "client" ? (
            <ClientIndex
              setModalIsOpen={setModalIsOpen}
              clientID={clientID}
              setClientID={setClientID}
            />
          ) : (
            <AddEmployee
              setModalIsOpen={setModalIsOpen}
              EmployeeID={EmployeeID}
              setEmployeeID={setEmployeeID}
            />
          )}
        </ModalPopup>
      </div>
    </>
  );
}
