import React, { useEffect } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import {
  Collapse,
  Table,
  Tooltip,
  // Tag,  Pagination
} from "antd";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { IoIosArrowUp, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
// import { LuEye } from "react-icons/lu";
// import { RiDeleteBin6Line } from "react-icons/ri";
import "../../App.css";
// import { ConfigProvider, Select } from "antd";
import ModalPopup from "../Common/Modal/Modal";
// import UserManagementList from "./CreateActiveRole";
// import axios from "axios";
// import { render } from "@testing-library/react";
// import AddPermission from "./CreatePermission";
import CreateActiveRole from "./CreateActiveRole";
import CreatePermission from "./CreatePermission";
import Permission from "./Permissions";
import DeleteList from "../Offers/DeleteList";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// import { FiEdit } from "react-icons/fi";
// import { IoMdArrowDropdown } from "react-icons/io";
import {
  GetRolesData,
  //GetRoleCount,
  GetOpEmpCount,
  GetProEmpCount,
  handleOpSearch,
  handleProSearch,
} from "../../Api/Role&Responsibilites/ActiveRoles";
import { GetPermissionCount } from "../../Api/Role&Responsibilites/ActivePermission";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
const { Panel } = Collapse;

export default function Roles() {
  // const [roleData, SetRoleData] = useState([]);
  const [rolesid, SetRolesId] = useState(null);
  const [updatedata, SetUpdateData] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(3);
  const [roledata, setRoleData] = useState("");
  const getrolelist = useSelector((state) => state.crm.role_list);
  // const getRoleCount = useSelector((state) => state.crm.roles_count);
  const getOpEmpCount = useSelector((state) => state.crm.op_emp_count);
  // const getProEmpCount = useSelector((state) => state.crm.pro_emp_count);
  // const getPermissionCount = useSelector((state) => state.crm.permission_count);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  //const [viewMode, setViewMode] = useState("Product Owner");
  const [permissionCount, setPermissionCount] = useState("");
  const [roleCount, setRoleCount] = useState();
  //const [tabType, setTabType] = useState("OP-EMPRole");
  const typeid = sessionStorage.getItem("type_id");
  const [filter, SetFilter] = useState("PO");
  // const pageSize = 3;
  const [permissionid, SetPermissionId] = useState("");
  const [permissionupdate, SetPermissionUpdate] = useState(null);
  const [active, setActive] = useState("1");
  // const paginatedData = getrolelist?.length > 0 && getrolelist?.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState("");
  const [permissionData, SetPermissionData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [permission, setPermission] = useState(false);
  //const [showData, setShowData] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  // const roles = [
  //   { role: "Admin", color: "#22c55e", userCount: 1, permissions: 3 },
  // ];
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const apiUrl = process.env.REACT_APP_API_URL;
  const storedCrudPermissions = sessionStorage.getItem("crud_permission");
  const crudPermissions = storedCrudPermissions
    ? storedCrudPermissions.split(",")
    : [];

  const showCreateIcon = crudPermissions.includes("create");
  // const showEditIcon = crudPermissions.includes("update");
  // const showDeleteIcon = crudPermissions.includes("delete");
  // const showViewIcon = crudPermissions.includes("view");

  // const type = typeid === "PRO101" || typeid === "OP101";

  const closeModal = () => {
    setPermission(true);
    setIsModalOpen(false);
    setIsPermissionModalOpen(false);
    SetPermissionData();
    SetPermissionUpdate(null);
    SetUpdateData(null);
    setRoleData("");
  };

  const roleCountList = async () => {
    try {
      if (typeid === "PRO101") {
        if (!filter) {
          console.warn("Filter is empty, skipping API call.");
          return;
        }
        const data = await GetProEmpCount(filter, dispatch);
        setRoleCount(data);
      } else if (typeid === "OP101") {
        const data = await GetOpEmpCount(dispatch);
        setRoleCount(data);
      }
    } catch (error) {
      console.error("Error in roleCountList:", error);
    }
  };

  const empCount = (value) => {
    console.log(value, "value");
    //setTabType(value);
  };

  // const paginatedData =
  //   getrolelist && getrolelist?.length > 0
  //     ? getrolelist?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  //     : [];

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    GetRolesData(filter, dispatch);
  };

  const Search = (e) => {
    if (e && e.target.value) {
      if (typeid === "OP101") {
        handleOpSearch(e, dispatch, setRoleCount);
      } else if (typeid === "PRO101") {
        handleProSearch(filter, e, dispatch, setRoleCount);
      }
    } else {
      roleCountList();
    }
  };

  const [userlist, setUserlist] = useState({
    user: "",
  });

  const roleColumns = [
    // {
    //   title: <span className="text-[1.1vw] font-bold pl-[2vw]">ID</span>,
    //   key: "role_id",
    //   //  dataIndex: "id",
    //   render: (row) => {
    //     return (
    //       <span className="flex">
    //         <h1 className="text-[1vw] pl-[2vw]">{row?.role_id}</h1>
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: <span className="text-[1.1vw] font-bold pl-[2vw]">User</span>,
    //   key: "role",
    //   render: (row) => {
    //     console.log(row, "741852963");

    //     return (
    //       <span className="flex">
    //         <p className="text-[1vw] pl-[2vw]">
    //           {row?.user_id === "OP101"
    //             ? "Operator Employee"
    //             : "Product Owner Employee"}
    //         </p>
    //       </span>
    //     );
    //   },
    //   className: typeid === "OP101" || typeid === "OPEMP101" ? "hidden" : "",
    // },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">
          Role Type
        </span>
      ),
      key: "role",
      render: (row) => {
        return (
          <span className="flex items-center pl-[2.5vw]">
            <p className="text-[1vw] text-[#1F487C]">
              {
                row?.role_type?.length > 18 ? (
                  <Tooltip color="white"
                    overlayInnerStyle={{ color: "#1F4B7F" }} title={capitalizeFirstLetter(row?.role_type)}>
                    <span>
                      {`${row?.role_type?.charAt(0) === row?.role_type?.charAt(0).toLowerCase()
                        ? capitalizeFirstLetter(row?.role_type).slice(0, 18)
                        : row?.role_type?.slice(0, 18)}...`}
                    </span>

                  </Tooltip>
                ) : (
                  <span>
                    {row?.role_type?.charAt(0) === row?.role_type?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(row?.role_type)
                      : row?.role_type}
                  </span>

                )
              }
            </p>
          </span>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-4">
          Member Count
        </span>
      ),
      key: "role_member_count",
      render: (row) => {
        return (
          <span className="flex items-center pl-[4.5vw]">
            <p className="text-[1vw] text-center text-[#1F487C]">
              {row?.role_member_count}
            </p>
          </span>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-4">
          Description
        </span>
      ),
      key: "description",
      width: "19vw",
      render: (row) => {
        return (
          // <span className="flex items-center pl-4">
          //   <p className="text-[1.1vw] text-[#1F487C]">{row?.description}</p>
          // </span>
          <div className="flex items-center pl-4">
            {row?.description?.length > 30 ? (
              <Tooltip
                color="#1F487C"
                placement="top"
                title={row?.description}
                className="cursor-pointer"
              >
                <div className="text-[1vw] text-center text-[#1f4b7f]">
                  {" "}
                  {`${row?.description?.slice(0, 30)}...`}
                </div>
              </Tooltip>
            ) : (
              <div className="text-[1vw] text-center text-[#1f4b7f]">
                {capitalizeFirstLetter(row?.description?.slice(0, 30))}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-4">
          Created
        </span>
      ),
      render: (row) => {
        return (
          <span className="flex items-center pl-4">
            {" "}
            {/* Same padding */}
            <p className="text-[1vw] text-[#1F487C]">
              {dayjs(row?.created_date).format("DD MMM YY - hh:mm a")}
            </p>
          </span>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-4">
          Updated
        </span>
      ),
      render: (row) => {
        return (
          <span className="flex items-center pl-4">
            {" "}
            {/* Same padding */}
            <p className="text-[1vw] text-[#1F487C]">
              {dayjs(row?.updated_date).format("DD MMM YY - hh:mm a")}
            </p>
          </span>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] font-bold text-[#1F487C] pl-4">
          Actions
        </span>
      ),
      render: (row) => {
        const handleDelete = () => {
          setUser(row);
          setDeleteModalIsOpen(true);
          SetRolesId(row.role_id);
        };

        return (
          <span className="action-icons flex gap-2  pl-4">
            {" "}
            {/* Same padding */}
            <MdModeEdit
              className="h-[1.5vw] w-[1.5vw] cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
                SetUpdateData(row.role_id);
              }}
              color="#1F4B7F"
            />
            {
              row?.role_member_count <= 0 ?
                <MdDelete
                  className="h-[1.5vw] w-[1.5vw] cursor-pointer"
                  onClick={handleDelete}
                  color="#1F4B7F"
                />
                : ""
            }



            <i
              className="pi pi-ellipsis-v text-[#1F4B7F] pt-[0.2vw]"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </span>
        );
      },
    },
  ];

  const handleCollapseChange = (key) => {
    if (active !== key) {
      setActive(key);
    }
  };

  const permissionCountList = async () => {
    const data = await GetPermissionCount(filter, dispatch);
    setPermissionCount(data);
    console.log(data, "Permission count fetched!");
  };

  const permissions = [
    {
      id: 1,
      name: "View",
      roleCount: 1,
      userCount: permissionCount?.view,
    },
    {
      id: 2,
      name: "Create",
      roleCount: 1,
      userCount: permissionCount?.create,
    },
    {
      id: 3,
      name: "Update",
      roleCount: 1,
      userCount: permissionCount?.update,
    },
    {
      id: 4,
      name: "Delete",
      roleCount: 1,
      userCount: permissionCount?.delete,
    },
  ];

  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getrolelist?.length > 0 &&
    getrolelist?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems])

  useEffect(() => {
    if (typeid === "OP101" || filter === "OP") {
      GetOpEmpCount(dispatch); // Fetch data and update Redux store
    }
  }, [typeid, filter, dispatch]);

  useEffect(() => {
    if (permission) {
      permissionCountList();
      setPermission(false);
    }
  }, [permission]);

  useEffect(() => {
    if (typeid === "OP101") {
      setRoleCount(getOpEmpCount);
    }
  }, [getOpEmpCount, typeid]);

  useEffect(() => {
    roleCountList();
    GetRolesData(filter, dispatch);
    permissionCountList();
  }, [filter, dispatch]);

  useEffect(() => {
    if (filter === "PO") {
      permissionCountList();
      roleCountList();
    } else {
      permissionCountList();
    }
  }, [filter]);
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
      <div
        className={`h-screen w-screen`}
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`h-[100vw] w-full  px-[2.5vw]`}>
          <p className={`text-[#1F487C] text-[1.4vw] font-bold pt-[0.5vw]`}>
            {" "}
            ROLES AND RESPONSIBILITES{" "}
          </p>
          <div
            className={` ${typeid === "PRO101"
              ? "grid grid-cols-3"
              : "w-[100vw] h-[15vw] flex justify-between"
              } w-full justify-between`}
          >
            <div className={`h-[15vw] w-[30vw] rounded-[1vw] bg-white border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1F487C]`}>
              <p className={`text-white h-[3vw] rounded-tr-[0.8vw] rounded-tl-[0.8vw] bg-[#1F487C] font-medium text-[1.3vw] pt-[0.3vw] pb-[0.1vw]`}>
                <div className={`flex ml-[0.5vw] justify-between items-center`}>
                  {/* <div
                    className={`cursor-pointer ${
                      tabType == "OP-EMPRole"
                        ? "border-b-[0.30vw] font-medium border-[#ffffff]"
                        : ""
                    }`}
                    onClick={() => setTabType("OP-EMPRole")}
                  >
                    <p className="text-[1.1vw] text-[#ffffff] text-center">
                      OP-EMP Role
                    </p>
                  </div> */}
                  <div className={`flex items-center justify-center`}>
                    <label className={`text-[1.2vw] font-bold pl-[1vw]`}>
                      ROLE
                    </label>
                  </div>

                  {/* <div
                    className={`cursor-pointer ml-[2vw] ${
                      tabType == "PRO-EMPRole"
                        ? "border-b-[0.30vw] font-medium border-[#ffffff]"
                        : ""
                    }`}
                    onClick={() => setTabType("PRO-EMPRole")}
                  >
                    <p className="text-[1.1vw] text-[#ffffff] text-center">
                      PRO-EMP Role
                    </p>
                  </div> */}
                  <div className={`flex items-center gap-x-[0.5vw] mr-[1vw]`}>
                    {/* <div>
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: "#aebed1",
                              optionSelectedColor: "#FFF",
                              optionSelectedBg: "#aebed1",
                              optionHeight: "2",
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          className="custom-select bg-white outline-none w-[10vw] h-[2.4vw] text-[1vw] border-[#1F4B7F] rounded-[0.5vw]  placeholder-[#1F487C]"
                          placeholder="Select User"
                          optionFilterProp="label"
                          disabled={typeid === "OP101"}
                          value={userlist.user || "OP-EMPRole"}
                          onChange={(value, option) => {
                            setUserlist({
                              ...userlist,
                              user: value,
                            });
                            empCount(value);
                          }}
                          suffixIcon={
                            <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                              <IoMdArrowDropdown size="2vw" />
                            </span>
                          }
                          style={{
                            padding: 4,
                          }}
                          options={[
                            {
                              value: "OP-EMPRole",
                              label: (
                                <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Op.Employee
                                </div>
                              ),
                            },
                            {
                              value: "PRO-EMPRole",
                              label: (
                                <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Po.Employee
                                </div>
                              ),
                            },
                          ]}
                        />
                      </ConfigProvider>
                    </div> */}
                    <div className={`relative flex items-center`}>
                      <input
                        type="text"
                        className={`bg-white outline-none pl-[2vw] text-[#1F487C] w-[14vw] h-[2.4vw] text-[1vw]  
                    rounded-[0.5vw] `}
                        placeholder="Search"
                        onKeyDown={handleKeyDown}
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
                  </div>
                </div>
              </p>
              <div className={`h-[11.5vw]  flex flex-col pr-[.1vw]`}>
                <span className="overflow-y-auto  overflow-x-hidden">
                  {Array.isArray(roleCount) && roleCount.length > 0 ? (
                    roleCount?.map((role, index) => (
                      <div key={index}>
                        <div className={`flex h-[3vw] border-t border-[#1F487C] items-center`}>
                          <div className={`flex items-center px-[0.5vw] justify-between h-[2vw] w-[35vw] overflow-y-auto`}>
                            <div className={`flex items-center w-full`}>
                              <span className="">
                                <IoMdAdd
                                  className={`w-[1.3vw] h-[1.3vw]`}
                                  color="#1F487C"
                                />
                              </span>
                              {/* <span className="">
                              <p className="text-[1.1vw] font-medium text-[#1F487C]">
                                Role:
                              </p>
                            </span> */}
                              <span className="">
                                <p className={`text-[1vw] pl-[0.2vw] font-bold text-[#1F487C]`}>
                                  {typeid === "PRO101"
                                    ? capitalizeFirstLetter(role?.role)
                                    : capitalizeFirstLetter(role?.role_type)}
                                </p>
                              </span>
                            </div>
                            <div className="pr-[1vw]">
                              <div
                                className={`flex rounded-[2vh] text-white items-center justify-center w-[5vw] text-[.9vw] py-[0.3vh]`}
                                style={{
                                  backgroundColor: "#34AE2A",
                                }}
                              >
                                {`${role?.role_count} User`}
                              </div>
                            </div>
                            <div className="">
                              <div className={`flex rounded-[2vh] bg-[#D9D9D9] items-center justify-center w-[8vw] text-[.9vw] py-[0.3vh]`}>
                                {`${role?.permission_access_count} Permissions`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`flex justify-center pt-[2vw] items-center w-[30vw]`}>
                      <p className={`text-center text-[1vw] text-[#1F487C] mt-[2vw]`}>
                        No data available
                      </p>
                    </div>
                  )}
                </span></div>
            </div>

            <div className={`flex ml-[6vw] h-[2vw] w-[20vw] gap-x-[2.5vw] text-[1.3vw]`}>
              {typeid === "PRO101" && (
                <>
                  <div
                    className={` cursor-pointer ${filter === "PO" ? "border-b-[0.25vw] font-bold border-[#1f487c]" : ""}`}
                    onClick={() => {
                      SetFilter("PO");
                      setUserlist({ ...userlist, user: "PO" });
                      empCount("PO");
                    }}
                  >
                    <p className={`text-[1.3vw] text-[#1f487c] text-center`}>
                      PO.Employee
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${filter === "OP"
                      ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                      : ""
                      } `}
                    onClick={() => {
                      SetFilter("OP");
                      setUserlist({ ...userlist, user: "OP" });
                      empCount("OP");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      OP.Employee
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className={`h-[15vw] w-[30vw] overflow-hidden ml-[1.5vw] rounded-[1vw] bg-white border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1F487C]`}>
              <p className="text-white h-[3vw] rounded-tr-[0.8vw] rounded-tl-[0.8vw] bg-[#1F487C] font-bold text-[1.2vw] pt-[0.6vw] pb-[0.6vw] pl-[1.6vw]">
                PERMISSIONS
              </p>
              <div>
                {Array.isArray(permissions) &&
                  permissions.length > 0 &&
                  permissions.map(
                    (permission, index) =>
                      permission.userCount !== undefined && (
                        <div
                          key={index}
                          className="flex h-[3vw] border-t border-[#1F487C] items-center"
                        >
                          <div className="flex items-center px-[0.5vw] justify-between w-full">
                            <div className="flex items-center w-full">
                              <span>
                                <IoMdAdd
                                  className="w-[1.3vw] h-[1.3vw]"
                                  color="#1F487C"
                                />
                              </span>
                              <span>
                                <p className="text-[1vw] text-[#1F487C]">
                                  Can{" "}
                                  <span className="font-semibold">
                                    {permission.name}
                                  </span>{" "}
                                  Users
                                </p>
                              </span>
                            </div>
                            <div>
                              <div className="flex rounded-[2vh] bg-[#34AE2A] items-center text-white justify-center w-[5vw] text-[.9vw] py-[0.3vh]">
                                {`${permission.userCount} User`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                {permissionCount?.message && (
                  <div className="flex justify-center pt-[2vw] items-center w-[30vw]">
                    <p className="text-center text-[1vw] text-[#1F487C] mt-[2vw]">
                      {permissionCount?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`pt-[0.5vw]`}>
            <Collapse
              accordian
              activeKey={active}
              onChange={() => handleCollapseChange("1")}
              size="large"
              className="bg-[#1F487C] rounded-2xl border border-[#1F487C]"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <div className="flex items-center h-[5vh]">
                    <IoIosArrowUp
                      className="mt-[2vh]"
                      style={{
                        color: "#FFFFFF",
                        height: "3.2vw",
                        width: "2.2vw",
                      }}
                    />
                  </div>
                ) : (
                  <IoIosArrowDown
                    className="mt-[2.75vh]"
                    style={{
                      color: "#FFFFFF",
                      height: "3.2vw",
                      width: "2.2vw",
                    }}
                  />
                )
              }
              expandIconPosition="end"
            >
              <Panel
                key="1"
                header={
                  <div className="flex justify-between items-center h-[5vh]">
                    <div className="col-span-2 ">
                      <span className="text-[#FFFFFF] font-bold text-[1.2vw]">
                        ACTIVE ROLES
                      </span>
                    </div>
                    <div>
                      {(typeid === "PRO101" || typeid === "PROEMP101") && (
                        <div
                          className="flex items-center"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <HiOutlineDocumentPlus className="text-[#FFFFFF] mr-[0.6vw] h-[3.2vh] w-[3.2vh]" />
                          <span className="text-[#FFFFFF] font-medium text-[1.2vw]">
                            Create New Role
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
                <div className="">
                  <Table
                    dataSource={currentItems}
                    columns={roleColumns}
                    size="middle"
                    pagination={false}
                    rowClassName={(record, index) =>
                      index % 2 === 1 ? "bg-white" : "bg-[#1F487C]/[10%]"
                    }
                    className="table-auto pb-[1vw]"
                  />
                  {getrolelist?.length > 3 ? (
                    <div className="w-full h-[7vh] px-[1vw] flex justify-between items-center">
                      <div className="text-[#1f4b7f] flex text-[1vw] gap-[0.5vw]">
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
                          {getrolelist?.length > 0 ? getrolelist?.length : 0}
                        </span>
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
                          totalItemsCount={getrolelist?.length}
                          pageRangeDisplayed={3}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                          activeClass="active"
                          prevPageText={
                            <FontAwesomeIcon icon={faChevronLeft} size="0.5vw" />
                          }
                          nextPageText={
                            <FontAwesomeIcon icon={faChevronRight} size="0.5vw" />
                          }
                          firstPageText={
                            <FontAwesomeIcon
                              icon={faAngleDoubleLeft}
                              size="0.5vw"
                            />
                          }
                          lastPageText={
                            <FontAwesomeIcon
                              icon={faAngleDoubleRight}
                              size="0.5vw"
                            />
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
                  <ModalPopup
                    show={deletemodalIsOpen}
                    onClose={closeDeleteModal}
                    height="20vw"
                    width="30vw"
                    closeicon={false}
                  >
                    <DeleteList
                      setDeleteModalIsOpen={setDeleteModalIsOpen}
                      title={`Want to delete this ${capitalizeFirstLetter(user?.role_type)}`}
                      api={`${apiUrl}/role/${rolesid}`}
                      module={"roles"}
                      filter={filter}
                    />
                  </ModalPopup>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              accordian
              activeKey={active}
              onChange={() => handleCollapseChange("2")}
              style={{
                marginTop: "0.5vw",
                borderColor: "#1F487C",
                borderRadius: "1rem",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="large"
              className="bg-[#1F4B7F]"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <IoIosArrowUp
                    className="mt-[2vh]"
                    style={{
                      color: "#FFFFFF",
                      height: "3.2vw",
                      width: "2.2vw",
                    }}
                  />
                ) : (
                  <IoIosArrowDown
                    className="mt-[2.75vh]"
                    style={{
                      color: "#FFFFFF",
                      height: "3.2vw",
                      width: "2.2vw",
                    }}
                  />
                )
              }
              expandIconPosition="end"
            >
              <Panel
                key="2"
                header={
                  <div className="flex justify-between items-center h-[5vh]">
                    <div className="col-span-2 ">
                      <span className="text-[#FFFFFF] font-bold text-[1.2vw]">
                        ACTIVE PERMISSIONS
                      </span>
                    </div>
                    {(typeid === "PRO101" ||
                      typeid === "OP101" ||
                      (typeid === "PROEMP101" && showCreateIcon)) && (
                        <div
                          className="flex items-center"
                          onClick={() => {
                            setIsPermissionModalOpen(true);
                            SetPermissionData();
                            SetPermissionUpdate(null);
                          }}
                        >
                          <HiOutlineDocumentPlus className="text-[#FFFFFF] h-[3.2vh] w-[3.2vh] mr-[1vh]" />
                          <span className="text-[#FFFFFF] font-medium text-[1.2vw]">
                            Create New Permission
                          </span>
                        </div>
                      )}
                  </div>
                  // <div className="flex justify-between">
                  //   <span className="text-[#FFFFFF] font-medium items-center pt-[0.4vw] text-[1.2vw] pl-[1vw]">
                  //     ACTIVE PERMISSIONS
                  //   </span>
                  //   <div
                  //     className="flex items-center"
                  //     onClick={() => {
                  //       setIsPermissionModalOpen(true);
                  //       SetPermissionData();
                  //       SetPermissionUpdate(null);
                  //     }}
                  //   >
                  //     <HiOutlineDocumentPlus className="text-[#FFFFFF] h-[1.5vw] w-[1.6vw]" />
                  //     <span className="text-white font-medium text-[1vw] pl-[0.5vw]">
                  //       Create New Permission
                  //     </span>
                  //   </div>
                  // </div>
                }
              >
                <Permission
                  setIsPermissionModalOpen={setIsPermissionModalOpen}
                  permission={permissionid}
                  SetPermissionUpdate={SetPermissionUpdate}
                  permissionupdate={permissionupdate}
                  SetPermissionId={SetPermissionId}
                  filter={filter}
                  SetFilter={SetFilter}
                  setPermission={setPermission}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <ModalPopup
        className={`border border-[#1f487c] border-b-8 border-r-8 rounded-md`}
        show={isPermissionModalOpen}
        onClose={closeModal}
        setIsPermissionModalOpen={setIsPermissionModalOpen}
        height="auto"
        width="50vw"
      >
        <CreatePermission
          permissionupdate={permissionupdate}
          SetPermissionUpdate={SetPermissionUpdate}
          setIsPermissionModalOpen={setIsPermissionModalOpen}
          SetPermissionData={SetPermissionData}
          permissionData={permissionData}
          permissionid={permissionid}
          filter={filter}
          setPermission={setPermission}
          permission={permission}
        />
      </ModalPopup>
      <ModalPopup
        className={`border border-[#1f487c] border-b-8 border-r-8 rounded-md`}
        show={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
        height="auto"
        width="45vw"
      >
        <CreateActiveRole
          updatedata={updatedata}
          SetUpdateData={SetUpdateData}
          setIsModalOpen={setIsModalOpen}
          roledata={roledata}
          filter={filter}
          setRoleData={setRoleData}
        />
      </ModalPopup>
    </>
  );
}
