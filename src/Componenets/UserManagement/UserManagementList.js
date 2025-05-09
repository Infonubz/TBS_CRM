import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
// import { GoDownload } from "react-icons/go";
import { MdOutlineDownloading, MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoMdMenu } from "react-icons/io";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
// import ListView from "./ListView";
import { ConfigProvider, Pagination, Popover, Tooltip } from "antd";
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
import { toast } from "react-toastify";
// import AddAdmin from "./Admin/AddAdmin";
import {
  GetExcelTemplateById,
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
  handleOperatorSearch,
  SubmitOperatorExcel,
} from "../../Api/UserManagement/SuperAdmin";
import AddEmployee from "./Employee/IndexAddEmployee";
import EmployeeTableList from "./EmployeeTableList";
import EmployeeGridView from "./EmployeeGridView";
import {
  GetEmployeeData,
  handleEmployeeSearch,
  SubmitEmployeeExcel,
} from "../../Api/UserManagement/Employee";
import PartnerTableList from "./PartnerTableList";
import PartnerGridView from "./PartnerGridView";
import AddParner from "./Partner/IndexAddPartner";
import GridList from "./GridList";
import {
  GetPartnerData,
  handlePartnerSearch,
  SubmitPartnerExcel,
} from "../../Api/UserManagement/Partner";
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
import {
  GetClientData,
  handleClientSearch,
  SubmitClientExcel,
} from "../../Api/UserManagement/Client";
import { Flex, Spin } from "antd";
import { CgImport } from "react-icons/cg";
import { LiaSearchSolid } from "react-icons/lia";
import { BsExclamationCircle } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import Dragger from "antd/es/upload/Dragger";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import { MdCancel } from "react-icons/md";

export default function Discounts() {
  const location = useLocation();
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
  const [adminUser, setAdminUser] = useState(
    location?.state?.tabIndex || "super_admin"
  );
  const get_user_list = useSelector((state) => state.user_management_user_list);
  const get_operator_list = useSelector((state) => state.crm.operator_list);
  const get_employee_list = useSelector((state) => state.crm.employee_list);
  const get_partner_list = useSelector((state) => state.crm.partner_list);
  const get_all_client = useSelector((state) => state.crm.client_data);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteEmpmodalIsOpen, setDeleteEmpModalIsOpen] = useState(false);
  const [deleteOpmodalIsOpen, setDeleteOpModalIsOpen] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [importModal, setImportModal] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  const [sortOrderDate, setSortOrderDate] = useState(null);
  const [sortOrderMobile, setSortOrderMobile] = useState(null);
  const [sortOrderEmail, setSortOrderEmail] = useState(null);
  const [sortOrderOperatorName, setSortOrderOperatorName] = useState(null);
  const [sortOrderCompanyName, setSortOrderCompanyName] = useState(null);
  const [sortOrderOccupation, setSortOrderOccupation] = useState(null);
  const [sortOrderPartnerName, setSortOrderPartnerName] = useState(null);
  const [sortOrderBusinessType, setSortOrderBusinessType] = useState(null);
  const [sortOrderClientName, setSortOrderClientName] = useState(null);
  const [sortOrderClientCompName, setSortOrderClientCompName] = useState(null);
  const [sortOrderEmpName, setSortOrderEmpName] = useState(null);
  const [sortOrderRole, setSortOrderRole] = useState(null);
  const [sortOrderDes, setSortOrderDes] = useState(null);
  const [inputValue, setInputValue] = useState();
  const [spinning, setSpinning] = useState();
  

  const handleClear = () => {
    setInputValue("");
    if (adminUser == "super_admin") {
      GetOperatorData(dispatch);
    } else if (adminUser == "partner") {
      GetPartnerData(dispatch);
    } else if (adminUser == "client") {
      GetClientData(dispatch);
    } else if (adminUser == "employee") {
      GetEmployeeData(dispatch);
    }
  };

  const handleDateSort = () => {
    let sorted =
      adminUser == "super_admin"
        ? [...get_operator_list]
        : adminUser == "partner"
        ? [...get_partner_list]
        : adminUser == "client"
        ? [...get_all_client]
        : adminUser == "employee"
        ? [...get_employee_list]
        : [...get_operator_list];
    console.log(
      sorted.map((sort) => dayjs(sort.created_date).format("DD MMM YYYY")),
      "sorted data from um"
    );
    console.log(adminUser, "adminUser");
    if (sortOrderDate === "ascend") {
      sorted.sort(
        (a, b) =>
          new Date(dayjs(b.created_date).format("DD MMM YYYY")) -
          new Date(dayjs(a.created_date).format("DD MMM YYYY"))
      );
      setSortOrderDate("descend");
    } else if (sortOrderDate === "descend") {
      sorted =
        adminUser == "super_admin"
          ? [...get_operator_list]
          : adminUser == "partner"
          ? [...get_partner_list]
          : adminUser == "client"
          ? [...get_all_client]
          : adminUser == "employee"
          ? [...get_employee_list]
          : [...get_operator_list]; // Reset to original order
      setSortOrderDate(null);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(dayjs(a.created_date).format("DD MMM YYYY")) -
          new Date(dayjs(b.created_date).format("DD MMM YYYY"))
      );
      setSortOrderDate("ascend");
    }

    console.log(get_operator_list, "sort details");
    setSortedData(sorted);
  };

  const handleMobileSort = () => {
    let sorted =
      adminUser == "super_admin"
        ? [...get_operator_list]
        : adminUser == "partner"
        ? [...get_partner_list]
        : adminUser == "client"
        ? [...get_all_client]
        : adminUser == "employee"
        ? [...get_employee_list]
        : [...get_operator_list];
    console.log(sorted.phone, "sorted details");
    if (sortOrderMobile === "ascend") {
      sorted.sort((a, b) => b.phone - a.phone);
      setSortOrderMobile("descend");
    } else if (sortOrderMobile === "descend") {
      sorted =
        adminUser == "super_admin"
          ? [...get_operator_list]
          : adminUser == "partner"
          ? [...get_partner_list]
          : adminUser == "client"
          ? [...get_all_client]
          : adminUser == "employee"
          ? [...get_employee_list]
          : [...get_operator_list];
      setSortOrderMobile(null);
    } else {
      sorted.sort((a, b) => a.phone - b.phone);
      setSortOrderMobile("ascend");
    }

    console.log(get_operator_list, "sort details");
    setSortedData(sorted);
  };

  const handleEmailSort = () => {
    let sorted =
      adminUser == "super_admin"
        ? [...get_operator_list]
        : adminUser == "partner"
        ? [...get_partner_list]
        : adminUser == "client"
        ? [...get_all_client]
        : adminUser == "employee"
        ? [...get_employee_list]
        : [...get_operator_list];
    console.log(sorted.emailid, "sorted details");
    if (sortOrderEmail === "ascend") {
      if (adminUser == "employee") {
        sorted.sort((a, b) => b.email_id.localeCompare(a.email_id));
      } else {
        sorted.sort((a, b) => b.emailid.localeCompare(a.emailid));
      }
      setSortOrderEmail("descend");
    } else if (sortOrderEmail === "descend") {
      sorted =
        adminUser == "super_admin"
          ? [...get_operator_list]
          : adminUser == "partner"
          ? [...get_partner_list]
          : adminUser == "client"
          ? [...get_all_client]
          : adminUser == "employee"
          ? [...get_employee_list]
          : [...get_operator_list];
      setSortOrderEmail(null);
    } else {
      if (adminUser == "employee") {
        sorted.sort((a, b) => a.email_id.localeCompare(b.email_id));
      } else {
        sorted.sort((a, b) => a.emailid.localeCompare(b.emailid));
      }
      setSortOrderEmail("ascend");
    }

    console.log(get_operator_list, "sort details");
    setSortedData(sorted);
  };

  const handleOperatorNameSort = () => {
    let sorted = [...get_operator_list];
    console.log(sorted.owner_name, "sorted details");
    if (sortOrderOperatorName === "ascend") {
      sorted.sort((a, b) => b.owner_name.localeCompare(a.owner_name));
      setSortOrderOperatorName("descend");
    } else if (sortOrderOperatorName === "descend") {
      sorted = [...get_operator_list]; // Reset to original order
      setSortOrderOperatorName(null);
    } else {
      sorted.sort((a, b) => a.owner_name.localeCompare(b.owner_name));
      setSortOrderOperatorName("ascend");
    }

    console.log(get_operator_list, "sort details");
    setSortedData(sorted);
  };

  const handleCompanyNameSort = () => {
    let sorted = [...get_operator_list];
    console.log(sorted.owner_name, "sorted details");
    if (sortOrderCompanyName === "ascend") {
      sorted.sort((a, b) => b.company_name.localeCompare(a.company_name));
      setSortOrderCompanyName("descend");
    } else if (sortOrderCompanyName === "descend") {
      sorted = [...get_operator_list]; // Reset to original order
      setSortOrderCompanyName(null);
    } else {
      sorted.sort((a, b) => a.company_name.localeCompare(b.company_name));
      setSortOrderCompanyName("ascend");
    }

    console.log(get_operator_list, "sort details");
    setSortedData(sorted);
  };

  const handleOccupationSort = () => {
    let sorted = [...get_partner_list];
    // console.log(sorted.owner_name, "sorted details");
    if (sortOrderOccupation === "ascend") {
      sorted.sort((a, b) => b.occupation.localeCompare(a.occupation));
      setSortOrderOccupation("descend");
    } else if (sortOrderOccupation === "descend") {
      sorted = [...get_partner_list]; // Reset to original order
      setSortOrderOccupation(null);
    } else {
      sorted.sort((a, b) => a.occupation.localeCompare(b.occupation));
      setSortOrderOccupation("ascend");
    }

    console.log(get_partner_list, "sort details");
    setSortedData(sorted);
  };

  const handlePartnerNameSort = () => {
    let sorted = [...get_partner_list];
    console.log(sorted.partner_first_name, "sorted details");
    if (sortOrderPartnerName === "ascend") {
      sorted.sort((a, b) =>
        b.partner_first_name.localeCompare(a.partner_first_name)
      );
      setSortOrderPartnerName("descend");
    } else if (sortOrderPartnerName === "descend") {
      sorted = [...get_partner_list]; // Reset to original order
      setSortOrderPartnerName(null);
    } else {
      sorted.sort((a, b) =>
        a.partner_first_name.localeCompare(b.partner_first_name)
      );
      setSortOrderPartnerName("ascend");
    }

    console.log(get_partner_list, "sort details");
    setSortedData(sorted);
  };

  const handleBusinessTypeSort = () => {
    let sorted = [...get_all_client];
    console.log(sorted.business_background, "sorted details");
    if (sortOrderBusinessType === "ascend") {
      sorted.sort((a, b) =>
        b.business_background.localeCompare(a.business_background)
      );
      setSortOrderBusinessType("descend");
    } else if (sortOrderBusinessType === "descend") {
      sorted = [...get_all_client]; // Reset to original order
      setSortOrderBusinessType(null);
    } else {
      sorted.sort((a, b) =>
        a.business_background.localeCompare(b.business_background)
      );
      setSortOrderBusinessType("ascend");
    }

    console.log(get_all_client, "sort details");
    setSortedData(sorted);
  };

  const handleClientNameSort = () => {
    let sorted = [...get_all_client];
    console.log(sorted.business_background, "sorted details");
    if (sortOrderClientName === "ascend") {
      sorted.sort((a, b) => b.owner_name.localeCompare(a.owner_name));
      setSortOrderClientName("descend");
    } else if (sortOrderClientName === "descend") {
      sorted = [...get_all_client]; // Reset to original order
      setSortOrderClientName(null);
    } else {
      sorted.sort((a, b) => a.owner_name.localeCompare(b.owner_name));
      setSortOrderClientName("ascend");
    }

    console.log(get_all_client, "sort details");
    setSortedData(sorted);
  };

  const handleClientCompNameSort = () => {
    let sorted = [...get_all_client];
    console.log(sorted.business_background, "sorted details");
    if (sortOrderClientCompName === "ascend") {
      sorted.sort((a, b) => b.company_name.localeCompare(a.company_name));
      setSortOrderClientCompName("descend");
    } else if (sortOrderClientCompName === "descend") {
      sorted = [...get_all_client]; // Reset to original order
      setSortOrderClientCompName(null);
    } else {
      sorted.sort((a, b) => a.company_name.localeCompare(b.company_name));
      setSortOrderClientCompName("ascend");
    }

    console.log(get_all_client, "sort details");
    setSortedData(sorted);
  };

  const handleEmpNameSort = () => {
    let sorted = [...get_employee_list];
    console.log(sorted.emp_first_name, "sorted details");
    if (sortOrderEmpName === "ascend") {
      sorted.sort((a, b) => b.emp_first_name.localeCompare(a.emp_first_name));
      setSortOrderEmpName("descend");
    } else if (sortOrderEmpName === "descend") {
      sorted = [...get_employee_list]; // Reset to original order
      setSortOrderEmpName(null);
    } else {
      sorted.sort((a, b) => a.emp_first_name.localeCompare(b.emp_first_name));
      setSortOrderEmpName("ascend");
    }

    console.log(get_employee_list, "sort details");
    setSortedData(sorted);
  };

  const handleRoleSort = () => {
    let sorted = [...get_employee_list];
    console.log(sorted.role_type, "sorted details");
    if (sortOrderRole === "ascend") {
      sorted.sort((a, b) => b.role_type?.localeCompare(a.role_type));
      setSortOrderRole("descend");
    } else if (sortOrderRole === "descend") {
      sorted = [...get_employee_list]; // Reset to original order
      setSortOrderRole(null);
    } else {
      sorted.sort((a, b) => a.role_type?.localeCompare(b.role_type));
      setSortOrderRole("ascend");
    }

    console.log(get_employee_list, "sort details");
    setSortedData(sorted);
  };

  const handleDesSort = () => {
    let sorted = [...get_employee_list];
    console.log(sorted.designation, "sorted details");
    if (sortOrderDes === "ascend") {
      sorted.sort((a, b) => b.designation?.localeCompare(a.designation));
      setSortOrderDes("descend");
    } else if (sortOrderDes === "descend") {
      sorted = [...get_employee_list]; // Reset to original order
      setSortOrderDes(null);
    } else {
      sorted.sort((a, b) => a.designation?.localeCompare(b.designation));
      setSortOrderDes("ascend");
    }

    console.log(get_employee_list, "sort details");
    setSortedData(sorted);
  };

  // const user = sessionStorage.getItem("USER_ID");
  const user = sessionStorage.getItem("USER_ID");

  useEffect(() => {
    setAdminUser(location?.state?.tabIndex);
  }, [location.state]);

  console.log(get_partner_list, user, "get_partner_list");

  // const currentData =
  //   get_operator_list.length > 0 &&
  //   get_operator_list?.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );

  const currentData =
    get_operator_list.length &&
    get_operator_list?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  // console.log(currentData, "currentData");

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
    setImportModal(false);
    setExcelData("");
    // Getuserdata();
  };

  useEffect(() => {
    if (user?.startsWith("tbs-pro")) {
      setAdminUser(
        location?.state?.tabIndex ? location?.state?.tabIndex : "super_admin"
      );
    } else {
      setAdminUser(
        location?.state?.tabIndex ? location?.state?.tabIndex : "employee"
      );
    }
  }, [user]);

  const search = (e) => {
    if (adminUser == "super_admin") {
      console.log(e.target.value, "superadminsearch");
      handleOperatorSearch(e, dispatch);
    } else if (adminUser == "client") {
      handleClientSearch(e, dispatch);
    } else if (adminUser == "employee") {
      handleEmployeeSearch(e, dispatch);
    } else {
      handlePartnerSearch(e, dispatch);
    }
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
  const [operatorID, setOperatorID] = useState("");
  console.log(operatorID, "operator_id");
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
    sortedData.length > 0
      ? sortedData.slice(indexOfFirstOperatorItem, indexOfLastOperatorItem)
      : get_operator_list.length > 0 &&
        get_operator_list?.slice(
          indexOfFirstOperatorItem,
          indexOfLastOperatorItem
        );
  const handleOperatorPageChange = (pageNumber) => {
    setOperatorActivePage(pageNumber);
  };
  console.log(currentOperatorItems?.length, "operatorpage");

  // pagination for Employee
  const [EmployeeActivePage, setEmployeeActivePage] = useState(1);
  const employeeItemsPerPage = 10;
  const indexOfLastEmployeeItem = EmployeeActivePage * employeeItemsPerPage;
  const indexOfFirstEmployeeItem =
    indexOfLastEmployeeItem - employeeItemsPerPage;
  const currentEmployeeItems =
    sortedData.length > 0
      ? sortedData.slice(indexOfFirstEmployeeItem, indexOfLastEmployeeItem)
      : get_employee_list.length > 0 &&
        get_employee_list?.slice(
          indexOfFirstEmployeeItem,
          indexOfLastEmployeeItem
        );
  console.log(currentEmployeeItems, "employees");
  const handleEmployeePageChange = (pageNumber) => {
    setEmployeeActivePage(pageNumber);
  };
  // pagination for partner
  const [PartnerActivePage, setPartnerActivePage] = useState(1);
  const partnerItemsPerPage = 10;
  const indexOfLastPartnerItem = PartnerActivePage * partnerItemsPerPage;
  const indexOfFirstPartnerItem = indexOfLastPartnerItem - partnerItemsPerPage;
  // const currentPartnerItems =
  //   get_partner_list?.length > 0 &&
  //   get_partner_list?.slice(indexOfFirstPartnerItem, indexOfLastPartnerItem);
  const currentPartnerItems =
    sortedData.length > 0
      ? sortedData.slice(indexOfFirstPartnerItem, indexOfLastPartnerItem)
      : get_partner_list.length > 0 &&
        get_partner_list?.slice(
          indexOfFirstPartnerItem,
          indexOfLastPartnerItem
        );
  const handlePartnerPageChange = (pageNumber) => {
    setPartnerActivePage(pageNumber);
  };
  // pagination for Client
  const [ClientActivePage, setClientActivePage] = useState(1);
  const clientItemsPerPage = 10;
  const indexOfLastClientItem = ClientActivePage * clientItemsPerPage;
  const indexOfFirstClientItem = indexOfLastClientItem - clientItemsPerPage;
  const currentClientItems =
    sortedData.length > 0
      ? sortedData.slice(indexOfFirstClientItem, indexOfLastClientItem)
      : get_all_client.length > 0 &&
        get_all_client?.slice(indexOfFirstClientItem, indexOfLastClientItem);
  const handleClientPageChange = (pageNumber) => {
    setClientActivePage(pageNumber);
  };
  console.log(get_all_client, "get_all_client");

  const [excelData, setExcelData] = useState("");

  console.log(excelData.name, "exceldataadfxfs");

  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    // console.log(file, "adfdsfadsfa");

    if (adminUser == "super_admin") {
      setLoading(true);
      try {
        const response = await SubmitOperatorExcel(excelData, dispatch);
        toast.success(response);
        GetOperatorData(dispatch);
        setLoading(false);
        setexceldata("");
        //   setTimeout(()=>{
        //     setLoading(false);
        // },[5000])
      } catch (error) {
        console.error("Error uploading file:", error);
        // toast.error("Failed to upload file");
      }
    } else if (adminUser == "client") {
      setLoading(true);
      // console.log("excelfiless", file);

      try {
        const response = await SubmitClientExcel(excelData, dispatch);
        toast.success(response);
        GetClientData(dispatch);
        setLoading(false);
        setexceldata("");
        //   setTimeout(()=>{
        //     setLoading(false);
        // },[5000])
      } catch (error) {
        console.error("Error uploading file:", error);
        // toast.error("Failed to upload file");
      }
    } else if (adminUser == "employee") {
      setLoading(true);
      try {
        const response = await SubmitEmployeeExcel(excelData, dispatch);
        toast.success(response);
        GetEmployeeData(dispatch);
        setLoading(false);
        setexceldata("");
        //   setTimeout(()=>{
        //     setLoading(false);
        // },[5000])
      } catch (error) {
        console.error("Error uploading file:", error);
        // toast.error("Failed to upload file");
      }
    } else if (adminUser == "partner") {
      setLoading(true);
      try {
        const response = await SubmitPartnerExcel(excelData, dispatch);
        console.log(response, "----partner");
        toast.success(response);
        GetPartnerData(dispatch);
        setLoading(false);
        setexceldata("");
        //   setTimeout(()=>{
        //     setLoading(false);
        // },[5000])
      } catch (error) {
        console.error("Error uploading file:", error);
        // toast.error("Failed to upload file");
      }
    }
    setImportModal(false);
  };
  console.log(adminUser, "ididididididididididididddddd");

  const handleAddButton = () => {
    sessionStorage.removeItem("OperatorProfileImg");
    sessionStorage.removeItem("ClientCompanyLogo");
    sessionStorage.removeItem("PartnerProfileImg");
    sessionStorage.removeItem("PARTNER_ID");
    sessionStorage.removeItem("CLIENT_ID");
    // sessionStorage.removeItem('EmployeeProfileImg');
    sessionStorage.removeItem("OPERATE_ID");
    setModalIsOpen(true);
    setOperatorID(null);
    setEmployeeID(null);
    setPartnerID(null);
    setClientID(null);
  };

  useEffect(() => {
    if (adminUser == "super_admin" && get_operator_list?.length > 10) {
      // console.log(currentOperatorItems?.length,"jajajajajajajajajaj")
      setShowPage(true);
      // if (currentOperatorItems?.length == 0) {
      //   setOperatorActivePage(OperatorActivePage - 1);
      // }
    } else if (adminUser == "partner" && get_partner_list?.length > 10) {
      setShowPage(true);
      // if(currentPartnerItems?.length == 0){
      //   setPartnerActivePage(PartnerActivePage - 1)
      // }
    } else if (adminUser == "client" && get_all_client?.length > 10) {
      setShowPage(true);
      // if(currentClientItems?.length == 0){
      //   setClientActivePage(ClientActivePage - 1)
      // }
    } else if (adminUser == "employee" && get_employee_list?.length > 10) {
      setShowPage(true);
      // if(currentEmployeeItems?.length == 0){
      //   setEmployeeActivePage(EmployeeActivePage - 1)
      // }
    } else {
      setShowPage(false);
    }
  }, [
    adminUser,
    currentOperatorItems,
    currentPartnerItems,
    currentClientItems,
    currentEmployeeItems,
    // get_employee_list,
    // get_all_client,
    // get_partner_list,
    // get_operator_list,
  ]); // Add these items to the dependencies

  useEffect(() => {
    if (currentOperatorItems?.length == 0 && OperatorActivePage > 1) {
      setOperatorActivePage(OperatorActivePage - 1);
    } else if (currentPartnerItems?.length == 0 && PartnerActivePage > 1) {
      setPartnerActivePage(PartnerActivePage - 1);
    } else if (currentClientItems?.length == 0 && ClientActivePage > 1) {
      setClientActivePage(ClientActivePage - 1);
    } else if (currentEmployeeItems?.length == 0 && EmployeeActivePage > 1) {
      setEmployeeActivePage(EmployeeActivePage - 1);
    }
  }, [
    currentOperatorItems,
    currentPartnerItems,
    currentClientItems,
    currentEmployeeItems,
  ]);
  console.log(currentPartnerItems, "operatoractivepafe");
  const infos = [
    {
      title:
        adminUser == "super_admin"
          ? "Operator ID"
          : adminUser == "partner"
          ? "Partner ID"
          : adminUser == "client"
          ? "Client ID"
          : "Employee ID",
    },
    {
      title:
        adminUser == "super_admin"
          ? "Company Name"
          : adminUser == "partner"
          ? "Partner Name"
          : adminUser == "client"
          ? "Company Name"
          : "Employee Name",
    },
    {
      title:
        adminUser == "super_admin"
          ? "Operator Name"
          : adminUser == "partner"
          ? "Occupation"
          : adminUser == "client"
          ? "Client Name"
          : "Role Type",
    },
    {
      title:
        adminUser == "client"
          ? "Business Type"
          : adminUser == "employee"
          ? "Designation"
          : "",
    },
    {
      title: "Mobile",
    },
    {
      title: "Email",
    },
    {
      title: "Created Date",
      description: "DD MMM (e.g. 01 Jan) - Format",
    },
    // {
    //   title: " Duration",
    //   description: "MMM DD (e.g. Jan 01) - Format",
    // },
  ];
  const filteredInfos = infos.filter(
    (item) => item.title && item.title.trim() !== ""
  );

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiurl = process.env.REACT_APP_API_URL;

  const [exceldata, setexceldata] = useState();
  console.log(exceldata, "dummy_dummy");

  const fetchopTemp = async () => {
    try {
      const response = await GetExcelTemplateById(adminUser);
      setexceldata(response.data[0]);
      console.log(response.data[0], "fetch_optemp");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchopTemp();
    setClientActivePage(1);
    setEmployeeActivePage(1);
    setOperatorActivePage(1);
    setPartnerActivePage(1);
    setExcelData("");
  }, [adminUser, setAdminUser]);

  const handleDownloadExcel = () => {
    if (exceldata?.length === 0) {
      console.log("error");
    } else {
      const fileUrl = `${apiImgUrl}${exceldata?.upload_files}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  // const handleChange = (info) => {
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const handleFileUpload = (file) => {
    // Handle the file (e.g., read the Excel file, process it, etc.)
    setExcelData(file);
    console.log(file, "filesfiles"); // Log the file to the console
  };

  const uploadProps = {
    name: "file", // The field name to send the file
    accept: ".xls,.xlsx", // File type restrictions
    // onChange: handleChange, // Event handler for file status changes
    beforeUpload: (file) => {
      // Process file before upload (e.g., validate file format)
      handleFileUpload(file);
      return false; // Prevent automatic upload, you can handle upload yourself
    },
    showUploadList: false,
  };

  // useEffect(() => {}, []);
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
      <Spin size="large" spinning={loading} fullscreen />
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
            <div className="w-full h-[12vh]  flex flex-col ">
              <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
                USER MANAGEMENT
              </h1>
              <div className="pb-[0.5vw] flex justify-between h-full items-center">
                <div className="flex items-center gap-[.7vw]">
                  <div className="flex border-[#1F4B7F] h-[5vh] ">
                    <Tooltip
                      placement="bottom"
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
                          view == "list" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-l-[0.75vw]  border-t-[0.1vw] border-l-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C]`}
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
                      placement="bottom"
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
                          view == "grid" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-r-[0.75vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0 border-[#1F487C]`}
                        style={{
                          transition: "all 1s",
                        }}
                        onClick={() => setView("grid")}
                      >
                        <IoGrid
                          color={`${view == "grid" ? "white" : "#1F487C"}`}
                        />
                      </button>
                    </Tooltip>
                  </div>
                  {/* <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.2vw] border-t-[0.2vw] rounded-l-[0.7vw] rounded-r-[0.7vw] border-r-[0.2vw] border-b-[0.2vw]">
                    <button
                      className={`${view == "list" ? "bg-[#1F4B7F]" : "bg-white"
                        } flex px-[.5vw] justify-center gap-[0.3vw] items-center rounded-tl-[0.4vw]   rounded-bl-[0.4vw] `}
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
                      
                      </span>
                    </button>
                    <button
                      className={`${view == "grid" ? "bg-[#1F4B7F]" : "bg-white"
                        } flex px-[0.5vw] justify-center gap-[0.3vw] items-center rounded-r-[0.4vw]`}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("grid")}
                    >
                      <span>
                        <IoGrid
                          size={"1.1vw"}
                          color={`${view == "grid" ? "white" : "#1F4B7F"}`}
                        />
                      </span>
                      <span
                        className={`${view == "grid" ? "text-white" : "text-[#1F4B7F]"
                          }  text-[1.1vw]`}
                      >
                        
                      </span>
                    </button>
                  </div> */}
                  <div className="relative flex items-center ">
                    <input
                      type="text"
                      className="bg-white outline-none px-[2vw] w-[17vw] text-[#1f487c] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw] pt-[0.25vw]"
                      placeholder="Search..."
                      onKeyDown={handleKeyDown}
                      value={inputValue}
                      onChange={(e) => {
                        search(e);
                        setInputValue(e.target.value);
                      }}
                    />
                    <LiaSearchSolid
                      className="absolute left-[0.5vw] inline-block"
                      size={"1vw"}
                      color="#9CA3AF"
                    />
                    <span className="inline-block cursor-pointer text-[#1F4B7F] text-[1vw] align-text-bottom absolute right-[1.1vw] ">
                      {" "}
                      <div>
                        {inputValue ? (
                          <MdCancel
                            size="1.3vw"
                            className="text-[#1f487c] cursor-pointer  right-[-0.1vw]"
                            onClick={() => {
                              handleClear();
                              // setPopoverVisible(false);
                            }}
                          />
                        ) : (
                          <Popover
                            color="white"
                            // trigger={"click"}
                            title={
                              <div className=" text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto ">
                                <span className="font-bold text-[1.5vh]">
                                  SEARCH BY...
                                </span>
                                {filteredInfos?.map((info, index) => (
                                  <div key={index} className="flex flex-col">
                                    <ul
                                      className="pl-[1vw]"
                                      style={{ listStyleType: "disc" }}
                                    >
                                      <li className="text-[0.8vw] ">
                                        <p className="text-[0.8vw] font-semibold">
                                          {info.title}
                                        </p>
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
                        )}
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center pl-[2vw] gap-x-[3vw] ">
                    {user?.startsWith("tbs-pro") && (
                      <div
                        className={` cursor-pointer ${
                          adminUser == "super_admin"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                        } `}
                        onClick={() => {
                          setAdminUser("super_admin");
                          setSortedData([]);
                          setSortOrderDate(null);
                          setSortOrderMobile(null);
                          setSortOrderEmail(null);
                          setSortOrderOperatorName(null);
                          setSortOrderCompanyName(null);
                          setSortOrderOccupation(null);
                          setSortOrderPartnerName(null);
                          setSortOrderBusinessType(null);
                          setSortOrderClientName(null);
                          setSortOrderClientCompName(null);
                          setSortOrderEmpName(null);
                          setSortOrderRole(null);
                          setSortOrderDes(null);
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Operator
                        </p>
                      </div>
                    )}
                    {user?.startsWith("tbs-pro") && (
                      <div
                        className={` cursor-pointer ${
                          adminUser == "partner"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                        } `}
                        onClick={() => {
                          setAdminUser("partner");
                          setSortedData([]);
                          setSortOrderDate(null);
                          setSortOrderMobile(null);
                          setSortOrderEmail(null);
                          setSortOrderOperatorName(null);
                          setSortOrderCompanyName(null);
                          setSortOrderOccupation(null);
                          setSortOrderPartnerName(null);
                          setSortOrderBusinessType(null);
                          setSortOrderClientName(null);
                          setSortOrderClientCompName(null);
                          setSortOrderEmpName(null);
                          setSortOrderRole(null);
                          setSortOrderDes(null);
                        }}
                      >
                        <div className="text-[1.3vw] text-[#1f487c] text-center">
                          Partner
                        </div>
                      </div>
                    )}

                    {user?.startsWith("tbs-pro") && (
                      <div
                        className={` cursor-pointer ${
                          adminUser == "client"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                        } `}
                        onClick={() => {
                          setAdminUser("client");
                          setSortedData([]);
                          setSortOrderDate(null);
                          setSortOrderMobile(null);
                          setSortOrderEmail(null);
                          setSortOrderOperatorName(null);
                          setSortOrderCompanyName(null);
                          setSortOrderOccupation(null);
                          setSortOrderPartnerName(null);
                          setSortOrderBusinessType(null);
                          setSortOrderClientName(null);
                          setSortOrderClientCompName(null);
                          setSortOrderEmpName(null);
                          setSortOrderRole(null);
                          setSortOrderDes(null);
                        }}
                      >
                        <div className="text-[1.3vw] text-[#1f487c] text-center">
                          Client
                        </div>
                      </div>
                    )}
                    <div
                      className={` cursor-pointer ${
                        adminUser == "employee"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => {
                        setAdminUser("employee");
                        setSortedData([]);
                        setSortOrderDate(null);
                        setSortOrderMobile(null);
                        setSortOrderEmail(null);
                        setSortOrderOperatorName(null);
                        setSortOrderCompanyName(null);
                        setSortOrderOccupation(null);
                        setSortOrderPartnerName(null);
                        setSortOrderBusinessType(null);
                        setSortOrderClientName(null);
                        setSortOrderClientCompName(null);
                        setSortOrderEmpName(null);
                        setSortOrderRole(null);
                        setSortOrderDes(null);
                      }}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Employee
                      </div>
                    </div>

                    {/* <div
                      className={` cursor-pointer ${
                        adminUser == "employee"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                      } `}
                      onClick={() => {
                        setAdminUser("passengers");
                        setSortedData([]);
                        setSortOrderDate(null);
                        setSortOrderMobile(null);
                        setSortOrderEmail(null);
                        setSortOrderOperatorName(null);
                        setSortOrderCompanyName(null);
                        setSortOrderOccupation(null);
                        setSortOrderPartnerName(null);
                        setSortOrderBusinessType(null);
                        setSortOrderClientName(null);
                        setSortOrderClientCompName(null);
                        setSortOrderEmpName(null);
                        setSortOrderRole(null);
                        setSortOrderDes(null);
                      }}
                    >
                      <div className="text-[1.3vw] text-[#1f487c] text-center">
                        Passengers
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex items-center gap-x-[1vw] h-[5vh] ">
                  <ExportButton
                    dataArray={
                      adminUser == "employee"
                        ? // ? currentEmployeeItems || []
                          get_employee_list || []
                        : adminUser == "client"
                        ? // ? currentClientItems || []
                          get_all_client || []
                        : adminUser == "super_admin"
                        ? // ? currentOperatorItems || []
                          get_operator_list || []
                        : // : currentPartnerItems || []
                          get_partner_list || []
                    }
                  />
                  <div>
                    <button
                      className="bg-[#1F4B7F] shadow-sm shadow-black flex px-[1vw]  justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]"
                      onClick={() =>
                        // document.getElementById("xlsxFile").click()
                        setImportModal(true)
                      }
                    >
                      <span>
                        <CgImport size={"1.5vw"} color="white" />
                      </span>
                      <span className="text-white font-bold text-[1.1vw] mt-[0.25vw]">
                        Import
                      </span>
                    </button>
                  </div>
                  <ModalPopup
                    show={importModal}
                    onClose={closeModal}
                    height="23.3vw"
                    width="28vw"
                    closeicon={false}
                  >
                    <div>
                      <div className="text-[#1F4B7F] font-semibold text-center text-[1.3vw]">
                        Import & Download{" "}
                        {adminUser === "super_admin"
                          ? "Operator"
                          : adminUser === "client"
                          ? "Client"
                          : adminUser === "partner"
                          ? "Partner"
                          : adminUser === "employee"
                          ? "Employee"
                          : ""}{" "}
                        Template
                      </div>
                      <button
                        onClick={handleDownloadExcel}
                        className="w-full px-[1vw] text-[#1F4B7F] shadow-[#00000054] shadow-lg   text-[1.2vw] h-[2.5vw] rounded-[.5vw]  my-[1.5vw]  bg-white flex justify-center items-center gap-x-[1vw]"
                      >
                        <MdOutlineDownloading className="text-[#1F4B7F] text-[1.4vw]" />{" "}
                        <span>Download Template</span>
                      </button>
                      {/* <div className="text-[1vw] text-[#1F4B7F] flex   gap-x-[.5vw] my-[1vw] items-center "><div className="flex justify-center"><MdOutlineDownloading className="text-[#1F4B7F] text-center cursor-pointer text-[2.4vw]" /></div>
                      <span className="text-center">Download  Template</span></div> */}

                      <ConfigProvider
                        theme={{
                          token: {
                            colorBorder: "#1F4B7F",
                            colorPrimary: "#1F4B7F",
                          },
                          components: {
                            Upload: {
                              actionsColor: "#1F4B7F",
                            },
                          },
                        }}
                      >
                        <Dragger
                          height={"9.2vw"}
                          {...uploadProps}
                          //  style={{
                          //   backgroundSize: "cover",
                          //   backgroundPosition: "center",
                          //   position: "relative",
                          // }}
                          // className="border-dashed border-[#1F4B7F] border-[.1vw]"
                        >
                          {/* <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p> */}
                          {/* <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for .xls and .xlsx files</p> */}
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

                      {/* <div
                        onClick={() =>
                          document.getElementById("xlsxFile").click()
                        }
                        className="border-[.2vw] border-dashed h-[10vw] text-[#1F4B7F] text-[1vw] flex items-center justify-center border-[#1F4B7F] rounded-[.25vw] w-full px-[1vw]"
                      >
                        {excelData?.name ? (
                          excelData?.name
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <FaCloudUploadAlt className="text-[2.5vw] ml-[.5vw]" />
                            <span className="font-bold">+ Upload</span>
                          </div>
                        )}
                      </div> */}
                      <div className="flex justify-center mt-[1.3vw] ">
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
                            // handleOnClick(file);
                          }}
                        /> */}
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
                  {/* <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
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
                        } flex px-[0.7vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                      style={{
                        transition: "all 1s",
                      }}
                      onClick={() => setView("grid")}
                    >
                      <span>
                        <IoGrid
                          size={"1.1vw"}
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
                    className="bg-[#1F4B7F] shadow-sm shadow-black flex w-[10vw] h-[5vh] justify-center gap-[0.5vw] items-center rounded-[0.5vw]"
                    // onClick={() => handleAdd()}
                    onClick={() => {
                      // setModalIsOpen(true);
                      // setOperatorID(null);
                      // setEmployeeID(null);
                      // setPartnerID(null);
                      // setClientID(null);
                      handleAddButton();
                    }}
                  >
                    <span>
                      <FaPlus size={"1.2vw"} color="white" />
                    </span>
                    <span className="text-white font-bold text-[1.1vw] mt-[0.25vw]">
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
                    updatedata={updatedata}
                    setDeleteOpModalIsOpen={setDeleteOpModalIsOpen}
                    deleteOpmodalIsOpen={deleteOpmodalIsOpen}
                    setOperatorID={setOperatorID}
                    operatorID={operatorID}
                  />
                ) : (
                  <TableList
                    //  currentData={ currentOperatorItems?.length == 0 ? get_operator_list : currentOperatorItems}
                    currentData={currentOperatorItems}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    setDeleteOpModalIsOpen={setDeleteOpModalIsOpen}
                    deleteOpmodalIsOpen={deleteOpmodalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    PartnerID={PartnerID}
                    setOperatorID={setOperatorID}
                    operatorID={operatorID}
                    setPartnerID={setPartnerID}
                    // update={update}
                    handleDateSort={handleDateSort}
                    sortOrderDate={sortOrderDate}
                    sortOrderMobile={sortOrderMobile}
                    handleMobileSort={handleMobileSort}
                    sortOrderEmail={sortOrderEmail}
                    handleEmailSort={handleEmailSort}
                    sortOrderOperatorName={sortOrderOperatorName}
                    handleOperatorNameSort={handleOperatorNameSort}
                    sortOrderCompanyName={sortOrderCompanyName}
                    handleCompanyNameSort={handleCompanyNameSort}
                  />
                )
              ) : adminUser == "partner" ? (
                view == "grid" ? (
                  <PartnerGridView
                    currentData={currentPartnerItems}
                    get_partner_list={get_partner_list}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    PartnerID={PartnerID}
                    setPartnerID={setPartnerID}
                    updatedata={updatedata}
                  />
                ) : (
                  <PartnerTableList
                    currentData={currentPartnerItems}
                    setModalIsOpen={setModalIsOpen}
                    get_partner_list={get_partner_list}
                    SetUpdateData={SetUpdateData}
                    PartnerID={PartnerID}
                    setPartnerID={setPartnerID}
                    updatedata={updatedata}
                    handleDateSort={handleDateSort}
                    sortOrderDate={sortOrderDate}
                    sortOrderMobile={sortOrderMobile}
                    handleMobileSort={handleMobileSort}
                    sortOrderEmail={sortOrderEmail}
                    handleEmailSort={handleEmailSort}
                    sortOrderOperatorName={sortOrderOperatorName}
                    handleOperatorNameSort={handleOperatorNameSort}
                    sortOrderCompanyName={sortOrderCompanyName}
                    handleCompanyNameSort={handleCompanyNameSort}
                    sortOrderOccupation={sortOrderOccupation}
                    handleOccupationSort={handleOccupationSort}
                    sortOrderPartnerName={sortOrderPartnerName}
                    handlePartnerNameSort={handlePartnerNameSort}
                  />
                )
              ) : adminUser == "client" ? (
                view == "grid" ? (
                  <ClientGridView
                    currentData={currentClientItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    clientID={clientID}
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    deletemodalIsOpen={deletemodalIsOpen}
                    setClientID={setClientID}
                  />
                ) : (
                  <ClientTableView
                    currentData={currentClientItems}
                    setModalIsOpen={setModalIsOpen}
                    SetUpdateData={SetUpdateData}
                    clientID={clientID}
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    deletemodalIsOpen={deletemodalIsOpen}
                    setClientID={setClientID}
                    handleDateSort={handleDateSort}
                    sortOrderDate={sortOrderDate}
                    sortOrderMobile={sortOrderMobile}
                    handleMobileSort={handleMobileSort}
                    sortOrderEmail={sortOrderEmail}
                    handleEmailSort={handleEmailSort}
                    sortOrderBusinessType={sortOrderBusinessType}
                    handleBusinessTypeSort={handleBusinessTypeSort}
                    sortOrderClientName={sortOrderClientName}
                    handleClientNameSort={handleClientNameSort}
                    sortOrderClientCompName={sortOrderClientCompName}
                    handleClientCompNameSort={handleClientCompNameSort}
                  />
                )
              ) : view == "grid" ? (
                <EmployeeGridView
                  currentData={currentEmployeeItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setDeleteEmpModalIsOpen={setDeleteEmpModalIsOpen}
                  deleteEmpmodalIsOpen={deleteEmpmodalIsOpen}
                />
              ) : (
                <EmployeeTableList
                  currentData={currentEmployeeItems}
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setDeleteEmpModalIsOpen={setDeleteEmpModalIsOpen}
                  deleteEmpmodalIsOpen={deleteEmpmodalIsOpen}
                  handleDateSort={handleDateSort}
                  sortOrderDate={sortOrderDate}
                  sortOrderMobile={sortOrderMobile}
                  handleMobileSort={handleMobileSort}
                  sortOrderEmail={sortOrderEmail}
                  handleEmailSort={handleEmailSort}
                  sortOrderEmpName={sortOrderEmpName}
                  handleEmpNameSort={handleEmpNameSort}
                  sortOrderRole={sortOrderRole}
                  handleRoleSort={handleRoleSort}
                  sortOrderDes={sortOrderDes}
                  handleDesSort={handleDesSort}
                />
              )}

              {/* {view == "grid" ? (
                <TableList currentData={currentData} />
              ) : (
                <TableList currentData={currentData} />
              )} */}
            </div>
            {currentOperatorItems?.length > 10 ||
            currentPartnerItems?.length > 10 ||
            currentClientItems?.length > 10 ||
            currentEmployeeItems?.length > 10
              ? ""
              : ""}

            {}
            {showPage === true && (
              <div className="w-full h-[8vh] flex justify-between items-center">
                <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
                  <span>Showing</span>
                  <span className="font-bold">
                    {/* 1 -{" "} */}
                    {adminUser == "super_admin"
                      ? //  get_operator_list?.length
                        // `${indexOfFirstOperatorItem + 1} - ${indexOfFirstOperatorItem + currentOperatorItems.length}`
                        currentOperatorItems && currentOperatorItems?.length > 0
                        ? `${indexOfFirstOperatorItem + 1} - ${
                            indexOfFirstOperatorItem +
                            currentOperatorItems?.length
                          }`
                        : "0"
                      : adminUser == "partner"
                      ? //  get_partner_list?.length
                        // `${indexOfFirstPartnerItem + 1} - ${indexOfFirstPartnerItem + currentPartnerItems.length}`
                        currentPartnerItems && currentOperatorItems?.length > 0
                        ? `${indexOfFirstPartnerItem + 1} - ${
                            indexOfFirstPartnerItem +
                            currentPartnerItems?.length
                          }`
                        : "0"
                      : adminUser == "client"
                      ? //  get_all_client?.length
                        // `${indexOfFirstClientItem + 1} - ${indexOfFirstClientItem + currentClientItems.length}`
                        currentClientItems && currentClientItems?.length > 0
                        ? `${indexOfFirstClientItem + 1} - ${
                            indexOfFirstClientItem + currentClientItems?.length
                          }`
                        : "0"
                      : // get_employee_list?.length
                      // `${indexOfFirstEmployeeItem + 1} - ${indexOfFirstEmployeeItem + currentEmployeeItems.length}`
                      currentEmployeeItems && currentEmployeeItems?.length > 0
                      ? `${indexOfFirstEmployeeItem + 1} - ${
                          indexOfFirstEmployeeItem +
                          currentEmployeeItems?.length
                        }`
                      : "0"}
                  </span>
                  <span>from</span>
                  <span className="font-bold">
                    {" "}
                    {adminUser == "super_admin"
                      ? get_operator_list?.length > 0
                        ? get_operator_list?.length
                        : 0
                      : adminUser == "partner"
                      ? get_partner_list?.length > 0
                        ? get_partner_list?.length
                        : 0
                      : adminUser == "client"
                      ? get_all_client?.length > 0
                        ? get_all_client?.length
                        : 0
                      : get_employee_list?.length > 0
                      ? get_employee_list?.length
                      : 0}
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
                    activePage={
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
                      adminUser == "super_admin"
                        ? handleOperatorPageChange
                        : adminUser == "partner"
                        ? handlePartnerPageChange
                        : adminUser == "client"
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
            )}
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
              updatedata={updatedata}
            />
          ) : adminUser == "partner" ? (
            <AddParner
              setModalIsOpen={setModalIsOpen}
              PartnerID={PartnerID}
              setPartnerID={setPartnerID}
              updatedata={updatedata}
            />
          ) : adminUser == "client" ? (
            <ClientIndex
              setModalIsOpen={setModalIsOpen}
              clientID={clientID}
              setClientID={setClientID}
              updatedata={updatedata}
            />
          ) : (
            <AddEmployee
              setModalIsOpen={setModalIsOpen}
              EmployeeID={EmployeeID}
              setEmployeeID={setEmployeeID}
              updatedata={updatedata}
            />
          )}
        </ModalPopup>
      </div>
    </>
  );
}
